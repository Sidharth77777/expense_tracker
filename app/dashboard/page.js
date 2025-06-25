"use client"

import DashOne from "./_components/dashOne";
import DashThree from "./_components/dashThree";
import DashTwo from "./_components/dashTwo";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DashboardPage() {
  const [chartData, setChartData] = useState([])
  return (
    <motion.div initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }} className="min-h-screen">

      <DashOne setChartData={setChartData} />
      <DashTwo />
      <DashThree chartData={chartData} />
    </motion.div>
  );
}
