# Case 01 — Phishing Email

**Level:** Pemula · **Skill:** header analysis, SPF/DKIM/DMARC, scoping · **Modul terkait:** 06, 09

---

## Skenario

Jumat 14:32 WIB, seorang staf keuangan, Dinda, melaporkan ke helpdesk: *"Saya dapat email dari 'BCA' minta verifikasi akun, saya sudah klik link-nya dan... kayaknya saya masukin user sama password internet banking."* Alert juga muncul di SIEM: akses ke domain baru dari workstation Dinda. Kamu L2 yang menangani.

## Artefak

**Email header (dipangkas):**
```
From: "BCA Security" <security@bca-verifikasi.com>
Reply-To: no-reply@mail-secure.ru
Return-Path: <bounce@bca-verifikasi.com>
To: dinda@perusahaan.co.id
Subject: [PENTING] Verifikasi Akun Anda dalam 24 Jam atau Diblokir
Date: Fri, 18 Oct 2026 07:31:58 +0000
Message-ID: <9f2a@bca-verifikasi.com>
Received: from vps-889.hostingmurah.ru (203.0.113.77) by mx.perusahaan.co.id; Fri, 18 Oct 2026 07:32:01 +0000
Authentication-Results: mx.perusahaan.co.id;
  spf=fail (domain bca-verifikasi.com does not designate 203.0.113.77 as permitted sender);
  dkim=none;
  dmarc=fail (p=none)
```

**Isi email (ringkas):** "Nasabah yang terhormat, sistem kami mendeteksi aktivitas mencurigakan. Verifikasi sekarang: `http://bca-verifikasi.com/login` atau akun diblokir dalam 24 jam."

**Proxy log workstation Dinda:**
```
18/Oct/2026:14:32:10 +0700  10.0.5.21  GET  http://bca-verifikasi.com/login       200
18/Oct/2026:14:32:45 +0700  10.0.5.21  POST http://bca-verifikasi.com/submit      200
```

**SIEM — login internet banking (dari feed bank, simulasi):**
```
18/Oct/2026 14:40  user=dinda.pribadi  login=SUCCESS  src_ip=45.146.x.x (Rusia)
```

## Tugasmu (jawab sebelum buka kunci)

1. Apakah ini phishing? Bukti teknis apa yang mendukung?
2. Apakah serangan **berhasil**? Dari mana kamu tahu?
3. Buat timeline singkat.
4. Daftar IOC.
5. Tentukan severity & dampak (pilar CIA).
6. 5 tindakan pertamamu, urut.
7. Scoping: apa yang kamu cari untuk tahu korban lain?

---

## Panduan analisis

- Bandingkan **From vs Reply-To vs Return-Path**. Ada yang janggal?
- Lihat domain `bca-verifikasi.com` — apakah domain resmi BCA? Cek **WHOIS** (umur domain).
- Baca **Authentication-Results**: SPF/DKIM/DMARC statusnya apa?
- Received dari host apa, negara mana?
- Proxy log: Dinda cuma GET (lihat) atau juga POST (kirim data)?
- Login banking: dari IP mana, wajar?

---

<details>
<summary><b>🔑 Kunci jawaban (buka setelah selesai)</b></summary>

**1. Phishing? Ya — kuat.**
- Domain `bca-verifikasi.com` bukan domain resmi BCA (typosquat/lookalike), kemungkinan baru dibuat.
- **SPF=fail, DKIM=none, DMARC=fail** — gagal semua autentikasi.
- **Reply-To ke domain .ru** berbeda dari From → balasan diarahkan ke penyerang.
- Received dari `hostingmurah.ru` (203.0.113.77), hosting murah di Rusia.
- Isi: urgensi + ancaman + minta kredensial = taktik klasik.

**2. Berhasil? Ya.**
- Proxy menunjukkan **POST** ke `/submit` → Dinda mengirim data (bukan cuma melihat).
- SIEM: login internet banking **SUCCESS dari IP Rusia (45.146.x.x)** → kredensial dipakai penyerang. Kredensial bocor & disalahgunakan.

**3. Timeline (UTC+7):**
```
14:32:10  Dinda akses halaman phishing (GET)
14:32:45  Dinda submit kredensial (POST)
14:40     Penyerang login banking dari IP Rusia (SUCCESS)
```

**4. IOC:**
| Tipe | Nilai |
| --- | --- |
| Sender | security@bca-verifikasi.com |
| Reply-To | no-reply@mail-secure.ru |
| Domain | bca-verifikasi.com |
| URL | http://bca-verifikasi.com/login, /submit |
| IP pengirim | 203.0.113.77 |
| IP login jahat | 45.146.x.x |

**5. Severity: High/Critical.** Kredensial finansial bocor & sudah dipakai. Pilar: **Confidentiality** (kredensial bocor), berpotensi **Integrity** (transaksi penipuan).

**6. Tindakan (urut):**
1. Hubungi Dinda → segera **ganti password** internet banking & semua akun yang pakai password sama; aktifkan/periksa MFA.
2. Minta Dinda **hubungi bank** untuk blokir/pantau akun (potensi transaksi penipuan).
3. **Blok** domain/URL/IP (`bca-verifikasi.com`, 203.0.113.77, mail-secure.ru) di proxy, firewall, email gateway.
4. **Karantina/hapus** email dari semua mailbox.
5. Dokumentasikan case + IOC; eskalasi ke L3/IR lead karena ada kompromi nyata.

**7. Scoping:** cari di mail gateway/SIEM email dengan subject/sender/URL sama → siapa lagi menerima & klik. Query contoh:
```kql
url.domain : "bca-verifikasi.com" or email.from.address : "security@bca-verifikasi.com"
```

**MITRE ATT&CK:** T1566.002 (Phishing: Spearphishing Link), T1078 (Valid Accounts — kredis dipakai).

</details>

---
➡️ Lanjut: [Case 02 — Brute Force](case-02-brute-force.md)
