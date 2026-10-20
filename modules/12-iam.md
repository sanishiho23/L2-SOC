# Modul 12 — Identity & Access Management (IAM)

> JD ALTO: "integrate IAM solutions with enterprise applications". IAM menjawab: *siapa kamu, boleh akses apa, dan bagaimana dibuktikan.* Fondasi keamanan modern — banyak breach berawal dari identitas yang lemah.

---

## Bagian 1 — Inti IAM: Authentication vs Authorization

### 🎯 Analogi

Masuk hotel:
- **Authentication** = resepsionis memastikan kamu memang tamu yang reservasi (tunjuk KTP). *Siapa kamu?*
- **Authorization** = kartu kamarmu hanya membuka kamarmu & gym, bukan kamar orang lain atau ruang server. *Kamu boleh ke mana?*
- **Accounting/Audit** = CCTV & log pintu mencatat ke mana kamu pergi.

### 📖 Penjelasan

**IAM** = kerangka kebijakan + teknologi untuk memastikan orang yang tepat mengakses sumber daya yang tepat, pada waktu yang tepat, dengan alasan yang tepat. Tiga pilar: **Authentication, Authorization, Accounting** (AAA — ingat Modul 01).

**Faktor autentikasi** (makin banyak faktor = makin kuat = MFA):
- **Sesuatu yang kamu tahu** — password, PIN.
- **Sesuatu yang kamu punya** — OTP token, HP, security key (FIDO2/YubiKey).
- **Sesuatu yang kamu adalah** — biometrik (sidik jari, wajah).

> **MFA** (Multi-Factor Authentication) menggabungkan ≥2 faktor berbeda. Ini salah satu kontrol **paling efektif** mencegah account takeover — bahkan kalau password bocor (ingat Case 01), penyerang masih terhalang faktor kedua.

---

## Bagian 2 — Model otorisasi

### 📖 Penjelasan

Bagaimana menentukan "boleh akses apa"?

| Model | Cara | Contoh |
| --- | --- | --- |
| **RBAC** (Role-Based) | Akses berdasarkan **peran** | "Teller" boleh lihat saldo; "Admin" boleh semua |
| **ABAC** (Attribute-Based) | Berdasarkan **atribut** (user, resource, konteks) | Boleh akses jika departemen=finance DAN jam kerja DAN dari kantor |
| **PoLP** (Least Privilege) | Prinsip: beri **seminimal** mungkin | User biasa tak dapat hak admin |
| **DAC/MAC** | Discretionary / Mandatory Access Control | Pemilik file atur akses / sistem paksa label keamanan |

**Konsep operasional penting:**
- **Provisioning & deprovisioning** — beri akses saat onboarding, **cabut saat offboarding** (akun mantan karyawan yang tak dicabut = risiko besar).
- **Joiner-Mover-Leaver (JML)** — kelola akses sepanjang siklus hidup karyawan.
- **Access review / recertification** — audit berkala: apakah orang masih butuh akses yang dimilikinya?
- **Segregation of Duties (SoD)** — pisahkan tugas sensitif agar satu orang tak bisa menyalahgunakan (mis. yang membuat pembayaran ≠ yang menyetujui). Penting di payment & compliance.
- **PAM** (Privileged Access Management) — kontrol ketat akun istimewa (admin, root): vault password, akses sementara (JIT), rekam sesi.

---

## Bagian 3 — SSO, federasi & protokol

### 🎯 Analogi

**SSO (Single Sign-On)** = gelang masuk festival. Login sekali di gerbang, lalu bebas masuk semua panggung tanpa antre tiket lagi. Nyaman + terpusat (mudah cabut kalau gelang hilang).

### 📖 Penjelasan — protokol yang wajib dikenal

| Protokol | Untuk | Catatan |
| --- | --- | --- |
| **SAML** | SSO enterprise (web) | Berbasis XML, umum di aplikasi korporat |
| **OAuth 2.0** | **Otorisasi** (delegasi akses) | "Izinkan app X akses data Y-mu" — bukan untuk autentikasi |
| **OpenID Connect (OIDC)** | **Autentikasi** di atas OAuth 2.0 | "Login with Google" |
| **LDAP / Active Directory** | Direktori identitas on-prem | AD = implementasi Microsoft, pakai Kerberos/NTLM |
| **Kerberos** | Autentikasi berbasis tiket di AD | Serangan: Kerberoasting, Golden Ticket |

> Jebakan interview: **OAuth ≠ autentikasi.** OAuth adalah **otorisasi** (memberi app izin akses resource). **OIDC** adalah lapisan autentikasi di atasnya. Banyak orang keliru.

**Identity Provider (IdP)** = sistem yang mengelola & memverifikasi identitas (Okta, Azure AD/Entra ID, Keycloak, Google). Aplikasi (Service Provider) mempercayai IdP → inilah yang dimaksud "integrasi IAM dengan aplikasi enterprise" di JD.

---

## Bagian 4 — Serangan terkait identitas & pertahanannya

### 📖 Penjelasan

| Serangan | Inti | Pertahanan |
| --- | --- | --- |
| Credential stuffing | Pakai bocoran user:pass | MFA, deteksi login anomali |
| Password spraying | 1 password umum ke banyak akun | MFA, lockout, password policy |
| Phishing MFA / MFA fatigue | Bombardir push sampai user klik approve | Number matching, FIDO2 phishing-resistant |
| Privilege escalation | Naik jadi admin | PoLP, PAM, monitoring 4672/4728 |
| Pass-the-Hash / Kerberoasting | Curi hash/tiket di AD | Tiering, PAM, LAPS, monitoring |
| Standing/orphan accounts | Akun tak terpakai/mantan karyawan | Deprovisioning, access review |

> Mayoritas serangan modern "login, bukan break-in" — penyerang masuk pakai kredensial sah (T1078 Valid Accounts). Karena itu identitas = perimeter baru, dan **Zero Trust** ("jangan percaya, selalu verifikasi") berpusat pada IAM.

---

## 🧠 Cek pemahaman (tes Feynman)

1. Beda authentication & authorization — pakai analogi selain hotel.
2. Sebut 3 faktor autentikasi + contoh. Kenapa MFA begitu efektif melawan account takeover?
3. Beda RBAC dan ABAC dengan contoh di perusahaan payment.
4. Kenapa deprovisioning (cabut akses mantan karyawan) sepenting pemberian akses?
5. Jelaskan beda OAuth 2.0 dan OpenID Connect. Mana autentikasi, mana otorisasi?
6. Apa itu Segregation of Duties, dan kenapa krusial di lingkungan keuangan?
7. Kenapa "identitas adalah perimeter baru" dan bagaimana kaitannya dengan Zero Trust?

---

## 🧪 Praktik

1. Install **Keycloak** (IdP open source) di VM via Docker. Buat realm, user, role (RBAC). Hubungkan satu aplikasi contoh via OIDC — rasakan SSO.
2. Aktifkan MFA di akun GitHub/Google-mu pakai authenticator app; pahami alur OTP.
3. Di Windows AD lab (atau baca): petakan user→group→permission (RBAC). Coba logon type & event 4672.
4. Gambar diagram alur **OIDC "Login with Google"**: user, app, IdP, token.
5. Buat tabel JML sederhana: apa yang terjadi pada akses saat seseorang join, pindah divisi, dan resign.

---

## ➡️ Lanjut

Identitas & kripto mengamankan akses. Sekarang amankan aplikasinya sendiri: **[Modul 13 — AppSec & OWASP Top 10](13-appsec-owasp.md)**.
