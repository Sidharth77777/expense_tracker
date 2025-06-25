"use client"

import ExpensesOne from "./_components/expensesOne";
import ExpensesTwo from "./_components/expensesTwo";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Expenses() {
    const [refreshTrigger, setRefreshTrigger] = useState(false)

    return (
    <motion.div initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }} className="min-h-screen">
      <ExpensesOne refreshTrigger={() => setRefreshTrigger(!refreshTrigger)} />
      <ExpensesTwo refreshTrigger={() => setRefreshTrigger(!refreshTrigger)} />
    </motion.div>
    )
}