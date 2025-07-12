import { PortableText, type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import Link from 'next/link'
import Image from 'next/image'
import { client } from '../sanity/client'

const PROJECT_QUERY = `*[_type == "projects" && slug.current == $slug][0]`

const { projectId, dataset } = client.config()

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const project = await client.fetch<SanityDocument>(
    PROJECT_QUERY,
    await params,
    options
  )

  const projectImageUrl = project.mainImage
    ? urlFor(project.mainImage)?.width(1200).height(675).url()
    : null

  return (
    <main className='container mx-auto min-h-screen max-w-3xl  p-8'>
      <Link href='/' className='hover:underline mb-6 block'>
        ← Back to projects
      </Link>

      {projectImageUrl && (
        <div className='relative w-full aspect-video rounded-xl overflow-hidden mb-8'>
          <Image
            src={projectImageUrl}
            alt={project.title}
            fill
            className='object-cover'
            priority
          />
        </div>
      )}

      <h1 className='text-4xl font-bold my-4'>{project.title}</h1>

      <p className='text-gray-600 my-6'>
        Published: {new Date(project.publishedAt).toLocaleDateString()}
      </p>

      {Array.isArray(project.body) && (
        <div className='prose prose-lg max-w-none my-4'>
          <PortableText value={project.body} />
        </div>
      )}
    </main>
  )
}
