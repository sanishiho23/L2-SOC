# Modul 01 — Foundations

> Sebelum bisa menjaga sistem, kamu harus paham **apa yang kamu jaga** dan **apa artinya "aman"**. Modul ini dari nol banget.

---

## Bagian 1 — Komputer itu apa, sebenarnya?

### 🎯 Analogi dulu

Bayangkan sebuah **restoran**:
- **Hardware** = dapur, kompor, meja — barang fisik.
- **Operating System (OS)** = manajer restoran yang mengatur siapa pakai kompor kapan, pesanan mana dulu.
- **Aplikasi** = koki yang masak menu tertentu (Chrome masak "browsing", Word masak "dokumen").
- **Data** = resep dan catatan pesanan.
- **User** = pelanggan dan pegawai yang punya izin berbeda.

### 📖 Penjelasan

Komputer = mesin yang **menyimpan, memproses, dan memindahkan data**. Tiga lapis:

1. **Hardware** — CPU (otak, menghitung), RAM (meja kerja, memori sementara & cepat), disk (lemari, penyimpanan permanen), NIC (kartu jaringan, pintu keluar ke internet).
2. **Operating System** — perangkat lunak yang menjembatani aplikasi dengan hardware, mengatur **proses**, **memori**, **file**, dan **user/izin**. Contoh: Windows, Linux, macOS.
3. **Aplikasi** — program yang kamu pakai, berjalan **di atas** OS sebagai **proses**.

Istilah penting yang akan terus muncul:
- **Process** — program yang sedang berjalan. Punya **PID** (nomor ID). Satu aplikasi bisa jadi banyak proses.
- **Parent & child process** — proses bisa membuat proses lain. Contoh: kamu klik Word (parent), Word membuka kalkulator (child). **Pola parent-child yang aneh = sinyal serangan** (misal Word → PowerShell). Ingat ini, sering banget muncul di investigasi.
- **Service / daemon** — proses latar yang jalan terus tanpa jendela (mis. layanan update, web server).
- **Port** — "pintu bernomor" tempat aplikasi mendengarkan koneksi (dibahas di Modul 02).

### 🛡️ Kenapa penting buat SOC

Hampir semua serangan akhirnya jadi **proses yang berjalan** atau **file yang ditulis** di suatu mesin. Kalau kamu tidak paham proses, file, dan user, kamu buta saat baca log endpoint. Investigasi L2 sering berakhir di pertanyaan: *"Proses apa ini? Siapa parent-nya? User mana yang menjalankannya?"*

---

## Bagian 2 — Windows vs Linux (sekadar kenalan)

### 📖 Penjelasan

Sebagai SOC analyst kamu akan lihat log dari dua dunia ini. Kenali bedanya:

| Hal | Windows | Linux |
| --- | --- | --- |
| User admin tertinggi | Administrator / SYSTEM | root |
| Daftar user | SAM / Active Directory | `/etc/passwd`, password di `/etc/shadow` |
| Log | Event Log (Event Viewer) | file teks di `/var/log/` |
| Shell | PowerShell, cmd | bash, sh, zsh |
| Jadwal tugas | Task Scheduler | cron (`crontab`) |
| Format eksekusi | `.exe`, `.dll`, `.ps1`, `.bat` | binary ELF, `.sh` |
| Autentikasi domain | Kerberos / NTLM | sering LDAP/PAM |

Perintah dasar yang wajib bisa (latih di VM-mu):

**Windows (PowerShell):**
```powershell
Get-Process              # daftar proses (mirip tasklist)
Get-NetTCPConnection     # koneksi jaringan aktif (mirip netstat -ano)
Get-LocalUser            # daftar user lokal
Get-WinEvent -LogName Security -MaxEvents 20   # baca 20 event keamanan terakhir
```

**Linux (bash):**
```bash
ps aux                   # daftar semua proses
ss -tulpn                # koneksi & port yang listening (pengganti netstat)
cat /etc/passwd          # daftar user
tail -f /var/log/auth.log    # pantau log autentikasi real-time
grep "Failed password" /var/log/auth.log   # cari login gagal
```

### 🛡️ Kenapa penting buat SOC

Infrastruktur payment seperti ALTO biasanya campur: server Linux untuk aplikasi/switching, Windows untuk Active Directory & workstation. Kamu harus nyaman membaca keduanya.

---

## Bagian 3 — Konsep inti keamanan

### 🎯 Analogi: CIA Triad = menjaga sebuah surat penting

- **Confidentiality (Kerahasiaan)** — hanya orang yang berhak boleh baca surat. Dilanggar lewat: pencurian data, penyadapan.
- **Integrity (Integritas)** — isi surat tidak boleh diubah diam-diam. Dilanggar lewat: pengubahan data, tampering.
- **Availability (Ketersediaan)** — surat harus bisa diakses saat dibutuhkan. Dilanggar lewat: ransomware, DDoS.

Setiap insiden bisa kamu klasifikasikan: *pilar mana yang terancam?* Itu membantu menilai dampak.

### 📖 Penjelasan: istilah yang sering tertukar

**Vulnerability vs Threat vs Risk** — ini SERING ditanya saat interview:

- **Vulnerability (kerentanan)** = kelemahan. *Contoh: pintu tanpa kunci.*
- **Threat (ancaman)** = sesuatu yang bisa memanfaatkan kelemahan. *Contoh: pencuri.*
- **Risk (risiko)** = kemungkinan ancaman memanfaatkan kerentanan × dampaknya. *Contoh: besar kalau rumahmu penuh emas dan di area rawan; kecil kalau rumah kosong.*

> Rumus mental: **Risk = Threat × Vulnerability × Impact.** Hilangkan salah satu → risiko turun.

**Authentication vs Authorization** (bagian dari AAA):
- **Authentication** = membuktikan *siapa kamu* (password, OTP, sidik jari).
- **Authorization** = menentukan *kamu boleh apa* setelah terbukti (baca saja? atau bisa hapus?).
- **Accounting** = mencatat *apa yang kamu lakukan* (log) — ini yang jadi makanan SOC.

Analogi: masuk bandara. Tunjukkan paspor = authentication. Boarding pass menentukan kursi/kelas = authorization. CCTV & catatan check-in = accounting.

**Prinsip pertahanan yang harus kamu pegang:**
- **Defense in depth** — jangan andalkan satu lapis. Firewall + EDR + MFA + training user. Kalau satu jebol, masih ada lapis lain.
- **Least privilege** — beri hak seminimal yang diperlukan. User biasa tidak perlu akses admin.
- **Zero trust** — jangan percaya otomatis hanya karena "sudah di dalam jaringan". Selalu verifikasi.

### 🛡️ Kenapa penting buat SOC

Saat menilai alert, kamu akan bertanya: *pilar CIA mana yang terancam? Seberapa besar risikonya?* Ini dasar penentuan **severity** dan **prioritas**.

---

## 🧠 Cek pemahaman (tes Feynman)

Tutup catatan. Jawab dengan kata-katamu sendiri (tulis/ucapkan):

1. Jelaskan beda hardware, OS, dan aplikasi pakai analogi selain restoran.
2. Apa itu parent-child process, dan kenapa SOC peduli?
3. Beri satu contoh nyata pelanggaran masing-masing pilar CIA.
4. Jelaskan beda vulnerability, threat, dan risk pakai satu skenario buatanmu.
5. Beda authentication dan authorization — pakai contoh login ke aplikasi perbankan.
6. Kenapa "zero trust" dianggap lebih aman daripada "percaya yang sudah di dalam jaringan"?

> Kalau ada nomor yang kamu tersendat menjawabnya → balik baca bagian itu. Itu lubang pemahamanmu.

---

## 🧪 Praktik

1. **Instal VirtualBox** (kamu sudah punya) → buat 1 VM Ubuntu + 1 VM Windows 10/11 eval.
2. Di Linux: jalankan `ps aux`, `ss -tulpn`, `cat /etc/passwd`. Catat 3 proses yang kamu tidak kenal, cari tahu fungsinya.
3. Di Windows: buka Event Viewer → Windows Logs → Security. Lihat ada Event ID berapa saja.
4. Buat tabel sendiri: ambil 3 aplikasi di laptopmu, tentukan untuk masing-masing — pilar CIA mana yang paling krusial kalau aplikasi itu dibobol.

---

## ➡️ Lanjut

Kamu sudah paham "yang dijaga". Sekarang pahami "jalan rayanya": **[Modul 02 — Networking](02-networking.md)**.

---

## 📝 Kuis modul (skoring otomatis)

Sudah paham? Uji dengan **kuis pilihan ganda** dan dapatkan skornya. Lulus **≥ 80%** untuk menandai modul ini selesai.

- **Lokal:** buka `quiz/index.html`, pilih modul ini.
- **Online (setelah GitHub Pages aktif):** https://sanishiho23.github.io/L2-SOC/quiz/?m=01

Panduan & cara menambah soal: [quiz/README.md](../quiz/README.md).
