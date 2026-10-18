# Case 05 — Payment Fraud (Fintech / Switching)

**Level:** Menengah–Lanjut · **Skill:** anomali transaksi, ISO 8583, konteks payment · **Modul terkait:** 05, 07, 09

> Case ini "berbau" ALTO/fintech. Di SOC payment, kamu tak cuma lihat log IT, tapi juga **log transaksi**. Fokusnya: mengenali pola fraud, bukan exploit teknis klasik.

---

## Sekilas ISO 8583 (konteks)

Transaksi kartu (ATM/EDC) dikirim dalam pesan **ISO 8583**. Field yang relevan untuk analisis:
- **MTI** — jenis pesan (mis. 0100 authorization request, 0110 response).
- **PAN** — nomor kartu (biasanya di-mask: `4617********1234`).
- **Response Code (DE39)** — hasil: `00` approved, `05` do not honor, `51` insufficient funds, `14` invalid card, `54` expired, `55` wrong PIN.
- **Terminal ID / Merchant ID** — asal transaksi.
- **Amount, timestamp, acquirer/issuer**.

---

## Skenario

Kamis 01:40 WIB, dashboard fraud memicu "Spike in Declined Authorizations" dari satu merchant e-commerce `MID-88213`. Tim fraud minta SOC bantu analisis pola. Tentukan apakah ini serangan dan jenisnya.

## Artefak

**Ringkasan log transaksi (switching), 01:30–01:45 WIB:**
```
Terminal: TID-ECOM-01 (MID-88213, merchant e-commerce game top-up)
01:30–01:45: 8,420 authorization request (MTI 0100)
Hasil:
  Response 14 (invalid card)        : 6,210
  Response 54 (expired card)        : 980
  Response 55 (wrong PIN/CVV)       : 410
  Response 00 (APPROVED)            :  120
Amount: 99% transaksi = Rp 10.000–15.000 (nominal kecil, seragam)
PAN: 8,420 nomor kartu BERBEDA, banyak BIN luar negeri
Source IP API merchant: 45.9.x.x (hosting, bukan IP merchant biasa 103.x.x.x)
Kecepatan: ~9 transaksi/detik dari satu terminal
```

**Konteks:** merchant ini biasanya ~200 transaksi/jam di jam itu, rata-rata Rp 50.000+, kartu domestik. Tidak ada maintenance terjadwal.

## Tugasmu

1. Pola apa ini? (petunjuk: banyak kartu beda, nominal kecil, mayoritas gagal, cepat)
2. Mengapa penyerang melakukannya — apa tujuannya?
3. Indikator anomali apa saja yang kamu lihat (bandingkan dengan baseline)?
4. Apa arti 120 transaksi **approved** di tengah ribuan gagal?
5. Severity & siapa yang harus dikoordinasikan?
6. Tindakan — containment di konteks payment.
7. IOC/indikator untuk rule deteksi ke depan.

---

## Panduan analisis

- Banyak **PAN berbeda** + **nominal kecil seragam** + **laju tinggi** + **mayoritas decline** = teknik fraud spesifik. Yang mana?
- Response `14`/`54`/`55` = kartu tidak valid/salah → penyerang **tidak tahu** data lengkap, sedang **menebak/menguji**.
- 120 `00` approved = ? (yang berhasil ditemukan valid)
- Velocity & geografi & IP sumber = menyimpang jauh dari baseline.

---

<details>
<summary><b>🔑 Kunci jawaban</b></summary>

**1. Card testing (carding) — BIN attack.** Penyerang menguji ribuan nomor kartu curian/generated lewat transaksi kecil untuk melihat mana yang masih hidup. Ciri khas: banyak PAN berbeda, nominal kecil seragam, laju tinggi, mayoritas decline.

**2. Tujuan:** memvalidasi kartu mana yang **aktif & valid** (yang dapat response `00`). Kartu yang lolos lalu dijual atau dipakai untuk transaksi besar di tempat lain. Merchant top-up nominal kecil sengaja dipakai karena cepat & jarang memicu kecurigaan per-transaksi.

**3. Anomali vs baseline:**
| Indikator | Baseline | Sekarang |
| --- | --- | --- |
| Volume | ~200/jam | 8.420 / 15 menit |
| Nominal | Rp 50.000+ | Rp 10–15 ribu seragam |
| Kartu | domestik | banyak BIN luar negeri, 8.420 PAN unik |
| Decline rate | rendah | ~98,6% gagal |
| IP API | 103.x (merchant) | 45.9.x (hosting) |
| Velocity | wajar | ~9 tx/detik |

**4. 120 approved = 120 kartu valid "ketemu".** Ini kartu hidup yang kini berisiko disalahgunakan — perlu ditindak (koordinasi issuer untuk blokir/flag).

**5. Severity: High.** Fraud aktif, data kartu nasabah berisiko, reputasi & kewajiban regulasi (BI, PCI DSS). **Koordinasi:** tim **Fraud/Risk**, **issuer bank** (untuk 120 kartu valid), **merchant** (MID-88213), dan **manajemen/compliance** (potensi lapor regulator).

**6. Containment (konteks payment):**
1. **Rate-limit / blokir sementara** terminal `TID-ECOM-01` / `MID-88213` dari pemrosesan sampai jelas.
2. **Blok IP** `45.9.x.x` di API gateway merchant.
3. **Flag 8.420 PAN** yang diuji; prioritaskan 120 yang approved → koordinasi issuer untuk blokir/pantau.
4. Terapkan/periksa kontrol anti-carding: velocity limit per terminal, CAPTCHA/3DS di sisi merchant, deteksi BIN anomali.
5. Dokumentasikan untuk audit & kemungkinan pelaporan regulator; simpan bukti transaksi.

**7. Indikator untuk rule deteksi:**
- Lonjakan authorization request per terminal/merchant di atas baseline (velocity).
- Rasio decline tinggi (mis. >80%) dengan banyak PAN unik dalam jendela singkat.
- Nominal kecil seragam + banyak BIN asing.
- Request dari IP/ASN tak dikenal untuk merchant itu.

Logika rule (pseudo): `WHERE event=auth_request | STATS unique_pan=COUNT_DISTINCT(pan), declines=COUNT(response!=00), total=COUNT(*) BY terminal_id, window=5m | WHERE total>1000 AND declines/total>0.8 AND unique_pan>500`.

**Pelajaran:** di SOC fintech, "serangan" sering berupa **penyalahgunaan transaksi yang sah secara teknis**. Deteksi bertumpu pada **anomali vs baseline** (volume, nominal, velocity, geografi), bukan payload exploit. Inilah kenapa paham bisnis payment = nilai tambah besar di ALTO.

</details>

---

## 🎓 Sudah selesai 5 case?

Kamu sudah melatih seluruh alur: dari phishing, brute force, exfiltration, malware/C2, sampai fraud payment. Langkah berikutnya: **praktik berkelanjutan** di lab & platform — lihat [resources/labs-and-practice.md](../resources/labs-and-practice.md).

Tulis laporan untuk tiap case dan simpan di repo ini (buat folder `my-reports/`) sebagai portofolio belajarmu.
