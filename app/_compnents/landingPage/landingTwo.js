"use client";

import { motion } from "framer-motion";
import { Coins, Columns3Cog, Hourglass, MonitorUp } from "lucide-react";

export default function LandingTwo() {
  const featureList = [
    {
      id: 1,
      heading: "Smart Budgeting",
      paragraph:
        "Set monthly limits for your spending categories, get automatic alerts, and stay on track.",
      image: Coins,
    },
    {
      id: 2,
      heading: "Real-Time Expense Tracking",
      paragraph:
        "Add and monitor your expenses instantly, with beautiful bar charts that show your spending patterns.",
      image: Hourglass,
    },
    {
      id: 3,
      heading: "Powerful Insights",
      paragraph:
        "Visualize your savings and overspending trends with daily and monthly comparisons.",
      image: MonitorUp,
    },
    {
      id: 4,
      heading: "Custom Categories",
      paragraph:
        "Create personalized categories with emoji tags to better organize your finances.",
      image: Columns3Cog,
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-16 py-20 bg-black text-white">
      
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="text-center text-3xl sm:text-5xl lg:text-6xl font-bold mb-6"
      >
        Everything You Need to{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Succeed
        </span>
      </motion.h1>

      
      <motion.p
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="text-center text-base sm:text-lg lg:text-2xl max-w-4xl mx-auto mb-12"
      >
        Powerful features designed to make expense tracking effortless and
        financial planning enjoyable.
      </motion.p>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {featureList.map((f, id) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-neutral-800 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="mb-5 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center">
              <f.image className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 font-mono">
              {f.heading}
            </h2>
            <p className="text-sm sm:text-base opacity-90 font-mono">
              {f.paragraph}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
