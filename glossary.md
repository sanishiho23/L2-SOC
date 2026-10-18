# Glosarium Istilah SOC

Kamus cepat. Kalau ketemu istilah asing di modul, cari di sini.

## A
- **AAA** — Authentication, Authorization, Accounting. Siapa kamu, boleh apa, tercatat apa.
- **Alert** — Pemberitahuan otomatis dari SIEM/EDR bahwa ada aktivitas yang cocok dengan aturan deteksi.
- **APT** — Advanced Persistent Threat. Penyerang canggih & terorganisir (sering disponsori negara) yang bertahan lama di jaringan.
- **ARP** — Address Resolution Protocol. Memetakan IP ke MAC address di jaringan lokal.

## B
- **Baseline** — Gambaran kondisi "normal" sebuah sistem/jaringan. Anomali = yang menyimpang dari baseline.
- **Beaconing** — Pola koneksi berkala dari host terinfeksi ke server C2.
- **Brute force** — Mencoba banyak password/kunci secara paksa sampai berhasil.

## C
- **C2 / C&C** — Command and Control. Server yang dipakai penyerang untuk mengendalikan mesin korban.
- **CIA Triad** — Confidentiality, Integrity, Availability. Tiga pilar keamanan informasi.
- **CVE** — Common Vulnerabilities and Exposures. ID unik untuk sebuah kerentanan publik (mis. CVE-2021-44228).
- **CVSS** — Skor keparahan kerentanan (0–10).

## D
- **DDoS** — Distributed Denial of Service. Membanjiri layanan dari banyak sumber agar tumbang.
- **DKIM** — DomainKeys Identified Mail. Tanda tangan kriptografis pada email untuk verifikasi keaslian.
- **DMARC** — Kebijakan yang mengatur apa yang terjadi jika SPF/DKIM gagal.
- **DNS** — Domain Name System. "Buku telepon" internet: mengubah nama domain ke IP.

## E
- **ECS** — Elastic Common Schema. Standar penamaan field di Elastic agar data dari sumber berbeda seragam.
- **EDR** — Endpoint Detection and Response. Tool yang memantau & merespon ancaman di endpoint.
- **EDC** — Electronic Data Capture. Mesin gesek kartu di merchant.
- **Enrichment** — Menambah konteks ke sebuah IOC (mis. cek reputasi IP di VirusTotal).
- **EQL** — Event Query Language. Bahasa query Elastic untuk mencari *urutan* event.
- **Exfiltration** — Pencurian/pemindahan data keluar dari organisasi.

## F
- **False positive (FP)** — Alert yang ternyata aktivitas aman.
- **False negative (FN)** — Serangan nyata yang TIDAK terdeteksi. Lebih berbahaya dari FP.

## G
- **GPN** — Gerbang Pembayaran Nasional. Sistem interkoneksi pembayaran di Indonesia (diatur BI).

## H
- **Hash** — Sidik jari digital sebuah file/data (MD5, SHA-256). Satu arah.
- **Hunting (threat hunting)** — Mencari ancaman secara proaktif, bukan menunggu alert.

## I
- **IOC** — Indicator of Compromise. Jejak teknis serangan: hash, IP, domain, URL.
- **IOA** — Indicator of Attack. Indikator berbasis *perilaku* (mis. proses Word membuka PowerShell).
- **IDS/IPS** — Intrusion Detection/Prevention System. IDS deteksi+alert, IPS bisa blokir.
- **ISO 8583** — Standar format pesan transaksi kartu (ATM/EDC). Penting di dunia payment.

## K
- **KQL** — Kibana Query Language. Bahasa pencarian sederhana di Kibana/Elastic.
- **Kill Chain** — Model tahapan serangan (Lockheed Martin).

## L
- **Lateral movement** — Penyerang berpindah dari satu host ke host lain setelah masuk.
- **L1/L2/L3** — Tingkatan analyst SOC (triage → investigasi → expert).

## M
- **MITRE ATT&CK** — Basis pengetahuan taktik & teknik penyerang dari kejadian nyata.
- **MTTD / MTTR** — Mean Time To Detect / Respond. Metrik kecepatan SOC.
- **MFA** — Multi-Factor Authentication.

## N
- **NAT** — Network Address Translation. Menerjemahkan IP privat ke publik.
- **NIST SP 800-61** — Panduan standar untuk incident response.

## P
- **PCI DSS** — Payment Card Industry Data Security Standard. Wajib untuk yang memproses data kartu.
- **Phishing** — Penipuan via pesan (email, dll.) untuk mencuri kredensial/menyebar malware.
- **Playbook** — Panduan langkah-langkah baku untuk menangani jenis insiden tertentu.
- **Pyramid of Pain** — Model yang menunjukkan indikator mana yang paling menyakitkan bagi penyerang jika diblokir.

## R
- **Ransomware** — Malware yang mengenkripsi data dan minta tebusan.
- **Risk** — Kemungkinan ancaman memanfaatkan kerentanan × dampaknya.

## S
- **SIEM** — Security Information and Event Management. Pusat pengumpulan & korelasi log.
- **SOAR** — Security Orchestration, Automation and Response. Otomatisasi respon.
- **SPF** — Sender Policy Framework. Daftar server yang boleh mengirim email atas nama domain.
- **Sysmon** — System Monitor. Tool Microsoft yang menghasilkan log endpoint detail.

## T
- **TLP** — Traffic Light Protocol. Aturan berbagi informasi (RED/AMBER/GREEN/CLEAR).
- **Threat** — Sesuatu yang berpotensi membahayakan (aktor, malware, bencana).
- **Triage** — Memilah & memprioritaskan alert.
- **TTP** — Tactics, Techniques, Procedures. Cara khas sebuah aktor beroperasi.
- **True positive (TP)** — Alert yang memang serangan nyata.

## V
- **Vulnerability** — Kelemahan yang bisa dieksploitasi.

## X
- **XDR** — Extended Detection and Response. EDR yang diperluas ke jaringan, email, cloud.
- **XSS** — Cross-Site Scripting. Menyuntik script jahat ke halaman web.

## Z
- **Zero Trust** — Prinsip "jangan percaya siapa pun secara default, selalu verifikasi."
- **Zero-day** — Kerentanan yang belum ada patch-nya.
