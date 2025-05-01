'use client';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
        <div>
          <label htmlFor="name" className="block mb-2">Full Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label htmlFor="gender" className="block mb-2">Gender</label>
          <select
            id="gender"
            value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Birthday</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Year"
              className="w-1/3 p-2 border rounded"
              onChange={(e) => setFormData({...formData, birthday: `${e.target.value}-${formData.birthday.split('-')[1] || ''}-${formData.birthday.split('-')[2] || ''}`})}
            />
            <input
              type="number"
              placeholder="Month"
              className="w-1/3 p-2 border rounded"
              onChange={(e) => setFormData({...formData, birthday: `${formData.birthday.split('-')[0] || ''}-${e.target.value}-${formData.birthday.split('-')[2] || ''}`})}
            />
            <input
              type="number"
              placeholder="Date"
              className="w-1/3 p-2 border rounded"
              onChange={(e) => setFormData({...formData, birthday: `${formData.birthday.split('-')[0] || ''}-${formData.birthday.split('-')[1] || ''}-${e.target.value}`})}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block mb-2">Email address</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Enter email address"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2">Phone number</label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div>
          <label htmlFor="nic" className="block mb-2">NIC number</label>
          <input
            id="nic"
            type="text"
            value={formData.nic}
            onChange={(e) => setFormData({...formData, nic: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Enter NIC number"
            required
          />
        </div>

        <div>
          <label htmlFor="points" className="block mb-2">TOP-UP points</label>
          <input
            id="points"
            type="number"
            value={formData.points}
            onChange={(e) => setFormData({...formData, points: parseInt(e.target.value)})}
            className="w-full p-2 border rounded"
            placeholder="Enter TOP-UP points"
          />
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Done
          </button>
          <button type="button" onClick={() => router.push('/customers')} className="bg-red-500 text-white px-4 py-2 rounded">
            Remove
          </button>
        </div>

        <div>
          <label className="block mb-2">Add Customer Picture</label>
          <button type="button" className="flex items-center space-x-2">
            <span className="text-xl">+</span>
            <span>Add Customer Picture</span>
          </button>
        </div>

        <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded">
          Add Customer
        </button>
      </form>
    </div>
  );
}