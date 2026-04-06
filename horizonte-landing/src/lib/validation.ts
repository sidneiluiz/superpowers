import { z } from "zod";

export const signupSchema = z.object({
  email: z.email().trim().toLowerCase(),
  firstName: z.string().trim().min(1).max(80).optional(),
  source: z.string().trim().min(1).max(120).default("landing_page"),
});

export const analyticsEventSchema = z.object({
  event: z.enum(["page_view", "form_submission", "email_signup", "cta_click"]),
  source: z.string().trim().min(1).max(120).default("landing_page"),
  path: z.string().trim().max(250).optional(),
  email: z.email().trim().toLowerCase().optional(),
});
