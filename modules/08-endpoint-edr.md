# Modul 08 — Endpoint & EDR

> Serangan hampir selalu "mendarat" di sebuah endpoint (laptop, server). Di situlah bukti terkaya. Modul ini: cara membaca telemetri endpoint, terutama **Sysmon**, dan apa itu **EDR**.

---

## Bagian 1 — Apa itu telemetri endpoint?

### 🎯 Analogi

Kalau log biasa itu "buku tamu" (siapa masuk-keluar), telemetri endpoint itu **CCTV + kotak hitam pesawat** di dalam mesin: merekam setiap proses yang jalan, file yang ditulis, koneksi yang dibuat, perubahan registry. Jauh lebih detail.

### 📖 Penjelasan

Endpoint menghasilkan event tentang:
- **Process** — apa yang dieksekusi, command line, siapa parent-nya.
- **Network** — koneksi keluar/masuk dari proses mana.
- **File** — file dibuat/diubah/dihapus.
- **Registry** (Windows) — perubahan konfigurasi/persistence.
- **Module/DLL** — library yang dimuat.

Sumber telemetri: **Sysmon** (gratis, Microsoft), **EDR** komersial (CrowdStrike, Defender for Endpoint, SentinelOne), atau **auditd** (Linux).

---

## Bagian 2 — Sysmon (wajib bisa dibaca)

### 📖 Penjelasan

**Sysmon** (System Monitor) = tool Microsoft Sysinternals yang menulis event endpoint detail ke Event Log. SOC sangat mengandalkannya. Event ID Sysmon penting:

| Sysmon Event ID | Arti | Kenapa penting |
| --- | --- | --- |
| **1** | Process creation | Command line lengkap + hash + **parent process** — paling berharga |
| **3** | Network connection | Proses apa connect ke IP/port mana (deteksi C2) |
| **7** | Image/DLL loaded | Deteksi DLL injection/sideloading |
| **8** | CreateRemoteThread | Teknik injeksi ke proses lain |
| **11** | File created | Dropper menulis file, ransomware buat file |
| **12/13/14** | Registry events | Persistence via Run keys |
| **15** | File stream (ADS) | Sembunyikan data di alternate data stream |
| **22** | DNS query | Resolusi domain oleh proses (deteksi DGA/C2) |

> **Sysmon Event 1 adalah sahabat L2.** Ia memberi: `Image` (exe yang jalan), `CommandLine` (argumen — sering ungkap niat), `ParentImage` (siapa yang memanggil), `Hashes`, `User`.

### 🌳 Process tree & pola parent-child

Kunci analisis endpoint = memahami **pohon proses** (siapa memanggil siapa). Pola normal vs curiga:

| Parent → Child | Normal? |
| --- | --- |
| `explorer.exe` → `winword.exe` | ✅ user buka Word |
| `winword.exe` → `powershell.exe` | 🚩 SANGAT curiga — dokumen jalankan script (macro jahat) |
| `powershell.exe` → `cmd.exe` → `whoami` | 🚩 recon |
| `services.exe` → proses acak dari `%TEMP%` | 🚩 persistence/malware |
| `outlook.exe` → `cmd.exe`/`wscript.exe` | 🚩 lampiran jahat dieksekusi |

Command line yang bikin curiga:
- `powershell -enc <base64>` / `-EncodedCommand` → perintah disembunyikan.
- `-nop -w hidden -ep bypass` → jalan diam-diam, lewati policy.
- `Invoke-Expression (IEX)`, `DownloadString`, `FromBase64String` → unduh & jalankan.
- `rundll32`, `regsvr32`, `mshta` dengan URL → living-off-the-land (LOLBins).
- `certutil -urlcache -f http://...` → download pakai binary sah.

### 🔎 Query Elastic untuk endpoint

```kql
process.name : "powershell.exe" and process.parent.name : ("winword.exe" or "excel.exe" or "outlook.exe")
```
```kql
process.command_line : (*-enc* or *-EncodedCommand* or *DownloadString* or *FromBase64String*)
```
```eql
sequence by host.name with maxspan=2m
  [ process where process.parent.name == "winword.exe" and process.name == "powershell.exe" ]
  [ network where true ]
```

---

## Bagian 3 — EDR vs Antivirus

### 📖 Penjelasan

| | Antivirus (AV) tradisional | EDR |
| --- | --- | --- |
| Cara deteksi | Signature (hash/pola file dikenal) | Perilaku + signature + ML + telemetri |
| Zero-day | Lemah (belum ada signature) | Lebih baik (deteksi perilaku) |
| Visibilitas | Terbatas (saat scan) | Terus-menerus, detail (proses, jaringan, dll.) |
| Respon | Hapus/karantina file | **Isolasi host**, kill process, rollback, investigasi jarak jauh |
| Data | Minim | Telemetri kaya untuk hunting & forensik |

**EDR** memberi L2 kemampuan: lihat process tree real-time, isolasi host dari jaringan (containment cepat) tanpa datang fisik, kill proses jahat, dan tarik artefak untuk forensik. **XDR** memperluas ini ke email, jaringan, cloud dalam satu platform.

> Catatan: EDR mendeteksi **IOA** (perilaku serangan), jadi efektif bahkan untuk malware baru yang hash-nya belum dikenal — ini kenapa deteksi perilaku (ingat Pyramid of Pain) begitu berharga.

---

## 🧠 Cek pemahaman (tes Feynman)

1. Beda telemetri endpoint dengan log biasa — pakai analogi sendiri.
2. Kenapa Sysmon Event ID 1 begitu penting? Sebut 4 field yang ia berikan.
3. Lihat pasangan `winword.exe → powershell.exe`. Kenapa curiga, dan serangan apa yang biasanya di baliknya?
4. Apa arti `powershell -nop -w hidden -enc <base64>`? Terjemahkan tiap flag.
5. Beda mendasar AV dan EDR dari sisi cara deteksi dan respon.
6. Kenapa EDR lebih tahan terhadap malware zero-day daripada AV signature?

---

## 🧪 Praktik

1. **Install Sysmon** di VM Windows (pakai config SwiftOnSecurity/Olaf Hartong). Jalankan beberapa aktivitas (buka cmd, powershell, unduh file), lihat Event-nya di Event Viewer → Applications and Services Logs → Microsoft → Windows → Sysmon.
2. Kirim Sysmon ke Elastic (Winlogbeat/Elastic Agent). Cari process creation pakai KQL.
3. Simulasikan aman: buat file `.docm` dummy yang menjalankan `calc.exe` via macro di VM, amati parent-child di Sysmon. (Jangan pernah di mesin produksi.)
4. Kerjakan TryHackMe **"Sysmon"** / **"Windows Event Logs"** room.
5. Tulis 5 query KQL untuk mendeteksi pola command line mencurigakan dari ingatan.

---

## ➡️ Lanjut

Investigasi menghasilkan indikator. Pelajari cara memberi konteks & memakainya: **[Modul 09 — Threat Intel & IOC](09-threat-intel-ioc.md)**.
