"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import BarChart from "./../../../public/images/bar-chart.png"
import { Coins, Columns3Cog, Hourglass, MonitorUp } from "lucide-react"

export default function LandingTwo(){
    const featureList = [
        {
            id: 1,
            heading: 'Smart Budgeting',
            paragraph: 'Set monthly limits for your spending categories, get automatic alerts, and stay on track.',
            image: Coins,
        },
        {
            id: 2,
            heading: 'Real-Time Expense Tracking',
            paragraph: 'Add and monitor your expenses instantly, with beautiful bar charts that show your spending patterns.',
            image: Hourglass,
        },
        {
            id: 3,
            heading: 'Powerful Insights',
            paragraph: 'Visualize your savings and overspending trends with daily and monthly comparisons.',
            image: MonitorUp,
        },
        {
            id: 4,
            heading: 'Custom Categories',
            paragraph: 'Create personalized categories with emoji tags to better organize your finances.',
            image: Columns3Cog,
        },
        //   {
        //     id: 5,
        //     heading: 'CSV Import Support',
        //     paragraph: 'Easily import your expense history from Excel or CSV to get started quickly.',
        //     image: null,
        //   },
    ]


    return (
        <div className="px-6 py-25 h-auto bg-black">
            <motion.h1 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} viewport={{ once: true }} className="text-base text-center sm:text-7xl mb-10">Everything You Need to {" "} <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Succeed</span></motion.h1>
            <motion.p initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} viewport={{ once: true }} className="text-base text-center sm:text-2xl">Powerful features designed to make expense tracking efforless and financial planning enjoyable.</motion.p>

            <div className="flex flex-col justify-center items-center mt-10">

                {featureList.map((f,id) => (
                    <motion.div key={id} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }} className="bg-neutral-600 w-4/5 shadow-lg shadow-neutral-700 px-20 py-10 rounded-2xl mb-15">
                    <div className="mb-8 w-15 h-15 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center">
                        <f.image alt='bar' className="w-10 h-10 text-black" />
                    </div>
                    <h2 className="text-base sm:text-3xl mb-3 font-mono">{f.heading}</h2>
                    <p className="text-base font-mono">{f.paragraph}</p>
                </motion.div>
                ))}
                
            </div>
        </div>
    )
}