"use client"

import { useState } from "react";
import BudgetOne from "./_components/budgetOne";
import BudgetTwo from "./_components/budgetTwo";
import { motion } from "framer-motion";

export default function Budgets() {
    const [refreshAll, setRefreshAll] = useState(false)

    return (
    <motion.div initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }} className="min-h-screen">
      <BudgetOne refreshAll={() => setRefreshAll(!refreshAll)} />
      <BudgetTwo refreshAll={() => setRefreshAll(!refreshAll)} />
    </motion.div>
    )
}