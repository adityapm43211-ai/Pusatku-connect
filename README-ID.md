# PusatKu v3 — Cloudflare Workers Static Assets

## Struktur
- `public/` = semua file yang tampil di website/PWA
- `wrangler.jsonc` = konfigurasi Cloudflare Workers

## Deploy dari Termux / komputer
```bash
cd PusatKu-v3
npx wrangler login
npx wrangler deploy
```

Cloudflare akan memberi alamat `https://pusatku.<subdomain>.workers.dev`.

## Penting
Jangan drag-and-drop ZIP ini ke menu uploader yang meminta upload aset Pages jika ingin memakai `wrangler.jsonc`. Gunakan `npx wrangler deploy` agar konfigurasi Workers dibaca dengan benar.

## Jika hanya mau upload dari Dashboard
Buat ZIP baru yang isinya hanya isi folder `public/` (index.html, style.css, app.js, sw.js, manifest.webmanifest, icon.svg), lalu gunakan Direct Upload sebagai aset statis.

## Notifikasi
Versi ini meminta izin Notification API dan dapat mengingatkan saat PWA sedang aktif. Notifikasi terjadwal yang harus tetap muncul ketika aplikasi benar-benar tertutup membutuhkan Web Push + endpoint/server. Struktur PusatKu sudah dipisahkan agar backend tersebut bisa ditambahkan kemudian.
