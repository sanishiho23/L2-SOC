# Modul 03 — Logs & Log Analysis

> Log adalah **napas SOC**. Tanpa log, kamu buta. Dengan log yang dibaca benar, kamu bisa merekonstruksi seluruh serangan menit demi menit.

---

## Bagian 1 — Apa itu log?

### 🎯 Analogi

Log = **buku catatan satpam**. Setiap kejadian ditulis: *jam 02.14, orang X masuk lewat pintu belakang, bawa tas*. Satu baris log = satu kejadian, dengan **waktu, siapa, apa, di mana**.

### 📖 Penjelasan

**Log** = catatan peristiwa yang dihasilkan sistem/aplikasi secara otomatis. Elemen yang hampir selalu ada:
- **Timestamp** — kapan (perhatikan zona waktu! UTC vs lokal sering bikin salah analisis).
- **Source** — dari sistem/aplikasi apa.
- **Event/action** — apa yang terjadi (login, akses file, koneksi).
- **Actor** — siapa (user, IP, proses).
- **Outcome** — sukses/gagal.

Investigasi = menyusun banyak baris log dari banyak sumber jadi **satu cerita** (timeline). Skill inti L2.

> **Aturan emas waktu:** selalu catat insiden dalam **UTC** atau tegaskan zona waktunya. Satu alert bisa salah dibaca kalau kamu kira 02:00 lokal padahal itu UTC.

---

## Bagian 2 — Log Windows (Event Log)

### 📖 Penjelasan

Windows menyimpan log di **Event Viewer**, dibagi channel: **Security**, **System**, **Application**. Yang paling penting buat SOC: **Security** & **Sysmon** (Modul 08).

**Event ID Windows yang WAJIB hafal:**

| Event ID | Arti | Kenapa penting |
| --- | --- | --- |
| **4624** | Logon berhasil | Siapa masuk, dari mana, tipe logon |
| **4625** | Logon gagal | Banyak berturut dari 1 IP = brute force |
| **4634 / 4647** | Logoff | Lengkapi timeline sesi |
| **4672** | Logon dengan hak istimewa (admin) | Akun admin dipakai |
| **4688** | Proses baru dibuat | Lihat command line yang dijalankan |
| **4720** | Akun user dibuat | Penyerang bikin akun persistence |
| **4722/4724** | Akun diaktifkan / password direset | Perubahan akun mencurigakan |
| **4732/4728** | User ditambah ke grup (admin) | Privilege escalation |
| **4698** | Scheduled task dibuat | Teknik persistence |
| **7045** | Service baru diinstal | Persistence / lateral tool |
| **1102** | Audit log DIHAPUS | Penyerang menutup jejak — ALERT TINGGI |

**Logon Type** (di event 4624/4625) — penting untuk tahu *cara* masuk:

| Type | Arti |
| --- | --- |
| 2 | Interaktif (ketik di depan mesin) |
| 3 | Network (akses share/SMB) — sering di lateral movement |
| 10 | RemoteInteractive (RDP) |
| 4/5 | Batch / Service |

> Contoh pola curiga: deretan **4625** (gagal) dari satu IP, lalu satu **4624 type 3**, lalu **4672** (admin). Itu kemungkinan brute force **berhasil** diikuti akses admin. Cerita lengkap dari 3 event.

---

## Bagian 3 — Log Linux

### 📖 Penjelasan

Log Linux = file teks di `/var/log/`. Yang penting:

| File | Isi |
| --- | --- |
| `/var/log/auth.log` (Debian/Ubuntu) atau `/var/log/secure` (RHEL) | Autentikasi: SSH, sudo, login |
| `/var/log/syslog` / `messages` | Peristiwa sistem umum |
| `/var/log/<app>/` | Log aplikasi (nginx, apache, dll.) |
| `~/.bash_history` | Perintah yang diketik user |

Contoh baris login SSH gagal:
```
Oct 18 02:14:03 srv-pay sshd[2931]: Failed password for root from 203.0.113.9 port 54122 ssh2
```
Baca: 18 Okt 02:14, server `srv-pay`, SSH menolak password `root` dari IP `203.0.113.9`. Kalau ini berulang puluhan kali/menit → brute force.

Perintah analisis cepat:
```bash
grep "Failed password" /var/log/auth.log | wc -l          # hitung login gagal
grep "Accepted password" /var/log/auth.log                 # login SUKSES (penting!)
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr  # IP penyerang teratas
```

---

## Bagian 4 — Log web, proxy, firewall, DNS

### 📖 Penjelasan

**Web server (akses log)** — format umum (Apache/Nginx):
```
203.0.113.9 - - [18/Oct/2026:02:14:05 +0700] "GET /login.php?id=1' OR '1'='1 HTTP/1.1" 200 1534 "-" "sqlmap/1.7"
```
Baca tanda bahaya: payload `' OR '1'='1` (SQLi), user-agent `sqlmap` (tool otomatis). Status `200` = server merespon normal (mungkin rentan!).

Pola serangan web yang harus kamu kenali di log:

| Pola di URL/body | Serangan |
| --- | --- |
| `' OR 1=1`, `UNION SELECT`, `--` | SQL Injection |
| `<script>`, `onerror=`, `alert(` | XSS |
| `../../`, `..%2f` | Path/Directory Traversal |
| `;`, `|`, `&&`, `$(` di parameter | Command Injection |
| User-agent: `sqlmap`, `nikto`, `nmap`, `curl` | Tool scanning |

**Firewall log** — cek: IP sumber/tujuan, port, **action (allow/deny)**, bytes. Volume keluar besar ke IP asing = indikasi exfiltration.

**DNS log** — cek: domain acak/panjang (DGA malware), query TXT besar (DNS tunneling), domain yang baru dibuat.

### 🛡️ Kenapa penting buat SOC

Di SIEM, semua log ini masuk ke satu tempat. Tapi SIEM hanya sepintar orang yang membacanya. Kalau kamu tidak tahu `1102` artinya "log dihapus", alertnya lewat begitu saja.

---

## 🧠 Cek pemahaman (tes Feynman)

1. Jelaskan "apa itu log" ke teman non-IT dalam 2 kalimat.
2. Kenapa zona waktu krusial dalam analisis log?
3. Susun cerita serangan dari urutan event ini: beberapa 4625 → 4624 (type 3) → 4672 → 4720. Apa yang terjadi?
4. Diberi baris log SSH, tunjukkan: waktu, user target, IP penyerang, hasil.
5. Lihat URL `GET /item?id=../../etc/passwd` — serangan apa, dan apa tujuan penyerang?
6. Dua tanda di log DNS yang bikin kamu curiga ada malware. Jelaskan.

---

## 🧪 Praktik

1. Di VM Windows: lakukan login gagal beberapa kali, lalu login sukses. Buka Event Viewer → Security, temukan 4625 lalu 4624. Catat Logon Type.
2. Di VM Linux: coba SSH dengan password salah dari mesin lain, lihat `auth.log`. Jalankan one-liner `awk` untuk hitung IP.
3. Ambil sample web log (banyak di GitHub/Kaggle "web server logs"), cari baris dengan payload SQLi atau user-agent scanner pakai `grep`.
4. Latihan membuat **timeline**: ambil 10 baris log acak, urutkan berdasarkan waktu, tulis "cerita"-nya dalam 3 kalimat.

---

## ➡️ Lanjut

Kamu bisa baca log mentah. Sekarang pakai mesin yang mengumpulkan jutaan log ini: **[Modul 04 — SIEM & Elastic](04-siem-elastic.md)**.

---

## 📝 Kuis modul (skoring otomatis)

Sudah paham? Uji dengan **kuis pilihan ganda** dan dapatkan skornya. Lulus **≥ 80%** untuk menandai modul ini selesai.

- **Lokal:** buka `quiz/index.html`, pilih modul ini.
- **Online (setelah GitHub Pages aktif):** https://sanishiho23.github.io/L2-SOC/quiz/?m=03

Panduan & cara menambah soal: [quiz/README.md](../quiz/README.md).
