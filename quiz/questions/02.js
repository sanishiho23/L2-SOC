window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["02"] = {
  title: "Networking",
  pass: 80,
  questions: [
    { q: "Urutan yang benar pada TCP 3-way handshake adalah?",
      options: ["ACK → SYN → SYN-ACK", "SYN → SYN-ACK → ACK", "SYN → ACK → FIN", "SYN-ACK → SYN → ACK"],
      answer: 1,
      explain: "Client kirim SYN, server balas SYN-ACK, client balas ACK → koneksi terbuka." },
    { q: "Protokol mana yang cepat tetapi tidak menjamin pengiriman (cocok untuk streaming/DNS)?",
      options: ["TCP", "UDP", "ICMP", "ARP"],
      answer: 1,
      explain: "UDP tanpa handshake/konfirmasi — cepat tapi tak andal. TCP andal dengan konfirmasi." },
    { q: "Port 3389 secara default digunakan oleh layanan apa?",
      options: ["SSH", "SMB", "RDP (Remote Desktop)", "DNS"],
      answer: 2,
      explain: "3389 = RDP. 22 = SSH, 445 = SMB, 53 = DNS." },
    { q: "Firewall mengizinkan/memblokir berdasarkan IP & port terutama bekerja di layer OSI mana?",
      options: ["Layer 1-2 (Physical/Data Link)", "Layer 3-4 (Network/Transport)", "Layer 7 (Application)", "Layer 6 (Presentation)"],
      answer: 1,
      explain: "Firewall tradisional bekerja di L3/L4 (IP & port). WAF bekerja di L7 (isi HTTP)." },
    { q: "Perbedaan utama IDS dan IPS adalah?",
      options: [
        "IDS memblokir serangan, IPS hanya memberi alert",
        "IDS mendeteksi & memberi alert (pasif), IPS bisa memblokir secara inline",
        "Keduanya sama persis",
        "IDS bekerja di L7, IPS di L2"
      ], answer: 1,
      explain: "IDS = deteksi + alert (CCTV). IPS = inline, bisa mencegat (satpam)." },
    { q: "Serangan SYN flood menyalahgunakan handshake TCP dengan cara?",
      options: [
        "Mengirim banyak ACK tanpa SYN",
        "Mengirim banyak SYN tapi tidak pernah membalas ACK, membuat koneksi setengah terbuka menumpuk",
        "Menutup koneksi dengan RST berulang",
        "Mengganti port tujuan terus-menerus"
      ], answer: 1,
      explain: "SYN flood membanjiri server dengan SYN tanpa menyelesaikan handshake → sumber daya habis." },
    { q: "Layanan yang mengubah nama domain (mis. google.com) menjadi alamat IP adalah?",
      options: ["DHCP", "DNS", "ARP", "NAT"],
      answer: 1,
      explain: "DNS = buku telepon internet. DHCP bagi IP, ARP petakan IP↔MAC, NAT terjemahkan IP." },
    { q: "ARP spoofing memungkinkan penyerang melakukan?",
      options: [
        "Enkripsi lalu lintas korban",
        "Man-in-the-Middle dengan berpura-pura menjadi gateway di jaringan lokal",
        "Mempercepat koneksi internet",
        "Memblokir port di firewall"
      ], answer: 1,
      explain: "Dengan memalsukan pemetaan IP↔MAC, penyerang menyadap lalu lintas (MITM)." },
    { q: "Port 445 (SMB) terbuka ke internet patut dicurigai karena sering dipakai untuk?",
      options: [
        "Streaming video",
        "Ransomware & lateral movement (mis. WannaCry)",
        "Resolusi DNS",
        "Pembaruan antivirus"
      ], answer: 1,
      explain: "SMB (445) kerap dieksploitasi untuk penyebaran ransomware & gerak lateral." },
    { q: "Kenapa segmentasi jaringan (VLAN/subnet) penting di lingkungan payment (PCI DSS)?",
      options: [
        "Agar internet lebih cepat",
        "Memisahkan sistem data kartu dari jaringan umum untuk membatasi dampak jika ada pelanggaran",
        "Supaya tidak perlu firewall",
        "Agar semua perangkat berada di satu broadcast domain"
      ], answer: 1,
      explain: "Segmentasi membatasi cakupan (scope) & dampak; wajib untuk melindungi data kartu." }
  ]
};
