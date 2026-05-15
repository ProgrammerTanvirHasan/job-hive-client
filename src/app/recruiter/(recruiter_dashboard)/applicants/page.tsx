"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ApplicantsPage() {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const isPdf = selectedResume?.split("?")[0].toLowerCase().endsWith(".pdf");
 
  const [interviewDates, setInterviewDates] = useState<{
    [key: number]: string;
  }>({});

  const { data, isLoading, error, refetch } = useQuery({
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

  const scheduleInterview = async (applicationId: number) => {
    try {
      const selectedDate = interviewDates[applicationId];

      if (!selectedDate) {
        return alert("Please select interview date");
      }

      setLoadingId(applicationId);

      const interviewMessage = `You are invited to interview for this post on ${new Date(
        selectedDate,
      ).toLocaleString()}. Please be available on time.`;

      const res = await fetch(
        `${API_URL}/api/application/schedule-interview/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: "INTERVIEW",
            interviewDate: selectedDate,
            message: interviewMessage,
          }),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to schedule interview");
      }

      alert("Interview scheduled successfully ✅");

      refetch();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoadingId(null);
    }
  };

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
              <div className="border-b pb-4 mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                  {group.jobTitle}
                </h2>

                <p className="text-sm text-gray-500">
                  {group.company} • {group.location}
                </p>
              </div>

              <div className="space-y-4">
                {group.applicants.map((app: any) => (
                  <div
                    key={app.id}
                    className="border rounded-lg p-4 hover:shadow-sm transition bg-gray-50"
                  >
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
                            : app.status === "INTERVIEW"
                              ? "bg-blue-100 text-blue-700"
                              : app.status === "APPROVED"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    {app.coverLetter && (
                      <p className="mt-3 text-sm text-gray-700">
                        <span className="font-medium">Cover Letter:</span>{" "}
                        {app.coverLetter}
                      </p>
                    )}

                    {app.interviewDate && (
                      <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <p className="text-sm text-blue-700 font-medium">
                          📅 Interview Date:
                        </p>

                        <p className="text-sm text-gray-700 mt-1">
                          {new Date(app.interviewDate).toLocaleString()}
                        </p>

                        {app.recruiterMessage && (
                          <p className="text-sm text-gray-600 mt-2">
                            💬 {app.recruiterMessage}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                        
                         

                          setSelectedResume(app.resume);
                        }}
                        className="text-blue-600 text-sm font-medium hover:underline relative z-50"
                      >
                        📄 View Resume
                      </button>

                      <span className="text-xs text-gray-400">
                        Applied: {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {app.status === "PENDING" && (
                      <div className="mt-5 border-t pt-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                          Schedule Interview
                        </h4>

                        <div className="flex flex-col md:flex-row gap-3 md:items-center">
                          <input
                            type="datetime-local"
                            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22426A]"
                            value={interviewDates[app.id] || ""}
                            onChange={(e) =>
                              setInterviewDates((prev) => ({
                                ...prev,
                                [app.id]: e.target.value,
                              }))
                            }
                          />

                          <button
                            onClick={() => scheduleInterview(app.id)}
                            disabled={loadingId === app.id}
                            className="bg-[#22426A] text-white px-5 py-2 rounded-lg text-sm hover:bg-[#183450] transition disabled:opacity-50"
                          >
                            {loadingId === app.id
                              ? "Scheduling..."
                              : "Schedule Interview"}
                          </button>
                        </div>

                        {interviewDates[app.id] && (
                          <div className="mt-3 text-sm text-gray-600 bg-gray-100 rounded-lg p-3">
                            <span className="font-medium">
                              Message Preview:
                            </span>

                            <p className="mt-1">
                              You are invited to interview for this post on{" "}
                              {new Date(
                                interviewDates[app.id],
                              ).toLocaleString()}
                              . Please be available on time.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedResume && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl overflow-hidden relative shadow-2xl">
            <button
              onClick={() => setSelectedResume(null)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg z-10"
            >
              Close
            </button>

            <iframe src={selectedResume} className="w-full h-full" />
          </div>
        </div>
      )}
    </div>
  );
}
