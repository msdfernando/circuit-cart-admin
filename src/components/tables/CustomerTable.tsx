import { AppCustomer } from '@/types';

interface CustomerTableProps {
  customers: AppCustomer[]; // Use the strict type here
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Mobile</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Gender</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Points</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.mobile}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}