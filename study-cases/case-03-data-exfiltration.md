# Case 03 — Data Exfiltration

**Level:** Menengah · **Skill:** log jaringan/firewall, anomali volume, DNS tunneling · **Modul terkait:** 02, 03, 05

---

## Skenario

Senin 03:05 UTC, rule "Unusual Outbound Data Volume" memicu pada host `WKS-FIN-07` (workstation tim keuangan). Host ini biasanya idle di luar jam kerja. Kamu investigasi apakah ada pencurian data.

## Artefak

**Firewall log (outbound dari WKS-FIN-07 = 10.0.5.207):**
```
02:58:11  10.0.5.207:51233 -> 185.220.101.44:443   ALLOW  bytes_out=4,210,880
03:00:11  10.0.5.207:51240 -> 185.220.101.44:443   ALLOW  bytes_out=4,198,400
03:02:11  10.0.5.207:51251 -> 185.220.101.44:443   ALLOW  bytes_out=4,205,120
03:04:11  10.0.5.207:51260 -> 185.220.101.44:443   ALLOW  bytes_out=4,211,000
(total ~1.2 GB dalam 1 jam, interval ~2 menit, ukuran konsisten)
```

**DNS log WKS-FIN-07 (sebelumnya):**
```
02:55  query: a7f3e9b2c1d8.update-sync-cdn.net  TXT
02:55  query: f2e1d0c9b8a7.update-sync-cdn.net  TXT
02:56  query: 9b8a7f6e5d4c.update-sync-cdn.net  TXT
(ratusan subdomain acak, tipe TXT, domain update-sync-cdn.net)
```

**Sysmon (WKS-FIN-07):**
```
02:50  EventID 1  Image=C:\Users\fin07\AppData\Local\Temp\svchost.exe  ParentImage=C:\...\outlook.exe
02:52  EventID 11 File created: C:\Users\fin07\AppData\Local\Temp\data.zip
02:58  EventID 3  svchost.exe -> 185.220.101.44:443
```

**Enrichment:** `185.220.101.44` di AbuseIPDB = skor 100%, kategori "C2/Tor exit". Domain `update-sync-cdn.net` dibuat 6 hari lalu (WHOIS).

## Tugasmu

1. Apakah ini exfiltration? Bukti-buktinya?
2. Dua jalur/teknik exfiltration apa yang terlihat?
3. Bagaimana malware ini kemungkinan masuk? (lihat parent process)
4. Timeline + ATT&CK.
5. Severity, dan kenapa `svchost.exe` di `Temp` itu red flag?
6. Tindakan containment.

---

## Panduan analisis

- Firewall: perhatikan **keteraturan interval** & **ukuran konsisten** → sinyal apa?
- Port 443 (HTTPS) — kenapa penyerang suka "sembunyi" di sini?
- DNS: subdomain acak + tipe TXT + domain baru → teknik apa?
- Sysmon: `svchost.exe` asli ada di `System32`, bukan `Temp`. Parent-nya `outlook.exe` → petunjuk masuknya dari mana?
- Enrich IP & domain.

---

<details>
<summary><b>🔑 Kunci jawaban</b></summary>

**1. Ya, exfiltration (data dicuri).** Bukti: ~1.2 GB keluar tengah malam dari host yang harusnya idle, ke IP ber-reputasi C2 (AbuseIPDB 100%), didahului pembuatan `data.zip` (pengumpulan data).

**2. Dua teknik terlihat:**
- **Exfiltration over C2 channel / HTTPS** — transfer ~4 MB tiap 2 menit, ukuran konsisten, ke 185.220.101.44:443. Keteraturan = otomatis (bukan manusia). Ini juga pola **beaconing**.
- **DNS tunneling** — ratusan query TXT dengan subdomain acak ke `update-sync-cdn.net` (domain 6 hari). Data diselundupkan dalam query DNS (sering lolos firewall karena DNS jarang diblok).

**3. Kemungkinan masuk via email/lampiran:** Sysmon menunjukkan `svchost.exe` (palsu) di `Temp` dengan **parent `outlook.exe`** → user kemungkinan membuka lampiran jahat dari email (Delivery → Execution).

**4. Timeline & ATT&CK:**
```
02:50  svchost.exe (palsu) dari Temp, parent outlook → T1566 Phishing (masuk), T1036 Masquerading
02:52  data.zip dibuat                               → T1560 Archive Collected Data
02:55  DNS TXT tunneling                             → T1048/T1071.004 Exfil over DNS / App Layer
02:58+ Transfer 443 ke C2, beaconing teratur         → T1071.001 Web C2, T1041 Exfil over C2
```

**5. Severity: Critical.** Data finansial kemungkinan sudah keluar. `svchost.exe` di `Temp` = red flag karena **svchost asli hanya ada di `C:\Windows\System32`**; nama sah dipakai di lokasi salah = **masquerading** (teknik evasion klasik).

**6. Containment:**
1. **Isolasi `WKS-FIN-07`** segera (EDR) — hentikan transfer yang masih berjalan.
2. **Blok** 185.220.101.44 dan domain `update-sync-cdn.net` di firewall/DNS/proxy.
3. Amankan bukti (memory & disk) sebelum bersihkan — potensi investigasi forensik & kewajiban notifikasi (UU PDP) karena data pribadi mungkin bocor.
4. Tentukan **data apa** yang di `data.zip` → menilai dampak & kewajiban lapor.
5. Cari host lain yang kontak IP/domain sama (scoping). Kill proses, hapus persistence.
6. Eskalasi ke IR lead/manajemen — ini kemungkinan **data breach**.

**Pelajaran:** interval teratur + ukuran konsisten = napas otomatis (beaconing/exfil), bukan browsing manusia. Dan selalu curigai proses bernama sistem yang berjalan dari path non-standar.

</details>

---
➡️ Lanjut: [Case 04 — Malware & C2](case-04-malware-c2.md)
