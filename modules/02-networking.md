# Modul 02 — Networking untuk SOC

> 80% investigasi menyentuh jaringan: IP mencurigakan, port aneh, koneksi keluar. Kamu tidak perlu jadi network engineer, tapi harus fasih "membaca" lalu lintas.

---

## Bagian 1 — Bagaimana data berpindah antar komputer

### 🎯 Analogi: mengirim paket pos

Kamu mau kirim barang ke teman di kota lain:
1. Barang dibungkus (**data**).
2. Ditulis alamat tujuan & pengirim (**IP address**).
3. Dipecah muat ke beberapa kotak kalau besar (**packets**).
4. Lewat kantor pos → truk → pesawat → kurir (**router demi router**).
5. Sampai, dibuka, disusun ulang sesuai urutan.

Internet persis begitu: data dipecah jadi **paket**, tiap paket punya **alamat**, dan "diantar" lewat banyak perangkat sampai tujuan, lalu disusun ulang.

### 📖 Penjelasan

- **IP address** = alamat sebuah perangkat. IPv4 contoh `192.168.1.10`. Ada **privat** (dalam jaringan lokal: `10.x`, `172.16–31.x`, `192.168.x`) dan **publik** (bisa diakses dari internet).
- **MAC address** = alamat fisik kartu jaringan, unik per perangkat (mis. `00:1A:2B:3C:4D:5E`). Dipakai di jaringan lokal.
- **Port** = nomor yang menandai *aplikasi mana* di sebuah IP. IP = alamat gedung, port = nomor ruangan.
- **Packet** = potongan data + header (berisi IP asal/tujuan, port, dll.).

---

## Bagian 2 — Model OSI & TCP/IP

### 🎯 Analogi: 7 lapis = tahapan mengirim surat lewat perusahaan besar

Dari staf menulis isi (atas) sampai kurir mengantar fisik (bawah). Tiap lapis punya tugas sendiri dan tidak perlu tahu detail lapis lain.

### 📖 Penjelasan: 7 Layer OSI (hafal dari bawah ke atas)

| # | Layer | Tugas | Contoh | Serangan khas di sini |
| --- | --- | --- | --- | --- |
| 7 | Application | Antarmuka aplikasi | HTTP, DNS, SMTP | Phishing, SQLi, XSS |
| 6 | Presentation | Format/enkripsi data | TLS/SSL, JPEG | SSL stripping |
| 5 | Session | Kelola sesi koneksi | NetBIOS, RPC | Session hijacking |
| 4 | Transport | Kirim andal/cepat, port | **TCP, UDP** | SYN flood, port scan |
| 3 | Network | Routing antar jaringan, IP | **IP, ICMP** | IP spoofing, routing attack |
| 2 | Data Link | Antar perangkat lokal, MAC | Ethernet, ARP | ARP spoofing, MAC flooding |
| 1 | Physical | Sinyal fisik | kabel, WiFi | Wiretapping, jamming |

> Jembatan ingatan (bawah→atas): **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way.

**TCP/IP** adalah versi praktis 4 lapis yang benar-benar dipakai internet: Application, Transport, Internet, Link. OSI buat belajar/konsep, TCP/IP buat kenyataan.

### 🛡️ Kenapa penting buat SOC

Saat menganalisis alert, kamu akan bertanya *"ini serangan di layer berapa?"*. Firewall biasa bekerja di L3/L4 (IP & port), **WAF** di L7 (isi HTTP), **IDS/IPS** bisa L3–L7. Tahu layer = tahu tool mana yang relevan.

---

## Bagian 3 — TCP vs UDP & 3-Way Handshake

### 🎯 Analogi

- **TCP** = telepon. Kamu halo dulu, pastikan terdengar, baru bicara. Andal, berurutan, ada konfirmasi.
- **UDP** = kirim kartu pos. Lempar saja, tidak pastikan sampai. Cepat, tanpa jaminan. Dipakai streaming, DNS, game.

### 📖 Penjelasan: TCP 3-Way Handshake (WAJIB hafal)

Sebelum TCP mengirim data, dua pihak "berkenalan":

```
Client  ──SYN──────────►  Server    (1. "Halo, mau koneksi?")
Client  ◄──SYN-ACK─────  Server     (2. "Boleh, kamu siap?")
Client  ──ACK──────────►  Server    (3. "Siap!") → koneksi terbuka
```

- **SYN** = synchronize (minta mulai).
- **ACK** = acknowledge (konfirmasi).
- Menutup koneksi pakai **FIN**. **RST** = reset paksa (koneksi ditolak/diputus mendadak).

**Kaitan serangan:** pada **SYN flood** (jenis DoS), penyerang kirim ribuan SYN tapi tidak pernah balas ACK, membuat server penuh koneksi setengah terbuka sampai tumbang. Pada **port scan** (mis. Nmap), penyerang kirim SYN ke banyak port untuk melihat mana yang balas (port terbuka).

---

## Bagian 4 — Port & protokol yang WAJIB hafal

### 📖 Penjelasan

Port 0–65535. Yang penting dihafal:

| Port | Protokol | Fungsi | Catatan keamanan |
| --- | --- | --- | --- |
| 20/21 | FTP | Transfer file | Teks polos, tidak aman |
| 22 | SSH | Remote shell aman (Linux) | Target brute force |
| 23 | Telnet | Remote shell (teks polos) | Harusnya mati, bahaya kalau hidup |
| 25 | SMTP | Kirim email | Analisis phishing |
| 53 | DNS | Resolusi nama | DNS tunneling/exfiltration |
| 80 | HTTP | Web (tidak terenkripsi) | Serangan web |
| 110/143 | POP3/IMAP | Ambil email | — |
| 389/636 | LDAP/LDAPS | Direktori (AD) | Recon AD |
| 443 | HTTPS | Web terenkripsi | C2 sering menyamar di sini |
| 445 | SMB | Berbagi file Windows | Ransomware, lateral movement (WannaCry) |
| 3389 | RDP | Remote desktop Windows | Target brute force & lateral movement |
| 1433 | MSSQL | Database SQL Server | SQLi, akses DB |
| 3306 | MySQL | Database MySQL | Akses DB |
| 5985/5986 | WinRM | Remote management Windows | Lateral movement |

> **Pola berpikir SOC:** melihat port *tidak lazim* terbuka ke internet, atau port internal (445, 3389) dipakai antar host secara tiba-tiba = curiga.

---

## Bagian 5 — Layanan & perangkat jaringan inti

### 📖 Penjelasan

- **DNS** — ubah `google.com` → IP. SOC cek: domain baru dibuat? nama acak (DGA)? query TXT panjang (tunneling)?
- **DHCP** — bagi IP otomatis ke perangkat baru.
- **ARP** — petakan IP ↔ MAC di LAN. **ARP spoofing** = penyerang berpura-pura jadi gateway untuk menyadap (MITM).
- **NAT** — banyak perangkat privat berbagi satu IP publik. Alasan kenapa log sering butuh korelasi IP+port+waktu.
- **VLAN & subnet** — membagi jaringan jadi segmen. **Segmentasi** penting di payment (PCI DSS): sistem kartu dipisah dari jaringan umum.

**Perangkat pengaman:**

| Perangkat | Bekerja di layer | Fungsi |
| --- | --- | --- |
| Firewall (stateless) | L3/L4 | Izinkan/blok berdasarkan aturan statis (IP, port) |
| Firewall (stateful) | L3/L4 | Ingat status koneksi, lebih pintar |
| Proxy | L7 | Perantara akses web, bisa filter & log |
| **IDS** | L3–L7 | *Deteksi* + alert, pasif (contoh: Snort, Suricata, Zeek) |
| **IPS** | L3–L7 | Inline, bisa *memblokir* otomatis |
| WAF | L7 | Lindungi aplikasi web (SQLi, XSS) |
| VPN | L3 | Terowongan terenkripsi |

> **IDS vs IPS** (sering ditanya): IDS = kamera CCTV (lihat & lapor). IPS = satpam (lihat & cegat). IPS inline di jalur lalu lintas, IDS memantau salinan lalu lintas.

### 🛡️ Kenapa penting buat SOC

Log yang kamu baca di SIEM datang dari perangkat-perangkat ini. Tahu apa fungsinya = tahu arti field di lognya (mis. "action: blocked" di firewall log).

---

## 🧠 Cek pemahaman (tes Feynman)

1. Jelaskan perjalanan sebuah paket dari laptopmu ke server web, pakai analogi sendiri.
2. Sebut 7 layer OSI dan beri satu contoh + satu serangan untuk tiga di antaranya.
3. Gambar (di kertas) TCP 3-way handshake dan jelaskan tiap langkah. Lalu jelaskan cara SYN flood menyalahgunakannya.
4. Kapan aplikasi memilih UDP daripada TCP? Beri 2 contoh.
5. Sebut 10 port dari ingatan beserta fungsinya. Mana yang paling bikin curiga kalau terbuka ke internet?
6. Beda IDS dan IPS, dan kenapa segmentasi jaringan penting di lingkungan payment?

---

## 🧪 Praktik

1. **Wireshark**: install, capture lalu lintas saat buka sebuah web. Cari paket SYN, SYN-ACK, ACK. Lihat handshake asli.
2. Jalankan `nslookup google.com` (Windows) atau `dig google.com` (Linux). Perhatikan jawaban IP.
3. Di VM: `ss -tulpn` (Linux) / `Get-NetTCPConnection` (Windows). Identifikasi port mana yang **LISTENING** dan aplikasi apa.
4. (Lab aman, di jaringanmu sendiri) coba `nmap -sS <IP-VM-mu>` untuk lihat port terbuka. Rasakan sudut pandang penyerang.
5. Buka salah satu room gratis TryHackMe "Network Fundamentals".

---

## ➡️ Lanjut

Kamu paham jalan rayanya. Sekarang belajar membaca "rekaman CCTV"-nya: **[Modul 03 — Logs & Log Analysis](03-logs.md)**.
