import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import Image from "next/image";
import Link from "next/link";

// Force dynamic so it reads the search query on every request
export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  await dbConnect();

  // Perform a case-insensitive regex search on Title or Tags
  const posts = query
    ? await Post.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { tags: { $regex: query, $options: "i" } }, // Optional: Search tags too
        ],
      })
        .select("title slug category updatedAt featureImage metaDescription")
        .sort({ updatedAt: -1 })
        .limit(20)
        .lean()
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Search Results for: <span className="text-blue-600">"{query}"</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Found {posts.length} matching records.
        </p>
      </div>

      {/* Results Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <Link
              key={post._id}
              href={`/post/${post.slug}`}
              className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              {/* Thumbnail */}
              <div className="h-40 bg-gray-100 relative overflow-hidden">
                {post.featureImage ? (
                  <Image
                    src={post.featureImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300 font-bold text-2xl bg-gray-50">
                    SE
                  </div>
                )}
                <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-base font-bold text-gray-800 group-hover:text-blue-600 line-clamp-2 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-grow">
                  {post.metaDescription}
                </p>
                <div className="text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100">
                  Updated:{" "}
                  {new Date(post.updatedAt).toLocaleDateString("hi-IN")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-700">No results found</h2>
          <p className="text-gray-500 mb-6">
            Try searching for "Police", "SSC", "Result", etc.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
          >
            Go to Homepage
          </Link>
        </div>
      )}
    </div>
  );
}
