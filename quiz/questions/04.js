window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["04"] = {
  title: "SIEM & Elastic",
  pass: 80,
  questions: [
    { q: "Urutan alur kerja SIEM yang benar adalah?",
      options: [
        "Alert → Collection → Normalize → Correlate",
        "Collection → Normalize → Correlate → Alert",
        "Normalize → Alert → Collection → Correlate",
        "Correlate → Collection → Alert → Normalize"
      ], answer: 1,
      explain: "Kumpulkan log → seragamkan (normalize) → korelasi dengan aturan → alert." },
    { q: "Kenapa normalisasi (mis. ECS) penting di SIEM?",
      options: [
        "Agar log terlihat berwarna",
        "Agar field dari sumber berbeda diseragamkan sehingga bisa dicari/dikorelasikan bersama",
        "Untuk menghapus log lama",
        "Agar SIEM berjalan lebih lambat tapi akurat"
      ], answer: 1,
      explain: "Sumber berbeda menamai IP berbeda (src, IpAddress, rhost); ECS menyeragamkannya jadi source.ip dll." },
    { q: "Dalam Elastic Common Schema (ECS), IP sumber sebuah event disimpan di field?",
      options: ["ip.src", "source.ip", "srcaddr", "client_address"],
      answer: 1,
      explain: "ECS memakai source.ip, destination.ip, user.name, process.name, dll." },
    { q: "Komponen Elastic Stack yang berfungsi sebagai UI untuk pencarian, visualisasi, dan dashboard adalah?",
      options: ["Elasticsearch", "Logstash", "Kibana", "Beats"],
      answer: 2,
      explain: "Kibana = antarmuka. Elasticsearch = penyimpanan/pencarian, Beats = pengirim log, Logstash = pemroses." },
    { q: "Kamu perlu mendeteksi URUTAN event (powershell berjalan LALU koneksi ke port 4444 dalam 5 menit). Bahasa query Elastic yang paling tepat?",
      options: ["KQL", "Lucene", "EQL", "Markdown"],
      answer: 2,
      explain: "EQL (Event Query Language) dirancang untuk mencari rangkaian/urutan event (sequence)." },
    { q: "Query KQL untuk mencari login gagal dari satu IP tertentu yang benar adalah?",
      options: [
        "event.code = 4625 & ip = 1.1.1.1",
        'event.code : "4625" and source.ip : "203.0.113.9"',
        "SELECT * WHERE 4625",
        "find 4625 from 203.0.113.9"
      ], answer: 1,
      explain: "KQL memakai field : nilai dengan operator and/or, mis. event.code : \"4625\" and source.ip : \"...\"." },
    { q: "Untuk rule brute force, tipe detection rule yang mengandalkan 'lebih dari N kejadian dalam waktu tertentu' adalah?",
      options: ["Custom query", "Threshold", "Indicator match", "Machine learning"],
      answer: 1,
      explain: "Threshold rule memicu alert bila jumlah event melampaui batas dalam jendela waktu (mis. ≥10 4625/5 menit)." },
    { q: "Dalam Elasticsearch, satu event/log (dalam format JSON) disebut?",
      options: ["Index", "Document", "Shard", "Field"],
      answer: 1,
      explain: "Document = satu event. Index = kumpulan document sejenis. Field = atribut dalam document." },
    { q: "Rule brute force-mu menghasilkan 200 false positive/hari. Cara menurunkannya TANPA melewatkan serangan nyata?",
      options: [
        "Matikan rule tersebut",
        "Perketat kondisi (mis. kecualikan service account sah, tambah syarat diikuti login sukses) daripada menaikkan threshold membabi buta",
        "Naikkan threshold hingga tidak ada alert sama sekali",
        "Abaikan semua alert login"
      ], answer: 1,
      explain: "Tuning yang baik mempersempit konteks (exclusion, korelasi) agar FP turun tapi TP tetap tertangkap." },
    { q: "Peran Beats (mis. Winlogbeat) dalam Elastic Stack adalah?",
      options: [
        "Menyimpan data untuk pencarian",
        "Agen ringan yang mengirim log dari sumber (endpoint) ke Elastic",
        "Membuat dashboard",
        "Menjalankan machine learning"
      ], answer: 1,
      explain: "Beats/Elastic Agent adalah pengirim (shipper) log dari sumber ke Elasticsearch." }
  ]
};
