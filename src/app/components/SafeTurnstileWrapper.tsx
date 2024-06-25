"use client";

import dynamic from "next/dynamic";

/**
 * Wraps TurnstileWrapper with lazy loading so that the Cloudflare Turnstile can safely render without hydration issues.
 */
export const SafeTurnstileWrapper = dynamic(
  () => import("./TurnstileWrapper").then((mod) => mod.TurnstileWrapper),
  {
    ssr: false,
  },
);
