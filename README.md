# Atsar V2.1

Atsar adalah PWA tracker ibadah personal yang bisa di-host gratis di GitHub Pages. Data utama tetap tersimpan lokal di perangkat melalui IndexedDB; GitHub hanya menyimpan source code.

## Perubahan V2.1

- Fitur Tilawah dihapus dari seluruh antarmuka, target, statistik, aktivitas, dan navigasi.
- Murojaah sekarang punya dua mode pencatatan: **Surah** dan **Juz**.
- Statistik diperbaiki dan dipindah menjadi halaman HTML mandiri: `statistik.html`.
- Menu utama dan menu Profil memakai halaman HTML nyata, bukan hanya route internal JavaScript.
- Bottom navigation: Home, Ibadah, Murojaah, Aktivitas, Profil.
- Statistik murojaah mencakup sesi, ayat, halaman, jumlah surah, dan jumlah juz yang disentuh.
- Data/backup V2 lama tetap kompatibel.

## Struktur halaman

- `index.html` — Home
- `ibadah.html` — Ibadah
- `murojaah.html` — Murojaah Surah/Juz
- `aktivitas.html` — Aktivitas
- `profil.html` — Dashboard Profil & Pengaturan
- `statistik.html` — Statistik Ibadah
- `target-streak.html` — Target & Streak
- `kalender.html` — Kalender Ibadah
- `qadha.html` — Qadha Puasa
- `doa.html` — Kumpulan Doa
- `ibadah-custom.html` — Ibadah Custom
- `personalisasi.html` — Personalisasi
- `waktu-shalat.html` — Waktu Shalat
- `tampilan.html` — Tampilan
- `backup.html` — Data & Backup

## Upload ke GitHub

Ekstrak ZIP, lalu upload **semua isi folder** ke root repo GitHub. File `index.html` harus berada langsung di root repository.

GitHub Pages: `Settings → Pages → Deploy from a branch → main → /(root)`.

## Data

- Settings: `localStorage`
- Data harian, murojaah, jurnal: `IndexedDB`
- Backup/restore: JSON

Catatan: store lama bernama `tilawah` masih dipertahankan secara internal agar backup V2.0 tidak rusak, tetapi V2.1 tidak menampilkan maupun menulis data Tilawah baru.
