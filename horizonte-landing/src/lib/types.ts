export type AnalyticsEventType =
  | "page_view"
  | "form_submission"
  | "email_signup"
  | "cta_click";

export type Subscriber = {
  email: string;
  firstName?: string;
  source: string;
  createdAt: string;
};

export type AnalyticsEvent = {
  event: AnalyticsEventType;
  source: string;
  path?: string;
  email?: string;
  createdAt: string;
};
