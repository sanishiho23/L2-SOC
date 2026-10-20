# Modul 14 — Scripting & Automation untuk Security

> JD ALTO menyebut **Python, PowerShell, Bash** berkali-kali, plus "automation frameworks". Scripting = pengganda kekuatan: otomatiskan tugas berulang, olah log, enrich IOC, respon cepat. Kamu tak perlu jadi software engineer — cukup bisa menulis skrip praktis.

---

## Bagian 1 — Kenapa security butuh scripting?

### 🎯 Analogi

Memeriksa 10.000 baris log satu per satu manual = menyapu lapangan bola dengan sikat gigi. **Skrip = mesin penyedot** yang melakukannya dalam detik. Tugas yang berulang, membosankan, dan rawan salah kalau manual → serahkan ke skrip.

### 📖 Kapan pakai bahasa apa

| Bahasa | Paling cocok untuk | Lingkungan |
| --- | --- | --- |
| **Bash** | Olah teks cepat, pipeline, glue command Linux | Server Linux, log |
| **PowerShell** | Otomasi Windows, AD, Event Log, Azure | Windows/enterprise |
| **Python** | Logika kompleks, API, parsing, enrichment, tooling | Lintas platform |

> Aturan praktis: tugas cepat di terminal Linux → Bash; apa pun soal Windows/AD → PowerShell; butuh logika/integrasi/API → Python.

---

## Bagian 2 — Bash untuk analisis log cepat

### 📖 Penjelasan

Senjata utama: `grep` (cari), `awk` (olah kolom), `sort`, `uniq`, `cut`, `wc`, pipe `|`.

```bash
# 10 IP dengan login gagal terbanyak dari auth.log
grep "Failed password" /var/log/auth.log \
  | awk '{print $11}' | sort | uniq -c | sort -nr | head

# Ekstrak semua IP unik dari sebuah log
grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' access.log | sort -u

# Hitung status code dari web log
awk '{print $9}' access.log | sort | uniq -c | sort -nr

# Cari request mencurigakan (SQLi/traversal)
grep -iE "union select|' or |\.\./|<script" access.log
```

> Pola `sort | uniq -c | sort -nr` ("hitung lalu urutkan") adalah teman terbaik analyst — langsung menunjukkan "apa yang paling sering".

---

## Bagian 3 — PowerShell untuk Windows & SOC

### 📖 Penjelasan

```powershell
# Baca 50 event login gagal terakhir
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 50 |
  Select-Object TimeCreated, @{N='User';E={$_.Properties[5].Value}}, @{N='IP';E={$_.Properties[19].Value}}

# Proses dengan koneksi jaringan keluar
Get-NetTCPConnection -State Established |
  Select-Object LocalAddress, RemoteAddress, RemotePort, OwningProcess

# Hash sebuah file (cek IOC)
Get-FileHash -Algorithm SHA256 C:\Temp\suspicious.exe

# Cari proses dari path mencurigakan (Temp)
Get-Process | Where-Object { $_.Path -like "*\Temp\*" }
```

PowerShell penting karena: ia bahasa otomasi Windows/AD **dan** sering disalahgunakan penyerang (ingat `-enc` di Case 02/04) — jadi kamu harus bisa membaca *dan* menulisnya.

---

## Bagian 4 — Python untuk tooling & enrichment

### 📖 Penjelasan

Python unggul saat butuh logika, API, atau parsing terstruktur. Contoh enrichment IOC via API (konsep):

```python
import requests

def check_ip_abuse(ip, api_key):
    r = requests.get(
        "https://api.abuseipdb.com/api/v2/check",
        headers={"Key": api_key, "Accept": "application/json"},
        params={"ipAddress": ip, "maxAgeInDays": 90},
    )
    data = r.json()["data"]
    return {
        "ip": ip,
        "score": data["abuseConfidenceScore"],
        "country": data.get("countryCode"),
        "reports": data["totalReports"],
    }

# Enrich daftar IOC
for ip in ["203.0.113.9", "185.220.101.44"]:
    print(check_ip_abuse(ip, "YOUR_KEY"))
```

Library berguna: `requests` (API), `re` (regex), `json`/`csv` (parsing), `pandas` (analisis data log), `scapy` (paket jaringan). Simpan API key di **environment variable / vault**, jangan hard-code (ingat Modul 10 & 11).

**Ide skrip latihan:** parser log → hitung anomali; bulk-check hash/IP ke VirusTotal/AbuseIPDB; ekstrak IOC dari email; otomatiskan laporan harian.

---

## Bagian 5 — Automation frameworks & SOAR

### 📖 Penjelasan

Scripting individual naik level jadi **otomasi orkestrasi**:

- **Ansible** (disebut JD) — otomasi konfigurasi & deployment berbasis YAML (playbook). Dipakai untuk: terapkan hardening ke banyak server sekaligus, patch, deploy. *Idempotent* (jalankan berkali-kali, hasil sama).
- **CI/CD (Jenkins/GitLab)** — otomasi pipeline (Modul 10).
- **SOAR** (Security Orchestration, Automation & Response) — otomatiskan **playbook respon**: mis. alert phishing masuk → otomatis enrich URL, cek siapa klik, karantina email, buat tiket. Tools: Cortex XSOAR, Shuffle (open source), Tines.

> Konsep kunci: **idempotency** (aman dijalankan berulang), **least privilege** untuk akun otomasi, dan **jangan simpan rahasia di skrip** — pakai vault/secret manager.

Contoh playbook Ansible mini:
```yaml
- hosts: webservers
  become: yes
  tasks:
    - name: Pastikan semua paket terupdate (patching)
      apt: { upgrade: dist, update_cache: yes }
    - name: Nonaktifkan login root via SSH (hardening)
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: '^PermitRootLogin'
        line: 'PermitRootLogin no'
      notify: restart ssh
```

---

## 🧠 Cek pemahaman (tes Feynman)

1. Kapan kamu pilih Bash, PowerShell, atau Python? Beri satu tugas untuk masing-masing.
2. Jelaskan apa yang dilakukan `grep ... | awk '{print $11}' | sort | uniq -c | sort -nr`.
3. Kenapa PowerShell penting dikuasai dari dua sisi (otomasi & deteksi penyalahgunaan)?
4. Kenapa API key tidak boleh di-hard-code dalam skrip? Apa alternatifnya?
5. Apa itu Ansible & "idempotency"? Kenapa berguna untuk patching/hardening massal?
6. Apa itu SOAR, dan beri satu contoh playbook respon yang bisa diotomasi.

---

## 🧪 Praktik

1. **Bash:** ambil sample log, tulis one-liner yang menampilkan 10 IP penyerang teratas. Modifikasi untuk web log.
2. **PowerShell:** tulis skrip yang menarik semua event 4625 hari ini dan mengelompokkan per source IP.
3. **Python:** tulis skrip yang membaca daftar hash dari file `.txt` dan mencetak mana yang ganjil (latihan parsing). Lanjutkan: integrasi ke API VirusTotal (pakai akun gratis).
4. **Ansible:** tulis playbook yang memastikan sebuah paket terinstall & service berjalan di VM.
5. Otomatiskan satu tugas membosankanmu minggu ini dengan skrip — apa pun itu. Itu cara terbaik belajar.

---

## 🎓 Track Security Engineering selesai!

Kamu kini punya dua jalur di repo ini:
- **SOC/Blue Team** (Modul 01–09): deteksi, investigasi, respon.
- **Security Engineering/DevSecOps** (Modul 10–14): bangun & amankan — yang paling cocok dengan **JD ALTO**.

Kembali ke [README](../README.md) untuk peta lengkap, atau latih di [resources/labs-and-practice.md](../resources/labs-and-practice.md).
