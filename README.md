# BillGenius AI - Tamil Nadu Smart Billing & Retail POS

React + Vite + Express app: INR GST billing (CGST/SGST), Tamil/English voice billing,
barcode scanner, AI produce vision, UPI QR, thermal receipts, multi-branch owner analytics,
manager inventory/approvals and Base44 cloud sync.

## Run (Windows / Mac / Linux)
Requires Node.js 18+.

```
npm install
npm run dev          # http://localhost:3000
```

Production build:
```
npm run build
npm start            # serves dist/ on http://localhost:3000
```

## AI key (optional)
Everything works without a key (local simulated AI). For real Gemini replies copy
`.env.example` to `.env.local` and set `GEMINI_API_KEY`. If Gemini errors, the server
automatically falls back to the local simulation.

## Demo logins
Use the profile menu (top right) -> Fast Role Switch: Owner, Manager, Biller.
Camera/mic features need a browser that allows permission (localhost is fine).
