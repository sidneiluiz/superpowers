import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_ROOT = path.join(process.cwd(), "data");
const isTest = process.env.NODE_ENV === "test" || process.env.VITEST === "true";

const memoryStore = new Map<string, unknown[]>();

export async function readCollection<T>(fileName: string): Promise<T[]> {
  if (isTest) {
    return (memoryStore.get(fileName) ?? []) as T[];
  }

  const filePath = path.join(DATA_ROOT, fileName);

  try {
    const content = await readFile(filePath, "utf8");
    return JSON.parse(content) as T[];
  } catch {
    return [];
  }
}

export async function writeCollection<T>(
  fileName: string,
  records: T[]
): Promise<void> {
  if (isTest) {
    memoryStore.set(fileName, records);
    return;
  }

  await mkdir(DATA_ROOT, { recursive: true });
  const filePath = path.join(DATA_ROOT, fileName);
  await writeFile(filePath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
}

export function clearTestCollections(): void {
  memoryStore.clear();
}
