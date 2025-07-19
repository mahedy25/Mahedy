'use client'

import { PortableText, type SanityDocument } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { portableTextComponents } from '../lib/portableTextComponents'

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function ProjectContent({
  project,
  imageUrl,
}: {
  project: SanityDocument
  imageUrl: string | null
}) {
  return (
    <motion.main
      className='container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-20 flex flex-col items-center'
      variants={containerVariants}
      initial='hidden'
      animate='show'
    >
      {/* Back Button */}
      <motion.div variants={itemVariants} className='w-full mb-6 sm:mb-8'>
        <Link
          href='/'
          className='inline-block bg-[#14B8A6] text-white font-medium text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-md transition-colors'
        >
          ← Back to projects
        </Link>
      </motion.div>
      {/* Image Section */}     {' '}
      {imageUrl && (
        <motion.div
          variants={itemVariants}
          className='w-full h-[400px] sm:h-[500px] overflow-hidden rounded-xl shadow-md mb-6 md:mb-10 relative'
        >
          <Image
            src={imageUrl}
            alt={project.title}
            width={1280}
            height={720}
            className='w-full h-fit object-contain'
            priority
          />
                 {' '}
        </motion.div>
      )}
      {/* Title */}
      <motion.h1
        variants={itemVariants}
        className='w-full text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 mb-4 sm:mb-6 leading-snug text-left'
      >
        {project.title}
      </motion.h1>
      {/* Published Date */}
      <motion.p
        variants={itemVariants}
        className='w-full text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 text-left'
      >
        Published: {new Date(project.publishedAt).toLocaleDateString()}
      </motion.p>
      {/* Divider */}
      <motion.hr
        variants={itemVariants}
        className='w-full border-t border-gray-200 my-8'
      />
      {/* Body Content */}
      {Array.isArray(project.body) && (
        <motion.div
          variants={itemVariants}
          className='prose prose-sm sm:prose-base md:prose-lg max-w-none w-full text-gray-800'
        >
          <PortableText
            value={project.body}
            components={portableTextComponents}
          />
        </motion.div>
      )}
    </motion.main>
  )
}
