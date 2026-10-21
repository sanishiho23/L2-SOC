# Modul 06 — Phishing Analysis

> Phishing adalah cara masuk #1 penyerang (Initial Access, T1566). Kamu sudah melakukan phishing *test* di Nanovest — di sini kamu belajar sisi **investigasi**: membedah email jahat yang dilaporkan user, aman dan sistematis.

---

## Bagian 1 — Anatomi sebuah email

### 🎯 Analogi

Email seperti **surat pos**: ada **amplop** (envelope — info pengiriman), ada **kop surat** (header — metadata), dan ada **isi surat** (body). Penipu bisa menulis nama pengirim palsu di kop surat, tapi jejak di amplop & cap pos (header teknis) lebih sulit dipalsukan. Kita periksa yang sulit dipalsukan.

### 📖 Penjelasan: Email header

Header adalah rekaman perjalanan email. Field penting:

| Field | Arti | Yang dicek |
| --- | --- | --- |
| **From** | Pengirim yang *ditampilkan* | Mudah dipalsukan (display name spoofing) |
| **Return-Path** | Ke mana bounce dikirim (envelope sender) | Sering beda dari From → red flag |
| **Reply-To** | Ke mana balasan pergi | Beda dari From → curiga (balasan ke penyerang) |
| **Received** | Jejak server yang dilewati (dibaca dari BAWAH ke ATAS) | IP asal sebenarnya, negara, hop aneh |
| **Message-ID** | ID unik email | Domain-nya cocok dengan pengirim? |
| **Authentication-Results** | Hasil SPF/DKIM/DMARC | pass/fail — kunci utama |

> **Cara baca Received:** server paling bawah = asal (pengirim pertama), paling atas = terakhir (mailbox-mu). Telusuri dari bawah untuk tahu IP & domain asli pengirim.

---

## Bagian 2 — SPF, DKIM, DMARC (trio autentikasi email)

### 🎯 Analogi

Bayangkan verifikasi surat resmi:
- **SPF** = daftar kantor pos resmi yang boleh mengirim atas nama perusahaan. "Apakah surat ini dikirim dari kantor pos yang terdaftar?"
- **DKIM** = segel lilin bertanda tangan. "Apakah segelnya utuh & tanda tangannya cocok?" (bukti isi tak diubah + benar dari domain itu).
- **DMARC** = kebijakan: "Kalau SPF/DKIM gagal, APAKAH surat ini ditolak, dikarantina, atau dibiarkan?"

### 📖 Penjelasan

| Mekanisme | Memeriksa | Hasil |
| --- | --- | --- |
| **SPF** (Sender Policy Framework) | Apakah IP pengirim termasuk yang diizinkan domain (via DNS TXT record)? | pass / fail / softfail |
| **DKIM** (DomainKeys Identified Mail) | Tanda tangan kriptografis — isi email tidak diubah & benar dari domain | pass / fail |
| **DMARC** | Keselarasan (alignment) From dengan SPF/DKIM + kebijakan (none/quarantine/reject) | pass / fail + aksi |

Di header kamu akan lihat baris seperti:
```
Authentication-Results: mx.google.com;
  spf=fail (sender IP is 203.0.113.9) smtp.mailfrom=paypaI-support.com;
  dkim=none;
  dmarc=fail (p=reject)
```
Baca: SPF **gagal**, DKIM **tidak ada**, DMARC **gagal** dengan kebijakan reject. Ini sangat kuat mengindikasikan spoofing/phishing. Perhatikan juga domain `paypaI-support.com` — huruf **I besar** menyamar jadi **l** (typosquatting).

> ⚠️ **Hati-hati:** SPF/DKIM **pass** TIDAK menjamin email aman. Penyerang bisa kirim dari domain mereka sendiri yang SPF-nya valid. Pass hanya berarti "benar dari domain yang tertera", bukan "domain itu tepercaya".

---

## Bagian 3 — Tanda-tanda phishing (red flags)

### 📖 Penjelasan

**Pada pengirim & teknis:**
- Return-Path / Reply-To beda dari From.
- Domain mirip tapi salah (`micros0ft.com`, `paypaI.com`, `bca-secure.net`).
- SPF/DKIM/DMARC fail.
- IP asal dari negara/hosting mencurigakan.

**Pada isi:**
- **Urgensi & ancaman**: "Akun Anda akan ditutup dalam 24 jam!"
- **Iming-iming**: "Selamat, Anda menang!"
- Minta kredensial / data sensitif / OTP.
- Salam generik ("Dear Customer"), typo, tata bahasa aneh.
- Link yang teks-nya beda dari tujuan aslinya (hover untuk cek).
- Lampiran tak terduga (`.html`, `.zip`, `.iso`, `.docm`, `.exe`).

**Pada URL:**
- Domain tidak cocok brand.
- Pakai URL shortener, atau IP mentah.
- Subdomain menipu: `bca.com.login-verify.xyz` (domain asli = `login-verify.xyz`).
- Karakter homoglyph (huruf Cyrillic yang mirip Latin).

---

## Bagian 4 — Workflow investigasi phishing (L2)

> **ATURAN KESELAMATAN #1:** jangan pernah klik link atau buka lampiran mencurigakan di mesin kerja. Gunakan **sandbox** / VM terisolasi / layanan online. Perlakukan semua artefak sebagai berbahaya.

### 📖 Langkah demi langkah

1. **Terima & amankan sampel.** Minta user forward **sebagai attachment (.eml/.msg)** supaya header utuh, bukan di-forward biasa. Jangan hapus dulu.
2. **Analisis header.** Cek From vs Return-Path vs Reply-To; baca Received dari bawah (IP asal); periksa Authentication-Results (SPF/DKIM/DMARC). Tools: MXToolbox header analyzer, Google Message Header, atau parse manual.
3. **Analisis URL — aman.** Jangan klik. Ekstrak URL, cek di **URLScan.io**, **VirusTotal**, **urlhaus**. Lihat tujuan redirect & apakah halaman meniru login brand.
4. **Analisis lampiran — aman.** Hitung **hash** (SHA-256), cek di **VirusTotal**. Detonasi di **sandbox** (Any.Run, Hybrid Analysis, Cuckoo) untuk lihat perilaku (proses, koneksi).
5. **Tentukan dampak.** Apakah user sudah **klik**? Sudah **masukkan kredensial**? Sudah **buka lampiran**? Ini mengubah tingkat urusan drastis.
6. **Scoping.** Cari di mail gateway/SIEM: **siapa lagi** yang menerima email serupa (subject, sender, URL)? Berapa yang klik?
7. **Containment.** Karantina/hapus email dari semua mailbox; blok sender/domain/URL/IP di email gateway, proxy, firewall; kalau kredensial bocor → reset password, cabut sesi, pastikan MFA.
8. **Enrichment & IOC.** Catat semua IOC (sender, domain, URL, hash, IP). Tambahkan ke blocklist & feed intel (Modul 09).
9. **Dokumentasi & edukasi.** Tulis laporan di ticket/case; beri tahu user & tim; kalau skala besar → eskalasi.

### 🔎 Mencari jejak klik di SIEM (Elastic)

Setelah tahu URL/domain jahat, cari siapa yang mengaksesnya di proxy/DNS log:
```kql
url.domain : "paypaI-support.com" or dns.question.name : "paypaI-support.com"
```
Dan cek kredensial: ada login sukses dari IP asing setelah waktu phishing?
```kql
event.outcome : "success" and user.name : "korban" and not source.ip : "10.0.0.*"
```

### 🛡️ Hubungan ke phishing *test* yang kamu lakukan di Nanovest

Phishing test (simulasi) = sisi ofensif/awareness: kamu kirim email tiruan, ukur siapa yang klik, lalu latih mereka. Investigasi phishing = sisi defensif: kamu bedah email jahat *nyata*. Keduanya saling melengkapi — pengalaman menyusun email test membuatmu lebih jeli mengenali trik di email asli.

---

## 🧠 Cek pemahaman (tes Feynman)

1. Jelaskan beda From, Return-Path, dan Reply-To. Kombinasi apa yang bikin curiga?
2. Terangkan SPF, DKIM, DMARC pakai analogi sendiri. Kenapa "SPF pass" tidak berarti aman?
3. Cara membaca field Received untuk menemukan IP asal — dari atas atau bawah?
4. Sebut 5 red flag phishing: 2 teknis, 3 dari isi.
5. User lapor sudah klik link DAN memasukkan password. Urutkan 5 tindakan pertamamu.
6. Kenapa lampiran harus dianalisis di sandbox, bukan dibuka langsung?

---

## 🧪 Praktik

1. Ambil sampel phishing dari **PhishTank** atau folder spam-mu (ekspor .eml). Analisis header-nya di MXToolbox. Temukan IP asal & hasil SPF/DKIM/DMARC.
2. Ambil URL mencurigakan (dari sampel), scan di **URLScan.io** dan **VirusTotal**. Jangan buka di browser biasa.
3. Hitung SHA-256 sebuah file (`Get-FileHash` di Windows / `sha256sum` di Linux), cek di VirusTotal.
4. Kerjakan TryHackMe room **"Phishing Analysis Fundamentals"** / **"Phishing Emails"** series, atau LetsDefend "Phishing Email" alerts.
5. Tulis laporan investigasi 1 halaman untuk satu sampel: ringkasan, IOC, dampak, tindakan.

---

## ➡️ Lanjut

Kamu bisa investigasi satu vektor. Sekarang pelajari kerangka menangani *insiden apa pun*: **[Modul 07 — Incident Response](07-incident-response.md)**.

---

## 📝 Kuis modul (skoring otomatis)

Sudah paham? Uji dengan **kuis pilihan ganda** dan dapatkan skornya. Lulus **≥ 80%** untuk menandai modul ini selesai.

- **Lokal:** buka `quiz/index.html`, pilih modul ini.
- **Online (setelah GitHub Pages aktif):** https://sanishiho23.github.io/L2-SOC/quiz/?m=06

Panduan & cara menambah soal: [quiz/README.md](../quiz/README.md).
