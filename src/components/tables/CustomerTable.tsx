import { Customer } from '@/types';

interface CustomerTableProps {
  customers: Customer[];
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        {/* Your table implementation */}
      </table>
    </div>
  );
}