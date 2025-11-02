# Absensi WA (Frontend + Server)

Repo template berisi frontend (scan QR + manual) dan backend (server to WhatsApp Cloud API).

## Struktur
- server.js
- package.json
- public/
  - index.html
  - style.css
  - script.js

## Cara pakai lokal
1. Install Node.js (https://nodejs.org)
2. Buka terminal di folder project, lalu:
   ```bash
   npm install
   ```
3. Set environment variables (contoh di Linux/macOS):
   ```bash
   export WA_TOKEN="EAA..."
   export PHONE_ID="123456789012345"
   export GURU="6282228266317"
   node server.js
   ```
   Di Windows PowerShell:
   ```powershell
   $env:WA_TOKEN='EAA...'; $env:PHONE_ID='123456789012345'; $env:GURU='6282228266317'; node server.js
   ```
4. Buka http://localhost:3000 dan tes fitur. Gunakan /test untuk menguji pengiriman WA.

## Deploy ke Railway (ringkas)
1. Push repo ke GitHub.
2. Buat project baru di Railway -> Deploy from GitHub -> pilih repo.
3. Set environment variables di Railway: `WA_TOKEN`, `PHONE_ID`, `GURU`.
4. Deploy, lalu buka URL publik dan tes `/test`.

## Jangan commit token ke repo publik. Gunakan env vars.
