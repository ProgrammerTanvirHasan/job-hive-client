"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function JobDetailsPage() {
  const { id } = useParams();

  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH JOB ================= */
  const { data, isLoading, error } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/${id}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch job");
      return res.json();
    },
    enabled: !!id,
  });

  const job = data?.data;

  /* ================= APPLY ================= */
  const handleApply = async () => {
    if (!job) return;

    // Validate resume for all jobs
    if (!resume) {
      toast.error("Upload CV required");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);
      formData.append("jobId", String(job.id));

      /* ================= FREE JOB ================= */
      if (!job.price || job.price <= 0) {
        const res = await fetch(`${API_URL}/api/application/apply`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        toast.success("Application submitted successfully!");
        setResume(null);
        setCoverLetter("");
        return;
      }

      /* ================= PAID JOB ================= */
      toast("Redirecting to payment...");

      const res = await fetch(`${API_URL}/api/payment/init-paid-application`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      const gatewayURL = data?.paymentURL;

      if (!gatewayURL) {
        throw new Error("No payment URL received");
      }

      window.location.href = gatewayURL;
    } catch (err: any) {
      toast.error(err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p className="min-h-screen">Loading...</p>;
  if (error) return <p>Error loading job</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold">{job?.title}</h1>

      <p className="text-gray-500">
        {job?.company} • {job?.location}
      </p>

      <p className="text-green-600 font-bold mt-2">
        {job?.price > 0 ? `💰 ${job.price} BDT` : "Free"}
      </p>

      <p className="mt-4">{job?.description}</p>

      <div className="mt-6 border p-4 rounded">
        <h2 className="font-bold mb-3">Apply for this Job</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Resume/CV *
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              className="w-full border p-2 rounded"
            />
            {resume && (
              <p className="text-sm text-green-600 mt-1">✓ {resume.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Cover Letter (Optional)
            </label>
            <textarea
              placeholder="Tell the employer why you're a great fit..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full border p-2 rounded min-h-[120px]"
            />
          </div>
        </div>

        <Button onClick={handleApply} disabled={loading} className="mt-4 w-full">
          {loading
            ? "Processing..."
            : job?.price > 0
              ? `Pay ${job.price} BDT & Apply`
              : "Submit Application"}
        </Button>

        {job?.price > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            You'll be redirected to SSLCommerz for secure payment
          </p>
        )}
      </div>
    </div>
  );
}
