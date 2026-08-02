import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      // No lastModified on purpose: `new Date()` would stamp every build,
      // including ones that changed nothing, and crawlers discount a lastmod
      // they catch moving without the content moving.
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
