import { notFound } from 'next/navigation'
import { client } from '../sanity/client'
import { urlFor } from '@/sanity/lib/image'
import ProjectContent from '../../components/ProjectContent'
import type { SanityDocument } from 'next-sanity'

const PROJECT_QUERY = `*[_type == "projects" && slug.current == $slug][0]{
  _id,
  title,
  Link,
  mainImage,
  publishedAt,
  body,
  slug
}`

const revalidate = 30

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params // ✅ no await needed

  const project = await client.fetch<SanityDocument>(
    PROJECT_QUERY,
    { slug },
    { next: { revalidate } }
  )

  if (!project) notFound()

  const imageUrl = project.mainImage
    ? urlFor(project.mainImage)
        .width(1280)
        .height(720)
        .auto('format')
        .quality(90)
        .url()
    : null

  return <ProjectContent project={project} imageUrl={imageUrl} />
}
