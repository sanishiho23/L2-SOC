window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["03"] = {
  title: "Logs & Log Analysis",
  pass: 80,
  questions: [
    { q: "Windows Event ID 4625 menandakan?",
      options: ["Logon berhasil", "Logon gagal", "Akun user dibuat", "Log dibersihkan"],
      answer: 1,
      explain: "4625 = logon gagal. 4624 = sukses, 4720 = akun dibuat, 1102 = log dihapus." },
    { q: "Event ID 1102 ('audit log cleared') harus dianggap serius karena?",
      options: [
        "Itu rutinitas backup biasa",
        "Menandakan kemungkinan penyerang menghapus jejak (defense evasion)",
        "Berarti disk penuh",
        "Hanya terjadi saat update Windows"
      ], answer: 1,
      explain: "Penghapusan log adalah teknik anti-forensik untuk menutupi jejak — alert tinggi." },
    { q: "Deretan banyak 4625 dari satu IP, lalu satu 4624, lalu 4672 paling mungkin menandakan?",
      options: [
        "User lupa password lalu berhasil login normal",
        "Brute force yang berhasil diikuti akses dengan hak admin",
        "Update sistem terjadwal",
        "Kesalahan konfigurasi DNS"
      ], answer: 1,
      explain: "Banyak gagal → satu sukses → hak istimewa = brute force berhasil lalu eskalasi." },
    { q: "Pada event 4624/4625, Logon Type 3 berarti?",
      options: ["Login interaktif di depan mesin", "Login via jaringan (mis. akses share/SMB)", "Login RDP", "Login sebagai service"],
      answer: 1,
      explain: "Type 3 = network logon (sering muncul pada lateral movement via share). Type 2 interaktif, Type 10 RDP." },
    { q: "Di server Linux Ubuntu, log autentikasi SSH & sudo umumnya ada di?",
      options: ["/var/log/auth.log", "/etc/passwd", "/var/log/httpd", "~/.ssh/known_hosts"],
      answer: 0,
      explain: "auth.log (Debian/Ubuntu) atau secure (RHEL) menyimpan event autentikasi." },
    { q: "Di web access log kamu melihat: GET /item?id=1' OR '1'='1 . Ini pola serangan?",
      options: ["Cross-Site Scripting (XSS)", "SQL Injection", "Path Traversal", "Command Injection"],
      answer: 1,
      explain: "' OR '1'='1 adalah payload khas SQL Injection untuk memanipulasi query." },
    { q: "User-agent 'sqlmap' atau 'nikto' di web log mengindikasikan?",
      options: [
        "Browser biasa pengunjung",
        "Penggunaan tool scanning/otomatis oleh penyerang",
        "Crawler Google",
        "Permintaan dari CDN"
      ], answer: 1,
      explain: "sqlmap, nikto, nmap adalah tool otomatis — kehadirannya di log menandakan pemindaian." },
    { q: "Kenapa zona waktu (UTC vs lokal) krusial dalam analisis log?",
      options: [
        "Agar log terlihat rapi",
        "Salah menafsirkan zona waktu bisa merusak urutan timeline dan kesimpulan investigasi",
        "Karena log hanya valid di UTC",
        "Tidak penting selama ada timestamp"
      ], answer: 1,
      explain: "Korelasi antar-sumber bergantung waktu; beda zona bikin timeline keliru. Selalu tegaskan zona/UTC." },
    { q: "Dua query DNS yang bikin curiga adanya malware adalah?",
      options: [
        "Query ke google.com dan youtube.com",
        "Subdomain acak/panjang (DGA) dan query TXT berukuran besar (kemungkinan DNS tunneling)",
        "Query tipe A ke domain populer",
        "Query berulang ke server DNS internal"
      ], answer: 1,
      explain: "Nama domain acak (DGA) dan TXT panjang menandakan C2/DNS tunneling." },
    { q: "Inti keahlian L2 saat menghadapi banyak baris log dari berbagai sumber adalah?",
      options: [
        "Menghapus log yang tidak relevan",
        "Menyusunnya menjadi satu timeline/cerita yang berurutan",
        "Menyalin semua log ke email",
        "Menunggu L1 menyelesaikannya"
      ], answer: 1,
      explain: "Membangun timeline (kronologi) dari banyak sumber adalah skill inti investigasi L2." }
  ]
};
