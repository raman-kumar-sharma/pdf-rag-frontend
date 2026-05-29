/**
 * API base URL for browser fetch calls.
 *
 * Local dev: empty string → requests go to /api/... on localhost:3000,
 *            proxied to Python via next.config rewrites.
 *
 * Production: set NEXT_PUBLIC_API_URL to your deployed backend.
 */
export function getApiBase(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!url) return "";
  return url.replace(/\/$/, "");
}

/** Server-only: backend URL for Next.js rewrites (see next.config.ts). */
export function getRewriteApiUrl(): string {
  return (
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://127.0.0.1:8000"
  ).replace(/\/$/, "");
}
