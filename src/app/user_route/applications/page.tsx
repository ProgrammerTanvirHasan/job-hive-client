"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyApplicationsPage() {
  const queryClient = useQueryClient();

  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ================= FETCH =================
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

      if (!res.ok) throw new Error("Failed");

      const result = await res.json();
      return result.data;
    },
  });

  // ================= DELETE =================
  const deleteApplication = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/api/application/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      setDeleteId(null);
    },
  });

  if (isLoading) return <p className="p-10">Loading...</p>;
  if (isError) return <p className="p-10 text-red-500">Error</p>;

  return (
    <div className="p-10 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">My Applications</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Job Title</th>
              <th className="text-left px-4 py-3">Applied Date</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Action</th>
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
                <tr key={app.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{app.job?.title}</td>

                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>

                  <td className={`px-4 py-3 font-medium ${statusColor}`}>
                    {app.status}
                  </td>

                  {/* DELETE BUTTON */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDeleteId(app.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= POPUP ================= */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="text-lg font-semibold mb-3">Delete Application?</h2>

            <p className="text-sm text-gray-500 mb-5">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteApplication.mutate(deleteId)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
