"use client"
import { motion } from "framer-motion";

export default function BudgetDetailsSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.5,
      }}
      className="w-full animate-pulse"
    >
      <div className="h-8 w-1/3 bg-gray-700 rounded mb-4" />

      <div className="w-full mb-3 bg-[#1c1c1c] rounded-xl px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-gray-600" />
              <div className="h-4 w-32 bg-gray-600 rounded" />
              <div className="h-6 w-20 bg-gray-700 rounded-2xl" />
            </div>
            <div className="flex justify-between items-center gap-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-600 rounded" />
                <div>
                  <div className="w-20 h-4 bg-gray-700 rounded mb-1" />
                  <div className="w-24 h-6 bg-gray-600 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-600 rounded" />
                <div>
                  <div className="w-20 h-4 bg-gray-700 rounded mb-1" />
                  <div className="w-24 h-6 bg-gray-600 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-600 rounded" />
                <div>
                  <div className="w-20 h-4 bg-gray-700 rounded mb-1" />
                  <div className="w-24 h-6 bg-gray-600 rounded" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-20 h-10 bg-gray-700 rounded-md" />
            <div className="w-20 h-10 bg-gray-700 rounded-md" />
          </div>
        </div>

        <div className="mt-6 w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gray-500 rounded-full w-1/2" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="h-10 bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-2/3" />
      </div>
    </motion.div>
  );
}
