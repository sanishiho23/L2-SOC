window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["13"] = {
  title: "AppSec & OWASP Top 10",
  pass: 80,
  questions: [
    { q: "Prinsip paling mendasar dalam keamanan aplikasi web adalah?",
      options: [
        "Percaya semua input user",
        "Jangan percaya input user — selalu validasi, filter, dan escape",
        "Nonaktifkan HTTPS agar cepat",
        "Simpan password sebagai plaintext"
      ], answer: 1,
      explain: "Hampir semua bug web berakar pada mempercayai input; validasi & encoding adalah kuncinya." },
    { q: "Mengganti ?id=123 menjadi ?id=124 lalu bisa melihat data orang lain adalah contoh?",
      options: [
        "Broken Access Control / IDOR",
        "Cross-Site Scripting",
        "Buffer overflow",
        "Phishing"
      ], answer: 0,
      explain: "IDOR (bagian Broken Access Control / A01) — akses objek milik orang lain tanpa otorisasi." },
    { q: "SQL Injection paling efektif dicegah dengan?",
      options: [
        "Menyembunyikan halaman login",
        "Prepared statements / parameterized queries (memisahkan kode SQL dari data input)",
        "Mengganti nama database",
        "Memakai HTTP bukan HTTPS"
      ], answer: 1,
      explain: "Prepared statements memastikan input diperlakukan sebagai data, bukan bagian perintah SQL." },
    { q: "XSS (Cross-Site Scripting) memungkinkan penyerang?",
      options: [
        "Menghapus database secara fisik",
        "Menjalankan JavaScript jahat di browser korban (mis. mencuri cookie/session)",
        "Mematikan server",
        "Mengganti IP korban"
      ], answer: 1,
      explain: "XSS menyuntik script yang berjalan di browser korban; cegah dengan output encoding + CSP." },
    { q: "CSRF (Cross-Site Request Forgery) dicegah terutama dengan?",
      options: [
        "Anti-CSRF token dan cookie SameSite",
        "Menonaktifkan JavaScript",
        "Memakai password panjang",
        "Mengganti port server"
      ], answer: 0,
      explain: "Anti-CSRF token + SameSite cookie + cek Origin/Referer mencegah request paksa lintas situs." },
    { q: "Log4Shell (CVE-2021-44228) masuk kategori OWASP?",
      options: [
        "Vulnerable & Outdated Components (A06)",
        "Cryptographic Failures (A02)",
        "SSRF (A10)",
        "Security Logging Failures (A09)"
      ], answer: 0,
      explain: "Log4Shell adalah kerentanan pada komponen (library Log4j) — A06 Vulnerable & Outdated Components." },
    { q: "Kenapa WAF bukan pengganti kode yang aman?",
      options: [
        "WAF terlalu mahal",
        "WAF adalah lapisan filter tambahan (L7) yang bisa ditembus; akar masalah tetap di kode",
        "WAF memperlambat semua aplikasi",
        "WAF hanya untuk Linux"
      ], answer: 1,
      explain: "WAF = lapisan pertahanan, bukan solusi akar. Kode aman tetap keharusan." },
    { q: "SSRF (Server-Side Request Forgery) berbahaya karena?",
      options: [
        "Mempercepat server",
        "Server dipaksa mengirim request ke tujuan internal (mis. metadata cloud / scan jaringan dalam)",
        "Menghapus file user",
        "Mengubah warna halaman"
      ], answer: 1,
      explain: "SSRF menyalahgunakan server sebagai perantara untuk menjangkau sumber daya internal." },
    { q: "A09 (Security Logging & Monitoring Failures) menghubungkan AppSec dengan dunia SOC karena?",
      options: [
        "Logging tidak penting",
        "Tanpa logging & monitoring yang baik, serangan tidak tercatat/terdeteksi dan breach bisa lama tak ketahuan",
        "SOC tidak memakai log",
        "Monitoring hanya untuk jaringan"
      ], answer: 1,
      explain: "Kegagalan logging/monitoring membuat serangan tak terlihat — inilah irisan AppSec dan SOC." },
    { q: "Di API payment, 'BOLA' (Broken Object Level Authorization) pada dasarnya adalah?",
      options: [
        "Versi API dari IDOR — akses objek (transaksi/akun) milik pihak lain",
        "Serangan DDoS",
        "Enkripsi yang lemah",
        "Phishing ke developer"
      ], answer: 0,
      explain: "BOLA = IDOR versi API; sangat kritikal di fintech karena bisa mengakses data akun/transaksi nasabah lain." }
  ]
};
