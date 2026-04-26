"use client";

import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ApplicationsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/applications`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });

  if (isLoading) return <p className="p-10">Loading...</p>;
  if (isError) return <p className="p-10 text-red-500">Error</p>;

  const applications = data?.data || [];

  return (
    <div className=" min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-black">
        All Applications
      </h1>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border rounded-xl overflow-hidden">
          <thead className="">
            <tr className="text-black">
              <th className="px-4 py-3 text-left ">Job Title</th>
              <th className="px-4 py-3 text-left">User Name</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Applied At</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app: any) => (
              <tr key={app.id} className="border-t ">
                <td className="px-4 py-3 text-black">{app.job?.title}</td>
                <td className="px-4 py-3 text-black">{app.user?.name}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      app.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : app.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CARD VIEW (MOBILE) ================= */}
      <div className="md:hidden space-y-4">
        {applications.map((app: any) => (
          <div key={app.id} className="border rounded-xl p-4 shadow-sm ">
            <h2 className="font-semibold text-lg">{app.job?.title}</h2>

            <p className="text-sm  mt-1">👤 {app.user?.name}</p>

            <div className="mt-2 flex justify-between items-center">
              <span
                className={`px-2 py-1 text-xs rounded ${
                  app.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : app.status === "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {app.status}
              </span>

              <span className="text-xs text-gray-400">
                {new Date(app.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {applications.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No applications found</p>
      )}
    </div>
  );
}
