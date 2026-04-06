import { describe, expect, it, vi } from "vitest";
import { listAnalyticsEvents, trackEvent } from "@/lib/analytics";

describe("trackEvent", () => {
  it("saves the analytics event", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await trackEvent({
      event: "cta_click",
      source: "landing_page",
      path: "/",
      createdAt: new Date().toISOString(),
    });

    const events = await listAnalyticsEvents();
    expect(events).toHaveLength(1);
    expect(events[0].event).toBe("cta_click");
  });
});
