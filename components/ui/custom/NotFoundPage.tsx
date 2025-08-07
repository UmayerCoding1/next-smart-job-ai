"use client";

import { useRouter } from "next/navigation";


export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-white px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <div className="flex gap-4">
        {/* 🔙 Go back to previous page */}
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Go Back
        </button>

        {/* 🏠 Go to home page */}
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
