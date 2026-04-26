"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ApplicantsPage() {
  const { jobId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["applicants", jobId],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/api/application/job/${jobId}/applicants`,
        {
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch applicants");
      }

      return res.json();
    },
    enabled: !!jobId,
  });

  const applicants = data?.data || [];

  if (isLoading) {
    return <p className="p-6 min-h-screen">Loading applicants...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">Failed to load applicants</p>;
  }

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#22426A] mb-6">Applicants</h1>

      {applicants.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No applicants yet 🚫
        </div>
      )}

      <div className="space-y-4">
        {applicants.map((app: any) => (
          <div
            key={app.id}
            className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{app.user?.name}</h2>
                <p className="text-sm text-gray-500">{app.user?.email}</p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  app.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : app.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {app.status}
              </span>
            </div>

            {app.coverLetter && (
              <p className="mt-3 text-gray-700 text-sm">{app.coverLetter}</p>
            )}

            <div className="mt-4 flex items-center justify-between">
              <a
                href={`${API_URL}${app.resume}`}
                target="_blank"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                📄 View Resume
              </a>

              <span className="text-xs text-gray-400">
                {new Date(app.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
