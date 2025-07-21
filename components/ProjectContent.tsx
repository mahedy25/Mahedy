'use client'

import { PortableText, type SanityDocument } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { portableTextComponents } from '../lib/portableTextComponents'
import { LucideLink } from 'lucide-react'

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1], // easeOutExpo
    },
  },
}

// Extended type for Link field
type ProjectWithLink = SanityDocument & {
  Link?: string
}

export default function ProjectContent({
  project,
  imageUrl,
}: {
  project: ProjectWithLink
  imageUrl: string | null
}) {
  return (
    <motion.main
      className='container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center'
      variants={containerVariants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Image */}
      {imageUrl && (
        <motion.div
          variants={itemVariants}
          className='relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-xl shadow-xl mb-10'
        >
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className='object-contain'
            priority
          />
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        variants={itemVariants}
        className='w-full text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 mb-4 leading-snug text-left'
      >
        {project.title}
      </motion.h1>

      {/* Date */}
      <motion.p
        variants={itemVariants}
        className='w-full text-sm sm:text-base text-gray-500 mb-8 text-left'
      >
        Published: {new Date(project.publishedAt).toLocaleDateString()}
      </motion.p>

      {/* Divider */}
      <motion.hr
        variants={itemVariants}
        className='w-full border-t border-gray-200 my-6'
      />

      {/* Portable Text Body */}
      {Array.isArray(project.body) && (
        <motion.section
          variants={itemVariants}
          className='prose prose-sm sm:prose-base md:prose-lg max-w-none w-full text-gray-800'
        >
          <PortableText
            value={project.body}
            components={portableTextComponents}
          />
        </motion.section>
      )}

      {/* Buttons */}
      <motion.div
        variants={itemVariants}
        className='w-full flex mt-14 flex-col text-center sm:text-left md:flex-row gap-4 justify-center sm:justify-start'
      >
        <Link
          href='/works'
          className='inline-block bg-[#004D4D] hover:bg-[#800020] text-white font-medium text-sm sm:text-base px-5 py-2.5 rounded-lg transition-colors duration-300 ease-in-out'
        >
          Keep Exploring
        </Link>

        {project.Link && (
          <Link
            href={project.Link}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 bg-[#004D4D] hover:bg-[#800020] text-white font-medium text-sm sm:text-base px-5 py-2.5 rounded-lg justify-center transition-colors duration-300 ease-in-out'
          >
            Visit Live Site
            <LucideLink className='h-4 w-4' />
          </Link>
        )}
      </motion.div>
    </motion.main>
  )
}
