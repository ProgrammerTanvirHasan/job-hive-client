import { ArrowRight } from "lucide-react";

export default function HowToApply() {
  const steps = [
    {
      title: "Registration",
      subtitle: "Create your account instantly using your phone number.",
    },
    {
      title: "Build Your Profile",
      subtitle: "A strong profile is your first step to success.",
    },
    {
      title: "Apply Jobs",
      subtitle: "Apply instantly to your preferred job with just one click.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[#22426A]">How to Apply</h1>
        <p className="text-lg text-gray-500">
          Learn how to apply for jobs on our platform.
        </p>
      </div>

      {/* Steps */}
      <div className="flex flex-col md:flex-row items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center">
            {/* Card */}
            <div className="w-64 h-64 bg-white border-2 border-[#22426A] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition mb-6 md:mb-0">
              <h2 className="text-xl font-semibold  mb-3">{step.title}</h2>
              <p className="text-gray-500 text-sm">{step.subtitle}</p>
            </div>

            {/* Arrow */}
            {index !== steps.length - 1 && (
              <>
                {/* Desktop Arrow (Right) */}
                <ArrowRight
                  className="mx-4 text-[#22426A] hidden md:block"
                  size={32}
                />

                {/* Mobile Arrow (Down) */}
                <ArrowRight
                  className="rotate-90 text-[#22426A] mb-6 md:hidden"
                  size={28}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
