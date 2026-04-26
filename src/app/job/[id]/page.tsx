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

  /* ================= JOB FETCH ================= */
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

  /* ================= APPLY HANDLER ================= */
  const handleApply = async () => {
    if (!job) return;

    setLoading(true);

    try {
      /* ================= FREE JOB ================= */
      if (!job.price || job.price === 0) {
        if (!resume) {
          toast.error("Please upload your CV");
          return;
        }

        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("coverLetter", coverLetter || "");
        formData.append("jobId", String(job.id));

        const res = await fetch(`${API_URL}/api/application/apply`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Apply failed");
        }

        toast.success("✅ Application submitted!");

        setResume(null);
        setCoverLetter("");
        return;
      }

      /* ================= PAID JOB ================= */
      toast("Redirecting to payment... 💳");

      const payRes = await fetch(`${API_URL}/api/payment/init`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: job.id,
        }),
      });

      const payData = await payRes.json();

      if (!payRes.ok) {
        throw new Error(payData.message || "Payment failed");
      }

      // 👉 redirect to SSLCommerz
      window.location.href = payData.url;
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">Error loading job</p>;

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#22426A]">{job?.title}</h1>

      <p className="text-gray-500 mt-1">
        {job?.company} • {job?.location}
      </p>

      <p className="text-green-600 font-bold mt-2">
        {job.price && job.price > 0 ? `💰 Apply Fee: ${job.price} BDT` : "Free"}
      </p>

      <p className="mt-6 text-gray-700">{job?.description}</p>

      {/* APPLY FORM */}
      <div className="mt-8 border p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Apply</h2>

        {/* ❗ Only show upload for FREE job */}
        {(!job.price || job.price === 0) && (
          <>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              className="mb-3"
            />

            <textarea
              placeholder="Cover letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />
          </>
        )}

        <Button
          onClick={handleApply}
          disabled={loading}
          className="bg-green-700 w-full"
        >
          {loading
            ? "Processing..."
            : job?.price > 0
              ? "Pay & Apply"
              : "Apply Now"}
        </Button>
      </div>
    </div>
  );
}
