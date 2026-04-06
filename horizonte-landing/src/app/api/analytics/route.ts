import { trackEvent } from "@/lib/analytics";
import { analyticsEventSchema } from "@/lib/validation";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null);
  const parsed = analyticsEventSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Invalid analytics payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  await trackEvent({
    ...parsed.data,
    createdAt: now,
  });

  return Response.json({ ok: true }, { status: 202 });
}
