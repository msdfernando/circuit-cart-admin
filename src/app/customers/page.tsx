'use client';
import { useFirestore } from '@/hooks/useFirestore';
import CustomerTable from '@/components/tables/CustomerTable';
import { transformCustomer } from '@/utils/transformCustomers';
import { FirebaseCustomer } from '@/types';

// src/app/customers/page.tsx
export default function CustomersPage() {
  const { data: customers, loading } = useFirestore<FirebaseCustomer>('customers');
  
  // Fix 1: Correct the typo (formformedCustomers → formattedCustomers)
  const formattedCustomers = customers.map(transformCustomer);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      {/* Fix 2: Actually use the variable */}
      <CustomerTable customers={formattedCustomers} />
    </div>
  );
}
