# Atsar V2 — GitHub PWA

Atsar adalah web app/PWA pencatat ibadah pribadi yang berjalan di GitHub Pages. Source code ada di GitHub, sedangkan data ibadah tetap berada di browser/perangkat pengguna melalui IndexedDB.

## Fitur V2

- Home + waktu shalat manual, ringkasan dan target harian
- Shalat wajib + Sendiri/Jamaah/Jamaah di Masjid
- Rawatib, Dhuha, Tahajud, Witir
- Puasa sunnah/wajib/qadha + perhitungan sisa qadha
- Dzikir pagi/petang dengan counter
- Ibadah custom: checklist atau counter
- Qur'an Center: tilawah, riwayat bacaan, progress khatam, dan rekap total halaman
- Murojaah tracking dengan kualitas Lemah/Cukup/Baik/Lancar
- Jadwal murojaah otomatis sederhana (1/3/7/14 hari)
- Statistik 30 hari + heatmap + breakdown per shalat
- Target & streak terpisah untuk target utama, tilawah, dan murojaah
- Kalender aktivitas bulanan
- Jurnal/refleksi harian
- Kumpulan doa dengan transliterasi Indonesia
- Dark mode dan personalisasi nama/warna/lokasi
- Backup/restore JSON: merge atau replace
- Migrasi otomatis data Atsar V1 dari localStorage ke IndexedDB
- PWA/offline cache

## Penyimpanan data

- `localStorage`: pengaturan ringan (nama, tema, target, waktu shalat)
- `IndexedDB`: hari ibadah, sesi tilawah, sesi murojaah, jurnal
- GitHub: hanya source code aplikasi

Data tidak otomatis masuk ke repository GitHub.

## Deploy ke GitHub Pages

1. Upload semua isi folder ini ke root repository. `index.html` harus langsung terlihat di root.
2. Buka **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)`.
5. Simpan dan tunggu GitHub Pages selesai deploy.

## Update dari Atsar V1

Ganti file lama dengan file V2 ini. Saat pertama dibuka, V2 mencoba memigrasikan setting dan catatan harian V1 (`atsar.settings.v1` dan `atsar.days.v1`) secara otomatis di browser yang sama.

Sebelum update sebaiknya tetap buat backup dari V1 jika tersedia.

## Google Drive

Versi ini sudah memiliki format backup JSON yang cocok untuk disimpan di Google Drive. Integrasi otomatis Drive belum diaktifkan karena GitHub Pages milik setiap pengguna memerlukan Google OAuth Client ID yang dikonfigurasi untuk origin/domain GitHub Pages tersebut.

Untuk sekarang: **Profil → Data & Backup → Buat Backup JSON**, lalu simpan file JSON ke Drive. Restore melalui **Pulihkan dari Backup**.

## Editable

Konfigurasi default ada di `js/config.js`. Semua source HTML/CSS/JS bebas diedit. Nama aplikasi, nama panggilan, tagline, lokasi, warna utama, target, dan waktu shalat juga bisa diubah lewat UI.
