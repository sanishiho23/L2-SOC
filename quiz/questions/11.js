window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["11"] = {
  title: "Cryptography & PKI",
  pass: 80,
  questions: [
    { q: "Base64 termasuk?",
      options: [
        "Enkripsi kuat",
        "Encoding — bisa dibalik siapa saja, BUKAN keamanan",
        "Hashing satu arah",
        "Tanda tangan digital"
      ], answer: 1,
      explain: "Base64 hanya encoding (representasi), bisa di-decode siapa pun. Jangan dipakai melindungi rahasia." },
    { q: "Perbedaan utama hashing dan encryption?",
      options: [
        "Hashing dua arah, encryption satu arah",
        "Hashing satu arah (tak bisa dibalik, untuk integritas/password); encryption dua arah dengan kunci (untuk kerahasiaan)",
        "Keduanya sama",
        "Hashing butuh kunci publik"
      ], answer: 1,
      explain: "Hash = satu arah (integritas). Encryption = dua arah dengan kunci (kerahasiaan)." },
    { q: "Kenapa password sebaiknya disimpan dengan bcrypt/Argon2 + salt, bukan SHA-256 biasa?",
      options: [
        "Karena SHA-256 ilegal",
        "Karena bcrypt/Argon2 sengaja lambat (mempersulit brute force) dan salt mencegah rainbow table",
        "Karena SHA-256 tidak aman untuk apa pun",
        "Karena salt mempercepat hashing"
      ], answer: 1,
      explain: "Fungsi password lambat + salt unik per user membuat cracking mahal dan mencegah rainbow table." },
    { q: "Enkripsi SIMETRIS (mis. AES) memiliki ciri?",
      options: [
        "Memakai sepasang kunci publik & privat",
        "Memakai satu kunci yang sama untuk enkripsi & dekripsi; cepat, tapi ada tantangan distribusi kunci",
        "Tidak memakai kunci",
        "Hanya untuk tanda tangan"
      ], answer: 1,
      explain: "Simetris = satu kunci sama (AES), cepat; tantangannya mendistribusikan kunci dengan aman." },
    { q: "Kenapa TLS/HTTPS memakai enkripsi asimetris DAN simetris?",
      options: [
        "Untuk membingungkan penyerang",
        "Asimetris untuk menukar kunci simetris dengan aman di awal, lalu simetris untuk data (cepat)",
        "Karena simetris tidak aman",
        "Karena asimetris lebih cepat untuk data besar"
      ], answer: 1,
      explain: "Asimetris menyelesaikan masalah tukar kunci; simetris menangani data besar dengan cepat." },
    { q: "'Data in transit' paling tepat dilindungi dengan?",
      options: ["TLS/HTTPS atau VPN", "BitLocker disk encryption", "Tokenisasi di database", "Menghapus data"],
      answer: 0,
      explain: "In transit = sedang dikirim → TLS/VPN. At rest → disk/DB encryption. In use → enclave/tokenisasi." },
    { q: "Sebuah sertifikat digital (X.509) berisi, antara lain?",
      options: [
        "Password server",
        "Identitas (domain), kunci publik, penerbit (CA), masa berlaku, dan tanda tangan CA",
        "Kunci privat server",
        "Daftar seluruh user"
      ], answer: 1,
      explain: "Sertifikat memuat identitas + kunci publik + info CA + validitas + tanda tangan CA (bukan kunci privat)." },
    { q: "Browser mempercayai sertifikat sebuah situs berdasarkan?",
      options: [
        "Warna gembok",
        "Chain of trust — sertifikat ditandatangani CA yang rantainya sampai ke Root CA tepercaya",
        "Nama domain yang bagus",
        "Kecepatan situs"
      ], answer: 1,
      explain: "Kepercayaan berasal dari rantai tanda tangan hingga Root CA yang sudah dipercaya OS/browser." },
    { q: "Tanda tangan digital membuktikan keaslian & integritas dengan cara?",
      options: [
        "Mengenkripsi seluruh file dengan kunci publik",
        "Meng-hash pesan lalu mengenkripsi hash dengan kunci PRIVAT penandatangan; diverifikasi dengan kunci publiknya",
        "Menyembunyikan pesan",
        "Mengompres pesan"
      ], answer: 1,
      explain: "Hash dienkripsi dengan kunci privat → siapa pun verifikasi dengan kunci publik = keaslian + integritas + non-repudiation." },
    { q: "Di lingkungan payment, HSM (Hardware Security Module) dipakai untuk?",
      options: [
        "Menyimpan file biasa",
        "Menyimpan & memproses kunci kriptografi (termasuk PIN) secara aman dalam hardware tahan-sadap",
        "Menjalankan antivirus",
        "Mempercepat jaringan"
      ], answer: 1,
      explain: "HSM melindungi kunci & operasi kripto dalam hardware khusus — wajib di payment (PCI PIN/HSM)." }
  ]
};
