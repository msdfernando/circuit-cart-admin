import { Customer } from '@/types';

export default function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        {/* Table implementation using real data */}
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}