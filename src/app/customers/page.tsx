import CustomerTable from '@/components/tables/CustomerTable'

const dummyCustomers = [
  // Add all customers from your PDF
  {
    id: "1",
    name: "Erebt Mercy",
    customerId: "370300",
    email: "michaelle.rivers@example.com",
    mobile: "+84000000000",
    gender: "Female",
    points: 120
  },
  // ... other customers
]

export default function CustomersPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Add Customer</h1>
      
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search for a customer by name or email" 
          className="w-full p-2 border rounded"
        />
      </div>

      <CustomerTable customers={dummyCustomers} />
    </div>
  )
}