import dbConnect from "@/lib/mongodb";
import Post, { IPost } from "@/models/Post";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";

interface Props {
  params: { slug: string };
}

// 1. DYNAMIC SEO METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  const post = (await Post.findOne({
    slug: params.slug,
  }).lean()) as IPost | null;
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.title} - Sarkari Exam Info`,
    description: post.metaDescription,
    keywords: (post as any).tags || [],
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: new Date((post as any).createdAt).toISOString(),
      modifiedTime: new Date((post as any).updatedAt).toISOString(),
      images: post.featureImage ? [post.featureImage] : [],
      tags: (post as any).tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: post.featureImage ? [post.featureImage] : [],
    },
  };
}

// 2. FETCH RELATED POSTS (Smart Interlinking)
async function getRelatedPosts(
  currentPostId: any,
  category: string,
  tags: string[] = []
) {
  await dbConnect();

  // Find posts that share the same Category OR have matching Tags
  return Post.find({
    _id: { $ne: currentPostId }, // Exclude current post
    $or: [{ category: category }, { tags: { $in: tags } }],
  })
    .select("title slug featureImage category updatedAt")
    .sort({ updatedAt: -1 })
    .limit(6) // Show 6 related posts
    .lean() as unknown as IPost[];
}

// 3. MAIN PAGE COMPONENT
export default async function PostPage({ params }: Props) {
  await dbConnect();
  const post = (await Post.findOne({
    slug: params.slug,
  }).lean()) as IPost | null;

  if (!post) notFound();

  // Fetch Related Posts based on the current post's data
  const relatedPosts = await getRelatedPosts(
    post._id,
    post.category,
    post.tags || []
  );
  const cleanHtml = DOMPurify.sanitize(post.contentHtml);

  // JSON-LD Structured Data (For Google Rich Snippets)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.metaDescription,
    image: post.featureImage ? [post.featureImage] : [],
    datePublished: post.createdAt
      ? new Date(post.createdAt).toISOString()
      : undefined,
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : undefined,
    author: {
      "@type": "Organization",
      name: "Sarkari Exam Info",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Inject Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-2 items-center">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/${post.category}`}
          className="capitalize hover:text-blue-600"
        >
          {post.category.replace("-", " ")}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium truncate max-w-[200px]">
          {post.title}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT COLUMN: Main Content (70%) */}
        <main className="lg:w-[70%]">
          <article className=" p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
            {/* Header */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b pb-6">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold uppercase text-xs">
                {post.category.replace("-", " ")}
              </span>
              <span>
                Last Updated:{" "}
                {new Date(post.updatedAt).toLocaleDateString("hi-IN")}
              </span>
            </div>

            {/* Feature Image */}
            {post.featureImage && (
              <div className="mb-8 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                <Image
                  src={post.featureImage}
                  alt={post.title}
                  className="w-full max-h-[400px] object-contain"
                />
              </div>
            )}

            {/* HTML Content (Typography Plugin Active) */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            />

            {/* Social Share Call to Action */}
            <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Join for Instant Updates
              </h3>
              <p className="text-blue-700 mb-4 text-sm">
                Get the fastest Sarkari Result updates on WhatsApp & Telegram.
              </p>
              <div className="flex justify-center gap-4">
                <button className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition shadow-sm">
                  Join WhatsApp
                </button>
                <button className="bg-sky-500 text-white px-6 py-2 rounded-full font-bold hover:bg-sky-600 transition shadow-sm">
                  Join Telegram
                </button>
              </div>
            </div>

            {/* Tags Cloud */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <span className="text-sm font-bold text-gray-500 mr-2">
                  Tags:
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </main>

        {/* RIGHT COLUMN: Sidebar (30%) */}
        <aside className="lg:w-[30%] space-y-8">
          {/* Widget 1: Related Posts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Related Updates</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {relatedPosts.map((related: any) => (
                <Link
                  key={related._id}
                  href={`/post/${related.slug}`}
                  className="block p-4 hover:bg-blue-50 transition group"
                >
                  <div className="flex gap-3">
                    {/* Tiny Thumbnail */}
                    <div className="h-16 w-16 bg-gray-200 rounded-md shrink-0 overflow-hidden">
                      {related.featureImage ? (
                        <Image
                          src={related.featureImage}
                          alt={related.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs font-bold text-gray-400">
                          N/A
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
                        {related.title}
                      </h4>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {new Date(related.updatedAt).toLocaleDateString(
                          "hi-IN"
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Widget 2: Explore Categories */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-bold text-gray-800 mb-4">Explore More</h3>
            <div className="space-y-2">
              {[
                {
                  name: "Latest Jobs",
                  url: "/latest-jobs",
                  color: "text-green-600 bg-green-50",
                },
                {
                  name: "Sarkari Results",
                  url: "/result",
                  color: "text-pink-600 bg-pink-50",
                },
                {
                  name: "Admit Cards",
                  url: "/admit-card",
                  color: "text-blue-600 bg-blue-50",
                },
                {
                  name: "Answer Keys",
                  url: "/answer-key",
                  color: "text-purple-600 bg-purple-50",
                },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.url}
                  className={`flex items-center justify-between p-3 rounded-lg ${cat.color} hover:opacity-80 transition font-semibold text-sm`}
                >
                  <span>{cat.name}</span>
                  <span>&rarr;</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Widget 3: Sticky Ad Placeholder (SEO Best Practice: Don't shift layout) */}
          <div className="sticky top-20">
            <div className="bg-gray-100 rounded-xl border border-gray-200 h-[300px] flex items-center justify-center text-gray-400 text-sm">
              Ad Space / Banner
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
