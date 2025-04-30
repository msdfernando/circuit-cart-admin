'use client';
import { useFirestore } from '@/hooks/useFirestore';
import BillTable from '@/components/tables/BillTable';

interface Bill {
  id: string;
  customerId: string;
  total: number;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export default function BillsPage() {
  const { data: bills, loading } = useFirestore<Bill>('bills');

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bill History</h1>
      <BillTable bills={bills} />
    </div>
  );
}