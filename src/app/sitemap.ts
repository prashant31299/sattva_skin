import type { MetadataRoute } from "next";
import { journalArticles } from "@/app/journal/_data";
import { concerns, ingredients, products } from "@/data/catalog";
import { siteConfig } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.catalogIsPreview) return [];

  const staticRoutes = [
    "",
    "/shop",
    "/ingredients",
    "/about",
    "/journal",
    "/contact",
    "/faq",
    "/pages/skin-quiz",
    "/shipping",
    "/returns",
    "/track-order",
    "/privacy",
    "/terms",
    "/disclaimer",
  ];
  const paths = [
    ...staticRoutes,
    ...products.map((item) => `/products/${item.slug}`),
    ...concerns.map((item) => `/pages/${item.slug}`),
    ...ingredients.map((item) => `/ingredients/${item.slug}`),
    ...journalArticles.map((item) => `/journal/${item.slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
