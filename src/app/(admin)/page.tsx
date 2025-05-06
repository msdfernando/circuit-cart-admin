import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center p-8">
      <h1>Welcome to Circuit Cart</h1>
      <Link 
        href="/(admin)/dashboard" 
        className="btn btn-primary"
      >
        Go to Admin Panel
      </Link>
    </div>
  );
}