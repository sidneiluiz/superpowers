import { sendWelcomeEmail } from "@/lib/email";
import { trackEvent } from "@/lib/analytics";
import { upsertSubscriber } from "@/lib/subscribers";
import { signupSchema } from "@/lib/validation";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Invalid signup payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const { email, firstName, source } = parsed.data;

  const { isNew } = await upsertSubscriber({
    email,
    firstName,
    source,
    createdAt: now,
  });

  if (isNew) {
    await sendWelcomeEmail({ email, firstName });
  }

  await trackEvent({
    event: "email_signup",
    source,
    email,
    createdAt: now,
  });

  return Response.json({ ok: true, isNewSubscriber: isNew }, { status: 201 });
}
