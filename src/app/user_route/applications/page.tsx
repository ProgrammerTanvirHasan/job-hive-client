"use client";

import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyApplicationsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/application`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch applications");
      }

      const result = await res.json();
      return result.data;
    },
  });

  if (isLoading) return <p className="p-10 min-h-screen">Loading...</p>;

  if (isError) return <p className="p-10 text-red-500">Failed to load data</p>;

  if (!data || data.length === 0)
    return <p className="p-10">No applications found</p>;
  return (
    <div className="p-10 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">My Applications</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold">
                Job Title
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold">
                Applied Date
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((app: any) => {
              const statusColor =
                app.status === "APPROVED"
                  ? "text-green-600"
                  : app.status === "REJECTED"
                    ? "text-red-600"
                    : "text-yellow-600";

              return (
                <tr
                  key={app.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* JOB TITLE */}
                  <td className="px-4 py-3">{app.job?.title}</td>

                  {/* DATE */}
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>

                  {/* STATUS */}
                  <td className={`px-4 py-3 font-medium ${statusColor}`}>
                    {app.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
