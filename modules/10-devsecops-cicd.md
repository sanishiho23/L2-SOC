# Modul 10 — DevSecOps & CI/CD Security

> **Track Security Engineering.** JD ALTO menekankan "integrasi security ke SDLC & DevOps" dan "CI/CD dengan kontrol keamanan". Ini inti modul ini. Fokusnya **membangun keamanan**, bukan memantau serangan.

---

## Bagian 1 — Apa itu DevSecOps?

### 🎯 Analogi

Bayangkan pabrik mobil. Dulu, mobil dirakit dulu sampai jadi, baru di ujung ada satu inspektur cek keamanan (dan sering menolak, bikin rework mahal). **DevSecOps** = menaruh **inspektur kecil di setiap tahap perakitan**, bahkan robot otomatis yang cek tiap komponen begitu dipasang. Masalah ketahuan lebih dini, lebih murah diperbaiki.

### 📖 Penjelasan

- **SDLC** (Software Development Life Cycle) = tahapan membuat software: plan → code → build → test → release → deploy → operate → monitor.
- **DevOps** = menyatukan Development + Operations agar rilis cepat & otomatis (lewat CI/CD).
- **DevSecOps** = menyisipkan **Security** di setiap tahap, otomatis. Prinsip utamanya **"shift left"** — geser pemeriksaan keamanan ke sedini mungkin (kiri = awal pipeline).

> **Kenapa "shift left"?** Bug keamanan yang ketemu saat coding mungkin biaya $1 untuk perbaiki; yang ketemu setelah rilis ke produksi bisa $100+ (dan bisa jadi breach). Makin dini = makin murah & aman.

---

## Bagian 2 — CI/CD pipeline

### 🎯 Analogi

**CI/CD = ban berjalan otomatis** dari kode developer sampai ke server produksi. Developer taruh kode → ban berjalan otomatis: tes, bangun, periksa, kirim. Tanpa dorong manual.

### 📖 Penjelasan

- **CI (Continuous Integration)** — setiap kali developer push kode, sistem otomatis **build + test**. Tujuan: deteksi masalah integrasi cepat.
- **CD (Continuous Delivery/Deployment)** — kode yang lolos otomatis disiapkan/di-deploy ke staging/produksi.
- **Tools** (disebut di JD): **Jenkins**, **GitLab CI/CD** (file `.gitlab-ci.yml`), **GitHub Actions**, **Ansible** (otomasi konfigurasi/deployment).

Contoh pipeline sederhana (GitLab CI):
```yaml
stages: [build, test, security, deploy]

build:
  stage: build
  script: ["make build"]

unit-test:
  stage: test
  script: ["make test"]

sast-scan:                 # ← kontrol keamanan di pipeline
  stage: security
  script: ["semgrep --config auto ."]

deploy-prod:
  stage: deploy
  script: ["ansible-playbook deploy.yml"]
  only: [main]
```

---

## Bagian 3 — Kontrol keamanan DALAM pipeline (inti JD)

### 📖 Penjelasan — jenis pemeriksaan otomatis

| Kontrol | Apa yang diperiksa | Kapan di pipeline | Tool contoh |
| --- | --- | --- | --- |
| **SAST** (Static App Security Testing) | Baca **kode sumber** cari pola rentan (tanpa menjalankan) | Saat commit/build | Semgrep, SonarQube, Checkmarx |
| **DAST** (Dynamic) | Serang **aplikasi yang berjalan** dari luar | Setelah deploy ke staging | OWASP ZAP, Burp |
| **SCA** (Software Composition Analysis) | Cek **library/dependensi** pihak ketiga yang punya CVE | Saat build | Dependabot, Snyk, Trivy, OWASP Dependency-Check |
| **Secret scanning** | Cari **password/API key** yang tak sengaja ter-commit | Saat commit | gitleaks, trufflehog |
| **IaC scanning** | Cek konfigurasi infra (Terraform, k8s, Dockerfile) salah/rentan | Saat build | Checkov, tfsec, kube-bench |
| **Container scanning** | Cek image Docker dari CVE & misconfig | Saat build | Trivy, Grype, Clair |

> **Mnemonik:** SAST baca *resep* (kode), DAST cicipi *masakan jadi* (app running), SCA cek *bahan beli dari luar* (dependensi).

### 🔑 Konsep penting lain

- **Secrets management** — password/kunci JANGAN ditulis di kode. Pakai vault: **HashiCorp Vault**, AWS Secrets Manager, GitLab CI variables. (Kaitan ke Modul 11 kripto.)
- **Supply chain security** — serangan via dependensi/pipeline (contoh terkenal: SolarWinds, Log4Shell/CVE-2021-44228). SCA & SBOM (Software Bill of Materials) melawan ini.
- **Least privilege di pipeline** — runner/service account hanya punya hak seperlunya; kredensial deploy disimpan aman.
- **Signed commits & artifacts** — pastikan kode & build tidak dipalsukan (sigstore, cosign).

---

## Bagian 4 — Operational security: patch & endpoint management

> JD menyebut "patch management" dan "endpoint management" — masuk ranah security engineering/IT ops.

### 📖 Penjelasan

- **Patch management** = proses memastikan semua sistem punya update/patch keamanan terbaru. Siklus: **inventarisasi aset → pantau kerentanan (CVE) → uji patch → deploy → verifikasi**. Tanpa ini, CVE lama jadi pintu masuk (mis. EternalBlue/WannaCry memanfaatkan sistem belum di-patch).
  - Tools: WSUS/SCCM (Windows), Ansible, Intune, package manager (apt/yum) + automation.
  - Tantangan: patch bisa merusak aplikasi → butuh **uji di staging** dulu. Di payment, uptime kritikal, jadi patching terjadwal & hati-hati.
- **Endpoint management** = kelola konfigurasi, software, & kepatuhan semua endpoint terpusat (MDM/UEM seperti Intune, Jamf). Termasuk: enforce disk encryption, policy, inventory.
- **Vulnerability management** (saudara patch management): scan rutin (Nessus, OpenVAS, Qualys) → prioritas berdasarkan **CVSS** + eksposur → remediasi → verifikasi.

### 🛡️ Kaitan ke ALTO

Infrastruktur payment harus patuh **PCI DSS**, yang mewajibkan: patch tepat waktu (Req 6), kontrol akses, enkripsi, logging. DevSecOps + patch management = cara memenuhi ini secara terukur & berulang.

---

## 🧠 Cek pemahaman (tes Feynman)

1. Jelaskan DevSecOps & "shift left" pakai analogi sendiri. Kenapa lebih murah menemukan bug keamanan lebih dini?
2. Beda CI dan CD dengan kata sendiri.
3. Beda SAST, DAST, dan SCA — pakai analogi resep/masakan/bahan. Kapan tiap satu jalan di pipeline?
4. Kenapa secret (API key) tidak boleh ditulis di kode, dan apa alternatifnya?
5. Apa itu supply chain attack? Beri satu contoh nyata.
6. Jelaskan siklus patch management. Kenapa patching di lingkungan payment harus hati-hati?

---

## 🧪 Praktik

1. Buat repo GitHub kecil, tambahkan **GitHub Actions** workflow yang menjalankan **gitleaks** (secret scan) + **Semgrep** (SAST) tiap push. Lihat laporannya.
2. Jalankan **Trivy** pada sebuah Docker image (`trivy image nginx:latest`) — baca daftar CVE.
3. Tulis `.gitlab-ci.yml` atau GitHub Actions dengan stage build→test→security→deploy (boleh dummy).
4. Jalankan **OWASP ZAP** (DAST) terhadap aplikasi latihan rentan (OWASP Juice Shop) di VM.
5. Pelajari satu CVE terbaru dari NVD, tentukan skor CVSS-nya dan sistem apa yang terdampak.

---

## ➡️ Lanjut

Secrets & "enkripsi" terus muncul di atas. Dalami fondasinya: **[Modul 11 — Cryptography & PKI](11-cryptography-pki.md)**.
