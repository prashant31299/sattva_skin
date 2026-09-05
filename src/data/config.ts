const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelHost = (
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL ??
  ""
).trim();
const vercelSiteUrl = vercelHost
  ? vercelHost.startsWith("http://") || vercelHost.startsWith("https://")
    ? vercelHost
    : `https://${vercelHost}`
  : "http://localhost:3000";
const resolvedSiteUrl = configuredSiteUrl || vercelSiteUrl;

export const siteConfig = {
  name: "Sattva Skin",
  shortName: "SATTVA",
  description:
    "Discover Sattva Skin face, hair and lip care. Explore product details, botanical ingredient stories, balms and sugar scrubs.",
  siteUrl: resolvedSiteUrl.replace(/\/$/, ""),
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "",
  catalogIsPreview: true,
};
