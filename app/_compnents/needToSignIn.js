"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import LoginNeeded from './../../public/images/login-needed.png'
export default function NeedToSignIn(){
    return (
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex flex-col justify-center items-center h-100 pt-50 w-full">
            <Image alt='noLogin' src={LoginNeeded} className='w-30 h-30 mb-10' />
            <h1 className="text-center text-base sm:text-2xl">SIGN IN TO ACCESS THE APP</h1>
        </motion.div>
    )
}