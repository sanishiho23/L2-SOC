# Case 02 — Brute Force Login

**Level:** Pemula–Menengah · **Skill:** log Windows, timeline, deteksi SIEM · **Modul terkait:** 03, 04, 07

---

## Skenario

Sabtu 02:17 UTC, rule SIEM "Multiple Failed Logons" memicu alert pada server `SRV-APP01` (server aplikasi internal). Kamu L2 yang menerima alert. Tentukan apakah ini serangan, berhasil atau tidak, dan apa yang harus dilakukan.

## Artefak

**Windows Security Log (SRV-APP01), diringkas:**
```
02:14:02  4625  user=administrator  src=198.51.100.23  LogonType=3  Status=0xC000006A (wrong password)
02:14:05  4625  user=administrator  src=198.51.100.23  LogonType=3  Status=0xC000006A
02:14:08  4625  user=administrator  src=198.51.100.23  LogonType=3  Status=0xC000006A
... (berulang 47x dalam 3 menit, user: administrator, admin, sqladmin, backup) ...
02:16:55  4625  user=sqladmin       src=198.51.100.23  LogonType=3  Status=0xC000006A
02:17:01  4624  user=sqladmin       src=198.51.100.23  LogonType=3   (SUCCESS)
02:17:40  4672  user=sqladmin       (Special privileges assigned - admin)
02:18:20  4688  user=sqladmin  NewProcess=powershell.exe  CommandLine="powershell -nop -w hidden -enc JABзA=="
02:19:05  5140  user=sqladmin  ShareName=\\*\C$   (akses administrative share)
```

**Konteks:** `SRV-APP01` seharusnya hanya diakses dari jaringan internal `10.0.0.0/8`. IP `198.51.100.23` adalah **publik eksternal**. Port RDP/SMB server ini ternyata ter-expose ke internet karena salah konfigurasi firewall minggu lalu.

## Tugasmu

1. Ini serangan jenis apa? Berhasil atau tidak?
2. Akun mana yang jebol? Bukti barisnya?
3. Apa yang dilakukan penyerang **setelah** masuk?
4. Buat timeline & petakan ke MITRE ATT&CK.
5. Severity & dampak?
6. Tindakan containment, urut.
7. Tulis 1 query KQL untuk mendeteksi pola ini.

---

## Panduan analisis

- `4625` = gagal, `4624` = sukses. Hitung gagal, cari titik sukses.
- `LogonType=3` artinya apa? (lihat Modul 03)
- Status `0xC000006A` = password salah; `0xC0000064` = user tidak ada.
- Setelah 4624, ada 4672? proses apa yang jalan (4688)? command line-nya mencurigakan?
- IP sumber internal atau eksternal? Wajar?

---

<details>
<summary><b>🔑 Kunci jawaban</b></summary>

**1. Brute force (lebih tepat: credential guessing ke banyak akun) — BERHASIL.** 47 kegagalan dalam 3 menit dari satu IP eksternal ke beberapa akun admin, diakhiri satu login sukses.

**2. Akun `sqladmin` jebol.** Bukti: `02:17:01 4624 user=sqladmin ... (SUCCESS)` tepat setelah deretan 4625, dari IP penyerang yang sama.

**3. Setelah masuk:**
- `02:17:40 4672` → dapat hak admin.
- `02:18:20 4688` → jalankan **PowerShell terenkode tersembunyi** (`-nop -w hidden -enc ...`) → kemungkinan unduh/eksekusi payload (execution + kemungkinan C2).
- `02:19:05 5140` → akses **administrative share C$** → persiapan lateral movement / pengumpulan.

**4. Timeline & ATT&CK:**
```
02:14–02:16  Brute force banyak akun        → T1110 Brute Force (Credential Access)
02:17:01     Login sukses sqladmin          → T1078 Valid Accounts (Initial Access)
02:17:40     Hak admin                      → T1078 / Privilege context
02:18:20     PowerShell -enc hidden         → T1059.001 PowerShell (Execution), T1027 Obfuscation
02:19:05     Akses C$ share                 → T1021.002 SMB/Admin Shares (Lateral Movement)
```

**5. Severity: High/Critical.** Server aplikasi internal terkompromi dengan hak admin + eksekusi kode + indikasi gerak lateral. Pilar: **Confidentiality + Integrity + Availability** semua terancam.

**6. Containment (urut):**
1. **Isolasi `SRV-APP01`** dari jaringan (via EDR atau putus port) — hentikan lateral movement. Amankan bukti dulu (jangan buru-buru reboot/wipe).
2. **Blok IP** `198.51.100.23` di firewall.
3. **Disable akun `sqladmin`** & reset; audit akun lain yang dicoba.
4. **Perbaiki firewall** — tutup RDP/SMB dari internet (akar masalah expose).
5. Cari indikasi penyebaran ke host lain (siapa yang `sqladmin` akses via C$); decode PowerShell `-enc` di sandbox untuk tahu payload.
6. Eradication: hapus persistence/payload; Recovery: rebuild bila perlu, pantau ketat.

**7. Deteksi KQL (threshold brute force):**
```kql
event.code : "4625" and winlog.logon.type : "3"
```
Group by `source.ip`, `user.name`, threshold ≥ 10 / 5 menit. Untuk deteksi sukses-setelah-gagal, pakai EQL:
```eql
sequence by source.ip with maxspan=5m
  [ authentication where event.code == "4625" ]
  [ authentication where event.code == "4624" ]
```

**Pelajaran utama:** alert brute force jangan ditutup sebagai "cuma gagal". Selalu cek apakah ada **4624 sukses setelahnya** — itu pembeda insiden minor vs breach.

</details>

---
➡️ Lanjut: [Case 03 — Data Exfiltration](case-03-data-exfiltration.md)
