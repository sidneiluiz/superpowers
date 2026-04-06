# Horizonte Landing (Phase 1)

Next.js landing page for the "Momentos de fe" funnel with:

- Conversion-focused homepage
- Email capture endpoint (`/api/signup`)
- Welcome email integration (Resend)
- Analytics endpoint (`/api/analytics`) with event forwarding to Plausible and GA4
- Local JSON persistence in `data/`

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill values:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=
PLAUSIBLE_DOMAIN=
PLAUSIBLE_API_HOST=https://plausible.io
GA4_MEASUREMENT_ID=
GA4_API_SECRET=
```

## Run Locally

```bash
npm install
npm run dev
```

## Test and Validate

```bash
npm run lint
npm run test
npm run build
```
