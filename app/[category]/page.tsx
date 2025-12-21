import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// 1. Configuration: Colors and Titles for each category
const categoryConfig: Record<
  string,
  { color: string; bg: string; icon: string; label: string }
> = {
  result: {
    color: "text-pink-700",
    bg: "bg-pink-50 border-pink-200",
    icon: "🏆",
    label: "Sarkari Results",
  },
  "admit-card": {
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    icon: "🎫",
    label: "Admit Cards",
  },
  "latest-jobs": {
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
    icon: "💼",
    label: "Latest Jobs",
  },
  "answer-key": {
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
    icon: "🔑",
    label: "Answer Keys",
  },
  syllabus: {
    color: "text-orange-700",
    bg: "bg-orange-50 border-orange-200",
    icon: "📚",
    label: "Syllabus",
  },
  admission: {
    color: "text-teal-700",
    bg: "bg-teal-50 border-teal-200",
    icon: "🎓",
    label: "Admission",
  },
};

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  await dbConnect();

  // Validation
  if (!categoryConfig[params.category]) {
    notFound();
  }

  // Fetch Data
  const posts = await Post.find({ category: params.category })
    .select("title slug featureImage metaDescription updatedAt")
    .sort({ updatedAt: -1 })
    .limit(50)
    .lean();

  const config = categoryConfig[params.category];

  // Helper to check if post is "New" (less than 7 days old)
  const isNew = (date: Date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 1. Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="capitalize font-medium text-gray-800">
          {config.label}
        </span>
      </nav>

      {/* 2. Dynamic Header Banner */}
      <div
        className={`p-6 rounded-xl border ${config.bg} mb-10 flex items-center justify-between shadow-sm`}
      >
        <div>
          <h1
            className={`text-3xl md:text-4xl font-extrabold ${config.color} flex items-center gap-3`}
          >
            <span>{config.icon}</span> {config.label}
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Latest updates regarding {config.label.toLowerCase()} for central
            and state government exams.
          </p>
        </div>
        {/* Decorative Circle (Hidden on mobile) */}
        <div
          className={`hidden md:flex h-16 w-16 rounded-full ${config.color.replace(
            "text",
            "bg"
          )} opacity-10 items-center justify-center text-3xl`}
        >
          {config.icon}
        </div>
      </div>

      {/* 3. The Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Link
            key={post._id}
            href={`/post/${post.slug}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col h-full"
          >
            {/* Image Area */}
            <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
              {post.featureImage ? (
                <img
                  src={post.featureImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                  <span className="text-4xl grayscale opacity-50">
                    {config.icon}
                  </span>
                  <span className="text-xs font-bold mt-2 uppercase tracking-widest opacity-50">
                    No Image
                  </span>
                </div>
              )}

              {/* "New" Badge */}
              {isNew(post.updatedAt) && (
                <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
                  NEW
                </span>
              )}
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${config.bg} ${config.color}`}
                >
                  {config.label}
                </span>
                <span className="text-[10px] text-gray-400">
                  • {new Date(post.updatedAt).toLocaleDateString("hi-IN")}
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-700 transition line-clamp-2">
                {post.title}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">
                {post.metaDescription}
              </p>

              <div className="pt-4 border-t border-gray-100 mt-auto">
                <button className="w-full text-center text-sm font-bold text-blue-600 bg-blue-50 py-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Read Full Details &rarr;
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="text-6xl mb-4 grayscale opacity-30">
            {config.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800">No Posts Found</h3>
          <p className="text-gray-500">
            We haven't added any {config.label.toLowerCase()} yet.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-blue-600 font-bold hover:underline"
          >
            Return Home
          </Link>
        </div>
      )}
    </div>
  );
}
