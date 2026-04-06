import { beforeEach, describe, expect, it } from "vitest";
import {
  clearCrmState,
  createSubscriber,
  getEngagements,
  getSubscribers,
  trackEngagement,
} from "@/lib/crm";

describe("crm model", () => {
  beforeEach(() => {
    clearCrmState();
  });

  it("creates subscriber with minimal schema", () => {
    const subscriberId = createSubscriber({
      email: "crm@example.com",
      name: "CRM User",
      signupSource: "landing_page",
      tags: ["warm"],
    });

    const subscribers = getSubscribers();
    expect(subscribers).toHaveLength(1);
    expect(subscribers[0].id).toBe(subscriberId);
    expect(subscribers[0].email).toBe("crm@example.com");
  });

  it("tracks content engagement", () => {
    const subscriberId = createSubscriber({
      email: "engage@example.com",
      signupSource: "content_form",
    });

    trackEngagement({
      subscriberId,
      contentId: "video-1",
      contentType: "video",
      action: "click",
    });

    const engagements = getEngagements();
    expect(engagements).toHaveLength(1);
    expect(engagements[0].subscriberId).toBe(subscriberId);
  });
});
