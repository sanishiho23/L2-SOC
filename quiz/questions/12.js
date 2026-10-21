window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["12"] = {
  title: "Identity & Access Management",
  pass: 80,
  questions: [
    { q: "Authentication vs Authorization: mana yang benar?",
      options: [
        "Authentication = boleh akses apa; Authorization = siapa kamu",
        "Authentication = membuktikan siapa kamu; Authorization = menentukan boleh akses apa",
        "Keduanya sama",
        "Authentication hanya pakai biometrik"
      ], answer: 1,
      explain: "AuthN = identitas (siapa kamu). AuthZ = hak akses (boleh apa) setelah identitas terbukti." },
    { q: "MFA (Multi-Factor Authentication) menggabungkan?",
      options: [
        "Dua password berbeda",
        "≥2 faktor BERBEDA (mis. password + OTP/biometrik)",
        "Dua username",
        "Password lama dan baru"
      ], answer: 1,
      explain: "MFA = minimal dua faktor berbeda jenis (tahu/punya/adalah) — tetap aman walau password bocor." },
    { q: "Model akses berdasarkan PERAN (mis. 'Teller', 'Admin') disebut?",
      options: ["ABAC", "RBAC (Role-Based Access Control)", "MAC", "DAC"],
      answer: 1,
      explain: "RBAC memberi akses berdasarkan peran. ABAC berdasarkan atribut/konteks." },
    { q: "Kenapa deprovisioning (mencabut akses saat karyawan keluar) penting?",
      options: [
        "Agar hemat lisensi saja",
        "Akun mantan karyawan yang tidak dicabut (orphan account) bisa jadi pintu masuk penyerang",
        "Tidak penting",
        "Hanya formalitas HR"
      ], answer: 1,
      explain: "Orphan/standing account adalah risiko besar; perlu deprovisioning & access review berkala." },
    { q: "Pernyataan yang benar tentang OAuth 2.0 vs OpenID Connect (OIDC)?",
      options: [
        "OAuth 2.0 = autentikasi; OIDC = otorisasi",
        "OAuth 2.0 = otorisasi (delegasi akses); OIDC = lapisan autentikasi di atas OAuth 2.0",
        "Keduanya untuk enkripsi",
        "OIDC menggantikan TLS"
      ], answer: 1,
      explain: "OAuth = otorisasi (izin akses resource). OIDC menambah autentikasi ('Login with Google') di atasnya." },
    { q: "'Segregation of Duties (SoD)' di lingkungan keuangan berarti?",
      options: [
        "Satu orang menangani seluruh proses agar cepat",
        "Memisahkan tugas sensitif (mis. pembuat pembayaran ≠ penyetuju) agar tak bisa disalahgunakan satu orang",
        "Memberi semua orang hak admin",
        "Menghapus audit"
      ], answer: 1,
      explain: "SoD mencegah penyalahgunaan dengan memisahkan tugas kritikal ke orang berbeda." },
    { q: "PAM (Privileged Access Management) berfokus pada?",
      options: [
        "Mengelola akun biasa",
        "Kontrol ketat akun istimewa (admin/root): vault password, akses sementara (JIT), rekam sesi",
        "Membuat website",
        "Mengatur jadwal rapat"
      ], answer: 1,
      explain: "PAM melindungi akun berhak tinggi yang paling diincar penyerang." },
    { q: "Banyak serangan modern bersifat 'login, bukan break-in'. Artinya?",
      options: [
        "Penyerang selalu meledakkan firewall",
        "Penyerang masuk memakai kredensial sah yang dicuri (T1078 Valid Accounts) — identitas jadi perimeter baru",
        "Penyerang tidak butuh password",
        "Semua serangan berasal dari dalam"
      ], answer: 1,
      explain: "Kredensial curian membuat penyerang 'login' seperti user sah; karena itu IAM & Zero Trust krusial." },
    { q: "Faktor autentikasi 'sesuatu yang kamu punya' dicontohkan oleh?",
      options: ["Password", "OTP token / security key (FIDO2)", "Sidik jari", "Nama ibu kandung"],
      answer: 1,
      explain: "Punya = token/HP/security key. Tahu = password/PIN. Adalah = biometrik." },
    { q: "Identity Provider (IdP) seperti Okta/Azure AD berfungsi?",
      options: [
        "Menyimpan file perusahaan",
        "Mengelola & memverifikasi identitas; aplikasi mempercayainya untuk SSO (inti 'integrasi IAM')",
        "Menjalankan antivirus",
        "Mengatur jaringan WiFi"
      ], answer: 1,
      explain: "IdP memverifikasi identitas; aplikasi (SP) mempercayainya — inilah integrasi IAM yang diminta JD." }
  ]
};
