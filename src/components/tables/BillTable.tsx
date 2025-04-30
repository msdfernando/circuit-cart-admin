// src/components/tables/BillTable.tsx
import { Bill } from '@/types';

export default function BillTable({ bills }: { bills: Bill[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        {/* Your bill table implementation */}
      </table>
    </div>
  );
}