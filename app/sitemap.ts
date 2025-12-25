// app/sitemap.ts
import { MetadataRoute } from "next";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // 1. Define your Static Pages (Categories)
  const staticRoutes = [
    "", // Homepage
    "/result",
    "/admit-card",
    "/latest-jobs",
    "/answer-key",
    "/syllabus",
    "/admission",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8, // Homepage has highest priority
  }));

  // 2. Fetch Dynamic Posts from MongoDB
  await dbConnect();

  // We fetch only the 'slug' and 'updatedAt' to keep it fast
  const posts = await Post.find({})
    .select("slug updatedAt")
    .sort({ updatedAt: -1 })
    .limit(5000) // Limit to prevent timeout on huge sites
    .lean();

  const dynamicRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 3. Merge and Return
  return [...staticRoutes, ...dynamicRoutes];
}
