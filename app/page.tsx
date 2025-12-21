import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import Link from "next/link";

// 1. Force Dynamic: Ensures the homepage rebuilds whenever you add a new post
export const dynamic = "force-dynamic";

// 2. Data Fetcher: Generic function to get posts by category
async function getCategoryPosts(category: string, limit = 4) {
  await dbConnect();
  return Post.find({ category })
    .select("title slug category updatedAt featureImage metaDescription")
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean();
}

// 3. Component: The "Card" (Reusable for all sections)
const PostCard = ({ post }: { post: any }) => (
  <Link
    href={`/post/${post.slug}`}
    className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full"
  >
    {/* Image Section */}
    <div className="relative h-40 w-full bg-gray-100 overflow-hidden">
      {post.featureImage ? (
        <img
          src={post.featureImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        // Fallback Placeholder if no image
        <div className="flex items-center justify-center h-full text-gray-400 bg-gray-50 flex-col gap-2">
          <div className="text-4xl">📄</div>
          <span className="text-xs font-bold opacity-50 uppercase tracking-widest">
            Sarkari Exam
          </span>
        </div>
      )}

      {/* Category Badge */}
      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow uppercase tracking-wide">
        {post.category.replace("-", " ")}
      </span>
    </div>

    {/* Content Section */}
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-blue-600 mb-2 line-clamp-3">
        {post.title}
      </h3>
      <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
        <span>{new Date(post.updatedAt).toLocaleDateString("hi-IN")}</span>
        <span className="text-blue-600 font-semibold group-hover:underline">
          Read &rarr;
        </span>
      </div>
    </div>
  </Link>
);

// 4. Component: Section Heading
const SectionHeader = ({
  title,
  link,
  color = "border-blue-600",
}: {
  title: string;
  link: string;
  color?: string;
}) => (
  <div className="flex justify-between items-end mb-5 border-b border-gray-200 pb-2 mt-8">
    <h2
      className={`text-xl md:text-2xl font-bold text-gray-800 border-b-4 ${color} -mb-[9px] pb-2 capitalize`}
    >
      {title}
    </h2>
    <Link
      href={link}
      className="text-xs md:text-sm font-semibold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded transition"
    >
      View All &rarr;
    </Link>
  </div>
);

// 5. Component: Static Highlight Hero (Manual Updates)
const FeaturedHero = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    {/* Main Hero Box */}
    <div className="bg-gradient-to-br from-blue-900 to-indigo-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10 text-9xl font-bold -mr-4 -mt-4 text-white">
        NEWS
      </div>
      <div className="relative z-10">
        <span className="bg-yellow-400 text-blue-900 text-[10px] font-black px-2 py-1 rounded mb-3 inline-block uppercase">
          Trending Now
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
          SSC CGL 2025: Official Notification Released
        </h2>
        <p className="text-blue-100 mb-5 text-sm line-clamp-2">
          Staff Selection Commission has released the CGL notification for
          15,000+ vacancies. Check eligibility and apply now.
        </p>
        <Link
          href="/post/ssc-cgl-notification-2025"
          className="inline-block bg-white text-blue-800 text-sm font-bold px-5 py-2 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition shadow-md"
        >
          Check Details
        </Link>
      </div>
    </div>

    {/* Side Highlights */}
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-white border-l-4 border-green-500 rounded-lg shadow-sm p-4 flex flex-col justify-center h-full hover:shadow-md transition">
        <span className="text-green-600 text-[10px] font-bold uppercase tracking-wider mb-1">
          Latest Admit Card
        </span>
        <h3 className="text-lg font-bold text-gray-800 leading-tight">
          <Link
            href="/post/bihar-police-admit-card"
            className="hover:text-green-600"
          >
            Bihar Police Constable Admit Card 2025 Released
          </Link>
        </h3>
      </div>
      <div className="bg-white border-l-4 border-pink-500 rounded-lg shadow-sm p-4 flex flex-col justify-center h-full hover:shadow-md transition">
        <span className="text-pink-600 text-[10px] font-bold uppercase tracking-wider mb-1">
          Latest Result
        </span>
        <h3 className="text-lg font-bold text-gray-800 leading-tight">
          <Link
            href="/post/upsc-prelims-result"
            className="hover:text-pink-600"
          >
            UPSC CSE Prelims 2025 Result Declared (Name Wise)
          </Link>
        </h3>
      </div>
    </div>
  </div>
);

// 6. Main Page Function
export default async function Home() {
  // Parallel Data Fetching for Speed
  const [results, jobs, admitCards, answerKeys, syllabus, admission] =
    await Promise.all([
      getCategoryPosts("result", 4),
      getCategoryPosts("latest-jobs", 4),
      getCategoryPosts("admit-card", 4),
      getCategoryPosts("answer-key", 4),
      getCategoryPosts("syllabus", 4),
      getCategoryPosts("admission", 4),
    ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* A. Marquee Ticker */}
      <div className="bg-blue-900 text-white rounded shadow-sm mb-6 p-2 flex items-center overflow-hidden">
        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shrink-0 mr-3 animate-pulse uppercase">
          Breaking
        </span>
        <div className="whitespace-nowrap overflow-hidden w-full">
          <div className="animate-marquee inline-block text-sm font-medium">
            {jobs[0]
              ? `New Job: ${jobs[0].title}`
              : "Welcome to Sarkari Exam Info"}
            <span className="mx-4 text-gray-400">|</span>
            {results[0] ? `Result: ${results[0].title}` : ""}
            <span className="mx-4 text-gray-400">|</span>
            {admitCards[0] ? `Admit Card: ${admitCards[0].title}` : ""}
          </div>
        </div>
      </div>

      {/* B. Hero Section */}
      <FeaturedHero />

      {/* C. Primary Categories (The Big 3) */}
      <div className="space-y-8">
        <section>
          <SectionHeader
            title="Latest Government Jobs"
            link="/latest-jobs"
            color="border-green-600"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {jobs.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
            {jobs.length === 0 && (
              <p className="text-gray-400 text-sm col-span-full">
                No jobs posted yet.
              </p>
            )}
          </div>
        </section>

        <section>
          <SectionHeader
            title="Sarkari Results"
            link="/result"
            color="border-pink-600"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
            {results.length === 0 && (
              <p className="text-gray-400 text-sm col-span-full">
                No results posted yet.
              </p>
            )}
          </div>
        </section>

        <section>
          <SectionHeader
            title="Admit Cards / Hall Tickets"
            link="/admit-card"
            color="border-blue-600"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {admitCards.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
            {admitCards.length === 0 && (
              <p className="text-gray-400 text-sm col-span-full">
                No admit cards posted yet.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* D. Secondary Categories (Utility) */}
      <div className="mt-12 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-700 mb-6 uppercase tracking-wider border-b pb-2">
          More Resources
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Answer Key Column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-purple-700">Answer Keys</h4>
              <Link
                href="/answer-key"
                className="text-xs text-gray-500 hover:text-purple-700"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {answerKeys.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/post/${post.slug}`}
                  className="block bg-white p-3 rounded shadow-sm border hover:border-purple-400 text-sm text-gray-800 hover:text-purple-700 transition"
                >
                  {post.title}
                </Link>
              ))}
              {answerKeys.length === 0 && (
                <div className="text-xs text-gray-400 italic">
                  No updates available
                </div>
              )}
            </div>
          </div>

          {/* Syllabus Column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-orange-700">Syllabus</h4>
              <Link
                href="/syllabus"
                className="text-xs text-gray-500 hover:text-orange-700"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {syllabus.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/post/${post.slug}`}
                  className="block bg-white p-3 rounded shadow-sm border hover:border-orange-400 text-sm text-gray-800 hover:text-orange-700 transition"
                >
                  {post.title}
                </Link>
              ))}
              {syllabus.length === 0 && (
                <div className="text-xs text-gray-400 italic">
                  No updates available
                </div>
              )}
            </div>
          </div>

          {/* Admission Column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-teal-700">Admission</h4>
              <Link
                href="/admission"
                className="text-xs text-gray-500 hover:text-teal-700"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {admission.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/post/${post.slug}`}
                  className="block bg-white p-3 rounded shadow-sm border hover:border-teal-400 text-sm text-gray-800 hover:text-teal-700 transition"
                >
                  {post.title}
                </Link>
              ))}
              {admission.length === 0 && (
                <div className="text-xs text-gray-400 italic">
                  No updates available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
