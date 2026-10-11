import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";
import { getSitemapEntries } from "@/sanity/lib/queries";

// Rebuild the sitemap at most once an hour so new projects and pages show up without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects, services, areas, latest } = await getSitemapEntries();
  const siteUpdated = latest ? new Date(latest) : new Date();
  const newest = (items: { updatedAt: string }[]) =>
    items.length
      ? new Date(Math.max(...items.map((i) => new Date(i.updatedAt).getTime())))
      : siteUpdated;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: siteUpdated, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: newest(services), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: newest(projects), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/service-areas`, lastModified: newest(areas), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: siteUpdated, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/reviews`, lastModified: siteUpdated, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: siteUpdated, changeFrequency: "yearly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(s.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const areaPages: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${SITE_URL}/service-areas/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...areaPages, ...projectPages];
}
