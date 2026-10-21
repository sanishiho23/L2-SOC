window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["10"] = {
  title: "DevSecOps & CI/CD",
  pass: 80,
  questions: [
    { q: "Prinsip 'shift left' dalam DevSecOps berarti?",
      options: [
        "Memindahkan server ke kiri ruangan",
        "Menggeser pemeriksaan keamanan ke tahap sedini mungkin dalam SDLC",
        "Menunda keamanan sampai setelah rilis",
        "Menghapus tahap testing"
      ], answer: 1,
      explain: "Shift left = temukan masalah keamanan lebih dini (lebih murah & aman) daripada setelah rilis." },
    { q: "SAST (Static Application Security Testing) bekerja dengan cara?",
      options: [
        "Menyerang aplikasi yang sedang berjalan dari luar",
        "Membaca kode sumber untuk mencari pola rentan tanpa menjalankannya",
        "Memindai dependensi pihak ketiga",
        "Memantau lalu lintas jaringan"
      ], answer: 1,
      explain: "SAST = analisis statis kode sumber. DAST = serang app running. SCA = cek dependensi." },
    { q: "Memeriksa library/dependensi pihak ketiga dari CVE yang diketahui disebut?",
      options: ["SAST", "DAST", "SCA (Software Composition Analysis)", "WAF"],
      answer: 2,
      explain: "SCA menganalisis komponen/dependensi (mis. deteksi Log4Shell pada library rentan)." },
    { q: "Kenapa API key/password TIDAK boleh ditulis langsung (hard-code) di dalam kode?",
      options: [
        "Karena membuat kode lambat",
        "Karena bisa ter-commit & bocor; rahasia harus disimpan di secret manager/vault",
        "Karena kode jadi terlalu panjang",
        "Karena melanggar lisensi"
      ], answer: 1,
      explain: "Rahasia di kode mudah bocor lewat repo; gunakan vault/secret manager + secret scanning." },
    { q: "Serangan 'supply chain' dalam konteks software adalah?",
      options: [
        "Gangguan pengiriman barang fisik",
        "Serangan lewat dependensi/komponen atau pipeline yang tepercaya (mis. SolarWinds, Log4Shell)",
        "Serangan pada gudang perusahaan",
        "Serangan DDoS"
      ], answer: 1,
      explain: "Supply chain attack menyusup lewat komponen/pipeline tepercaya yang dipakai banyak pihak." },
    { q: "Tool DAST yang umum untuk menyerang aplikasi web berjalan di staging adalah?",
      options: ["OWASP ZAP", "Semgrep", "gitleaks", "Trivy"],
      answer: 0,
      explain: "OWASP ZAP (& Burp) = DAST. Semgrep = SAST, gitleaks = secret scan, Trivy = container/SCA." },
    { q: "Siklus patch management yang benar adalah?",
      options: [
        "Deploy → inventaris → verifikasi → pantau",
        "Inventarisasi aset → pantau CVE → uji patch → deploy → verifikasi",
        "Hapus sistem lama → beli baru",
        "Tunggu sampai terjadi serangan"
      ], answer: 1,
      explain: "Patch management: tahu aset, pantau kerentanan, uji (staging), deploy, verifikasi." },
    { q: "Kenapa patching di lingkungan payment harus hati-hati/terjadwal?",
      options: [
        "Karena patch tidak pernah penting",
        "Karena patch bisa merusak aplikasi kritikal; uptime wajib dijaga, jadi diuji di staging dulu",
        "Karena payment tidak butuh patch",
        "Karena hanya boleh di-patch setahun sekali"
      ], answer: 1,
      explain: "Sistem payment kritikal; patch diuji dulu agar tidak menyebabkan outage, tapi tetap tepat waktu (PCI DSS)." },
    { q: "Secret scanning dalam pipeline CI/CD bertugas?",
      options: [
        "Mengenkripsi seluruh repo",
        "Mencari password/API key yang tak sengaja ter-commit ke kode",
        "Menguji performa aplikasi",
        "Membuat dokumentasi"
      ], answer: 1,
      explain: "Secret scanning (gitleaks, trufflehog) mendeteksi kredensial yang bocor di repo." },
    { q: "CI (Continuous Integration) intinya adalah?",
      options: [
        "Deploy manual sekali sebulan",
        "Setiap push kode otomatis di-build & di-test untuk menemukan masalah integrasi cepat",
        "Menyimpan kode tanpa testing",
        "Menghapus branch lama"
      ], answer: 1,
      explain: "CI = integrasi + build + test otomatis tiap perubahan; CD = delivery/deployment otomatis setelahnya." }
  ]
};
