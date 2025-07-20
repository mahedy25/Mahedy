'use client'

import { PortableText, type SanityDocument } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { portableTextComponents } from '../lib/portableTextComponents'
import { LucideLink } from 'lucide-react' // Import LucideLink

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

// Extend SanityDocument type to include 'Link'
type ProjectWithLink = SanityDocument & {
  Link?: string; // Make it optional in case some projects don't have it
};

export default function ProjectContent({
  project,
  imageUrl,
}: {
  project: ProjectWithLink; // Use the extended type here
  imageUrl: string | null;
}) {
  return (
    <motion.main
      className='container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center'
      variants={containerVariants}
      initial='hidden'
      animate='show'
    >
      {/* Image Section */}
      {imageUrl && (
        <motion.div
          variants={itemVariants}
          className='w-full h-fit sm:h-[500px] overflow-hidden rounded-xl shadow-md mb-6 md:mb-10 relative'
        >
          <Image
            src={imageUrl}
            alt={project.title}
            width={1280}
            height={720}
            className='w-full h-fit object-contain'
            priority
          />
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
        className='w-full border-t border-gray-200 my-4 sm:my-6'
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

      {/* Buttons */}
      <motion.div variants={itemVariants} className='w-full flex mt-12 flex-col text-center justify-center sm:justify-start md:flex-row gap-4'>
        <Link
          href='/works'
          className='inline-block bg-[#004D4D] hover:bg-[#800020] text-white font-medium text-sm sm:text-base px-4  py-2 rounded-md transition-colors duration-300 ease-in-out'
        >
          Keep Exploring
        </Link>

        {/* New "Visit Live Site" Button */}
        {project.Link && ( // Only render if project.Link exists
          <Link
            href={project.Link}
            target='_blank' // Opens in a new tab
            rel='noopener noreferrer' // Recommended for security
            className='inline-flex hover:underline items-center bg-[#004D4D] hover:bg-[#800020] text-white font-medium text-sm sm:text-base px-4 py-2 rounded-md justify-center transition-colors duration-300 ease-in-out'
          >
            Visit Live Site
            <LucideLink className='ml-2 h-4 w-4' /> {/* Icon for external link */}
          </Link>
        )}
      </motion.div>
    </motion.main>
  );
}