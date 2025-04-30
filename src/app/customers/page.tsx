'use client';
import { useFirestore } from '@/hooks/useFirestore';
import CustomerTable from '@/components/tables/CustomerTable';

interface Customer {
  id: string;
  name: string;
  email: string;
  points: number;
}

export default function CustomersPage() {
  const { data: customers, loading } = useFirestore<Customer>('customers');

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      <CustomerTable customers={customers} />
    </div>
  );
}