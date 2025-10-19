# The Artist Indio — Artist + Creator (v21)

A secure Next.js app with:
- Google Sign-in (NextAuth) with OWNER email mapping
- Admin guard + header avatar dropdown + sign out
- Strict security headers (CSP, XFO, nosniff, referrer, permissions)
- CSRF for admin mutating requests
- Audit log (viewer + API)
- PayPal checkout (create/capture + webhook verify)
- Download tokens (15 min expiry, 3 uses, bound to email/phone)
- Minimal Prisma schema (SQLite dev; swap to Postgres in prod)

## Quick start (dev)
```bash
cp .env.example .env
# set GOOGLE_CLIENT_ID/SECRET and OWNER_EMAIL
npm i
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

- Visit `/signin` to log in with Google (OWNER if your email matches).
- Visit `/checkout` to test PayPal Smart Buttons (needs PAYPAL_* vars).
- Download API returns JSON note; wire your storage for actual file download.

## Env
See `.env.example`. For prod set:
- NEXTAUTH_URL, NEXTAUTH_SECRET
- GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / OWNER_EMAIL
- SMTP_HOST/PORT/USER/PASS and MAIL_FROM (for email links)
- PUBLIC_BASE_URL (e.g., https://theartistindio.net)
- PAYPAL_* as provisioned

## Production notes
- Switch Prisma provider to `postgresql` and set `DATABASE_URL` to Vercel Postgres/Neon.
- Replace `lib/push.ts` with your real push broadcaster.
- Implement actual file streaming in `/api/download/[token]` from Blob/S3.
