export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Sidebar */}
      <aside className="w-72 p-5">
        <div className="h-full rounded-2xl bg-white shadow-lg flex flex-col">
          {/* Logo */}
          <div className="p-5 border-b flex items-center">
            <div className="text-3xl italic font-bold">JH</div>
            <div className="ml-auto text-right">
              <p className="text-xs text-gray-500">Recruiter Panel</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-2">
            <a
              href="/recruiter"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              Dashboard
            </a>

            <a
              href="/recruiter/applicants"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              Applicants
            </a>

            <a
              href="/recruiter/settings"
              className="block px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              Settings
            </a>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t text-xs text-gray-400">
            © 2026 JobHive
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
          <div className="text-sm text-gray-500">Welcome back 👋</div>
        </div>

        <div className="rounded-2xl bg-white shadow-md p-6 min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}
