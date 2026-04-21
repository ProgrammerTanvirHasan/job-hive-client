export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border p-4 shadow-sm">
          <h2 className="text-sm text-gray-500">Total Users</h2>
          <p className="text-2xl font-bold">120</p>
        </div>
      </div>
    </div>
  );
}
