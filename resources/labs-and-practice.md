# Lab & Latihan Berkelanjutan

Teori saja tidak cukup. SOC adalah skill otot — dilatih dengan tangan. Berikut cara berlatih, dari gratis sampai bangun lab sendiri.

---

## 1. Platform latihan online (mulai dari sini)

| Platform | Gratis? | Untuk |
| --- | --- | --- |
| [TryHackMe — SOC Level 1](https://tryhackme.com/path/outline/soclevel1) | Freemium | Jalur SOC lengkap: phishing, SIEM, Sysmon, threat intel |
| [LetsDefend](https://letsdefend.io/) | Freemium | Simulasi alert SOC seperti kerja nyata (tangani tiket) |
| [Blue Team Labs Online](https://blueteamlabs.online/) | Freemium | Challenge investigasi & forensik blue team |
| [CyberDefenders](https://cyberdefenders.org/) | Gratis banyak | Blue team CTF, analisis PCAP & log |
| [RangeForce](https://www.rangeforce.com/) | Trial | Latihan defensif berbasis skenario |
| [Elastic — Detection Rules repo](https://github.com/elastic/detection-rules) | Gratis | Baca rule nyata, belajar cara penulisannya |

**Saran urutan:** TryHackMe SOC L1 (fondasi berstruktur) → LetsDefend (rasakan alur alert sungguhan) → CyberDefenders (perdalam).

---

## 2. Bangun home lab sendiri (paling berharga)

Kamu sudah punya **VirtualBox** — manfaatkan. Target: satu lab kecil tempat kamu menyerang & mendeteksi sendiri.

### Lab minimal (Elastic + Windows + Sysmon)

```
┌─────────────────────────────────────────────┐
│  VM 1: Ubuntu (Elastic + Kibana via Docker)  │  ← SIEM
│  VM 2: Windows 10/11 (Sysmon + Elastic Agent)│  ← korban/endpoint
│  VM 3 (opsional): Kali Linux                  │  ← penyerang
│  Semua di jaringan Host-Only (terisolasi!)    │
└─────────────────────────────────────────────┘
```

**Langkah:**
1. Buat 3 VM di jaringan **Host-Only** (terisolasi dari internet publik untuk aktivitas serangan).
2. **VM Ubuntu** — jalankan Elastic + Kibana. Cara cepat pakai Docker:
   ```bash
   # contoh single-node (untuk lab, bukan produksi)
   docker network create elastic
   docker run -d --name es --net elastic -p 9200:9200 \
     -e "discovery.type=single-node" -e "xpack.security.enabled=false" \
     docker.elastic.co/elasticsearch/elasticsearch:8.15.0
   docker run -d --name kib --net elastic -p 5601:5601 \
     -e "ELASTICSEARCH_HOSTS=http://es:9200" \
     docker.elastic.co/kibana/kibana:8.15.0
   ```
   Buka Kibana di `http://<ip-ubuntu>:5601`.
3. **VM Windows** — install **Sysmon** (config [Olaf Hartong](https://github.com/olafhartong/sysmon-modular) atau [SwiftOnSecurity](https://github.com/SwiftOnSecurity/sysmon-config)) + **Elastic Agent** (enroll ke Fleet) atau Winlogbeat → kirim Security + Sysmon log ke Elastic.
4. **VM Kali** (opsional) — sumber "serangan" latihan (brute force SSH/RDP, scan Nmap).

### Latihan di lab
- Brute force RDP/SSH dari Kali → lihat 4625 lalu 4624 di Kibana, buat rule threshold.
- Jalankan PowerShell encoded di Windows → tangkap di Sysmon Event 1, tulis KQL.
- Simulasikan macro doc → `calc.exe` → amati process tree.
- Buat dashboard: top failed logons, top source IP, proses mencurigakan.

> **Alternatif lab jadi:** [DetectionLab](https://github.com/clong/DetectionLab) atau [SIEM From Scratch](https://github.com/) tutorials — tapi membangun manual mengajari lebih banyak.

---

## 3. Dataset log untuk latihan analisis

- [EVTX-ATTACK-SAMPLES](https://github.com/sbousseaden/EVTX-ATTACK-SAMPLES) — log Windows berisi teknik ATT&CK nyata.
- [Security Datasets (OTRF)](https://github.com/OTRF/Security-Datasets) — dataset telemetri serangan siap pakai.
- [Malware-Traffic-Analysis.net](https://www.malware-traffic-analysis.net/) — PCAP + latihan analisis trafik (hati-hati, ada sampel malware nyata — pakai VM terisolasi).
- Kaggle "web server logs" — untuk latihan grep pola serangan web.

---

## 4. Ikuti perkembangan (biasakan)

- **Berita & CVE:** The Hacker News, BleepingComputer, cek CVE kritikal (mis. via NVD).
- **Blog teknis:** Elastic Security Labs, SANS Internet Storm Center, Red Canary (Threat Detection Report tahunan — wajib baca).
- **Komunitas:** r/blueteamsec, Discord/komunitas SOC Indonesia.
- Biasakan satu kebiasaan: tiap minggu, pilih satu teknik ATT&CK baru → pahami → tulis cara mendeteksinya.

---

## 5. Sertifikasi (opsional, untuk nilai tambah)

| Sertifikasi | Level | Catatan |
| --- | --- | --- |
| **CompTIA Security+** | Dasar | Fondasi luas, diakui HR |
| **Cisco CyberOps Associate (CBROPS)** | Dasar–SOC | Fokus operasi SOC |
| **Blue Team Level 1 (BTL1)** | Praktis SOC | Sangat hands-on, relevan L1/L2 |
| **Microsoft SC-200** | SOC (Azure) | Kalau lingkungan Microsoft/Sentinel |
| **GIAC GCIH / GSEC** | Menengah | Mahal, kuat untuk IR |

> Sertifikasi membantu, tapi **portofolio praktik** (write-up case, lab, TryHackMe/LetsDefend progress) sering lebih meyakinkan untuk posisi intern/junior. Simpan write-up-mu di repo ini.

---

## 6. Checklist "siap kerja L2"

- [ ] Nyaman baca log Windows (Event ID) & Linux
- [ ] Bisa tulis query KQL/EQL & buat detection rule di Elastic
- [ ] Punya alur investigasi phishing & malware yang hafal
- [ ] Bisa bangun timeline & tulis laporan insiden jelas
- [ ] Paham MITRE ATT&CK & bisa memetakan serangan
- [ ] Bisa enrichment IOC multi-sumber
- [ ] Sudah tangani 30+ alert latihan (LetsDefend/THM)
- [ ] Punya 5+ write-up case di portofolio

---

⬅️ Kembali ke [README](../README.md) · [Roadmap](../roadmap.md)
