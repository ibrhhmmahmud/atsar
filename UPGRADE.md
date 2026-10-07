# Upgrade Atsar V1 → V2 di GitHub

1. **Backup dulu data V1** dari aplikasi jika ada data penting.
2. Download dan ekstrak ZIP Atsar V2.
3. Di repository GitHub lama, upload/replace file berikut di root:
   - `index.html`
   - `manifest.webmanifest`
   - `service-worker.js`
   - folder `css/`
   - folder `js/`
   - folder `assets/`
   - `README.md`
4. Pastikan struktur bukan `repo/atsar-v2/index.html`, tetapi `repo/index.html`.
5. Commit changes.
6. Tunggu GitHub Pages deploy ulang.
7. Buka Atsar, lalu refresh sekali. Jika cache PWA lama masih muncul, tutup-buka aplikasi atau lakukan hard refresh.

## Migrasi data

Jika V1 dan V2 dibuka pada domain GitHub Pages yang sama dan browser/perangkat yang sama, V2 akan mencoba memindahkan data lama dari localStorage ke IndexedDB secara otomatis pada pembukaan pertama.

## Cache

Service worker V2 menggunakan cache `atsar-v2.0.0`. Jika UI lama masih tertahan, buka URL GitHub Pages dari browser, refresh, lalu buka PWA lagi.
