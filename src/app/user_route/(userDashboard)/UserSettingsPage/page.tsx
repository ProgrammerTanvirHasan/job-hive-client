export default function UserSettingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Settings</h2>
      <input
        className="w-full border p-2 rounded"
        placeholder="Change Password"
      />
      <button className="px-4 py-2 bg-black text-white rounded">Update</button>
    </div>
  );
}
