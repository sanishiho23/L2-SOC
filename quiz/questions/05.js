window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["05"] = {
  title: "Threat Landscape",
  pass: 80,
  questions: [
    { q: "Dalam MITRE ATT&CK, perbedaan 'Taktik' dan 'Teknik' adalah?",
      options: [
        "Taktik = tool, Teknik = malware",
        "Taktik = tujuan penyerang (kenapa), Teknik = cara mencapainya (bagaimana)",
        "Taktik = teknik yang gagal",
        "Keduanya sama"
      ], answer: 1,
      explain: "Taktik menjawab 'kenapa' (tujuan), Teknik menjawab 'bagaimana' (cara)." },
    { q: "Pada Cyber Kill Chain, memutus serangan paling dini (mis. tahap Delivery) lebih baik karena?",
      options: [
        "Lebih mudah mendapat pujian",
        "Makin dini dihentikan, makin kecil kerusakan — sebelum data dicuri/dienkripsi",
        "Tahap akhir tidak bisa dideteksi",
        "Hanya tahap awal yang tercatat di log"
      ], answer: 1,
      explain: "Deteksi di Delivery (phishing) jauh lebih murah daripada di Actions (data sudah hilang)." },
    { q: "Taktik ATT&CK untuk 'berpindah dari satu host ke host lain setelah masuk' disebut?",
      options: ["Initial Access", "Persistence", "Lateral Movement", "Exfiltration"],
      answer: 2,
      explain: "Lateral Movement (mis. T1021 Remote Services: RDP/SMB) = berpindah antar host." },
    { q: "Menurut Pyramid of Pain, memblokir indikator mana yang PALING menyakitkan bagi penyerang?",
      options: ["Hash file", "IP address", "Domain name", "TTPs (perilaku/cara kerja)"],
      answer: 3,
      explain: "TTP ada di puncak piramida — mengubahnya memaksa penyerang mengubah seluruh cara kerja." },
    { q: "Kenapa deteksi berbasis hash file mudah dikalahkan penyerang?",
      options: [
        "Hash sulit dihitung",
        "Mengubah 1 byte file menghasilkan hash baru, sehingga indikator lama tak lagi cocok",
        "Hash tidak pernah dipakai SOC",
        "Hash hanya berlaku di Linux"
      ], answer: 1,
      explain: "Hash sangat rapuh sebagai indikator: recompile/ubah sedikit → hash berubah total." },
    { q: "Perbedaan 'password spraying' dan 'brute force' klasik dari sisi pola adalah?",
      options: [
        "Spraying = banyak password ke 1 user; brute force = 1 password ke banyak user",
        "Spraying = 1 password umum dicoba ke banyak user; brute force klasik = banyak password ke 1 user",
        "Keduanya identik",
        "Spraying hanya menyerang admin"
      ], answer: 1,
      explain: "Password spraying menyebar 1-2 password umum ke banyak akun untuk menghindari lockout." },
    { q: "'C2 beaconing' di log jaringan tampak sebagai?",
      options: [
        "Satu koneksi besar sekali waktu",
        "Koneksi keluar berkala dengan interval/ukuran konsisten ke IP/domain yang langka",
        "Hanya koneksi masuk dari internet",
        "Lonjakan DNS ke domain populer"
      ], answer: 1,
      explain: "Beaconing = 'lapor' berkala mesin korban ke server C2, polanya teratur dan konsisten." },
    { q: "Di lingkungan payment, 'card testing / carding' biasanya terlihat sebagai?",
      options: [
        "Satu transaksi besar yang berhasil",
        "Lonjakan banyak transaksi kecil dari banyak kartu berbeda, mayoritas gagal, laju tinggi",
        "Penurunan jumlah transaksi",
        "Transaksi hanya di jam kerja"
      ], answer: 1,
      explain: "Carding menguji banyak kartu curian lewat transaksi kecil; ciri: banyak PAN, nominal kecil, decline tinggi." },
    { q: "Teknik T1486 (Data Encrypted for Impact) berhubungan dengan serangan?",
      options: ["Phishing", "Ransomware", "Port scanning", "DNS tunneling"],
      answer: 1,
      explain: "T1486 = enkripsi data untuk dampak = ransomware (taktik Impact)." },
    { q: "Manfaat utama memetakan deteksi ke MITRE ATT&CK bagi tim SOC adalah?",
      options: [
        "Membuat laporan lebih panjang",
        "Bahasa bersama + peta cakupan (coverage) untuk melihat taktik mana yang belum terdeteksi",
        "Menggantikan kebutuhan SIEM",
        "Menghapus kebutuhan threat intel"
      ], answer: 1,
      explain: "ATT&CK memberi istilah presisi dan peta cakupan deteksi (gap analysis)." }
  ]
};
