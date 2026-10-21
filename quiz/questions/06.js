window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["06"] = {
  title: "Phishing Analysis",
  pass: 80,
  questions: [
    { q: "Dalam email header, field mana yang paling SERING berbeda dari 'From' pada email phishing dan menjadi red flag?",
      options: ["Subject", "Reply-To / Return-Path", "Date", "MIME-Version"],
      answer: 1,
      explain: "Reply-To/Return-Path yang berbeda dari From mengarahkan balasan/bounce ke penyerang — sinyal kuat." },
    { q: "SPF (Sender Policy Framework) memverifikasi?",
      options: [
        "Isi email tidak diubah",
        "Apakah IP pengirim termasuk yang diizinkan domain (via DNS)",
        "Apakah lampiran aman",
        "Kecepatan pengiriman email"
      ], answer: 1,
      explain: "SPF memeriksa apakah server pengirim diizinkan mengirim atas nama domain. DKIM menjamin integritas." },
    { q: "Mengapa 'SPF/DKIM pass' TIDAK otomatis berarti email aman?",
      options: [
        "Karena SPF selalu salah",
        "Penyerang bisa mengirim dari domain mereka sendiri yang SPF-nya valid — pass hanya berarti 'benar dari domain itu', bukan 'domain tepercaya'",
        "Karena DKIM mengalahkan SPF",
        "Karena pass berarti email pasti dari bank"
      ], answer: 1,
      explain: "Autentikasi memastikan asal domain, bukan niat baik. Domain penyerang pun bisa lulus SPF/DKIM." },
    { q: "Field 'Received' di header dibaca untuk menemukan IP asal pengirim dengan cara?",
      options: [
        "Dibaca dari atas ke bawah",
        "Dibaca dari bawah ke atas (server paling bawah = asal pertama)",
        "Hanya baris pertama yang penting",
        "Tidak bisa dipakai menemukan IP"
      ], answer: 1,
      explain: "Received ditumpuk; baris paling bawah adalah hop paling awal (asal), paling atas = mailbox-mu." },
    { q: "Domain 'paypaI-support.com' (huruf i besar menyerupai L) adalah contoh teknik?",
      options: ["Pharming", "Typosquatting / lookalike domain", "Session hijacking", "SQL injection"],
      answer: 1,
      explain: "Memakai karakter mirip untuk meniru domain asli = typosquatting/lookalike (homoglyph)." },
    { q: "Cara AMAN menganalisis URL mencurigakan dari email phishing adalah?",
      options: [
        "Klik langsung di browser kerja untuk melihat isinya",
        "Periksa di URLScan.io/VirusTotal atau sandbox terisolasi tanpa mengkliknya di mesin produksi",
        "Teruskan ke semua rekan kerja",
        "Buka di ponsel pribadi"
      ], answer: 1,
      explain: "Jangan pernah klik di mesin kerja; gunakan sandbox/layanan analisis URL." },
    { q: "User melapor SUDAH klik link DAN memasukkan password. Tindakan prioritas pertama yang tepat?",
      options: [
        "Menghapus email lalu lupakan",
        "Segera reset password & cabut sesi akun yang terdampak, pastikan MFA",
        "Menunggu sampai besok",
        "Memformat laptop user"
      ], answer: 1,
      explain: "Kredensial bocor = prioritaskan reset password, cabut sesi, pastikan MFA — sebelum penyerang memakainya." },
    { q: "'Scoping' dalam investigasi phishing berarti?",
      options: [
        "Mengukur ukuran lampiran",
        "Mencari siapa lagi yang menerima/mengklik email serupa di organisasi",
        "Memindai port server email",
        "Menghitung jumlah kata di email"
      ], answer: 1,
      explain: "Scoping = menentukan luas dampak: penerima lain, yang mengklik, agar containment menyeluruh." },
    { q: "Lampiran dengan ekstensi mana yang patut paling diwaspadai sebagai pembawa malware?",
      options: [".txt dan .jpg", ".docm, .iso, .zip berisi .exe, .html phishing", ".pdf yang sudah dipindai aman", ".png"],
      answer: 1,
      explain: ".docm (macro), .iso, arsip berisi executable, dan .html phishing adalah pembawa umum malware." },
    { q: "Setelah URL/domain jahat diketahui, mencari siapa yang mengaksesnya di SIEM bisa lewat?",
      options: [
        "Log proxy/DNS (mis. url.domain atau dns.question.name)",
        "File /etc/passwd",
        "Registry Windows saja",
        "Tidak mungkin dicari di SIEM"
      ], answer: 0,
      explain: "Query proxy/DNS log di SIEM untuk domain jahat mengungkap host/user yang mengaksesnya." }
  ]
};
