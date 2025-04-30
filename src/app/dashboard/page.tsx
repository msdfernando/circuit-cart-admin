export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3>TOTAL USERS</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>TOTAL TRANSACTIONS</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}