import { notFound } from 'next/navigation'
import Image from 'next/image'
import { type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import ProjectContent from '../../components/ProjectContent'
import { client } from '../sanity/client'

// Build image URL
const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

// GROQ query
const PROJECT_QUERY = `*[_type == "projects" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  publishedAt,
  body,
  slug
}`

const options = { next: { revalidate: 30 } }

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = await client.fetch<SanityDocument>(
    PROJECT_QUERY,
    { slug: params.slug },
    options
  )

  if (!project) notFound()

  return (
    <div className='px-4 py-10 max-w-5xl mx-auto space-y-10'>
      {/* ✅ High-quality, sharp image */}
      {project.mainImage && (
        <div className='w-full overflow-hidden rounded-xl shadow-md'>
          <Image
            src={
              urlFor(project.mainImage)
                ?.auto('format')
                .fit('max')
                .width(1200)
                .height(600)
                .url() || '/placeholder.jpg'
            }
            alt={project.title}
            width={1200}
            height={600}
            className='w-full h-auto object-cover'
            priority
          />
        </div>
      )}

      {/* Project content */}
      <ProjectContent project={project} imageUrl={null} />
    </div>
  )
}
