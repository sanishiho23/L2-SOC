# L2-SOC — Jalur Belajar SOC Analyst dari Nol

Repo ini adalah kurikulum belajar mandiri untuk menjadi **Security Operations Center (SOC) Analyst**, khususnya level **L2 (incident responder/investigator)**. Ditulis dari dasar banget, dengan **teknik Feynman** supaya benar-benar paham — bukan sekadar hafal.

> Target pembaca: kamu yang sudah pegang dasar IT, pernah menyentuh SIEM (mis. Elastic Security), dan mau serius masuk ke dunia blue team / SOC.

---

## Apa itu teknik Feynman, dan kenapa dipakai di sini

Teknik Feynman = *"kalau kamu tidak bisa menjelaskannya dengan sederhana, berarti kamu belum paham."* Langkahnya:

1. **Pilih satu konsep.**
2. **Jelaskan seolah ke anak kecil** — pakai bahasa sehari-hari dan analogi.
3. **Temukan bagian yang kamu masih tersendat** menjelaskannya → itu lubang pemahamanmu.
4. **Balik ke sumber, perbaiki, sederhanakan lagi.**

Karena itu, **setiap modul** punya struktur yang sama:

| Bagian | Isinya |
| --- | --- |
| 🎯 **Analogi dulu** | Konsep dijelaskan pakai hal sehari-hari |
| 📖 **Penjelasan** | Materi sebenarnya, dibangun pelan-pelan |
| 🛡️ **Kenapa penting buat SOC** | Hubungan ke kerjaan analyst nyata |
| 🧠 **Cek pemahaman (tes Feynman)** | Pertanyaan untuk kamu jawab *dengan kata sendiri* |
| 🧪 **Praktik** | Latihan yang bisa langsung dicoba |

**Cara pakai cek pemahaman:** jangan dibaca jawabannya di kepala. Tutup layar, jelaskan keras-keras atau tulis di kertas. Kalau tersendat → balik baca bagian itu. Itu inti Feynman.

---

## Peta kurikulum (urutan belajar)

Belajar **berurutan**. Tiap modul mengandalkan modul sebelumnya.

```
FONDASI                    INVESTIGASI                 PRAKTIK
─────────                  ────────────                ────────
01 Foundations       ┐
02 Networking        ├──►  03 Logs & Log Analysis ┐
                     │     04 SIEM & Elastic       ├──► Study Cases
                     │     05 Threat Landscape     │    (01–05)
                     └──►  06 Phishing Analysis    │
                           07 Incident Response    │
                           08 Endpoint & EDR       │
                           09 Threat Intel & IOC   ┘
```

| # | Modul | Kamu akan bisa... |
| --- | --- | --- |
| 01 | [Foundations](modules/01-foundations.md) | Menjelaskan cara kerja komputer, jaringan, OS, dan konsep inti keamanan (CIA, AAA) |
| 02 | [Networking](modules/02-networking.md) | Membaca OSI/TCP-IP, port, protokol, dan tahu di mana serangan terjadi di jaringan |
| 03 | [Logs & Log Analysis](modules/03-logs.md) | Membaca log Windows, Linux, web server, firewall — dan tahu mana yang mencurigakan |
| 04 | [SIEM & Elastic](modules/04-siem-elastic.md) | Paham cara kerja SIEM, menulis query di Elastic (KQL/Lucene/EQL), dan membuat detection rule |
| 05 | [Threat Landscape](modules/05-threat-landscape.md) | Memakai MITRE ATT&CK & Kill Chain untuk memetakan serangan |
| 06 | [Phishing Analysis](modules/06-phishing-analysis.md) | Menginvestigasi email phishing: header, SPF/DKIM/DMARC, URL, lampiran |
| 07 | [Incident Response](modules/07-incident-response.md) | Menjalankan alur IR (NIST), triage, containment, dan tahu beda L1/L2/L3 |
| 08 | [Endpoint & EDR](modules/08-endpoint-edr.md) | Membaca telemetri endpoint (Sysmon), dan paham cara kerja EDR |
| 09 | [Threat Intel & IOC](modules/09-threat-intel-ioc.md) | Melakukan enrichment IOC dan memakai threat intelligence |

Lanjut ke **[Study Cases](study-cases/)** — 5 skenario investigasi lengkap, mirip kerja SOC nyata.
Butuh lab & latihan tambahan? Lihat **[resources/labs-and-practice.md](resources/labs-and-practice.md)**.
Bingung istilah? Buka **[glossary.md](glossary.md)**.

---

## Checklist progres

Lihat **[roadmap.md](roadmap.md)** untuk checklist lengkap yang bisa kamu centang sambil jalan.

---

## Prinsip belajar yang dipakai repo ini

- **Dari konsep, bukan dari tombol.** Tools berubah (Elastic hari ini, Splunk besok), konsep tetap. Kuasai *kenapa*, bukan cuma *di mana klik*.
- **Tangan kotor sejak awal.** Setiap modul punya praktik. SOC itu skill, bukan teori.
- **Pikir seperti penyerang, bertindak seperti pembela.** Kamu tidak bisa mendeteksi apa yang tidak kamu pahami cara kerjanya.
- **Dokumentasi adalah pekerjaan.** Analyst yang baik menulis temuan dengan jelas. Latih itu di setiap study case.

---

## Catatan

Materi ini untuk tujuan **edukasi dan pertahanan (defensive security)**. Semua latihan serangan dilakukan di lab milikmu sendiri atau platform latihan legal (TryHackMe, LetsDefend, dll.), **bukan** di sistem orang lain.
