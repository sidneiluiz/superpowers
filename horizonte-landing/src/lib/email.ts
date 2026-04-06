import { Resend } from "resend";

export async function sendWelcomeEmail(args: {
  email: string;
  firstName?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return;
  }

  const resend = new Resend(apiKey);
  const name = args.firstName?.trim() || "amigo";

  await resend.emails.send({
    from,
    to: args.email,
    subject: "Bem-vindo ao Momentos de fé",
    html: `<p>Olá, ${name}.</p><p>Você está inscrito para receber conteúdos e novidades do canal Momentos de fé.</p>`,
  });
}
