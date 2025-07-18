'use client'

import { PortableText, type SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from 'framer-motion';
import { portableTextComponents } from '../lib/portableTextComponents';

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ProjectContent({
  project,
  imageUrl,
}: {
  project: SanityDocument;
  imageUrl: string | null;
}) {
  return (
    <motion.main
      className="container mx-auto min-h-screen max-w-3xl px-8 py-16 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="w-full text-left">
        <Link href="/" className="bg-[#0EA5E9] px-4 py-3 rounded-md hover:bg-[#8B0000] font-semibold text-white transition-colors mb-8 inline-block">
          ← Back to projects
        </Link>
      </motion.div>

      {imageUrl && (
        <motion.div variants={itemVariants} className="w-full">
          <Image
            src={imageUrl}
            alt={project.title}
            className="aspect-video p-4 rounded-xl shadow-lg w-full mb-8"
            width={550}
            height={310}
            priority
          />
        </motion.div>
      )}

      <div className="w-full text-left">
        <motion.h1
          className="text-5xl font-extrabold text-neutral-900 mb-2"
          variants={itemVariants}
        >
          {project.title}
        </motion.h1>
      </div>

      <motion.div
        className="w-full mt-6"
        variants={itemVariants}
      >
        <p className="text-xl text-gray-500 mb-8">
          Published: {new Date(project.publishedAt).toLocaleDateString()}
        </p>

        {/* This divider creates a clean separation */}
        <hr className="my-10 border-t border-gray-200" />
        
        {Array.isArray(project.body) && (
          <div>
            <PortableText value={project.body} components={portableTextComponents} />
          </div>
        )}
      </motion.div>
    </motion.main>
  );
}