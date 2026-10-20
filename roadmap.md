# Roadmap & Checklist Progres

Centang (`- [x]`) sambil jalan. Target realistis: **1 modul per 2–4 hari** kalau sambil kuliah/kerja. Total ±6–8 minggu untuk tuntas + study case.

---

## Fase 1 — Fondasi (Minggu 1–2)

### Modul 01 — Foundations
- [ ] Bisa jelaskan beda hardware, OS, dan aplikasi pakai analogi sendiri
- [ ] Bisa jelaskan cara data pindah dari satu komputer ke komputer lain (high level)
- [ ] Hafal + paham **CIA Triad** dan **AAA**
- [ ] Bisa bedakan **vulnerability, threat, risk**
- [ ] Tahu beda **autentikasi vs otorisasi**

### Modul 02 — Networking
- [ ] Bisa sebut 7 layer OSI dan contoh tiap layer
- [ ] Paham **TCP 3-way handshake** dan beda TCP vs UDP
- [ ] Hafal minimal 15 **port penting**
- [ ] Paham **DNS, DHCP, ARP, NAT**
- [ ] Tahu beda **IDS vs IPS**, firewall stateful vs stateless
- [ ] Bisa baca output `netstat` / `ss` dan tahu artinya

---

## Fase 2 — Investigasi Inti (Minggu 3–5)

### Modul 03 — Logs & Log Analysis
- [ ] Bisa jelaskan "apa itu log" dan kenapa jadi napas SOC
- [ ] Hafal Event ID Windows penting (4624, 4625, 4688, 4720, 1102, 7045)
- [ ] Tahu lokasi & isi log Linux (`auth.log`, `syslog`)
- [ ] Bisa kenali pola serangan di log web (SQLi, XSS, path traversal)

### Modul 04 — SIEM & Elastic
- [ ] Bisa jelaskan alur **log → ingest → normalisasi → korelasi → alert**
- [ ] Paham komponen **ELK stack** (Elasticsearch, Logstash/Beats, Kibana)
- [ ] Bisa tulis query **KQL** dan **Lucene** dasar di Kibana
- [ ] Paham **ECS** (Elastic Common Schema) — kenapa field dinormalisasi
- [ ] Bisa baca/buat **detection rule** sederhana
- [ ] Bisa jelaskan beda **EQL** untuk korelasi urutan event

### Modul 05 — Threat Landscape
- [ ] Bisa jelaskan **MITRE ATT&CK** (taktik vs teknik) dengan kata sendiri
- [ ] Hafal 14 taktik ATT&CK secara garis besar
- [ ] Bisa petakan sebuah serangan ke **Cyber Kill Chain**
- [ ] Paham **Pyramid of Pain**
- [ ] Bisa jelaskan 8+ jenis serangan umum

---

## Fase 3 — Spesialisasi & Respon (Minggu 6–7)

### Modul 06 — Phishing Analysis
- [ ] Bisa baca **email header** lengkap dan tahu urutannya
- [ ] Paham **SPF, DKIM, DMARC** dan cara verifikasinya
- [ ] Punya workflow investigasi phishing dari A–Z
- [ ] Tahu cara analisis URL & lampiran **dengan aman** (sandbox)

### Modul 07 — Incident Response
- [ ] Hafal 6 fase **NIST SP 800-61**
- [ ] Bisa jelaskan beda tugas **L1, L2, L3**
- [ ] Paham **triage**, **severity**, dan kapan **eskalasi**
- [ ] Tahu teknik **containment** dasar
- [ ] Paham metrik **MTTD, MTTR**

### Modul 08 — Endpoint & EDR
- [ ] Paham apa itu telemetri endpoint
- [ ] Bisa baca **Sysmon** event penting (1, 3, 11, 13)
- [ ] Paham cara kerja **EDR** dan beda dengan antivirus
- [ ] Tahu konsep **process tree** dan parent-child

### Modul 09 — Threat Intel & IOC
- [ ] Bisa bedakan **IOC vs IOA**
- [ ] Hafal tools enrichment (VirusTotal, AbuseIPDB, URLScan, MISP)
- [ ] Paham **TLP** (Traffic Light Protocol)
- [ ] Bisa lakukan enrichment IOC end-to-end

---

## Fase 3.5 — Security Engineering Track (paling cocok JD ALTO)

> Track B (Modul 10–14). Boleh dikerjakan paralel dengan Track A — ini yang paling ditanyakan untuk posisi ALTO.

### Modul 10 — DevSecOps & CI/CD
- [ ] Bisa jelaskan DevSecOps & "shift left"
- [ ] Paham CI vs CD, dan tools (Jenkins/GitLab/Ansible)
- [ ] Bisa bedakan SAST, DAST, SCA, secret scanning
- [ ] Paham patch management & vulnerability management

### Modul 11 — Cryptography & PKI
- [ ] Bisa bedakan encoding, hashing, encryption
- [ ] Paham simetris vs asimetris, dan kenapa TLS pakai keduanya
- [ ] Paham data at rest / in transit / in use
- [ ] Bisa jelaskan sertifikat digital, chain of trust, tanda tangan digital
- [ ] Paham pentingnya manajemen kunci (HSM, rotasi)

### Modul 12 — IAM
- [ ] Bisa bedakan authentication vs authorization
- [ ] Paham MFA & faktor autentikasi
- [ ] Paham RBAC vs ABAC, least privilege, SoD
- [ ] Bisa bedakan OAuth 2.0 vs OIDC vs SAML
- [ ] Paham deprovisioning & access review

### Modul 13 — AppSec & OWASP Top 10
- [ ] Hafal + paham minimal 7 dari OWASP Top 10
- [ ] Bisa jelaskan SQLi, XSS, CSRF, IDOR + pencegahannya
- [ ] Paham prepared statements, output encoding, CSP

### Modul 14 — Scripting & Automation
- [ ] Bisa tulis Bash untuk analisis log (grep/awk/sort/uniq)
- [ ] Bisa tulis PowerShell dasar untuk Event Log & proses
- [ ] Bisa tulis Python dasar untuk parsing/enrichment (API)
- [ ] Paham Ansible (idempotency) & konsep SOAR

---

## Fase 4 — Praktik (Minggu 8+)

### Study Cases
- [ ] [Case 01 — Phishing Email](study-cases/case-01-phishing.md)
- [ ] [Case 02 — Brute Force Login](study-cases/case-02-brute-force.md)
- [ ] [Case 03 — Data Exfiltration](study-cases/case-03-data-exfiltration.md)
- [ ] [Case 04 — Malware & C2](study-cases/case-04-malware-c2.md)
- [ ] [Case 05 — Payment Fraud (fintech)](study-cases/case-05-payment-fraud.md)

### Latihan berkelanjutan
- [ ] Selesaikan TryHackMe **SOC Level 1** path
- [ ] Tangani 20+ alert di **LetsDefend**
- [ ] Bangun **home lab** (Elastic + Windows VM + Sysmon) — lihat [resources](resources/labs-and-practice.md)
- [ ] (Opsional) Ambil sertifikasi: **Security+**, **CyberOps Associate (CBROPS)**, atau **BTL1**

---

## Cara mengukur "sudah paham"

Kamu dianggap lulus satu modul kalau bisa menjawab **semua pertanyaan "Cek pemahaman"** di modul itu *tanpa membuka catatan*, dengan kata-katamu sendiri. Kalau masih baca contekan → belum lulus, ulangi.
