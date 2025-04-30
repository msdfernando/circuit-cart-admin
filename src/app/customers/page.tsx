'use client';
import { useFirestore } from '@/hooks/useFirestore';
import CustomerTable from '@/components/tables/CustomerTable';

// Define the loose Firebase interface
interface FirebaseCustomer {
  id: string;
  name?: string;
  email?: string;
  mobile?: string;
  gender?: string;
  points?: number;
}

// Define your strict application interface
interface AppCustomer {
  id: string;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  points: number;
}

export default function CustomersPage() {
  // Fetch data with loose typing
  const { data: customers, loading } = useFirestore<FirebaseCustomer>('customers');

  // Transform to strict type
  const formattedCustomers: AppCustomer[] = customers.map(c => ({
    id: c.id,
    name: c.name || 'Unknown',
    email: c.email || 'No email',
    mobile: c.mobile || 'Not provided',
    gender: c.gender || 'Not specified',
    points: c.points || 0
  }));

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      <CustomerTable customers={formattedCustomers} />
    </div>
  );
}