"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Check from './../../../public/images/check.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function LandingThree(){
    const router = useRouter()

    const getList = [
        {
            id : 1,
            p : 'Start tracking expenses in under 2 minutes',
        },
        {
            id : 2,
            p : 'Visualize your spending with interactive charts',
        },
        {
            id : 3,
            p : 'Create custom categories for all your expenses',
        },
        {
            id : 4,
            p : 'Set monthly budgets',
        },
        {
            id : 5,
            p : 'Seamlessly switch between daily and monthly views',
        }, 
        {
            id : 6,
            p : 'Secure, cloud-based sync – your data is always safe'
        },                          
    ]

    return (
        <div className="py-8 px-6">
            <motion.h1 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }} className="text-center text-base sm:text-7xl">Ready to Take Control of Your{" "} <span className="block bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-transparent">Financial Future?</span></motion.h1>
            <motion.p initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center text-base sm:text-2xl mt-10">Join a community that’s taking control of their money. No subscriptions, no stress — just clear, intuitive financial tracking.</motion.p>

            <div className="flex justify-center items-center">
            <div className="bg-neutral-600 w-4/5 rounded-xl px-7 py-10 mt-15 shadow-lg shadow-neutral-700">
                <h2 className="text-base mb-10 text-center sm:text-4xl font-mono">What you will get:</h2>

                    {getList.map((g,id) => (
                    <div key={id} className="flex items-center gap-5 mb-5">
                    <div className="w-10 h-10">
                        <Image alt='check' src={Check} className="w-8 h-8" />
                    </div>
                    <motion.h2 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-base sm:text-xl font-mono">{g.p}</motion.h2>
                </div>
                    ))}

                <motion.div initial={{ opacity: 0, x: 50 }} whileHover={{ x: 10, y:10 }}  whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex justify-center items-center mt-10">
                    <motion.h3 onClick={() => router.push("/sign-up")} className="p-3 text-center cursor-pointer w-1/2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-2xl">Start for Free <FontAwesomeIcon icon={faArrowRight} className="inline w-5 h-4 align-middle transition-none" /></motion.h3>
                </motion.div>
                {/*<motion.h4 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} viewport={{ once: true }}  className="text-center text-base sm:text-lg mt-3">Setup in 1 minute</motion.h4>*/}    
                </div>
                </div>
                
                <h1 className="mt-10 mb-30 text-center text-base sm:text-xl">Already have an account?{" "} <Link href="/sign-in"><span className="text-blue-800 cursor-pointer hover:text-blue-500">Sign In Here</span></Link></h1>
        </div>
    )
}