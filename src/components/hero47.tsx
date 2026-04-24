"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Hero47 = ({
  heading = "Where",
  subheading = " Every Career ",
  description = "Journey Begins",
  images = [
    "https://i.ibb.co/NgZnn4c3/customer-service-handsome-curly-man-office-suit-with-computer-headset-smiling.jpg",
    "https://i.ibb.co/gZ590f06/top-view-confident-young-female-sitting-table-holding-document-making-ok-gesture-office.jpg",
    "https://i.ibb.co/N6nCQQwp/smiling-young-caucasian-delivery-man-red-uniform-cap-holding-pizza-packages-with-food-containers-pap.jpg",
    "https://i.ibb.co/jPKrkJkm/young-adult-buying-products-quarantine.jpg",
  ],
  className,
}: any) => {
  // ✅ fetch categories
  const { data } = useQuery({
    queryKey: ["trending-categories"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/job/trending-categories`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });

  return (
    <section
      className={cn(
        "bg-background py-24 px-4 lg:py-32 lg:px-8 mt-16",
        className,
      )}
    >
      <div className="container max-w-7xl flex flex-col lg:flex-row items-start gap-16">
        <div className="lg:w-1/2 flex flex-col gap-8">
          <h2 className="text-6xl font-semibold leading-tight max-w-2xl">
            <span className="text-[#22426A]">{heading} </span>
            <span className="text-[#EDB713]">{subheading}</span>
            <span className="text-[#22426A]">{description}</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl">
            Largest Job Site in Bangladesh
          </p>

          <div className="flex flex-col gap-4 w-full max-w-3xl">
            <div className="flex items-center w-full bg-white shadow-lg rounded-xl overflow-hidden border"></div>

            <div className="bg-white shadow-md rounded-2xl p-5">
              <h3 className="text-lg font-semibold mb-3">
                Trending Job Categories
              </h3>

              <div className="flex flex-wrap gap-3">
                {data?.data?.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          {images.slice(0, 4).map((img: string, idx: number) => (
            <div key={idx} className="overflow-hidden rounded-xl">
              <img src={img} className="w-full h-52 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero47 };
