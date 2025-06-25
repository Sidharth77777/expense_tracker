"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Check from "./../../../public/images/check.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LandingThree() {
  const router = useRouter();

  const getList = [
    { id: 1, p: "Start tracking expenses in under 2 minutes" },
    { id: 2, p: "Visualize your spending with interactive charts" },
    { id: 3, p: "Create custom categories for all your expenses" },
    { id: 4, p: "Set monthly budgets" },
    { id: 5, p: "Seamlessly switch between daily and monthly views" },
    { id: 6, p: "Secure, cloud-based sync – your data is always safe" },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-16 text-white">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-center text-3xl sm:text-5xl lg:text-6xl font-bold"
      >
        Ready to Take Control of Your{" "}
        <span className="block bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-transparent">
          Financial Future?
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-6 text-base sm:text-lg lg:text-2xl max-w-4xl mx-auto"
      >
        Join a community that’s taking control of their money. No subscriptions,
        no stress — just clear, intuitive financial tracking.
      </motion.p>

      {/* Card Section */}
      <div className="flex justify-center mt-12">
        <div className="bg-neutral-800 w-full max-w-4xl rounded-xl px-6 sm:px-10 py-10 shadow-lg shadow-neutral-700">
          <h2 className="text-xl sm:text-3xl mb-8 text-center font-mono">
            What you will get:
          </h2>

          {/* Feature List */}
          <div className="space-y-5">
            {getList.map((g) => (
              <div
                key={g.id}
                className="flex items-start gap-4 sm:gap-6 max-w-2xl mx-auto"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                  <Image
                    alt="check"
                    src={Check}
                    className="w-full h-full object-contain"
                  />
                </div>
                <motion.h2
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-base sm:text-lg font-mono"
                >
                  {g.p}
                </motion.h2>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileHover={{ x: 10, y: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => router.push("/sign-up")}
              className="cursor-pointer w-full sm:w-2/3 md:w-1/2 text-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-lg sm:text-2xl font-semibold hover:scale-[1.02] transition-transform"
            >
              Start for Free{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="inline w-4 h-4 ml-2 align-middle"
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Already have an account? */}
      <p className="mt-10 text-center text-base sm:text-lg">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-blue-600 hover:text-blue-400 underline"
        >
          Sign In Here
        </Link>
      </p>
    </div>
  );
}
