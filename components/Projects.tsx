import { client } from '@/app/sanity/client'
import { SanityDocument } from 'next-sanity'
import Link from 'next/link'

const POSTS_QUERY = `
  *[_type == "projects"] | order(_createdAt desc) {
    _id,
    title,
    smallDescription,
    publishedAt,
    slug
  }
`

const options = { next: { revalidate: 30 } }

export default async function Projects() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)

  return (
    <main className='container mx-auto min-h-screen max-w-3xl p-8'>
      <h1 className='text-4xl font-bold mb-8'>Projects</h1>
      <ul className='flex flex-col gap-y-4'>
        {posts.map((Projects) => (
          <li className='hover:underline' key={Projects._id}>
            <Link href={`/${Projects.slug.current}`}>
              <h2 className='text-xl font-semibold'>{Projects.title}</h2>
              <p>{new Date(Projects.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
