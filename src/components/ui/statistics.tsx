export default function Statistics() {
  const stats = [
    { value: "3.9K+", label: "Companies" },
    { value: "2.3M+", label: "Users" },
    { value: "8.5M+", label: "Job Applications" },
    { value: "32.8K+", label: "Jobs Confirmed" },
    { value: "14.2K+", label: "Job Vacancies" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      {/* Heading */}
      <div className="text-center mb-12 max-w-xl">
        <h1 className="text-4xl font-bold mb-4 text-[#22426A]">
          Strength in Numbers, Trust in Proof
        </h1>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-16">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Value */}
            <span className="text-3xl md:text-4xl font-bold text-[#22426A]">
              {item.value}
            </span>

            {/* Label */}
            <span className="text-gray-500 mt-2 text-sm md:text-base">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
