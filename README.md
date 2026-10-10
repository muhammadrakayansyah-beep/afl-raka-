# Trading Dashboard

Dashboard trading dengan antarmuka HTML statis dan satu fungsi serverless untuk mengambil kuotasi Yahoo Finance same-origin di Vercel. Tidak memerlukan framework, dependency, atau proses build.
Backtest dashboard memakai rentang tetap sejak 1 Januari 2010; tidak ada pemilih periode di antarmuka.

## Isi proyek

- `index.html` — aplikasi dashboard, logika analisis/backtest, dan data historis tertanam.
- `api/yahoo.js` — fungsi Vercel yang hanya mengambil chart intraday untuk simbol saham Indonesia berakhiran `.JK`.
- `vercel.json` — konfigurasi deployment statis Vercel dan response headers.

## Menjalankan lokal

Buka `index.html` dengan browser modern. Dashboard menggunakan `DecompressionStream`, sehingga gunakan Chrome, Edge, Firefox, atau Safari versi modern. Untuk menguji fungsi API Yahoo di lokal, jalankan `npx vercel dev` dari folder proyek.

## Deploy ke Vercel

1. Push folder proyek ini ke repositori GitHub.
2. Di Vercel, pilih **Add New → Project**, lalu impor repositori GitHub.
3. Biarkan Framework Preset sebagai **Other**.
4. Kosongkan Build Command dan Output Directory; jangan tambahkan Install Command.
5. Klik **Deploy**. Vercel akan menyajikan `index.html` sebagai halaman utama, menjalankan `api/yahoo.js` sebagai fungsi serverless, dan membaca pengaturan dari `vercel.json`.

Setiap push ke branch yang terhubung akan memicu deployment sesuai pengaturan proyek Vercel.

## Push awal ke GitHub

Jalankan dari PowerShell pada folder proyek:

```powershell
Set-Location 'C:\Users\rakaa\Downloads\TradingDashboardVercel'
git init
git branch -M main
git add index.html api/yahoo.js vercel.json README.md .gitignore
git commit -m "Prepare trading dashboard for deployment"
git remote add origin https://github.com/muhammadrakayansyah-beep/afl-raka-.git
git push -u origin main
```

Jika remote `origin` sudah ada, periksa dengan `git remote -v` dan gunakan `git remote set-url origin https://github.com/muhammadrakayansyah-beep/afl-raka-.git` alih-alih menambah remote kedua. Jika repositori GitHub sudah berisi commit yang belum ada di komputer, tarik dan tinjau perubahan remote sebelum push.

## Data dan kredensial

Data backtest tertanam di `index.html`. Di Vercel, kuotasi browser melewati fungsi same-origin yang terbatas pada simbol `.JK`, menghindari CORS langsung browser-ke-Yahoo. Akses Yahoo tetap dapat gagal atau tertunda. Jangan simpan token, password, file `.env`, atau kredensial Vercel/GitHub dalam repositori. Kredensial yang pernah dibagikan di percakapan sebaiknya dicabut atau dirotasi.

Hasil backtest dan optimasi adalah simulasi historis, bukan ramalan pasti, rekomendasi investasi, atau perintah transaksi.
