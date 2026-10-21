# 🎯 Kuis & Sistem Skoring

Aplikasi kuis **pilihan ganda** dengan **penilaian otomatis** untuk menguji setiap modul. Tujuannya: kamu tahu pasti apakah sudah **lulus** sebuah modul atau belum — mirip latihan TOEFL.

- **140 soal** (10 per modul × 14 modul), masing-masing dengan **penjelasan jawaban**.
- **Batas lulus 80%** per modul.
- **Progres tersimpan** otomatis di browser (localStorage): modul yang sudah lulus ditandai ✓.
- Soal **diacak** tiap percobaan.

---

## Cara menjalankan

### Opsi A — Lokal (paling cepat)

Buka file `quiz/index.html` langsung di browser (klik dua kali, atau drag ke jendela browser). Tidak perlu internet. Progres tersimpan di browser itu.

### Opsi B — Online via GitHub Pages (biar bisa diakses dari mana saja)

1. Di GitHub, buka repo **L2-SOC** → **Settings** → **Pages**.
2. Bagian **Build and deployment** → **Source**: pilih **Deploy from a branch**.
3. **Branch**: `main`, folder `/ (root)` → **Save**.
4. Tunggu 1–2 menit. Kuis akan tersedia di:
   `https://sanishiho23.github.io/L2-SOC/quiz/`

Deep link ke modul tertentu: tambahkan `?m=NN`, mis. `.../quiz/?m=06` untuk modul Phishing.

---

## Cara pakai

1. Buka aplikasi → daftar 14 modul muncul dengan status (Belum / Lulus ✓ / Coba lagi).
2. Klik **Mulai** pada sebuah modul.
3. Jawab 10 soal (bisa maju-mundur sebelum submit).
4. Klik **Selesai & Nilai** → lihat skor, status **LULUS/BELUM**, dan **review** tiap soal + penjelasan.
5. Skor terbaikmu tersimpan. Ulangi sampai ≥ 80% untuk menandai modul **selesai**.

> **Catatan:** progres disimpan per-browser (localStorage). Ganti browser/perangkat atau hapus data situs → progres ter-reset. Tombol **Reset progres** menghapusnya manual.

---

## Struktur (buat menambah/mengubah soal)

```
quiz/
├── index.html            # aplikasi (engine kuis + UI)
└── questions/
    ├── 01.js             # bank soal Modul 01
    ├── 02.js
    └── ... 14.js
```

Tiap file soal berformat:

```js
window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["01"] = {
  title: "Foundations",
  pass: 80,                      // ambang lulus (%)
  questions: [
    {
      q: "Pertanyaan...",
      options: ["A", "B", "C", "D"],
      answer: 2,                 // index jawaban benar (0 = opsi pertama)
      explain: "Penjelasan singkat kenapa benar."
    }
    // ... tambah soal sebanyak yang kamu mau
  ]
};
```

Mau menambah soal? Edit file `questions/NN.js` yang sesuai, tambahkan objek soal baru ke array `questions`. Tidak perlu menyentuh `index.html`.

---

⬅️ Kembali ke [README utama](../README.md) · [Roadmap](../roadmap.md)
