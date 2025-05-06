'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UsersIcon, 
  ShoppingCartIcon, 
  CogIcon 
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/(admin)/dashboard', icon: HomeIcon },
    { name: 'Customers', href: '/(admin)/customers', icon: UsersIcon },
    { name: 'Transactions', href: '/(admin)/transactions', icon: ShoppingCartIcon },
    { name: 'Settings', href: '/(admin)/settings', icon: CogIcon },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-8">Circuit Cart</h1>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${
                    pathname === item.href ? 'bg-gray-700' : ''
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}