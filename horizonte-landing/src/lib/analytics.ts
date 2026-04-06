import { readCollection, writeCollection } from "@/lib/store";
import type { AnalyticsEvent } from "@/lib/types";

const EVENTS_FILE = "events.json";

export async function listAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  return readCollection<AnalyticsEvent>(EVENTS_FILE);
}

export async function saveAnalyticsEvent(event: AnalyticsEvent): Promise<void> {
  const events = await listAnalyticsEvents();
  await writeCollection(EVENTS_FILE, [...events, event]);
}

export async function forwardAnalyticsEvent(event: AnalyticsEvent): Promise<void> {
  const plausibleDomain = process.env.PLAUSIBLE_DOMAIN;
  const plausibleApiHost = process.env.PLAUSIBLE_API_HOST ?? "https://plausible.io";

  if (plausibleDomain) {
    await fetch(`${plausibleApiHost}/api/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: event.event,
        domain: plausibleDomain,
        url: `https://${plausibleDomain}${event.path ?? "/"}`,
        props: {
          source: event.source,
        },
      }),
    });
  }

  const gaMeasurementId = process.env.GA4_MEASUREMENT_ID;
  const gaApiSecret = process.env.GA4_API_SECRET;

  if (gaMeasurementId && gaApiSecret) {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
        gaMeasurementId
      )}&api_secret=${encodeURIComponent(gaApiSecret)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: "landing-page",
          events: [
            {
              name: event.event,
              params: {
                source: event.source,
                path: event.path,
              },
            },
          ],
        }),
      }
    );
  }
}

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  await saveAnalyticsEvent(event);
  await forwardAnalyticsEvent(event);
}
