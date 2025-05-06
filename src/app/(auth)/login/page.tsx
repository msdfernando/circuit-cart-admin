import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <LoginForm />
    </div>
  );
}