window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["09"] = {
  title: "Threat Intel & IOC",
  pass: 80,
  questions: [
    { q: "Perbedaan IOC dan IOA adalah?",
      options: [
        "IOC = perilaku, IOA = artefak statis",
        "IOC = artefak statis/jejak (hash, IP, domain); IOA = indikator berbasis perilaku/niat",
        "Keduanya sama",
        "IOC hanya untuk Linux"
      ], answer: 1,
      explain: "IOC = jejak statis (hash/IP/domain). IOA = perilaku (mis. Word membuka PowerShell)." },
    { q: "Mana yang lebih tahan lama (tidak mudah usang) sebagai dasar deteksi?",
      options: ["Hash file", "IOA/perilaku (TTP)", "IP address tunggal", "Nama file"],
      answer: 1,
      explain: "Perilaku (IOA/TTP) lebih stabil; IOC statis mudah diganti penyerang (ingat Pyramid of Pain)." },
    { q: "Tool yang tepat untuk mengecek reputasi sebuah IP address adalah?",
      options: ["AbuseIPDB", "Microsoft Word", "Wireshark", "Notepad"],
      answer: 0,
      explain: "AbuseIPDB memberi skor reputasi & laporan abuse sebuah IP. VirusTotal juga mendukung IP." },
    { q: "Kenapa '0 deteksi di VirusTotal' TIDAK otomatis berarti file aman?",
      options: [
        "Karena VirusTotal selalu salah",
        "Malware baru/belum dikenal bisa belum terdeteksi engine mana pun — perlu konteks & sumber lain",
        "Karena 0 berarti berbahaya",
        "Karena VirusTotal hanya untuk URL"
      ], answer: 1,
      explain: "Deteksi 0 bisa berarti sampel terlalu baru; jangan andalkan satu sumber, tambahkan konteks internal." },
    { q: "WHOIS sebuah domain berguna untuk mengetahui?",
      options: [
        "Isi email di domain itu",
        "Kapan domain dibuat (domain yang baru dibuat = sinyal curiga) dan registrar-nya",
        "Password admin domain",
        "Jumlah pengunjung situs"
      ], answer: 1,
      explain: "Umur domain penting: domain baru beberapa hari sering dipakai kampanye phishing/C2." },
    { q: "Threat intelligence tingkat 'tactical' berisi?",
      options: [
        "Tren risiko industri untuk eksekutif",
        "IOC konkret (hash, IP, domain) untuk deteksi & blokir oleh analyst",
        "Kampanye & TTP aktor untuk tim IR",
        "Anggaran keamanan"
      ], answer: 1,
      explain: "Tactical = IOC konkret untuk analyst. Operational = TTP/kampanye. Strategic = tren untuk manajemen." },
    { q: "TLP:RED berarti informasi?",
      options: [
        "Boleh dipublikasikan bebas",
        "Hanya untuk penerima langsung, tidak boleh diteruskan",
        "Boleh dibagi ke seluruh komunitas",
        "Boleh dibagi ke seluruh organisasi"
      ], answer: 1,
      explain: "TLP:RED = paling terbatas (penerima langsung saja). CLEAR = publik, GREEN = komunitas, AMBER = organisasi." },
    { q: "Di lingkungan fintech, kenapa hati-hati meng-upload file sensitif ke sandbox publik?",
      options: [
        "Karena lambat",
        "File yang di-upload bisa bocor/terlihat pihak lain — data sensitif (TLP:AMBER/RED) tidak boleh tersebar",
        "Karena sandbox merusak file",
        "Karena tidak ada manfaatnya"
      ], answer: 1,
      explain: "Upload ke layanan publik bisa menyebarkan data; perhatikan klasifikasi TLP di fintech." },
    { q: "'Enrichment' sebuah IOC artinya?",
      options: [
        "Menghapus IOC dari daftar",
        "Menambahkan konteks (reputasi, relasi, asal) agar bisa dinilai berbahaya atau tidak",
        "Mengenkripsi IOC",
        "Menyalin IOC ke email"
      ], answer: 1,
      explain: "Enrichment = memberi konteks (VirusTotal, AbuseIPDB, WHOIS, data internal) untuk menilai IOC." },
    { q: "MISP umumnya digunakan untuk?",
      options: [
        "Menjalankan antivirus",
        "Platform berbagi threat intelligence/IOC antar organisasi",
        "Mengelola patch",
        "Membuat dashboard penjualan"
      ], answer: 1,
      explain: "MISP = platform berbagi & mengelola IOC/kampanye intel antar tim/organisasi." }
  ]
};
