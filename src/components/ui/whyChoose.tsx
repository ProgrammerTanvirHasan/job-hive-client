"use client";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Zap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const items = [
    {
      icon: Zap,
      title: "Easy Apply",
      desc: "Apply to jobs quickly with a simple and smooth application process.",
    },
    {
      icon: BadgeCheck,
      title: "Verified Jobs",
      desc: "All job listings are verified to ensure authenticity and trust.",
    },
    {
      icon: Briefcase,
      title: "Fast Hiring",
      desc: "Get hired faster with optimized recruitment workflows.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-bold text-[#22426A] mt-10 mb-12 text-center"
      >
        Why Join With Us
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {items.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <item.icon className="w-10 h-10 text-[#22426A] mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
