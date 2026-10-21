# Modul 13 — Application Security & OWASP Top 10

> JD ALTO menyebut **OWASP Top 10** eksplisit. Karena ALTO membangun aplikasi/API pembayaran, memahami kerentanan aplikasi web = inti. Modul ini mengajari cara aplikasi dibobol dan cara mencegahnya.

---

## Bagian 1 — Kenapa aplikasi web rentan?

### 🎯 Analogi

Aplikasi web = **loket layanan dengan jendela ke publik**. Siapa pun di internet bisa mengirim "formulir" (request). Kalau petugas (aplikasi) percaya mentah-mentah semua yang ditulis di formulir tanpa memeriksa, penipu bisa menulis perintah jahat di kolom formulir dan petugas menurutinya.

> **Akar hampir semua bug web: "jangan percaya input user".** Input harus selalu divalidasi, difilter, dan di-escape.

### 📖 Penjelasan

**OWASP** (Open Worldwide Application Security Project) = organisasi nirlaba yang menerbitkan **Top 10** — daftar 10 risiko keamanan aplikasi web paling kritikal, diperbarui berkala (edisi besar 2021; cek edisi terbaru).

---

## Bagian 2 — OWASP Top 10 (2021) — satu per satu

| # | Kategori | Inti masalah | Contoh |
| --- | --- | --- | --- |
| **A01** | **Broken Access Control** | User mengakses yang seharusnya tak boleh | Ubah `?id=123` ke `?id=124` lihat data orang lain (IDOR); akses `/admin` tanpa hak |
| **A02** | **Cryptographic Failures** | Data sensitif tak terlindungi | Password plaintext, HTTP bukan HTTPS, algoritma usang (MD5) |
| **A03** | **Injection** | Input jahat dieksekusi | **SQLi** (`' OR 1=1--`), **XSS** (`<script>`), command injection |
| **A04** | **Insecure Design** | Cacat desain keamanan dari awal | Tak ada rate limit, logika bisnis bisa disalahgunakan |
| **A05** | **Security Misconfiguration** | Konfigurasi default/salah | Password default, direktori terbuka, verbose error, header hilang |
| **A06** | **Vulnerable & Outdated Components** | Library/dependensi rentan | Log4Shell (CVE-2021-44228), komponen tak di-patch |
| **A07** | **Identification & Auth Failures** | Autentikasi lemah | Password lemah, session bisa ditebak, tak ada MFA |
| **A08** | **Software & Data Integrity Failures** | Update/dependensi tak terverifikasi | Supply chain attack, deserialisasi tak aman, CI/CD tak terlindungi |
| **A09** | **Security Logging & Monitoring Failures** | Serangan tak tercatat/terdeteksi | Tak ada log, tak ada alert → breach lama tak ketahuan |
| **A10** | **Server-Side Request Forgery (SSRF)** | Server dipaksa request ke tujuan internal | Akses metadata cloud, scan jaringan internal lewat server |

> Hubungan ke modul lain: A02 → [Kripto](11-cryptography-pki.md), A01/A07 → [IAM](12-iam.md), A06/A08 → [DevSecOps](10-devsecops-cicd.md), A09 → [SIEM/Logging](04-siem-elastic.md). Semuanya saling terkait.

---

## Bagian 3 — Tiga serangan injection yang wajib bisa dijelaskan

### 📖 SQL Injection (A03)

Penyerang menyisipkan SQL lewat input. Kalau query dibangun dengan menyambung string:
```
"SELECT * FROM users WHERE user='" + input + "'"
```
Input `admin' OR '1'='1` membuat `WHERE user='admin' OR '1'='1'` → selalu benar → login bypass / dump data.
**Cegah:** **prepared statements / parameterized queries** (pisahkan kode SQL dari data), input validation, least privilege DB.

### 📖 XSS — Cross-Site Scripting (A03)

Penyerang menyuntik JavaScript yang jalan di browser korban.
- **Stored** — tersimpan di server (mis. komentar), kena semua pengunjung.
- **Reflected** — dari URL/parameter, kena yang klik link jahat.
- **DOM-based** — dari manipulasi DOM di sisi client.
Dampak: curi cookie/session, keylogging, deface.
**Cegah:** **output encoding/escaping**, validasi input, **Content Security Policy (CSP)**, atribut cookie `HttpOnly`.

### 📖 CSRF — Cross-Site Request Forgery

Memaksa browser korban (yang sudah login) mengirim request tak diinginkan (mis. transfer uang) via link/form tersembunyi.
**Cegah:** **anti-CSRF token**, atribut cookie `SameSite`, cek `Origin`/`Referer`.

---

## Bagian 4 — Pertahanan aplikasi (defense)

### 📖 Penjelasan

- **Input validation** (allowlist > denylist) + **output encoding**.
- **Parameterized queries** untuk semua akses DB.
- **Autentikasi & sesi aman**: MFA, session timeout, cookie `HttpOnly`+`Secure`+`SameSite`.
- **HTTPS everywhere** + security headers: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`.
- **WAF** (Web Application Firewall) — lapisan filter L7 (ingat Modul 02) untuk blok pola serangan umum. *Lapisan, bukan pengganti kode aman.*
- **Rate limiting** melawan brute force & abuse (ingat card testing di Case 05).
- **Secure SDLC** — temukan ini dengan SAST/DAST di pipeline (Modul 10).
- **Logging & monitoring** (A09) — pastikan serangan tercatat & memicu alert di SIEM.

### 🛡️ Kaitan ke ALTO

API payment adalah target bernilai tinggi. OWASP juga punya **API Security Top 10** (mis. Broken Object Level Authorization/BOLA — versi API dari IDOR). Di fintech, bug seperti IDOR bisa berarti akses ke transaksi/akun nasabah lain — kritikal.

---

## 🧠 Cek pemahaman (tes Feynman)

1. Kenapa "jangan percaya input user" adalah akar keamanan aplikasi?
2. Jelaskan SQL Injection dengan contoh, lalu jelaskan kenapa prepared statement mencegahnya.
3. Beda stored, reflected, dan DOM XSS. Apa dampak XSS bagi korban?
4. Apa itu IDOR/Broken Access Control? Kenapa sangat berbahaya di aplikasi payment?
5. Sebut 6 dari OWASP Top 10 dari ingatan + satu kalimat tiap satu.
6. Beda WAF dan "menulis kode aman" — kenapa WAF bukan pengganti?
7. Kenapa A09 (logging & monitoring failures) menghubungkan AppSec dengan dunia SOC?

---

## 🧪 Praktik

1. Install **OWASP Juice Shop** atau **DVWA** di VM (keduanya aplikasi sengaja rentan). Jangan pernah serang aplikasi orang lain.
2. Latih SQLi & XSS di DVWA level low→high, rasakan bagaimana pertahanan menutup celah.
3. Jalankan **OWASP ZAP** terhadap Juice Shop, baca temuan & petakan ke Top 10.
4. Baca OWASP Top 10 resmi di [owasp.org/Top10](https://owasp.org/www-project-top-ten/) — satu halaman per kategori.
5. Ambil satu kategori, tulis: contoh serangan + satu cara deteksi di log (hubungkan ke Modul 03).

---

## ➡️ Lanjut

Semua ini butuh otomasi. Pelajari bahasa yang mengikat semuanya: **[Modul 14 — Scripting & Automation](14-scripting-automation.md)**.

---

## 📝 Kuis modul (skoring otomatis)

Sudah paham? Uji dengan **kuis pilihan ganda** dan dapatkan skornya. Lulus **≥ 80%** untuk menandai modul ini selesai.

- **Lokal:** buka `quiz/index.html`, pilih modul ini.
- **Online (setelah GitHub Pages aktif):** https://sanishiho23.github.io/L2-SOC/quiz/?m=13

Panduan & cara menambah soal: [quiz/README.md](../quiz/README.md).
