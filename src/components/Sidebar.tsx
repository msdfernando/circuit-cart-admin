import Link from 'next/link';
import React from 'react';

export default function Sidebar() {
  return (
    <nav className="w-64 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">CIRCUIT CART</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/customers" className="block p-2 hover:bg-gray-700 rounded">
            Customer Management
          </Link>
        </li>
        <li>
          <button disabled className="block p-2 text-gray-400 cursor-not-allowed">
            Bill History
          </button>
        </li>
        <li>
          <button disabled className="block p-2 text-gray-400 cursor-not-allowed">
            Settings
          </button>
        </li>
      </ul>
    </nav>
  );
}