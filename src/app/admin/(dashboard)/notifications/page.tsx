export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>

      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <input
          placeholder="Write announcement..."
          className="w-full border rounded-lg px-3 py-2"
        />
        <button className="px-4 py-2 bg-black text-white rounded-lg">
          Send Notification
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-3">Sent Notifications</h2>
        <ul className="text-sm space-y-2">
          <li className="p-2 hover:bg-gray-100 rounded">System update</li>
        </ul>
      </div>
    </div>
  );
}