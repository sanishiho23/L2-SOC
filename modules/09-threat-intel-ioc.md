# Modul 09 — Threat Intelligence & IOC

> Menemukan IP mencurigakan itu baru setengah jalan. "IP ini jahat atau bukan? seberapa bahaya? siapa di baliknya?" — itu dijawab dengan **enrichment** dan **threat intelligence**.

---

## Bagian 1 — IOC vs IOA

### 🎯 Analogi

Sebuah TKP pencurian:
- **IOC (Indicator of Compromise)** = barang bukti fisik: sidik jari, jejak sepatu, nomor plat mobil pelaku. **Jejak yang tertinggal** → bukti bahwa serangan *sudah* terjadi.
- **IOA (Indicator of Attack)** = perilaku yang terlihat *saat* berlangsung: seseorang mengintai rumah, mencoba membuka jendela. **Pola tindakan** → serangan *sedang* terjadi, apa pun alatnya.

### 📖 Penjelasan

| | IOC | IOA |
| --- | --- | --- |
| Fokus | Artefak statis | Perilaku/niat |
| Contoh | Hash file, IP C2, domain, URL, registry key | Word membuka PowerShell; enkripsi file massal; recon akun |
| Kelemahan | Mudah usang (penyerang ganti IP/hash) | Butuh deteksi perilaku yang lebih canggih |
| Kaitan | "Pernah lihat ini sebelumnya?" | "Pola ini berbahaya apa pun toolnya" |

Ingat **Pyramid of Pain** (Modul 05): IOC ada di dasar piramida (mudah diganti), IOA/TTP di puncak (menyakitkan bagi penyerang). Deteksi terbaik menggabungkan keduanya.

**Jenis IOC yang kamu kumpulkan:**
- Hash file (MD5, SHA-1, SHA-256)
- IP address
- Domain / URL
- Email pengirim phishing
- Registry key / nama file / mutex
- Nama proses / perintah khas

---

## Bagian 2 — Enrichment: memberi konteks ke indikator

### 📖 Penjelasan

**Enrichment** = menambah informasi ke IOC agar kamu bisa menilai. Tools gratis yang wajib kamu kenal:

| Tool | Untuk | Yang kamu dapat |
| --- | --- | --- |
| **VirusTotal** | Hash, URL, IP, domain, file | Berapa engine AV menandai jahat, relasi, perilaku |
| **AbuseIPDB** | IP | Skor reputasi, laporan abuse, kategori |
| **URLScan.io** | URL/website | Screenshot, request, redirect, teknologi |
| **Any.Run / Hybrid Analysis** | File (sandbox) | Perilaku runtime: proses, koneksi, file |
| **Shodan** | IP | Layanan terbuka, banner, kerentanan |
| **WHOIS** | Domain | Kapan domain dibuat (domain baru = curiga), registrar |
| **MXToolbox** | Domain/email | DNS, blacklist, header email |
| **ThreatFox / URLhaus (abuse.ch)** | IOC | Feed IOC malware komunitas |
| **AlienVault OTX** | IOC/pulse | Intel komunitas, kampanye terkait |

> **Jangan percaya satu sumber buta.** VirusTotal "0 deteksi" tidak berarti aman (malware baru). Gabungkan beberapa sumber + konteks internal (apakah aktivitas ini wajar di lingkungan kita?).

### 🔎 Alur enrichment sebuah IP mencurigakan

1. **AbuseIPDB** → skor abuse & kategori (brute force? C2?).
2. **VirusTotal** → relasi ke file/domain jahat.
3. **WHOIS/Shodan** → siapa pemilik, layanan apa, negara/ASN.
4. **Internal (SIEM)** → host mana saja yang berkomunikasi dengan IP ini, sejak kapan, volume.
5. **Putuskan**: blok? pantau? FP? — lalu dokumentasikan.

---

## Bagian 3 — Threat Intelligence & levelnya

### 📖 Penjelasan

**Threat Intelligence (TI)** = pengetahuan terorganisir tentang ancaman: siapa aktornya, apa TTP-nya, indikator apa yang terkait. Tiga level:

| Level | Untuk siapa | Isi |
| --- | --- | --- |
| **Strategic** | Manajemen/eksekutif | Tren, risiko industri, aktor yang menargetkan sektor (mis. kelompok yang incar fintech) |
| **Operational** | Tim SOC/IR | Kampanye spesifik, TTP aktor, target |
| **Tactical** | Analyst (kamu) | IOC konkret: hash, IP, domain untuk deteksi & blokir |

**MISP** = platform berbagi threat intel (IOC, kampanye) antar organisasi. Di SIEM, feed TI dipakai lewat **indicator match rule** — otomatis beri alert kalau ada IOC dari feed muncul di log.

### 🚦 TLP — Traffic Light Protocol

Aturan berbagi informasi intel:

| TLP | Boleh dibagi ke |
| --- | --- |
| **TLP:RED** | Hanya penerima langsung, jangan diteruskan |
| **TLP:AMBER** | Organisasi sendiri + yang perlu tahu |
| **TLP:GREEN** | Komunitas, bukan publik |
| **TLP:CLEAR** (dulu WHITE) | Bebas/publik |

> Penting di fintech: intel soal ancaman nasabah/kartu sering TLP:AMBER/RED. Jangan posting IOC sensitif ke VirusTotal publik sembarangan — upload file bisa bocor ke pihak lain.

### 🛡️ Hubungan ke payment (ALTO)

Di lingkungan payment, threat intel yang relevan: kampanye skimming/carding yang sedang marak, IOC malware ATM/POS, kelompok yang menargetkan switching/bank, dan BIN/kartu yang bocor. SOC memakai intel ini untuk memperkuat rule fraud & deteksi.

---

## 🧠 Cek pemahaman (tes Feynman)

1. Jelaskan beda IOC dan IOA dengan analogi sendiri. Mana yang lebih tahan lama, kenapa?
2. Sebut 5 jenis IOC.
3. Urutkan langkah enrichment sebuah IP mencurigakan, sebut tool tiap langkah.
4. Kenapa "0 deteksi di VirusTotal" tidak otomatis berarti aman?
5. Beda threat intel strategic, operational, tactical — siapa konsumennya.
6. Apa itu TLP, dan kenapa penting hati-hati meng-upload file sensitif ke sandbox publik di lingkungan fintech?

---

## 🧪 Praktik

1. Ambil IP dari log brute force (atau sampel), enrich di **AbuseIPDB** + **VirusTotal** + **WHOIS**. Tulis verdict 2 kalimat.
2. Ambil hash file (dari modul 06/08), cek di VirusTotal. Baca tab "Behavior" & "Relations".
3. Scan sebuah domain phishing di **URLScan.io**, catat IOC yang kamu temukan (IP hosting, domain terkait).
4. Buat **IOC sheet** sederhana (tabel: tipe, nilai, sumber, verdict, aksi) dari satu study case.
5. Jelajahi **ThreatFox** / **AlienVault OTX**, lihat IOC kampanye terbaru.

---

## 🎓 Selesai modul inti!

Kamu sudah punya fondasi lengkap: fondasi → jaringan → log → SIEM → ancaman → phishing → IR → endpoint → intel.

**Sekarang buktikan dengan praktik:** kerjakan **[Study Cases](../study-cases/)** satu per satu. Di sanalah semua modul ini bersatu jadi skill nyata.
