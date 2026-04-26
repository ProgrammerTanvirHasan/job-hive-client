"use client";

import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/admin/payments`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });

  if (isLoading)
    return <p className="p-10 text-gray-600 dark:text-gray-300">Loading...</p>;

  if (isError)
    return (
      <p className="p-10 text-red-500 dark:text-red-400">
        Failed to load payments
      </p>
    );

  const payments = data?.data || [];

  return (
    <div className="min-h-screen p-4 md:p-10 bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 transition">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-6">Payments</h1>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full rounded-xl overflow-hidden bg-white dark:bg-[#1e293b]">
          <thead className="bg-gray-100 dark:bg-[#334155]">
            <tr>
              <th className="px-4 py-3 text-left">Transaction</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Job</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Verified</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay: any) => (
              <tr
                key={pay.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#334155]"
              >
                <td className="px-4 py-3 text-xs">{pay.transactionId}</td>

                <td className="px-4 py-3">
                  {pay.user?.name}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {pay.user?.email}
                  </p>
                </td>

                <td className="px-4 py-3">{pay.job?.title}</td>

                <td className="px-4 py-3 font-medium">
                  {pay.amount} {pay.currency}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      pay.status === "SUCCESS"
                        ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                        : pay.status === "FAILED"
                          ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                    }`}
                  >
                    {pay.status}
                  </span>
                </td>

                <td className="px-4 py-3">{pay.isVerified ? "✅" : "❌"}</td>

                <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                  {new Date(pay.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {payments.map((pay: any) => (
          <div
            key={pay.id}
            className="p-4 rounded-xl shadow bg-white dark:bg-[#1e293b]"
          >
            <h2 className="text-sm font-semibold break-all">
              {pay.transactionId}
            </h2>

            <p className="text-sm mt-1">{pay.user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {pay.job?.title}
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm font-medium">
                {pay.amount} {pay.currency}
              </span>

              <span
                className={`px-2 py-1 text-xs rounded ${
                  pay.status === "SUCCESS"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                    : pay.status === "FAILED"
                      ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                }`}
              >
                {pay.status}
              </span>
            </div>

            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              {new Date(pay.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {payments.length === 0 && (
        <p className="text-center mt-10 text-gray-500 dark:text-gray-400">
          No payments found
        </p>
      )}
    </div>
  );
}
