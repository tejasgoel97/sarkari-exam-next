import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import Image from "next/image";
import Link from "next/link";

// 1. Force Dynamic: Ensures the homepage rebuilds whenever you add a new post
// export const dynamic = "force-dynamic";
export const dynamic = "force-static";

// 2. Data Fetcher: INCREASED LIMIT TO 8 (To show more posts like Sarkari sites)
async function getCategoryPosts(category: string, limit = 8) {
  await dbConnect();
  return Post.find({ category })
    .select("title slug category updatedAt featureImage")
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean();
}

// 3. Component: The "Card" (Hindi Language Updates)
const PostCard = ({ post }: { post: any }) => (
  <Link
    href={`/post/${post.slug}`}
    className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full"
  >
    {/* Image Section */}
    <div className="relative h-40 w-full bg-gray-100 overflow-hidden">
      {post.featureImage ? (
        <Image
          src={post.featureImage}
          alt={post.title}
          fill
          unoptimized
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
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
        <span className="text-blue-600 font-bold group-hover:underline">
          पढ़ें &rarr;
        </span>
      </div>
    </div>
  </Link>
);

// 4. Component: Section Heading
const SectionHeader = ({
  title,
  subtitle,
  link,
  color = "border-blue-600",
}: {
  title: string;
  subtitle?: string;
  link: string;
  color?: string;
}) => (
  <div className="flex flex-wrap justify-between items-end mb-5 border-b border-gray-200 pb-2 mt-10">
    <div className={`border-b-4 ${color} -mb-[9px] pb-2`}>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 capitalize">
        {title}
      </h2>
      {subtitle && (
        <span className="text-xs text-gray-500 font-medium block mt-1">
          {subtitle}
        </span>
      )}
    </div>
    <Link
      href={link}
      className="text-xs md:text-sm font-bold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded transition"
    >
      सभी देखें &rarr;
    </Link>
  </div>
);

// 5. Component: WhatsApp Banner (High Conversion)
const WhatsAppCTA = () => (
  <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <div className="bg-green-600 text-white p-3 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.637 3.891 1.685 5.452l-1.148 4.191 4.33-1.142z" />
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800">
          WhatsApp ग्रुप से जुड़ें
        </h3>
        <p className="text-sm text-gray-600">
          सरकारी नौकरी और रिजल्ट की अपडेट सबसे पहले पाने के लिए।
        </p>
      </div>
    </div>
    <a
      href="https://chat.whatsapp.com/YOUR_LINK_HERE"
      target="_blank"
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition transform hover:scale-105"
    >
      Join Now
    </a>
  </div>
);

// 6. Component: Static Highlight Hero (Hindi)
const FeaturedHero = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    {/* Main Hero Box */}
    <div className="bg-gradient-to-br from-blue-900 to-indigo-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10 text-9xl font-bold -mr-4 -mt-4 text-white">
        NEWS
      </div>
      <div className="relative z-10">
        <span className="bg-yellow-400 text-blue-900 text-[10px] font-black px-2 py-1 rounded mb-3 inline-block uppercase">
          ट्रेंडिंग (Trending)
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
          SSC CGL 2025: आधिकारिक अधिसूचना जारी
        </h2>
        <p className="text-blue-100 mb-5 text-sm line-clamp-2">
          कर्मचारी चयन आयोग ने 15,000+ पदों के लिए CGL अधिसूचना जारी कर दी है।
          योग्यता की जाँच करें और अभी आवेदन करें।
        </p>
        <Link
          href="/post/ssc-cgl-notification-2025"
          className="inline-block bg-white text-blue-800 text-sm font-bold px-5 py-2 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition shadow-md"
        >
          विवरण देखें
        </Link>
      </div>
    </div>

    {/* Side Highlights */}
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-white border-l-4 border-green-500 rounded-lg shadow-sm p-4 flex flex-col justify-center h-full hover:shadow-md transition">
        <span className="text-green-600 text-[10px] font-bold uppercase tracking-wider mb-1">
          एडमिट कार्ड (Admit Card)
        </span>
        <h3 className="text-lg font-bold text-gray-800 leading-tight">
          <Link
            href="/post/bihar-police-admit-card"
            className="hover:text-green-600"
          >
            बिहार पुलिस कांस्टेबल एडमिट कार्ड 2025 जारी
          </Link>
        </h3>
      </div>
      <div className="bg-white border-l-4 border-pink-500 rounded-lg shadow-sm p-4 flex flex-col justify-center h-full hover:shadow-md transition">
        <span className="text-pink-600 text-[10px] font-bold uppercase tracking-wider mb-1">
          लेटेस्ट रिजल्ट (Result)
        </span>
        <h3 className="text-lg font-bold text-gray-800 leading-tight">
          <Link
            href="/post/upsc-prelims-result"
            className="hover:text-pink-600"
          >
            UPSC CSE प्रारंभिक 2025 परिणाम घोषित (नाम वार)
          </Link>
        </h3>
      </div>
    </div>
  </div>
);

// 7. Main Page Function
export default async function Home() {
  // Parallel Data Fetching for Speed (Increased limits to 8)
  const [results, jobs, admitCards, answerKeys, syllabus, admission] =
    await Promise.all([
      getCategoryPosts("result", 8),
      getCategoryPosts("latest-jobs", 8),
      getCategoryPosts("admit-card", 8),
      getCategoryPosts("answer-key", 8),
      getCategoryPosts("syllabus", 8),
      getCategoryPosts("admission", 8),
    ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans">
      {/* A. Marquee Ticker */}
      <div className="bg-blue-900 text-white rounded shadow-sm mb-6 p-2 flex items-center overflow-hidden">
        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shrink-0 mr-3 animate-pulse uppercase">
          ताज़ा खबर
        </span>
        <div className="whitespace-nowrap overflow-hidden w-full">
          <div className="animate-marquee inline-block text-sm font-medium">
            {jobs[0]
              ? `नई भर्ती: ${jobs[0].title}`
              : "Sarkari Dekho में आपका स्वागत है"}
            <span className="mx-4 text-gray-400">|</span>
            {results[0] ? `रिजल्ट: ${results[0].title}` : ""}
            <span className="mx-4 text-gray-400">|</span>
            {admitCards[0] ? `एडमिट कार्ड: ${admitCards[0].title}` : ""}
          </div>
        </div>
      </div>

      {/* B. Hero Section */}
      <FeaturedHero />

      {/* C. WhatsApp Banner */}
      <WhatsAppCTA />

      {/* D. Primary Categories (The Big 3 - with IMAGES) */}
      <div className="space-y-8">
        {/* Jobs Section */}
        <section>
          <SectionHeader
            title="नई सरकारी नौकरी"
            subtitle="Latest Government Jobs"
            link="/latest-jobs"
            color="border-green-600"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {jobs.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
            {jobs.length === 0 && (
              <p className="text-gray-400 text-sm col-span-full">
                अभी कोई नई भर्ती नहीं है।
              </p>
            )}
          </div>
        </section>

        {/* Results Section */}
        <section>
          <SectionHeader
            title="सरकारी रिजल्ट"
            subtitle="Sarkari Results"
            link="/result"
            color="border-pink-600"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
            {results.length === 0 && (
              <p className="text-gray-400 text-sm col-span-full">
                अभी कोई रिजल्ट अपडेट नहीं है।
              </p>
            )}
          </div>
        </section>

        {/* Admit Card Section */}
        <section>
          <SectionHeader
            title="एडमिट कार्ड / हॉल टिकट"
            subtitle="Admit Card"
            link="/admit-card"
            color="border-blue-600"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {admitCards.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
            {admitCards.length === 0 && (
              <p className="text-gray-400 text-sm col-span-full">
                अभी कोई एडमिट कार्ड नहीं आया है।
              </p>
            )}
          </div>
        </section>
      </div>

      {/* E. Secondary Categories (Utility - Dense List) */}
      <div className="mt-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h3 className="text-xl font-bold text-gray-700 mb-6 border-b pb-2">
          महत्वपूर्ण संसाधन (More Resources)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Answer Key Column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-purple-700">
                Answer Key (आंसर की)
              </h4>
              <Link
                href="/answer-key"
                className="text-xs text-gray-500 hover:text-purple-700 underline"
              >
                सभी देखें
              </Link>
            </div>
            <div className="space-y-3">
              {answerKeys.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/post/${post.slug}`}
                  className="block bg-white p-3 rounded shadow-sm border hover:border-purple-400 text-sm text-gray-800 hover:text-purple-700 transition"
                >
                  <span className="text-purple-600 mr-2 font-bold">●</span>
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
              <h4 className="font-bold text-orange-700">Syllabus (सिलेबस)</h4>
              <Link
                href="/syllabus"
                className="text-xs text-gray-500 hover:text-orange-700 underline"
              >
                सभी देखें
              </Link>
            </div>
            <div className="space-y-3">
              {syllabus.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/post/${post.slug}`}
                  className="block bg-white p-3 rounded shadow-sm border hover:border-orange-400 text-sm text-gray-800 hover:text-orange-700 transition"
                >
                  <span className="text-orange-600 mr-2 font-bold">●</span>
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
              <h4 className="font-bold text-teal-700">Admission (एडमिशन)</h4>
              <Link
                href="/admission"
                className="text-xs text-gray-500 hover:text-teal-700 underline"
              >
                सभी देखें
              </Link>
            </div>
            <div className="space-y-3">
              {admission.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/post/${post.slug}`}
                  className="block bg-white p-3 rounded shadow-sm border hover:border-teal-400 text-sm text-gray-800 hover:text-teal-700 transition"
                >
                  <span className="text-teal-600 mr-2 font-bold">●</span>
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
