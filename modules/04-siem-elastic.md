# Modul 04 — SIEM & Elastic

> Kamu sudah pakai Elastic Security di Nanovest — modul ini merapikan fondasinya supaya kamu bukan cuma bisa klik, tapi paham *kenapa* dan bisa menulis query/rule sendiri. Konsepnya berlaku juga kalau nanti pindah ke Splunk/Sentinel/QRadar.

---

## Bagian 1 — Apa itu SIEM, sebenarnya?

### 🎯 Analogi

Bayangkan gedung besar dengan 500 kamera CCTV, sensor pintu, dan log absensi. Kalau satu petugas harus pelototin 500 layar, mustahil. **SIEM = ruang kontrol pusat** yang:
1. Menarik semua rekaman ke satu tempat (**collection**).
2. Menyeragamkan formatnya supaya bisa dibandingkan (**normalization**).
3. Menyambungkan kejadian: "pintu belakang jam 2 + kamera lobi sepi + absensi kosong" (**correlation**).
4. Membunyikan alarm kalau pola cocok aturan bahaya (**alerting**).

### 📖 Penjelasan

**SIEM** = Security Information and Event Management. Alur hidupnya:

```
Sumber log ──► Ingest ──► Parse & Normalize ──► Index/Store ──► Correlate (rules) ──► Alert ──► Dashboard/Investigate
(endpoint,      (Beats/     (jadikan field       (simpan bisa    (aturan deteksi)   (ke analyst)  (Kibana)
 firewall,       Logstash)   seragam)             dicari cepat)
 server, dll.)
```

Kenapa normalisasi penting: firewall menulis IP sumber sebagai `src`, Windows menulis `IpAddress`, Linux `rhost`. Tanpa penyeragaman, kamu tidak bisa cari "semua kejadian dari IP X" sekaligus. SIEM memetakan semua ke satu field standar.

---

## Bagian 2 — ELK / Elastic Stack

### 📖 Penjelasan

"ELK" = **E**lasticsearch + **L**ogstash + **K**ibana. Sekarang ditambah **Beats** → "Elastic Stack". Peta komponen:

| Komponen | Analogi | Fungsi |
| --- | --- | --- |
| **Beats** (Filebeat, Winlogbeat, Packetbeat) | Kurir di tiap gedung | Agen ringan yang kirim log dari sumber |
| **Elastic Agent** | Kurir serbaguna baru | Gabungan beats, dikelola terpusat (Fleet) |
| **Logstash** | Pabrik penyortir | Parse, transform, enrich log (opsional) |
| **Elasticsearch** | Gudang + mesin pencari super cepat | Simpan & cari data (berbasis index) |
| **Kibana** | Ruang kontrol / layar | UI untuk cari, visualisasi, dashboard, alert |
| **Elastic Security (SIEM)** | Modul keamanan di Kibana | Detection rules, timeline, cases |

**Istilah Elasticsearch yang perlu kamu paham:**
- **Document** = satu event/log (format JSON).
- **Index** = kumpulan dokumen sejenis (mis. `logs-windows-*`). Mirip "tabel".
- **Field** = atribut dalam dokumen (mis. `source.ip`, `event.action`).
- **Data view / index pattern** = cara Kibana "melihat" sekumpulan index (mis. `logs-*`).

### 🔑 ECS — Elastic Common Schema (konsep kunci)

**ECS** = standar penamaan field di Elastic. Semua sumber dipetakan ke nama field yang sama:

| Konsep | Field ECS |
| --- | --- |
| IP sumber | `source.ip` |
| IP tujuan | `destination.ip` |
| User | `user.name` |
| Nama host | `host.name` |
| Aksi event | `event.action` |
| Hasil event | `event.outcome` (success/failure) |
| Nama proses | `process.name` |
| Command line | `process.command_line` |
| Proses induk | `process.parent.name` |

> Hafal field ECS inti ini — mereka jadi "kosakata" semua query-mu. Pindah dari Windows log ke firewall log, field-nya tetap `source.ip`.

---

## Bagian 3 — Menulis query di Kibana

Elastic punya beberapa bahasa query. Kenali kapan pakai yang mana:

### KQL (Kibana Query Language) — paling sering dipakai analyst

Sederhana, untuk filter cepat di Discover & rules.
```kql
event.code : "4625"                                   // semua login gagal Windows
event.code : "4625" and source.ip : "203.0.113.9"     // dari IP tertentu
user.name : "admin" and event.outcome : "failure"     // admin gagal login
process.name : "powershell.exe" and process.parent.name : "winword.exe"   // Word → PowerShell (curiga!)
network.direction : "outbound" and destination.port : 4444   // koneksi keluar ke port C2 umum
source.ip : "10.0.0.*"                                 // wildcard
not event.outcome : "success"                          // negasi
```

### Lucene — mirip, lebih tua, dukung regex & range

```lucene
event.code:4625 AND source.ip:203.0.113.9
destination.port:[1024 TO 65535]
process.command_line:/.*Invoke-Expression.*/     // regex
```

### EQL (Event Query Language) — untuk *urutan* event (korelasi)

Kekuatan EQL = mencari **rangkaian** kejadian berurutan. Contoh: proses mencurigakan lalu koneksi jaringan, dalam urutan, dari host yang sama.
```eql
sequence by host.name with maxspan=5m
  [ process where process.name == "powershell.exe" ]
  [ network where destination.port == 4444 ]
```
Baca: "cari host yang menjalankan powershell LALU dalam 5 menit membuat koneksi ke port 4444." Ini pola yang sulit ditangkap query biasa.

### ES|QL — bahasa pipeline baru (agregasi gaya SQL)

```esql
FROM logs-* | WHERE event.code == "4625" | STATS count = COUNT(*) BY source.ip | SORT count DESC
```
Berguna untuk menghitung/mengurutkan (mis. "IP dengan login gagal terbanyak").

> **Kapan pakai apa:** KQL untuk filter harian, Lucene kalau butuh regex/range, EQL untuk korelasi berurutan (lateral movement, kill chain), ES|QL untuk agregasi & hunting.

---

## Bagian 4 — Detection Rules & Alert

### 📖 Penjelasan

**Detection rule** = query + kondisi + jadwal yang otomatis membuat alert. Di Elastic Security, jenisnya:

| Tipe rule | Kapan |
| --- | --- |
| **Custom query** | Cocokkan event ke KQL (mis. event.code 1102 = log dihapus) |
| **Threshold** | Alert kalau sesuatu melebihi batas (mis. 10 login gagal dari 1 IP dalam 5 menit = brute force) |
| **EQL** | Korelasi urutan event |
| **Indicator match** | Cocokkan field ke feed threat intel (IOC) |
| **ML / anomaly** | Deteksi penyimpangan dari baseline |

Contoh logika rule "brute force" (threshold):
- Query: `event.code : "4625"`
- Group by: `source.ip`, `user.name`
- Threshold: `>= 10` dalam `5 menit`
- Severity: Medium → naik ke High kalau diikuti 4624 sukses.

**Anatomi sebuah alert yang baik** (yang kamu tuning sebagai L2):
- **Severity & Risk score** — seberapa penting.
- **Deskripsi & investigation guide** — langkah apa yang harus dilakukan analyst.
- **MITRE ATT&CK mapping** — taktik/teknik apa (Modul 05).
- **False positive notes** — kapan ini wajar terjadi.

> Tugas L2 bukan cuma menangani alert, tapi **menilai kualitas rule**: terlalu banyak FP? perlu dipersempit (tambah kondisi, kecualikan proses sah). Terlalu sepi? mungkin kelewatan.

### 🛡️ Alur kerja analyst di Elastic Security (harian)

1. **Alerts** page → lihat alert baru, urutkan by severity.
2. Buka alert → baca detail, lihat host, user, proses.
3. **Investigate in Timeline** → tarik event terkait, bangun kronologi.
4. Enrich: cek IP/hash di VirusTotal/AbuseIPDB (Modul 09).
5. Tentukan: TP atau FP? Dampak?
6. Dokumentasikan di **Cases**, eskalasi bila perlu, tandai status.

---

## 🧠 Cek pemahaman (tes Feynman)

1. Jelaskan 4 tahap kerja SIEM (collection→alert) pakai analogi selain CCTV.
2. Kenapa normalisasi/ECS penting? Beri contoh field yang beda nama di 2 sumber.
3. Sebut komponen Elastic Stack dan fungsi masing-masing dengan kata sendiri.
4. Tulis query KQL untuk: "proses cmd.exe yang parent-nya bukan explorer.exe".
5. Kapan kamu pakai EQL dan bukan KQL? Beri satu skenario serangan.
6. Rule brute force-mu menghasilkan 200 FP/hari. Apa 2 cara menurunkannya tanpa melewatkan serangan nyata?

---

## 🧪 Praktik

1. **Bangun lab Elastic gratis**: pakai [Elastic Cloud trial](https://www.elastic.co/cloud) 14 hari, atau jalankan Elastic + Kibana via Docker di VM-mu (lihat [resources](../resources/labs-and-practice.md)).
2. Pasang **Winlogbeat/Elastic Agent** di VM Windows → kirim Security log ke Elastic. Lakukan login gagal, cari event.code 4625 pakai KQL di Discover.
3. Buat **detection rule threshold** sederhana untuk brute force. Picu sendiri, lihat alert muncul.
4. Latihan di TryHackMe room **"Investigating with ELK"** / **"Elastic Stack"**.
5. Tulis ulang 5 query KQL di modul ini dari ingatan.

---

## ➡️ Lanjut

Kamu bisa cari & deteksi. Sekarang pahami *apa* yang kamu cari — taktik penyerang: **[Modul 05 — Threat Landscape](05-threat-landscape.md)**.
