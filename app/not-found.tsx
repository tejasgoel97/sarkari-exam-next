import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 mb-6">
        The exam info you are looking for might have been removed.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
