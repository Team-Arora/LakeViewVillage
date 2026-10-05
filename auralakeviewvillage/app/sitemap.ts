import type { MetadataRoute } from "next";
import { PUBLIC_FLOOR_PLANS } from "@/lib/floorplans";
import { LEGAL_NAV } from "@/lib/legal";
import { POSTS } from "@/lib/posts";
import { DATES, SITE_URL } from "@/lib/project";

export default function sitemap(): MetadataRoute.Sitemap {
  // Was `new Date()`, which re-stamped every URL as modified on every deploy —
  // including deploys that only touched styling. Crawlers that see lastModified
  // move without the content moving learn to ignore it. This tracks the same
  // hand-maintained date as the footer and the JSON-LD.
  const now = new Date(`${DATES.modified}T00:00:00Z`);

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    // Per-model pages rank for the long tail ("the nova corner floor plan",
    // "aura echo end square footage") that every competing site gates behind a
    // form, so they sit just below the homepage in priority.
    { url: `${SITE_URL}/floor-plans`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...PUBLIC_FLOOR_PLANS.map((p) => ({
      url: `${SITE_URL}/floor-plans/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...POSTS.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.published),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Indexable but deprioritised: these exist to be found and cited, not to
    // compete with the pages that rank.
    ...LEGAL_NAV.map((l) => ({
      url: `${SITE_URL}${l.href}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
