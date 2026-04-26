"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  Building2,
  Briefcase,
  FileText,
  CreditCard,
  Flag,
  Bell,
  Bot,
} from "lucide-react";

const navSections = [
  {
    title: "Overview",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Management",
    items: [
      { name: "Companies", href: "/admin/companies", icon: Building2 },

      { name: "Applications", href: "/admin/applications", icon: FileText },
    ],
  },
  {
    title: "Financial",
    items: [{ name: "Payments", href: "/admin/payments", icon: CreditCard }],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen ">
      <aside className="w-72 p-5">
        <div className="h-full rounded-2xl  shadow-lg flex flex-col">
          <div className="p-5 border-b flex items-center">
            <div className="text-4xl italic font-bold leading-none">JH</div>

            <div className="ml-auto flex items-end h-10">
              <p className="text-xs text-[#F7630C] text-right">Admin Panel</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold  uppercase mb-2 px-2">
                  {section.title}
                </p>

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <Link key={item.href} href={item.href}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.97 }}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                            isActive ? " " : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Icon size={16} />
                          <span className="text-sm">{item.name}</span>

                          {isActive && (
                            <motion.div
                              layoutId="active-line"
                              className="ml-auto h-4 w-1 rounded"
                            />
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t text-xs">© 2026 JobHive</div>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full rounded-2xl bg-white shadow-md p-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
