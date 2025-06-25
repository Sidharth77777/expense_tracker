"use client"

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from 'next/router';

export default function LandingOne() {
  const router = useRouter()

  return (
    <div className="px-6 h-screen mb-20">
      <div className="flex justify-center items-center mb-10">
<motion.h1 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} viewport={{ once: true }} className=" rounded-2xl p-2 text-lg md:text-base lg:text-xl w-4/5 sm:w-3/5 lg:w-2/5 text-center bg-gradient-to-r from-blue-500 to-purple-500 font-sans">
  ₹ Take control of your expenses
</motion.h1>

      </div>
<motion.h1 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} viewport={{ once: true }} className=" text-center text-base sm:text-7xl mb-3">
  Track every{" "}
  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-sans">
    Rupees
  </span>
</motion.h1>
      <motion.h1 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }} className=" text-center text-base sm:text-7xl mb-8">Build your Future</motion.h1>
      <motion.p initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className=" text-center text-base lg:text-xl mb-15">Effortlessly track every rupee, create smart budgets, and stay in control of your finances.</motion.p>

    <div className='flex justify-center items-center gap-10'>
    <div className="flex justify-center items-center mb-20">
        <motion.button onClick={() => router.push("/sign-up")} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className=" mt-2 cursor-pointer rounded-xl lg:p-5 p-3 text-base sm:text-2xl text-center bg-gradient-to-r from-blue-500 to-purple-500 hover:translate-2 font-sans">Get Started  <FontAwesomeIcon icon={faArrowRight} className="inline w-4 h-4 align-middle transition-none" /></motion.button>
    </div>  
        <div className="flex justify-center items-center mb-20">
        <motion.button onClick={() => router.push("/dashboard")} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className=" mt-2 cursor-pointer rounded-xl lg:p-5 p-3 text-base sm:text-2xl text-center bg-gradient-to-r from-blue-500 to-purple-500 hover:translate-2 font-sans">Dashboard  <FontAwesomeIcon icon={faArrowRight} className="inline w-4 h-4 align-middle transition-none" /></motion.button>
    </div> 
    </div> 


    <div className='flex justify-center items-center'>
    <div className='flex justify-between items-center'>
      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} viewport={{ once: true }} className='flex items-center gap-3 mr-15 text-base sm:text-sm'>
        <div className='w-2 h-2 bg-green-500 rounded'></div>
        <p className=''>No credit card required</p>
      </motion.div>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} viewport={{ once: true }} className='flex items-center mr-15 gap-3 text-base sm:text-sm'>
        <div className='w-2 h-2 bg-yellow-500 rounded'></div>
        <p className=''>Free forever plan</p>
      </motion.div>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} viewport={{ once: true }} className='flex items-center mr-15 gap-3 text-base sm:text-sm'>
        <div className='w-2 h-2 bg-red-500 rounded'></div>
        <p className=''>Bank Level Security</p>
      </motion.div>

      <div></div>
      <div></div>
    </div>
    </div>

    </div>

  );
}
