export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Applied Jobs", "Saved Jobs", "Profile Views"].map((item) => (
          <div key={item} className="p-4 bg-gray-50 rounded-xl shadow">
            <p className="text-sm text-gray-500">{item}</p>
            <h3 className="text-lg font-bold mt-2">12</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
