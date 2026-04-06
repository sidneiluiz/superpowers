import { beforeEach, vi } from "vitest";
import { clearTestCollections } from "@/lib/store";

beforeEach(() => {
  clearTestCollections();
  vi.restoreAllMocks();
});
