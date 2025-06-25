"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }}
      >
        <SignIn />
      </motion.div>
    </div>
  );
}
