import { describe, expect, it } from "vitest";
import { getLatestContent } from "@/lib/content";

describe("content pipeline", () => {
  it("returns fallback content when youtube creds are missing", async () => {
    const items = await getLatestContent(2);
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].title.length).toBeGreaterThan(0);
  });
});
