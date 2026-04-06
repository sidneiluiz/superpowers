import { getLatestContent } from "@/lib/content";

export async function GET(): Promise<Response> {
  const items = await getLatestContent(6);
  return Response.json({ items }, { status: 200 });
}
