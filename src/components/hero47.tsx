import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface Hero47Props {
  heading?: string;
  subheading?: string;
  description?: string;
  images?: string[];
  className?: string;
}

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
}: Hero47Props) => {
  return (
    <section
      className={cn(
        "bg-background py-24 px-4 lg:py-32 lg:px-8 mt-16",
        className,
      )}
    >
      <div className="container max-w-7xl flex flex-col lg:flex-row items-start gap-16">
        {/* LEFT SIDE */}
        <div className="lg:w-1/2 flex flex-col gap-8">
          {/* Heading */}
          <h2 className="text-6xl font-semibold leading-tight max-w-2xl">
            <span className="text-[#22426A]">{heading} </span>
            <span className="text-[#EDB713]">{subheading}</span>
            <span className="text-[#22426A]">{description}</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl">
            Largest Job Site in Bangladesh
          </p>

          {/* Search Bar */}
          <div className="flex flex-col gap-4 w-full max-w-3xl">
            <div className="flex items-center w-full bg-white shadow-lg rounded-xl overflow-hidden border">
              <Input
                placeholder="Search jobs..."
                className="border-0 focus-visible:ring-0 px-5 py-6 text-base"
              />
              <Button className="rounded-none px-8 py-6 bg-[#22426A] hover:bg-[#1b3554] text-white flex items-center gap-2">
                Find Jobs
                <ArrowUpRight className="size-4" />
              </Button>
            </div>

            {/* Trending Categories */}
            <div className="bg-white shadow-md rounded-2xl p-5">
              <h3 className="text-lg font-semibold mb-3">
                Trending Job Categories
              </h3>

              <div className="flex flex-wrap gap-3">
                {[
                  "Sales Representative",
                  "Call Center",
                  "Marketing",
                  "Field Sales",
                  "Customer Service",
                  "Video Editing",
                  "Graphic Design",
                  "Computer Operator",
                  "Receptionist/Front office Desk",
                  "Talent Acquisition",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2  rounded-lg text-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
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

        {/* RIGHT SIDE (IMAGE GRID) */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          {images.slice(0, 4).map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl">
              <img
                src={img}
                alt={`grid-${idx}`}
                className="w-full h-52 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero47 };
