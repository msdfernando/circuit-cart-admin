'use client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Simple auth check
    sessionStorage.setItem('isAdmin', 'true');
    // Goes to your existing admin dashboard
    router.push("/(admin)/dashboard");
  };

  return (
    <div className="text-center p-8">
      <h2>Admin Login</h2>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Login (admin/1234)
      </button>
    </div>
  );
}