"use client"

import { motion } from "framer-motion"

export default function AiInsights() {
    return (
        <motion.div initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }} className="min-h-screen">
      {/*<h1 className="text-3xl font-bold">Welcome to your AI Insights</h1>*/}
      {/*<p className="mt-2 text-lg">This is your AI insights overview page.</p>*/}
      <h1 className="sm:text-4xl text-4xl text-center pt-20">Coming in next update...</h1>
    </motion.div>
    )
}