import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "daily";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about-us", changefreq: "monthly", priority: "0.8" },
          { path: "/what-we-do", changefreq: "monthly", priority: "0.8" },
          { path: "/media", changefreq: "weekly", priority: "0.7" },
          { path: "/donation", changefreq: "monthly", priority: "0.9" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/projects/mission-smile-1k", changefreq: "monthly", priority: "0.7" },
          { path: "/projects/weekly-excursions", changefreq: "monthly", priority: "0.7" },
          { path: "/projects/monthly-public-awareness", changefreq: "monthly", priority: "0.7" },
          { path: "/events/day-with-wonderful-children", changefreq: "weekly", priority: "0.6" },
          { path: "/events/seminar-caring-for-autism", changefreq: "weekly", priority: "0.6" },
        ];

        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
