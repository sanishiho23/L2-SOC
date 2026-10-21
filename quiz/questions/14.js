window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["14"] = {
  title: "Scripting & Automation",
  pass: 80,
  questions: [
    { q: "Untuk olah teks/log cepat di server Linux, bahasa yang paling praktis biasanya?",
      options: ["Bash", "Java", "C++", "Assembly"],
      answer: 0,
      explain: "Bash + grep/awk/sort unggul untuk olah teks cepat di Linux. PowerShell untuk Windows, Python untuk logika/API." },
    { q: "Pipeline 'grep \"Failed password\" auth.log | awk '{print $11}' | sort | uniq -c | sort -nr' menghasilkan?",
      options: [
        "Menghapus baris login gagal",
        "Daftar IP sumber login gagal, dihitung dan diurutkan dari terbanyak",
        "Mengenkripsi log",
        "Menghitung total baris file"
      ], answer: 1,
      explain: "Pola 'sort | uniq -c | sort -nr' = hitung lalu urutkan; di sini menampilkan IP penyerang teratas." },
    { q: "Untuk otomasi di Windows & Active Directory (mis. membaca Event Log), bahasa yang tepat?",
      options: ["PowerShell", "Bash", "PHP", "Ruby"],
      answer: 0,
      explain: "PowerShell adalah bahasa otomasi native Windows/AD (mis. Get-WinEvent)." },
    { q: "Kenapa PowerShell penting dikuasai dari DUA sisi bagi analyst?",
      options: [
        "Karena hanya untuk hiasan",
        "Karena ia alat otomasi Windows DAN sering disalahgunakan penyerang (mis. -enc), jadi harus bisa dibaca & ditulis",
        "Karena menggantikan SIEM",
        "Karena hanya dipakai developer"
      ], answer: 1,
      explain: "PowerShell dipakai untuk otomasi sah sekaligus sering jadi senjata penyerang — analyst harus paham keduanya." },
    { q: "Untuk menulis tool enrichment yang memanggil API (mis. AbuseIPDB/VirusTotal), bahasa yang paling cocok?",
      options: ["Python", "Bash murni", "Batch (.bat)", "SQL"],
      answer: 0,
      explain: "Python unggul untuk logika, parsing, dan integrasi API (library requests, json, dll.)." },
    { q: "Dalam skrip, API key sebaiknya disimpan di?",
      options: [
        "Ditulis langsung di kode (hard-code)",
        "Environment variable / secret manager, bukan hard-code di kode",
        "Komentar kode",
        "Nama file"
      ], answer: 1,
      explain: "Jangan hard-code rahasia; pakai environment variable/vault agar tidak bocor lewat repo." },
    { q: "Ansible umumnya dipakai untuk?",
      options: [
        "Menyerang jaringan",
        "Otomasi konfigurasi & deployment (mis. patch/hardening banyak server) berbasis YAML playbook",
        "Membuat grafik penjualan",
        "Mengedit video"
      ], answer: 1,
      explain: "Ansible mengotomasi konfigurasi/deployment massal secara idempotent lewat playbook YAML." },
    { q: "'Idempotency' pada tool seperti Ansible berarti?",
      options: [
        "Hanya bisa dijalankan sekali",
        "Dijalankan berkali-kali tetap menghasilkan keadaan akhir yang sama (aman diulang)",
        "Selalu mengubah hasil tiap run",
        "Membutuhkan reboot setiap kali"
      ], answer: 1,
      explain: "Idempotent = hasil akhir konsisten walau dijalankan berulang — aman untuk patch/hardening." },
    { q: "SOAR (Security Orchestration, Automation and Response) berguna untuk?",
      options: [
        "Mengganti analyst sepenuhnya",
        "Mengotomasi playbook respon (mis. enrich URL, karantina email, buat tiket) agar respon lebih cepat & konsisten",
        "Menyimpan log mentah",
        "Menggantikan firewall"
      ], answer: 1,
      explain: "SOAR mengorkestrasi & mengotomasi langkah respon berulang sesuai playbook." },
    { q: "Alasan utama scripting disebut 'pengganda kekuatan' bagi analyst?",
      options: [
        "Membuat laporan terlihat keren",
        "Mengotomasi tugas berulang (olah log, enrichment, respon) yang kalau manual lambat & rawan salah",
        "Menggantikan kebutuhan belajar konsep",
        "Hanya untuk pamer"
      ], answer: 1,
      explain: "Skrip menyelesaikan tugas berulang dalam detik, membebaskan analyst untuk analisis yang butuh penilaian." }
  ]
};
