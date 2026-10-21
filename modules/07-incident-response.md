# Modul 07 — Incident Response

> Ini inti pekerjaan L2: ketika alert ternyata nyata, kamu harus **merespon** secara terstruktur. Modul ini soal proses, bukan tools.

---

## Bagian 1 — Beda L1, L2, L3

### 🎯 Analogi: ruang gawat darurat rumah sakit

- **L1 (triage)** = perawat di meja pendaftaran. Memilah pasien: mana darurat, mana bisa nunggu. Cepat, volume tinggi.
- **L2 (dokter jaga)** = memeriksa pasien yang dirujuk, mendiagnosis, menangani sebagian besar kasus, memutuskan rujuk ke spesialis.
- **L3 (spesialis/bedah)** = kasus langka/kompleks: operasi (forensik), penyakit baru (threat hunting, malware analysis).

### 📖 Penjelasan

| Level | Fokus | Tugas khas |
| --- | --- | --- |
| **L1 — Triage Analyst** | Monitoring 24/7, saring | Pantau alert SIEM, tutup FP, buat tiket, eskalasi sesuai playbook |
| **L2 — Incident Responder** | Investigasi mendalam | Korelasi multi-sumber, analisis IOC, scoping, containment, laporan insiden |
| **L3 — Threat Hunter/Expert** | Ancaman lanjutan | Hunting proaktif, forensik, malware RE, buat detection rule baru |
| **SOC Manager/Lead** | Proses & pelaporan | SLA, metrik, koordinasi manajemen & regulator |

Sebagai **intern L2**, kamu biasanya mendampingi investigasi: menarik log, membangun timeline, enrichment IOC, menulis dokumentasi, dan tuning rule.

---

## Bagian 2 — Siklus Incident Response (NIST SP 800-61)

### 🎯 Analogi: memadamkan kebakaran

Siapkan alat pemadam (preparation) → cium asap & cari sumber (detection) → sekat ruangan agar api tak menyebar (containment) → padamkan api (eradication) → bersihkan & huni lagi (recovery) → evaluasi kenapa kebakaran terjadi (lessons learned).

### 📖 Penjelasan: 6 fase

| Fase | Tujuan | Aktivitas L2 |
| --- | --- | --- |
| **1. Preparation** | Siap sebelum insiden | Playbook, logging aktif, tools siap, kontak jelas |
| **2. Detection & Analysis** | Kenali & pahami insiden | Triage alert, investigasi, tentukan severity & scope, bangun timeline |
| **3. Containment** | Hentikan penyebaran | Isolasi host, blok IOC, disable akun, cabut sesi |
| **4. Eradication** | Hapus akar masalah | Hapus malware/persistence, tutup kerentanan, reset kredensial terdampak |
| **5. Recovery** | Pulihkan operasi | Kembalikan sistem bersih, monitoring ketat pasca-pemulihan |
| **6. Lessons Learned** | Belajar & perbaiki | Post-mortem, perbaiki rule/proses, update playbook |

> Containment sering dibagi: **short-term** (cepat sekat, mis. cabut kabel/isolasi) dan **long-term** (perbaikan sementara sambil siapkan eradication). Jangan terburu eradication sebelum **bukti diamankan** (forensik) dan **scope dipahami** — kalau tidak, penyerang bisa tetap punya jalan masuk lain.

---

## Bagian 3 — Triage & Severity

### 📖 Penjelasan

**Triage** = menilai alert dengan cepat: nyata atau FP? seberapa parah? Pertanyaan triage:
1. **Apa** yang dipicu? (rule apa, teknik ATT&CK apa)
2. **Siapa/apa** yang terlibat? (host, user, proses, IP)
3. **Kapan** & apakah masih berlangsung?
4. **Dampak** potensial? (pilar CIA mana, aset sepenting apa)
5. **Nyata atau FP?** (ada konteks sah? aktivitas terjadwal?)

**Severity** biasanya dinilai dari **dampak × urgensi × nilai aset**:

| Severity | Contoh |
| --- | --- |
| Critical | Ransomware aktif, breach data kartu, DC terkompromi |
| High | Malware di server produksi, kredensial admin bocor |
| Medium | Brute force berhasil di 1 workstation, phishing diklik |
| Low | Scan port dari luar (diblokir), FP berulang |

**Prinsip emas:** *kalau ragu, eskalasi lebih awal.* Melewatkan insiden nyata (false negative) jauh lebih mahal daripada eskalasi berlebih.

---

## Bagian 4 — Membangun timeline & dokumentasi

### 📖 Penjelasan

**Timeline** = tulang punggung investigasi. Susun semua event relevan berurutan waktu (UTC!):
```
02:14  10 x login gagal (4625) ke svc_admin dari 203.0.113.9
02:15  1 login sukses (4624 type 3) svc_admin dari 203.0.113.9
02:16  4672 hak admin untuk svc_admin
02:18  proses baru (4688) powershell.exe -enc <base64>
02:20  koneksi keluar ke 185.x.x.x:4444
```
Dari timeline ini ceritanya jelas: brute force berhasil → akses admin → eksekusi PowerShell terenkode → koneksi C2.

**Dokumentasi tiket/case yang baik** berisi:
- Ringkasan (1–2 kalimat): apa yang terjadi.
- Timeline peristiwa.
- IOC (IP, domain, hash, akun).
- Dampak & aset terdampak.
- Tindakan yang diambil (containment, dll.).
- Rekomendasi & status (TP/FP, eskalasi, selesai).

> Dokumentasi bukan formalitas. Ini yang dipakai tim lain, manajemen, auditor, dan (di fintech) regulator. Analyst yang menulis jelas = analyst yang dipercaya.

---

## Bagian 5 — Metrik SOC

| Metrik | Arti | Kenapa penting |
| --- | --- | --- |
| **MTTD** (Mean Time To Detect) | Rata-rata waktu dari serangan sampai terdeteksi | Makin kecil makin baik |
| **MTTR** (Mean Time To Respond) | Rata-rata waktu dari deteksi sampai tertangani | Ukur kecepatan respon |
| **Dwell time** | Lama penyerang tak terdeteksi di jaringan | Target: minimalkan |
| **False positive rate** | % alert yang ternyata aman | Tinggi = analyst lelah (alert fatigue) |
| **SLA eskalasi** | Batas waktu tangani per severity | Critical mungkin 15 menit |

---

## 🧠 Cek pemahaman (tes Feynman)

1. Jelaskan beda L1, L2, L3 pakai analogi selain rumah sakit.
2. Sebut 6 fase NIST IR berurutan dan satu aktivitas L2 di tiap fase.
3. Kenapa jangan buru-buru eradication sebelum scope dipahami & bukti diamankan?
4. Kamu dapat alert "PowerShell terenkode di server HR". Jalankan triage: 5 pertanyaan yang kamu ajukan.
5. Susun timeline singkat dari serangan phishing→kredensial bocor→login asing. 
6. Apa itu MTTD & MTTR, dan kenapa false positive rate tinggi berbahaya bagi SOC?

---

## 🧪 Praktik

1. Tulis **playbook** 1 halaman untuk "brute force terdeteksi": langkah deteksi→triage→containment→eradication→recovery.
2. Ambil satu alert yang kamu kerjakan di LetsDefend, tulis dokumentasi case lengkap sesuai template di atas.
3. Latih membangun timeline: dari study case (folder [study-cases](../study-cases/)), susun kronologi event.
4. Hitung MTTD/MTTR dari skenario buatan: beri waktu attack, deteksi, dan respon, lalu hitung.

---

## ➡️ Lanjut

Investigasi sering berujung di endpoint. Pahami telemetrinya: **[Modul 08 — Endpoint & EDR](08-endpoint-edr.md)**.

---

## 📝 Kuis modul (skoring otomatis)

Sudah paham? Uji dengan **kuis pilihan ganda** dan dapatkan skornya. Lulus **≥ 80%** untuk menandai modul ini selesai.

- **Lokal:** buka `quiz/index.html`, pilih modul ini.
- **Online (setelah GitHub Pages aktif):** https://sanishiho23.github.io/L2-SOC/quiz/?m=07

Panduan & cara menambah soal: [quiz/README.md](../quiz/README.md).
