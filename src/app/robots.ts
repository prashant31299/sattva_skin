import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    // Preview pages stay crawlable so their global `noindex` directive can be observed.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
