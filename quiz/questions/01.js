window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["01"] = {
  title: "Foundations",
  pass: 80,
  questions: [
    { q: "Apa peran utama Operating System (OS)?",
      options: [
        "Menyimpan data secara permanen di cloud",
        "Menjembatani aplikasi dengan hardware serta mengatur proses, memori, file, dan izin user",
        "Mengenkripsi semua lalu lintas jaringan secara otomatis",
        "Menggantikan kebutuhan akan CPU dan RAM"
      ], answer: 1,
      explain: "OS mengatur proses, memori, file, dan user/izin — menjadi perantara antara aplikasi dan hardware." },
    { q: "Kamu melihat winword.exe (Word) memunculkan powershell.exe sebagai child process. Kenapa SOC peduli pola parent-child seperti ini?",
      options: [
        "Karena Word memang selalu membutuhkan PowerShell untuk berjalan",
        "Karena itu mempercepat kinerja dokumen",
        "Karena pola parent-child yang tidak wajar sering menandakan serangan (mis. macro jahat)",
        "Karena PowerShell akan menutup Word secara otomatis"
      ], answer: 2,
      explain: "Dokumen Office yang memunculkan PowerShell adalah pola khas macro jahat — red flag kuat." },
    { q: "Ransomware yang mengenkripsi data korban paling langsung menyerang pilar CIA yang mana?",
      options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
      answer: 2,
      explain: "Enkripsi membuat data tidak bisa diakses → Availability terganggu (bisa juga Integrity, tapi dampak utamanya ketersediaan)." },
    { q: "\"Pintu tanpa kunci\" adalah analogi untuk?",
      options: ["Threat (ancaman)", "Vulnerability (kerentanan)", "Risk (risiko)", "Exploit"],
      answer: 1,
      explain: "Kerentanan = kelemahan. Pencuri = threat. Kemungkinan dibobol × dampak = risk." },
    { q: "Seorang user sudah login (terbukti identitasnya), lalu sistem menentukan ia hanya boleh membaca data, bukan menghapus. Proses penentuan 'boleh apa' ini disebut?",
      options: ["Authentication", "Authorization", "Accounting", "Encryption"],
      answer: 1,
      explain: "Authorization = menentukan hak akses setelah identitas terbukti (authentication)." },
    { q: "Prinsip 'least privilege' berarti?",
      options: [
        "Semua user diberi hak admin agar praktis",
        "Memberi hak akses seminimal yang diperlukan untuk tugasnya",
        "Menghapus semua akses user secara berkala",
        "Memberi akses berdasarkan senioritas"
      ], answer: 1,
      explain: "Least privilege = hak sekecil mungkin yang cukup untuk bekerja, membatasi dampak bila akun disusupi." },
    { q: "Inti dari prinsip 'Zero Trust' adalah?",
      options: [
        "Mempercayai semua perangkat yang sudah ada di dalam jaringan",
        "Jangan percaya secara default, selalu verifikasi — bahkan untuk yang sudah di dalam",
        "Memblokir seluruh akses dari internet",
        "Hanya mengandalkan firewall perimeter"
      ], answer: 1,
      explain: "Zero Trust: tidak ada kepercayaan otomatis karena posisi di jaringan; verifikasi terus-menerus." },
    { q: "Di Linux, hash password user disimpan di file mana?",
      options: ["/etc/passwd", "/etc/shadow", "/var/log/auth.log", "/etc/hosts"],
      answer: 1,
      explain: "/etc/passwd berisi daftar user; hash password ada di /etc/shadow yang aksesnya terbatas." },
    { q: "Dalam AAA, pencatatan aktivitas user (log) yang menjadi 'makanan' SOC disebut?",
      options: ["Authentication", "Authorization", "Accounting", "Availability"],
      answer: 2,
      explain: "Accounting = mencatat apa yang dilakukan user; inilah log yang dianalisis SOC." },
    { q: "Memasang firewall + EDR + MFA + pelatihan user sekaligus adalah contoh penerapan prinsip?",
      options: ["Single point of failure", "Defense in depth", "Security through obscurity", "Fail open"],
      answer: 1,
      explain: "Defense in depth = berlapis; bila satu lapis jebol masih ada lapis lain." }
  ]
};
