export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <div>
          <label className="text-sm">Platform Name</label>
          <input
            className="w-full mt-1 border rounded-lg px-3 py-2"
            defaultValue="JobHive"
          />
        </div>

        <div>
          <label className="text-sm">Admin Email</label>
          <input
            className="w-full mt-1 border rounded-lg px-3 py-2"
            defaultValue="admin@jobhive.com"
          />
        </div>

        <button className="px-4 py-2  rounded-lg">Save Changes</button>
      </div>
    </div>
  );
}
