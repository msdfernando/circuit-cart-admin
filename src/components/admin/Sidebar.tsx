'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';
import { HomeIcon, UsersIcon, CreditCardIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/(admin)/dashboard', icon: HomeIcon },
    { name: 'Customers', href: '/(admin)/customers', icon: UsersIcon },
    { name: 'Transactions', href: '/(admin)/transactions', icon: CreditCardIcon },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col h-full">
      <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${
                  pathname === item.href ? 'bg-gray-700' : ''
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={() => logout()}
        className="mt-auto p-2 text-red-400 hover:text-red-300 text-left"
      >
        Logout
      </button>
    </div>
  );
}