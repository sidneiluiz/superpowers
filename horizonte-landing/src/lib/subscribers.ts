import { readCollection, writeCollection } from "@/lib/store";
import type { Subscriber } from "@/lib/types";

const SUBSCRIBERS_FILE = "subscribers.json";

export async function listSubscribers(): Promise<Subscriber[]> {
  return readCollection<Subscriber>(SUBSCRIBERS_FILE);
}

export async function upsertSubscriber(
  subscriber: Subscriber
): Promise<{ subscriber: Subscriber; isNew: boolean }> {
  const subscribers = await listSubscribers();
  const existingIndex = subscribers.findIndex((item) => item.email === subscriber.email);

  if (existingIndex >= 0) {
    const mergedSubscriber = {
      ...subscribers[existingIndex],
      firstName: subscriber.firstName ?? subscribers[existingIndex].firstName,
      source: subscriber.source,
    };

    subscribers[existingIndex] = mergedSubscriber;
    await writeCollection(SUBSCRIBERS_FILE, subscribers);

    return { subscriber: mergedSubscriber, isNew: false };
  }

  const nextSubscribers = [...subscribers, subscriber];
  await writeCollection(SUBSCRIBERS_FILE, nextSubscribers);
  return { subscriber, isNew: true };
}
