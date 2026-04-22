"use client";

import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TopCompanies() {
  const { data, isLoading } = useQuery({
    queryKey: ["top-companies"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/jobs/all`);
      return res.json();
    },
  });

  if (isLoading) return <p className="p-10">Loading...</p>;

  return (
    <div className=" p-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-[#22426A] mb-10">Top Companies</h1>

      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        <div className="flex gap-6 mt-16">
          {data?.data?.map((job: any) => (
            <div
              key={job.id}
              className="w-80 bg-white shadow-lg rounded-2xl p-5 border"
            >
              <h2 className="text-xl font-semibold text-[#22426A] mb-2">
                {job.company}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-3">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
