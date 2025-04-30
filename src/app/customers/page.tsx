'use client';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const querySnapshot = await getDocs(collection(db, 'customers'));
      const customersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Customer[];
      setCustomers(customersData);
    };
    fetchCustomers();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <Link href="/customers/add" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Customer
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Gender</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="py-2 px-4 border">{customer.id}</td>
                <td className="py-2 px-4 border">{customer.name}</td>
                <td className="py-2 px-4 border">{customer.email}</td>
                <td className="py-2 px-4 border">{customer.phone}</td>
                <td className="py-2 px-4 border">{customer.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}