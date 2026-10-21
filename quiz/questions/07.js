window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["07"] = {
  title: "Incident Response",
  pass: 80,
  questions: [
    { q: "Urutan fase Incident Response menurut NIST SP 800-61 yang benar?",
      options: [
        "Detection → Preparation → Recovery → Containment",
        "Preparation → Detection & Analysis → Containment → Eradication → Recovery → Lessons Learned",
        "Containment → Recovery → Detection → Preparation",
        "Eradication → Detection → Preparation → Recovery"
      ], answer: 1,
      explain: "NIST: Preparation, Detection & Analysis, Containment, Eradication, Recovery, Lessons Learned." },
    { q: "Tugas khas analyst L2 (dibanding L1) adalah?",
      options: [
        "Hanya memantau layar dan menutup false positive",
        "Investigasi mendalam: korelasi multi-sumber, scoping, containment, laporan insiden",
        "Reverse engineering malware tingkat lanjut setiap hari",
        "Mengatur anggaran SOC"
      ], answer: 1,
      explain: "L1 triage; L2 investigasi & respon; L3 hunting/forensik/RE mendalam." },
    { q: "Kenapa sebaiknya TIDAK terburu-buru melakukan eradication sebelum scope dipahami?",
      options: [
        "Agar insiden terlihat lebih besar",
        "Karena tanpa memahami cakupan & mengamankan bukti, penyerang bisa tetap punya jalan masuk lain",
        "Karena eradication ilegal",
        "Karena recovery harus lebih dulu"
      ], answer: 1,
      explain: "Pahami scope & amankan bukti dulu; eradication prematur bisa menyisakan backdoor dan menghapus bukti." },
    { q: "Prinsip emas saat ragu apakah sebuah alert adalah insiden nyata?",
      options: [
        "Tutup saja agar antrean bersih",
        "Eskalasi lebih awal — melewatkan insiden nyata (false negative) lebih mahal daripada eskalasi berlebih",
        "Tunggu sampai ada korban melapor",
        "Hapus alert tersebut"
      ], answer: 1,
      explain: "Bila ragu, eskalasi. False negative jauh lebih berbahaya daripada eskalasi berlebih." },
    { q: "MTTD (Mean Time To Detect) mengukur?",
      options: [
        "Rata-rata waktu dari serangan sampai terdeteksi",
        "Rata-rata waktu dari deteksi sampai tertangani",
        "Jumlah alert per hari",
        "Biaya insiden"
      ], answer: 0,
      explain: "MTTD = waktu sampai terdeteksi; MTTR = waktu dari deteksi sampai respon selesai." },
    { q: "Contoh tindakan 'containment' (bukan eradication) adalah?",
      options: [
        "Menghapus malware dan menutup kerentanan",
        "Mengisolasi host dari jaringan, memblokir IOC, menonaktifkan akun yang disusupi",
        "Membangun ulang server dari backup bersih",
        "Menulis laporan post-mortem"
      ], answer: 1,
      explain: "Containment = menghentikan penyebaran (isolasi, blok IOC, disable akun). Eradication = menghapus akar." },
    { q: "Kenapa 'timeline' penting dalam investigasi insiden?",
      options: [
        "Hanya untuk memenuhi format laporan",
        "Menyusun event berurutan waktu mengubah data mentah menjadi cerita serangan yang jelas",
        "Agar laporan terlihat panjang",
        "Untuk menghitung gaji analyst"
      ], answer: 1,
      explain: "Timeline adalah tulang punggung investigasi — mengungkap urutan & hubungan sebab-akibat." },
    { q: "Kenapa false positive rate yang tinggi berbahaya bagi SOC?",
      options: [
        "Membuat SIEM mati",
        "Menyebabkan 'alert fatigue' — analyst kelelahan dan bisa melewatkan serangan nyata",
        "Menambah biaya listrik",
        "Tidak berbahaya sama sekali"
      ], answer: 1,
      explain: "FP berlebih melelahkan analyst sehingga TP nyata berisiko terlewat." },
    { q: "Dokumentasi/case insiden yang baik WAJIB memuat, kecuali?",
      options: [
        "Timeline dan IOC",
        "Dampak & tindakan yang diambil",
        "Opini pribadi tanpa bukti tentang siapa yang bersalah",
        "Ringkasan dan status (TP/FP, eskalasi)"
      ], answer: 2,
      explain: "Dokumentasi berbasis fakta (timeline, IOC, dampak, tindakan, status) — bukan tuduhan tanpa bukti." },
    { q: "Analogi tepat untuk peran L1, L2, L3 di SOC adalah?",
      options: [
        "Semua sama seperti satpam",
        "L1 perawat triage, L2 dokter jaga yang mendiagnosis & menangani, L3 spesialis/bedah untuk kasus kompleks",
        "L1 manajer, L2 CEO, L3 magang",
        "Tidak ada perbedaan peran"
      ], answer: 1,
      explain: "Analogi UGD: L1 triage, L2 diagnosis & tangani mayoritas, L3 kasus langka/kompleks." }
  ]
};
