import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          href="/"
          className="text-2xl font-bold text-blue-700"
        >
          PSC Companion
        </Link>

        <div className="flex gap-6 text-gray-700 font-medium">

          <Link
            href="/"
            className="hover:text-blue-600 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/quiz"
            className="hover:text-blue-600 transition"
          >
            Quizzes
          </Link>

          <Link
            href="/notes"
            className="hover:text-blue-600 transition"
          >
            Notes
          </Link>

        </div>

      </div>
    </nav>
  );
}