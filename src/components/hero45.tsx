import { Briefcase, Users, Zap } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const HeroSection = ({ className }: { className?: string }) => {
  const features = [
    {
      icon: Briefcase,
      title: "Verified Jobs",
      description:
        "Explore thousands of verified job listings from top companies worldwide.",
    },
    {
      icon: Users,
      title: "Top Employers",
      description:
        "Connect with leading employers actively hiring across multiple industries.",
    },
    {
      icon: Zap,
      title: "Quick Apply",
      description:
        "Apply to jobs instantly with a fast and seamless application process.",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container overflow-hidden">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-semibold lg:text-5xl italic text-[#22426A]">
            Find Your Dream Job
          </h1>
          <p className="text-muted-foreground text-lg">
            Thousands of jobs available
          </p>
        </div>

        {/* Features */}
        <div className="mx-auto mt-4 flex max-w-5xl flex-col md:flex-row">
          {features.map((feature, index) => (
            <React.Fragment key={feature.title}>
              {index > 0 && (
                <Separator
                  orientation="vertical"
                  className="mx-6 hidden h-auto w-[2px] bg-linear-to-b from-muted via-transparent to-muted md:block"
                />
              )}
              <div className="flex grow basis-0 flex-col rounded-md bg-background p-4">
                <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-background drop-shadow-lg">
                  <feature.icon className="w-5 h-auto" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
