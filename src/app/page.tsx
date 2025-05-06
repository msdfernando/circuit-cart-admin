import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Circuit Cart</h1>
        <Link 
          href="/dashboard"  // Changed from "/(admin)/dashboard"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Go to Admin Panel
        </Link>
      </div>
    </div>
  );
}