"use client";

import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ApplicantsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recruiter-applicants"],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/api/application/recruiter/applicants`,
        {
          credentials: "include",
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to load applicants");
      }

      return result.data;
    },
  });

  const applicants = data || [];

  /* ================= GROUP BY JOB ================= */
  const grouped = applicants.reduce((acc: any, app: any) => {
    const jobId = app.job?.id;

    if (!acc[jobId]) {
      acc[jobId] = {
        jobTitle: app.job?.title,
        company: app.job?.company,
        location: app.job?.location,
        applicants: [],
      };
    }

    acc[jobId].applicants.push(app);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading applicants...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load applicants
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#22426A] mb-8">
          Applicants Dashboard
        </h1>

        {Object.keys(grouped).length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No applicants yet 🚫
          </div>
        )}

        <div className="space-y-10">
          {Object.values(grouped).map((group: any, idx: number) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6">
              {/* ================= JOB HEADER ================= */}
              <div className="border-b pb-4 mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                  {group.jobTitle}
                </h2>
                <p className="text-sm text-gray-500">
                  {group.company} • {group.location}
                </p>
              </div>

              {/* ================= APPLICANTS ================= */}
              <div className="space-y-4">
                {group.applicants.map((app: any) => (
                  <div
                    key={app.id}
                    className="border rounded-lg p-4 hover:shadow-sm transition bg-gray-50"
                  >
                    {/* TOP INFO */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {app.user?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {app.user?.email}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium w-fit ${
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

                    {/* COVER LETTER */}
                    {app.coverLetter && (
                      <p className="mt-3 text-sm text-gray-700">
                        <span className="font-medium">Cover Letter:</span>{" "}
                        {app.coverLetter}
                      </p>
                    )}

                    {/* RESUME + DATE */}
                    <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                      <a
                        href={app.resume}
                        target="_blank"
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        📄 View Resume
                      </a>

                      <span className="text-xs text-gray-400">
                        Applied: {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
