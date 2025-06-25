"use client";

import { motion } from 'framer-motion';
import { SignUp, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, router]);

  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }}
      >
        <SignUp />
      </motion.div>
    </div>
  );
}
