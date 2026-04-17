"use client";
import { FaEnvelope, FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Job Hive</h2>
          <p className="text-gray-400 text-sm">
            Helping recruiters find the best talent faster and smarter.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Jobs</li>
            <li className="hover:text-white cursor-pointer">Candidates</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">Stay Connected</h3>
          <div className="flex gap-4 mb-4">
            <FaFacebookF className="w-5 h-5 cursor-pointer hover:text-blue-500" />
            <FaTwitter className="w-5 h-5 cursor-pointer hover:text-sky-400" />
            <FaLinkedin className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <FaEnvelope className="w-4 h-4" /> support@jobhive.com
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Job Hive. All rights reserved.
      </div>
    </footer>
  );
}
