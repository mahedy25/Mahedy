'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'


export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 25,
        delay: 0.3,
        duration: 1.2,
      }}
    >
      <div className='flex items-center'>
        <Link href="/">
         <div className='text-xl px-4 py-3 font-extrabold rounded-xl text-center  bg-[#FF073A] hover:bg-[#00FFFF] hover:text-[#0F0F0F]'>
          M
        </div>
        </Link>
        <span className='ml-2 text-sm md:text-xl lg:text-2xl  font-bold bg-gradient-to-r  bg-clip-text'>
          MAHEDY HASAN
        </span>
      </div>
    </motion.div>
  )
}
