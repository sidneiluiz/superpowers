# Integration Notes

The following modules from HOR-27 are now integrated in this branch:

- `src/adapters/content-source.ts`
- `src/lib/content.ts`
- `src/lib/crm.ts`
- `src/components/content-feed.tsx`
- `src/app/api/content/latest/route.ts`
- tests for CRM/content pipeline

## Final page wiring already validated locally

The landing page should include:

```tsx
import { ContentFeed } from "@/components/content-feed";

// inside page
<ContentFeed />
```

If the branch merge strategy requires explicit file updates through local git push, apply the same wiring in `src/app/page.tsx`.

## Optional env vars

Add these when channel details are confirmed:

- `YOUTUBE_CHANNEL_ID`
- `YOUTUBE_API_KEY`
