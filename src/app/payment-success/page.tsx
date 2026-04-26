"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  useEffect(() => {
    toast.success("Payment successful! Your application has been submitted.");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600">
            Your payment has been confirmed and your application has been
            submitted successfully.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-800">
            The recruiter will review your application and get back to you soon.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {jobId && (
            <Button
              onClick={() => router.push(`/job/${jobId}`)}
              className="w-full"
            >
              View Job Details
            </Button>
          )}
          <Button
            onClick={() => router.push("/user_route/applications")}
            variant="outline"
            className="w-full"
          >
            View My Applications
          </Button>
          <Button
            onClick={() => router.push("/jobs/all")}
            variant="ghost"
            className="w-full"
          >
            Browse More Jobs
          </Button>
        </div>
      </div>
    </div>
  );
}
