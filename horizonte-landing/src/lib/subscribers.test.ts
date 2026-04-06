import { describe, expect, it } from "vitest";
import { listSubscribers, upsertSubscriber } from "@/lib/subscribers";

describe("upsertSubscriber", () => {
  it("stores new subscribers", async () => {
    const now = new Date().toISOString();
    const result = await upsertSubscriber({
      email: "person@example.com",
      firstName: "Person",
      source: "landing_page",
      createdAt: now,
    });

    expect(result.isNew).toBe(true);
    expect(await listSubscribers()).toHaveLength(1);
  });

  it("deduplicates existing email", async () => {
    const now = new Date().toISOString();
    await upsertSubscriber({
      email: "person@example.com",
      firstName: "First",
      source: "landing_page",
      createdAt: now,
    });

    const result = await upsertSubscriber({
      email: "person@example.com",
      firstName: "Updated",
      source: "landing_page",
      createdAt: now,
    });

    expect(result.isNew).toBe(false);
    expect(result.subscriber.firstName).toBe("Updated");
    expect(await listSubscribers()).toHaveLength(1);
  });
});
