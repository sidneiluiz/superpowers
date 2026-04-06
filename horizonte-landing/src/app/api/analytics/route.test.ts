import { beforeEach, describe, expect, it, vi } from "vitest";

const trackEventMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/analytics", () => ({
  trackEvent: trackEventMock,
}));

import { POST } from "@/app/api/analytics/route";

beforeEach(() => {
  trackEventMock.mockReset();
  trackEventMock.mockResolvedValue(undefined);
});

describe("POST /api/analytics", () => {
  it("returns 400 for invalid payload", async () => {
    const response = await POST(
      new Request("http://localhost/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "bad_value" }),
      })
    );

    expect(response.status).toBe(400);
  });

  it("returns 202 for valid payload", async () => {
    const response = await POST(
      new Request("http://localhost/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "page_view",
          source: "landing_page",
          path: "/",
        }),
      })
    );

    expect(response.status).toBe(202);
    expect(trackEventMock).toHaveBeenCalledTimes(1);
  });
});
