# Modul 11 — Cryptography & PKI

> JD ALTO: "enkripsi data at rest, in transit, in use", "kelola kunci & sertifikat", "digital certificates", "encryption algorithms". Di dunia payment, kripto adalah napas — data kartu wajib terenkripsi. Modul ini dari dasar.

---

## Bagian 1 — Tiga hal yang sering tertukar: encoding, hashing, encryption

### 🎯 Analogi

- **Encoding** = menerjemahkan ke bahasa lain yang umum (Indonesia → Inggris). Siapa pun bisa balik. **Bukan keamanan.** Contoh: Base64, URL encoding.
- **Hashing** = menggilas buah jadi jus. Satu arah — tidak bisa balik jadi buah utuh. Buah sama → jus sama. Untuk **cek integritas** & simpan password.
- **Encryption** = mengunci di brankas. Bisa dibuka **kalau punya kunci**. Untuk **kerahasiaan**.

### 📖 Penjelasan

| | Encoding | Hashing | Encryption |
| --- | --- | --- | --- |
| Tujuan | Representasi data | Integritas, verifikasi | Kerahasiaan |
| Bisa dibalik? | Ya (tanpa kunci) | **Tidak** | Ya (dengan kunci) |
| Pakai kunci? | Tidak | Tidak (kadang + salt) | Ya |
| Contoh | Base64, hex | SHA-256, bcrypt | AES, RSA |

> Jebakan interview: "Base64 itu enkripsi?" → **Bukan.** Base64 hanya encoding, siapa pun bisa decode. Jangan pernah pakai untuk melindungi rahasia.

---

## Bagian 2 — Hashing lebih dalam

### 📖 Penjelasan

**Hash** = fungsi satu arah: input apa pun → output ukuran tetap (digest). Sifat: deterministik, sulit dibalik, perubahan kecil input → output beda total (avalanche), sulit cari dua input dengan hash sama (collision resistance).

- **Algoritma:** MD5 & SHA-1 = **usang/rusak** (collision ditemukan) — jangan untuk keamanan. Pakai **SHA-256** (keluarga SHA-2) atau SHA-3.
- **Untuk password:** jangan SHA biasa! Pakai fungsi lambat + salt: **bcrypt, scrypt, Argon2**. Kenapa lambat? Agar brute force mahal.
  - **Salt** = nilai acak unik per user ditambahkan sebelum hash → mencegah **rainbow table** & menyamarkan password identik.
  - **Pepper** = rahasia tambahan disimpan terpisah.
- **Kegunaan SOC/engineering:** verifikasi integritas file (bandingkan SHA-256), IOC (hash malware), simpan password aman, tanda tangan digital.

---

## Bagian 3 — Enkripsi: simetris vs asimetris

### 🎯 Analogi

- **Simetris** = satu kunci gembok yang sama untuk kunci & buka. Cepat, tapi masalahnya: bagaimana kirim kunci ke lawan bicara dengan aman?
- **Asimetris** = gembok ajaib dengan **dua kunci**: kunci **publik** (dibagi bebas, untuk mengunci) dan kunci **privat** (rahasia, untuk membuka). Orang bisa mengunci pesan untukmu pakai kunci publikmu, tapi hanya kamu yang bisa buka.

### 📖 Penjelasan

| | Simetris | Asimetris |
| --- | --- | --- |
| Kunci | Satu (sama) | Sepasang (publik + privat) |
| Kecepatan | Cepat | Lambat |
| Masalah | Distribusi kunci | — |
| Algoritma | **AES**, ChaCha20, (DES/3DES usang) | **RSA**, **ECC**, Diffie-Hellman |
| Dipakai untuk | Enkripsi data besar | Tukar kunci, tanda tangan, sertifikat |

> **Kombinasi (yang dipakai TLS/HTTPS):** asimetris dipakai di awal untuk **menukar kunci simetris dengan aman**, lalu data dikirim dengan simetris (cepat). Jadi dapat keamanan tukar kunci + kecepatan.

**AES** — standar enkripsi simetris de facto. Mode penting: **AES-GCM** (memberi enkripsi + integritas/authentication sekaligus = AEAD). Panjang kunci 128/256-bit.

---

## Bagian 4 — Data at rest, in transit, in use

### 📖 Penjelasan (JD menyebut ketiganya)

| Keadaan data | Artinya | Cara lindungi |
| --- | --- | --- |
| **At rest** | Tersimpan (disk, DB, backup) | Disk/DB encryption (AES), TDE, BitLocker/LUKS |
| **In transit** | Sedang dikirim di jaringan | **TLS/HTTPS**, VPN, SSH |
| **In use** | Sedang diproses di memori | Confidential computing, enclaves (TEE), tokenization |

Di payment: nomor kartu (PAN) dienkripsi at rest, dikirim via TLS in transit, dan sering **di-tokenisasi** (diganti token tak bermakna) agar sistem jarang menyentuh PAN asli. PCI DSS mewajibkan proteksi ini.

---

## Bagian 5 — TLS, sertifikat digital & PKI

### 🎯 Analogi

**Sertifikat digital = KTP yang dicap notaris tepercaya.** Saat kamu buka `https://bank.com`, server menunjukkan "KTP"-nya. Browser percaya karena dicap oleh **otoritas tepercaya (CA)**. Kamu jadi yakin sedang bicara dengan bank asli, bukan penipu.

### 📖 Penjelasan

- **PKI (Public Key Infrastructure)** = sistem menerbitkan, mengelola, mencabut sertifikat digital. Komponen: **CA (Certificate Authority)** penerbit, **RA** pendaftar, **sertifikat**, **CRL/OCSP** (daftar cabut).
- **Sertifikat X.509** berisi: identitas (domain), **kunci publik**, penerbit (CA), masa berlaku, tanda tangan CA. 
- **Chain of trust:** sertifikat server ← ditandatangani CA perantara ← ditandatangani Root CA (yang sudah dipercaya di OS/browser).
- **Handshake TLS (disederhanakan):**
  1. Client "halo", server kirim **sertifikat** (berisi kunci publik).
  2. Client verifikasi sertifikat (dicap CA valid? belum kedaluwarsa? domain cocok? belum dicabut?).
  3. Keduanya sepakati **kunci sesi simetris** (via asimetris/Diffie-Hellman).
  4. Komunikasi lanjut terenkripsi simetris.

**Tanda tangan digital** (digital signature): penandatangan meng-hash pesan lalu mengenkripsi hash dengan **kunci privat**-nya. Siapa pun bisa verifikasi dengan **kunci publik**-nya → membuktikan **keaslian + integritas + non-repudiation** (tak bisa menyangkal). Ini dasar DKIM email, signed code, sertifikat.

### 🔑 Key & certificate management (ditekankan JD)

- Kunci privat & sertifikat harus disimpan **sangat aman** (HSM = Hardware Security Module, vault). Bocornya kunci privat = bencana.
- Kelola **siklus hidup**: terbitkan → rotasi berkala → cabut bila bocor → perbarui sebelum kedaluwarsa (sertifikat expired = outage, sering jadi insiden nyata!).
- **HSM** wajib di payment — menyimpan & memproses kunci kripto (termasuk PIN kartu) dalam hardware tahan-sadap. Standar terkait: PCI PIN, PCI HSM.

---

## 🧠 Cek pemahaman (tes Feynman)

1. Beda encoding, hashing, encryption — pakai analogi sendiri. Kenapa Base64 bukan keamanan?
2. Kenapa password disimpan dengan bcrypt/Argon2 + salt, bukan SHA-256 biasa? Apa fungsi salt?
3. Beda enkripsi simetris & asimetris. Kenapa TLS pakai keduanya?
4. Jelaskan proteksi data at rest vs in transit vs in use — beri contoh di payment.
5. Apa isi sebuah sertifikat digital, dan bagaimana browser memutuskan mempercayainya (chain of trust)?
6. Bagaimana tanda tangan digital membuktikan keaslian & integritas? Apa peran kunci privat vs publik?
7. Kenapa manajemen kunci (HSM, rotasi, pencabutan) sepenting algoritmanya?

---

## 🧪 Praktik

1. Hash sebuah string dengan berbagai algoritma: `echo -n "test" | sha256sum` (Linux) / `Get-FileHash` (Windows). Ubah 1 huruf, lihat hash berubah total (avalanche).
2. Buat pasangan kunci RSA & sertifikat self-signed dengan **OpenSSL**:
   ```bash
   openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes
   openssl x509 -in cert.pem -text -noout     # baca isi sertifikat
   ```
3. Periksa sertifikat sebuah situs: di browser klik gembok → lihat issuer, validity, chain. Atau `openssl s_client -connect google.com:443`.
4. Enkripsi & dekripsi file dengan AES via OpenSSL, rasakan kunci simetris.
5. Baca satu insiden "certificate expired outage" nyata, pahami kenapa manajemen sertifikat penting.

---

## ➡️ Lanjut

Kripto melindungi data & identitas. Sekarang pelajari cara mengelola *siapa boleh akses apa*: **[Modul 12 — IAM](12-iam.md)**.

---

## 📝 Kuis modul (skoring otomatis)

Sudah paham? Uji dengan **kuis pilihan ganda** dan dapatkan skornya. Lulus **≥ 80%** untuk menandai modul ini selesai.

- **Lokal:** buka `quiz/index.html`, pilih modul ini.
- **Online (setelah GitHub Pages aktif):** https://sanishiho23.github.io/L2-SOC/quiz/?m=11

Panduan & cara menambah soal: [quiz/README.md](../quiz/README.md).
