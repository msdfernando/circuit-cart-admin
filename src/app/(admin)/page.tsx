import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center p-8">
      <h1>Welcome to Circuit Cart</h1>
      {/* Links DIRECTLY to your existing login page */}
      <Link 
        href="/(auth)/login" 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Admin Panel
      </Link>
    </div>
  );
}