// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/admin.html",
        "/edit.html",
        "/images.html",
        "/private/",
      ], // Don't let Google index your admin or API
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
