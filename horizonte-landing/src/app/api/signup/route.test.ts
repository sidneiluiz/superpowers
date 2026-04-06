import { beforeEach, describe, expect, it, vi } from "vitest";

const sendWelcomeEmailMock = vi.hoisted(() => vi.fn());
const trackEventMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/email", () => ({
  sendWelcomeEmail: sendWelcomeEmailMock,
}));

vi.mock("@/lib/analytics", () => ({
  trackEvent: trackEventMock,
}));

import { POST } from "@/app/api/signup/route";

beforeEach(() => {
  sendWelcomeEmailMock.mockReset();
  sendWelcomeEmailMock.mockResolvedValue(undefined);
  trackEventMock.mockReset();
  trackEventMock.mockResolvedValue(undefined);
});

describe("POST /api/signup", () => {
  it("returns 400 for invalid payload", async () => {
    const response = await POST(
      new Request("http://localhost/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "invalid" }),
      })
    );

    expect(response.status).toBe(400);
  });

  it("returns 201 for valid payload", async () => {
    const response = await POST(
      new Request("http://localhost/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "person@example.com",
          firstName: "Person",
          source: "landing_page",
        }),
      })
    );

    const payload = (await response.json()) as { ok: boolean; isNewSubscriber: boolean };
    expect(response.status).toBe(201);
    expect(payload.ok).toBe(true);
    expect(payload.isNewSubscriber).toBe(true);
    expect(sendWelcomeEmailMock).toHaveBeenCalledTimes(1);
    expect(trackEventMock).toHaveBeenCalledTimes(1);
  });
});
