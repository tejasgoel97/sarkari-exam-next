// app/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Font Configuration
const hindiFont = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hindi",
});

// --- SEO CONFIGURATION ---
const SITE_URL = "https://sarkaridekho.com";

export const viewport: Viewport = {
  themeColor: "#1f2937",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sarkari Dekho | सरकारी रिजल्ट, नई नौकरी और एडमिट कार्ड",
    template: "%s | Sarkari Dekho",
  },
  description:
    "Sarkari Dekho पर देखें लेटेस्ट सरकारी नौकरी, सरकारी रिजल्ट, एडमिट कार्ड और आंसर की की जानकारी हिंदी में।",
  keywords: [
    "Sarkari Result",
    "Sarkari Dekho",
    "Government Jobs",
    "Admit Card",
    "Sarkari Naukri",
    "Latest Jobs",
    "Result in Hindi",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- SCHEMA MARKUP (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Sarkari Dekho",
        description: "सरकारी रिजल्ट और सरकारी नौकरी की जानकारी हिंदी में",
        inLanguage: "hi-IN",
        publisher: {
          "@type": "Organization",
          name: "Sarkari Dekho",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`, // TODO: Add logo.png to public folder
            width: 600,
            height: 60,
          },
        },
      },
    ],
  };

  return (
    <html lang="hi" className={hindiFont.variable}>
      <head>
        <Script
          id="schema-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 font-hindi flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow pb-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {children}
        </main>

        {/* --- BIG FOOTER START --- */}
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto font-hindi">
          {/* Section 1: Main Links & CTAs */}
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Column 1: Brand Info */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Sarkari Dekho</h2>
                <p className="text-sm leading-relaxed text-gray-400">
                  भारत का विश्वसनीय हिंदी जॉब पोर्टल। यहाँ पाएं सरकारी नौकरी,
                  रिजल्ट और एडमिट कार्ड की सबसे सटीक जानकारी।
                </p>
                {/* Social Icons */}
                <div className="flex space-x-4 pt-2">
                  <a
                    href="https://facebook.com/YOUR_LINK"
                    aria-label="Facebook"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.954 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/YOUR_LINK"
                    aria-label="Instagram"
                    className="hover:text-pink-500 transition-colors"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.36-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/YOUR_LINK"
                    aria-label="YouTube"
                    className="hover:text-red-600 transition-colors"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Column 2: Quick Links (Hindi) */}
              <div>
                <h3 className="text-white text-lg font-bold mb-4">
                  महत्वपूर्ण लिंक
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="/category/sarkari-results"
                      className="hover:text-white transition-colors"
                    >
                      सरकारी रिजल्ट (Results)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/category/admit-cards"
                      className="hover:text-white transition-colors"
                    >
                      एडमिट कार्ड (Admit Card)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/category/latest-jobs"
                      className="hover:text-white transition-colors"
                    >
                      नई सरकारी नौकरी (Jobs)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/category/answer-keys"
                      className="hover:text-white transition-colors"
                    >
                      आंसर की (Answer Key)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/category/syllabus"
                      className="hover:text-white transition-colors"
                    >
                      सिलेबस (Syllabus)
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Information (Hindi) */}
              <div>
                <h3 className="text-white text-lg font-bold mb-4">जानकारी</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="/about"
                      className="hover:text-white transition-colors"
                    >
                      हमारे बारे में (About Us)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="hover:text-white transition-colors"
                    >
                      संपर्क करें (Contact)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy-policy"
                      className="hover:text-white transition-colors"
                    >
                      प्राइवेसी पॉलिसी
                    </a>
                  </li>
                  <li>
                    <a
                      href="/disclaimer"
                      className="hover:text-white transition-colors"
                    >
                      डिस्क्लेमर (Disclaimer)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="hover:text-white transition-colors"
                    >
                      नियम और शर्तें
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 4: Join Communities (Hindi) */}
              <div>
                <h3 className="text-white text-lg font-bold mb-4">
                  सोशल मीडिया से जुड़ें
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  सभी अपडेट्स सबसे पहले अपने फ़ोन पर पाएं।
                </p>
                <div className="space-y-3">
                  {/* WhatsApp CTA */}
                  <a
                    href="https://whatsapp.com/channel/YOUR_LINK" // TODO: Add Link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all font-semibold text-sm"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 mr-2"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    व्हाट्सएप चैनल से जुड़ें
                  </a>

                  {/* Telegram CTA */}
                  <a
                    href="https://t.me/YOUR_LINK" // TODO: Add Link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all font-semibold text-sm"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 mr-2"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    टेलीग्राम चैनल से जुड़ें
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: SEO Details (Description in Hindi) */}
          <div className="bg-gray-800 py-8 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-lg font-bold text-white mb-3">
                सरकारी देखो (Sarkari Dekho) के बारे में
              </h3>
              <p className="text-sm text-gray-400 leading-7 text-justify">
                <strong>Sarkari Dekho</strong> एक प्रमुख जॉब पोर्टल है जो भारतीय
                युवाओं को <strong>सरकारी नौकरी (Sarkari Naukri)</strong> की
                जानकारी हिंदी में उपलब्ध कराता है। यहाँ आप केंद्र और राज्य सरकार
                द्वारा जारी की गई नई भर्तियों, रेलवे जॉब्स (Railway Jobs),
                एसएससी (SSC), बैंकिंग (Banking), पुलिस भर्ती (Police), आर्मी
                भर्ती और टीचर वैकेंसी की जानकारी सबसे पहले पा सकते हैं। इसके
                अलावा हम <strong>सरकारी रिजल्ट (Sarkari Result)</strong>,{" "}
                <strong>एडमिट कार्ड (Admit Card)</strong>, आंसर की (Answer Key)
                और सिलेबस (Syllabus) की सटीक जानकारी समय पर अपडेट करते हैं। सभी
                सरकारी योजनाओं और रोजगार समाचार के लिए Sarkari Dekho पर विजिट
                करते रहें।
              </p>
            </div>
          </div>

          {/* Bottom Bar: Copyright */}
          <div className="bg-gray-950 py-4">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
              <p>
                © {new Date().getFullYear()} Sarkari Dekho. सर्वाधिकार सुरक्षित।
              </p>
              <div className="mt-2 space-x-4">
                <a href="/sitemap.xml" className="hover:text-gray-300">
                  साइटमैप
                </a>
                <span>|</span>
                <a href="/privacy-policy" className="hover:text-gray-300">
                  प्राइवेसी
                </a>
              </div>
            </div>
          </div>
        </footer>
        {/* --- BIG FOOTER END --- */}
      </body>
    </html>
  );
}
