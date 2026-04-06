"use client";

import { type ReactNode } from "react";

type TrackEventLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function TrackEventLink({ href, className, children }: TrackEventLinkProps) {
  async function onClick() {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "cta_click",
        source: "landing_page",
        path: href,
      }),
    });
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
