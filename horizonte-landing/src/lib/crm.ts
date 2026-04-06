import { randomUUID } from "node:crypto";

export type Subscriber = {
  id: string;
  email: string;
  name?: string;
  signupSource: "landing_page" | "content_form" | "import";
  signupDate: string;
  tags: string[];
};

export type ContentEngagement = {
  id: string;
  subscriberId: string;
  contentId: string;
  contentType: "video" | "article" | "devotional" | "email";
  action: "view" | "click" | "share" | "complete";
  timestamp: string;
};

const subscribersByEmail = new Map<string, Subscriber>();
const engagements: ContentEngagement[] = [];

export function createSubscriber(input: {
  email: string;
  name?: string;
  signupSource: Subscriber["signupSource"];
  tags?: string[];
}): string {
  const id = randomUUID();
  subscribersByEmail.set(input.email, {
    id,
    email: input.email,
    name: input.name,
    signupSource: input.signupSource,
    signupDate: new Date().toISOString(),
    tags: input.tags ?? [],
  });
  return id;
}

export function trackEngagement(input: {
  subscriberId: string;
  contentId: string;
  contentType: ContentEngagement["contentType"];
  action: ContentEngagement["action"];
}): void {
  engagements.push({
    id: randomUUID(),
    subscriberId: input.subscriberId,
    contentId: input.contentId,
    contentType: input.contentType,
    action: input.action,
    timestamp: new Date().toISOString(),
  });
}

export function getSubscribers(): Subscriber[] {
  return Array.from(subscribersByEmail.values());
}

export function getEngagements(): ContentEngagement[] {
  return engagements;
}

export function clearCrmState(): void {
  subscribersByEmail.clear();
  engagements.length = 0;
}
