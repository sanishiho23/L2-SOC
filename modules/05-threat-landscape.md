# Modul 05 — Threat Landscape

> Kamu tidak bisa mendeteksi apa yang tidak kamu pahami. Modul ini mengajari cara berpikir penyerang dan bahasa bersama untuk mendeskripsikannya: **MITRE ATT&CK**, **Kill Chain**, **Pyramid of Pain**.

---

## Bagian 1 — Cara penyerang berpikir: Cyber Kill Chain

### 🎯 Analogi

Perampokan bank tidak terjadi dalam satu langkah. Perampok: survei lokasi → siapkan alat → masuk → buka brankas → ambil uang → kabur. Serangan siber juga **bertahap**. Kalau kamu bisa memutus satu tahap, serangan gagal.

### 📖 Penjelasan: 7 tahap Kill Chain (Lockheed Martin)

| # | Tahap | Apa yang terjadi | Contoh deteksi SOC |
| --- | --- | --- | --- |
| 1 | **Reconnaissance** | Kumpulkan info target | Scan port, OSINT, email harvesting |
| 2 | **Weaponization** | Buat senjata (malware + exploit) | (terjadi di sisi penyerang, sulit dilihat) |
| 3 | **Delivery** | Kirim senjata | Email phishing, USB, web drive-by |
| 4 | **Exploitation** | Eksekusi exploit | Proses anomali, crash aplikasi |
| 5 | **Installation** | Pasang backdoor/persistence | Service baru (7045), scheduled task (4698) |
| 6 | **Command & Control** | Mesin korban "lapor" ke penyerang | Beaconing keluar, DNS aneh |
| 7 | **Actions on Objectives** | Tujuan akhir: curi/enkripsi data | Exfiltration, ransomware |

> **Prinsip:** makin dini kamu memutus rantai, makin kecil kerusakan. Deteksi di tahap Delivery (phishing) jauh lebih baik daripada di Actions (data sudah dicuri).

---

## Bagian 2 — MITRE ATT&CK

### 🎯 Analogi

Bayangkan **ensiklopedia gerakan pencuri** yang dikumpulkan dari ribuan kasus nyata: "cara masuk lewat jendela", "cara matikan alarm", "cara sembunyi". Polisi pakai ensiklopedia ini untuk mengenali pola. **ATT&CK = ensiklopedia itu untuk serangan siber.**

### 📖 Penjelasan

**MITRE ATT&CK** = basis pengetahuan **Taktik** (tujuan penyerang / *kenapa*) dan **Teknik** (cara mencapainya / *bagaimana*), berdasarkan observasi nyata.

**14 Taktik** (urutan kira-kira sesuai alur serangan):

| Taktik | Tujuan penyerang |
| --- | --- |
| Reconnaissance | Kumpulkan info |
| Resource Development | Siapkan infrastruktur (domain, akun) |
| Initial Access | Masuk pertama kali (T1566 Phishing) |
| Execution | Jalankan kode (T1059 Command/Scripting — PowerShell) |
| Persistence | Bertahan setelah reboot (T1053 Scheduled Task) |
| Privilege Escalation | Naikkan hak jadi admin |
| Defense Evasion | Hindari deteksi (T1070 hapus log) |
| Credential Access | Curi password (T1003 OS Credential Dumping — Mimikatz) |
| Discovery | Petakan lingkungan dalam |
| Lateral Movement | Pindah antar host (T1021 Remote Services — RDP/SMB) |
| Collection | Kumpulkan data target |
| Command and Control | Kendalikan dari jauh (T1071 protokol web) |
| Exfiltration | Keluarkan data |
| Impact | Rusak/enkripsi (T1486 Data Encrypted — ransomware) |

- **Teknik** punya ID `T####` (mis. T1566 Phishing), dengan **sub-teknik** `T1566.001` (Spearphishing Attachment).
- Setiap detection rule yang baik **dipetakan** ke teknik ATT&CK. Ini membantu melihat *cakupan deteksi*: taktik mana yang belum ter-cover?

### 🛡️ Kenapa penting buat SOC

- **Bahasa bersama**: saat lapor, "ini T1059.001 PowerShell untuk execution" lebih presisi daripada "ada script jahat".
- **Coverage map**: tim tahu lubang deteksi.
- **Investigasi terarah**: kalau lihat satu teknik, kamu tahu teknik tetangga apa yang mungkin menyertainya (mis. Credential Access sering diikuti Lateral Movement).

---

## Bagian 3 — Pyramid of Pain

### 📖 Penjelasan

Model yang menjawab: *"indikator mana yang paling menyakitkan bagi penyerang kalau kita deteksi/blokir?"* Dari paling mudah diganti (bawah) ke paling susah (atas):

```
        TTPs                ← paling MENYAKITKAN (penyerang harus ubah cara kerja)
     Tools
  Network/Host Artifacts
 Domain Names
IP Addresses
Hash Values               ← paling MUDAH diganti penyerang (ganti 1 byte, hash berubah)
```

- Blokir **hash**? Penyerang recompile, hash baru. Gampang.
- Blokir **TTP** (mis. "setiap Word yang membuka PowerShell")? Penyerang harus mengubah metode seluruhnya. Sakit.

> Pelajaran: deteksi berbasis **perilaku (TTP/IOA)** lebih tahan lama daripada berbasis **IOC statis (hash/IP)**. Keduanya tetap dipakai, tapi investasi terbaik di perilaku.

---

## Bagian 4 — Katalog serangan yang wajib bisa dijelaskan

### 📖 Penjelasan singkat tiap serangan

| Serangan | Inti | Tanda di log/SIEM |
| --- | --- | --- |
| **Phishing** | Tipu user via pesan | Email mencurigakan, klik URL, kredensial masuk situs palsu |
| **Brute force** | Coba banyak password | Banyak 4625 / "Failed password" dari 1 IP |
| **Password spraying** | 1 password umum ke banyak user | 4625 untuk banyak user berbeda, 1 password |
| **Credential stuffing** | Pakai bocoran user:pass | Login dari IP asing, banyak akun |
| **Malware / RAT** | Program jahat/remote access | Proses aneh, file baru, koneksi C2 |
| **Ransomware** | Enkripsi data, minta tebusan | Banyak file berubah ekstensi, event enkripsi massal |
| **C2 beaconing** | Mesin korban lapor berkala | Koneksi keluar interval teratur ke IP/domain langka |
| **SQL Injection** | Suntik SQL lewat input | Payload `' OR 1=1`, `UNION SELECT` di web log |
| **XSS** | Suntik script ke web | `<script>` di input/URL |
| **DDoS** | Banjiri layanan | Lonjakan trafik dari banyak IP |
| **MITM / ARP spoofing** | Sadap komunikasi | Anomali ARP, sertifikat TLS aneh |
| **Lateral movement** | Pindah antar host | 4624 type 3/10, PsExec, Pass-the-Hash |
| **Privilege escalation** | Naik jadi admin | 4672, 4732 (masuk grup admin) |

**Khusus dunia payment (relevan ALTO):**
- **Card testing / carding** — penyerang uji ribuan nomor kartu curian lewat transaksi kecil. Tanda: lonjakan transaksi gagal/kecil dari satu merchant/terminal.
- **Account takeover (ATO)** — ambil alih akun nasabah (sering via phishing + credential stuffing).
- **Skimming** — curi data kartu di titik EDC/ATM.
- Tanda fraud sering di **anomali velocity** (terlalu banyak transaksi/waktu singkat) dan **lokasi/geografi** tak wajar.

### 🧠 Cek pemahaman (tes Feynman)

1. Jelaskan Cyber Kill Chain dengan analogi selain perampokan bank. Di tahap mana deteksi paling berharga, kenapa?
2. Beda **taktik** dan **teknik** di ATT&CK — beri satu contoh pasangan.
3. Sebut 8 dari 14 taktik ATT&CK dari ingatan, urut kira-kira sesuai alur serangan.
4. Jelaskan Pyramid of Pain. Kenapa memblokir TTP lebih menyakitkan daripada memblokir hash?
5. Beda brute force, password spraying, dan credential stuffing — dari sisi *pola di log*.
6. Dua tanda khas fraud di lingkungan payment, dan field apa yang kamu korelasikan.

### 🧪 Praktik

1. Buka [attack.mitre.org](https://attack.mitre.org/). Pilih satu grup APT, baca teknik yang mereka pakai, petakan ke kill chain.
2. Pakai **MITRE ATT&CK Navigator** — warnai teknik yang menurutmu bisa dideteksi dengan log Windows + Elastic.
3. Ambil satu berita insiden ransomware, petakan langkah-langkahnya ke taktik ATT&CK.
4. Untuk tiap serangan di tabel, tulis satu kalimat query KQL yang bisa mendeteksinya.

---

## ➡️ Lanjut

Sekarang dalami vektor serangan #1 yang sudah kamu kenal dari Nanovest: **[Modul 06 — Phishing Analysis](06-phishing-analysis.md)**.
