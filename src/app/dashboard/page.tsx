import StatsCard from '@/components/cards/StatsCard'

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">CIRCUIT CART</h1>
      
      <nav className="flex gap-4 mb-8">
        <a className="font-semibold">Dashboard</a>
        <a className="font-semibold text-black">Customer Management</a>
        <a className="font-semibold">Bill History</a>
        <a className="font-semibold text-black">Settings and profile</a>
      </nav>

      <div className="grid grid-cols-2 gap-4">
        <StatsCard title="TOTAL USER" value="1,024" />
        <StatsCard title="TOTAL POINT ISSUED" value="5,678" />
        <StatsCard title="TOTAL TRANSACTION" value="892" />
        <StatsCard title="ACTIVE USER TODAY" value="143" />
      </div>
    </div>
  )
}