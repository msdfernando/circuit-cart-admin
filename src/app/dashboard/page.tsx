export default function Dashboard() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Total Customers</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Today&apos;s Transactions</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold">$0.00</p>
          </div>
        </div>
      </div>
    );
  }