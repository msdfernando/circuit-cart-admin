import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Circuit Cart Admin</h1>
        <LoginForm />
        <div className="mt-4 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to main site
          </Link>
        </div>
      </div>
    </div>
  );
}