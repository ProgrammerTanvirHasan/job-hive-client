export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports & Moderation</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["User Reports", "Job Reports", "Resolved Cases"].map((item) => (
          <div key={item} className="p-4 rounded-xl shadow bg-gray-50">
            <p className="text-sm text-gray-500">{item}</p>
            <h2 className="text-xl font-semibold mt-2">120</h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-3">Recent Reports</h2>
        <ul className="space-y-2 text-sm">
          <li className="p-2 rounded hover:bg-gray-100">User spam report</li>
          <li className="p-2 rounded hover:bg-gray-100">Fake job detected</li>
        </ul>
      </div>
    </div>
  );
}
