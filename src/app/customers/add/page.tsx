'use client';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddCustomerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    birthday: '',
    email: '',
    phone: '',
    nic: '',
    points: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'customers'), formData);
      router.push('/customers');
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields here */}
        <div>
  <label htmlFor="name" className="block mb-2">Full Name</label>
  <input
    id="username"
    type="text"
    value={formData.name}
    onChange={(e) => setFormData({...formData, name: e.target.value})}
    className="w-full p-2 border rounded"
    placeholder="Enter username"
    aria-label="Username input"
    required
  />
</div>
        
        {/* Add other fields similarly */}
        
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <Link href="/customers" className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}