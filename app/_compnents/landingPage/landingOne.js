"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LandingOne() {
  const router = useRouter();

  return (
    <div className="px-6 sm:px-6 lg:px-8 py-10 sm:min-h-screen h-[600] flex flex-col items-center">
      
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        viewport={{ once: true }}
        className="rounded-2xl py-2 px-4 text-md sm:text-base lg:text-xl text-center w-full sm:w-4/5 md:w-3/5 lg:w-2/5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-sans mb-6"
      >
        ₹ Take control of your expenses
      </motion.h1>

      
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="text-center text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 leading-tight"
      >
        Track every{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Rupees
        </span>
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-center text-3xl sm:text-5xl lg:text-6xl font-bold mb-6"
      >
        Build your Future
      </motion.h1>

      
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-base sm:text-lg lg:text-xl max-w-2xl text-muted-foreground mb-10"
      >
        Effortlessly track every rupee, create smart budgets, and stay in
        control of your finances.
      </motion.p>

      
      <div className="flex flex-row sm:flex-row justify-center items-center gap-4 sm:gap-10 mb-12">
        <motion.button
          onClick={() => router.push("/sign-up")}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="cursor-pointer rounded-xl sm:px-10 sm:py-5 p-4 text-base sm:text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition font-semibold"
        >
          Get Started{" "}
          <FontAwesomeIcon
            icon={faArrowRight}
            className="inline w-4 h-4 ml-2"
          />
        </motion.button>

        <motion.button
          onClick={() => router.push("/dashboard")}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="cursor-pointer rounded-xl sm:px-10 sm:py-5 p-4 text-base sm:text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition font-semibold"
        >
          Dashboard{" "}
          <FontAwesomeIcon
            icon={faArrowRight}
            className="inline w-4 h-4 ml-2"
          />
        </motion.button>
      </div>

      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 text-sm sm:text-base text-white">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p>No credit card required</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <p>Free forever plan</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <p>Bank Level Security</p>
        </motion.div>
      </div>
    </div>
  );
}
