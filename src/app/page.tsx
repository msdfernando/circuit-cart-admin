import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Circuit Cart Admin</h1>
      <Link 
        href="/login"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Go to Admin Panel
      </Link>
    </main>
  )
}