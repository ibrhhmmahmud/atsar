# Upgrade dari Atsar V2.0 ke V2.1

1. Sebelum upgrade, buka V2.0 → Profil → Data & Backup → Buat Backup JSON.
2. Ekstrak `Atsar-V2.1-GitHub-PWA.zip`.
3. Upload seluruh isi folder ke root repository dan timpa file lama.
4. Pastikan file HTML baru ikut ter-upload, terutama `statistik.html`, `murojaah.html`, dan `profil.html`.
5. Commit perubahan.
6. Tunggu GitHub Pages selesai deploy.
7. Jika browser masih menampilkan V2.0, refresh keras atau tutup-buka PWA. Service worker V2.1 memakai cache baru `atsar-v2.1.0`.

Data IndexedDB lama tetap berada pada origin/domain GitHub Pages yang sama.
