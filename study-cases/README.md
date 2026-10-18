# Study Cases

Lima skenario investigasi yang meniru kerja SOC L2. Setiap case berisi:

- **Skenario** — situasi & alert awal.
- **Artefak** — potongan log/email/telemetri (data mentah untuk kamu analisis).
- **Tugasmu** — pertanyaan yang harus kamu jawab *sebelum* lihat kunci.
- **Panduan analisis** — langkah berpikir (bukan jawaban langsung).
- **Kunci jawaban** — di bagian bawah, dilipat. **Jangan intip dulu.**

## Cara mengerjakan (penting!)

1. Baca skenario + artefak. **Tutup kunci jawaban.**
2. Tulis jawabanmu di kertas/file: timeline, verdict (TP/FP), dampak, IOC, tindakan.
3. Baru buka kunci. Bandingkan. Bagian yang kamu lewatkan = fokus belajar berikutnya.
4. Tulis **laporan investigasi 1 halaman** untuk tiap case (latih dokumentasi — ini skill yang dinilai di kerja nyata).

> Tujuannya bukan "jawaban benar", tapi melatih **cara berpikir**: menyusun cerita dari data, memakai framework (ATT&CK, kill chain, NIST), dan mengambil keputusan.

## Daftar case (urut dari mudah ke sulit)

| # | Case | Fokus skill |
| --- | --- | --- |
| 01 | [Phishing Email](case-01-phishing.md) | Analisis header, SPF/DKIM/DMARC, scoping |
| 02 | [Brute Force Login](case-02-brute-force.md) | Log Windows, timeline, deteksi di SIEM |
| 03 | [Data Exfiltration](case-03-data-exfiltration.md) | Log jaringan/firewall, anomali, DNS |
| 04 | [Malware & C2](case-04-malware-c2.md) | Sysmon, process tree, beaconing, ATT&CK |
| 05 | [Payment Fraud](case-05-payment-fraud.md) | Anomali transaksi, ISO 8583, konteks fintech |

## Template laporan (pakai untuk tiap case)

```
JUDUL INSIDEN:
TANGGAL/WAKTU (UTC):
ANALYST:

1. RINGKASAN (1–2 kalimat)
2. TIMELINE (urut waktu)
3. VERDICT: True Positive / False Positive — alasan
4. SEVERITY: Critical/High/Medium/Low — alasan
5. DAMPAK (pilar CIA, aset terdampak)
6. IOC (tipe | nilai | sumber)
7. MITRE ATT&CK (taktik/teknik)
8. TINDAKAN (containment/eradication/recovery)
9. REKOMENDASI
```
