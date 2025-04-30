// src/components/tables/BillTable.tsx
import { Bill } from '@/types'; // Now this import will work

interface BillTableProps {
  bills: Bill[];
}

export default function BillTable({ bills }: BillTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        {/* Your table implementation using bills */}
      </table>
    </div>
  );
}