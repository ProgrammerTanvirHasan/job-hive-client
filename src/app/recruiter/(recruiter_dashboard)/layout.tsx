export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 p-5">
        <div className="h-full rounded-2xl  shadow-lg flex flex-col">
          {/* Logo */}
          <div className="p-5 border-b flex items-center">
            <div className="text-3xl italic font-bold">JH</div>
            <div className="ml-auto text-right">
              <p className="text-xs text-gray-500">Recruiter Panel</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-2">
            <a href="/recruiter" className="block px-3 py-2 rounded-lg ">
              Dashboard
            </a>

            <a
              href="/recruiter/applicants"
              className="block px-3 py-2 rounded-lg"
            >
              Applicants
            </a>

            <a
              href="/recruiter/settings"
              className="block px-3 py-2 rounded-lg"
            >
              Settings
            </a>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t text-xs ">© 2026 JobHive</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
          <div className="text-sm text-gray-500">Welcome back 👋</div>
        </div>

        <div className="rounded-2xl  shadow-md p-6 min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}
