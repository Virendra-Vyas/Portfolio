/**
 * Build-time configuration. NEXT_PUBLIC_ values are baked into the static export.
 * The contact API defaults to production so a plain `npm run build` produces a working site.
 */
export const contactApiUrl = (process.env.NEXT_PUBLIC_CONTACT_API_URL ?? "https://api.virendravyas.dev").replace(/\/$/, "");
