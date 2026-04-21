"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl"
      >
        <Card className="rounded-2xl shadow-2xl border-0">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* LEFT SIDE IMAGES */}
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
                  alt="team"
                  className="rounded-2xl h-40 md:h-56 w-full object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                  alt="office"
                  className="rounded-2xl h-40 md:h-56 w-full object-cover mt-6"
                />
              </div>

              {/* RIGHT SIDE CONTENT */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-[#22426A] mb-4">
                  Are you a recruiter?
                </h1>

                <p className="text-gray-500 mb-6 text-base md:text-lg">
                  Post your job and find the best candidates quickly with our
                  fast hiring system.
                </p>

                <Link href="/user_route/become-recruiter">
                  <Button className="px-6 py-6 text-lg rounded-xl bg-[#22426A]">
                    Post a Job <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <div className="mt-6 text-sm text-gray-400">
                  Join thousands of recruiters already hiring faster.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
