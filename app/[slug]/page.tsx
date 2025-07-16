import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import Link from 'next/link';

import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '../sanity/client';

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) =>
  builder.image(source).width(1200).height(675).url();

const PROJECT_QUERY = `*[_type == "projects" && slug.current == $slug][0]`;

type Project = {
  title: string;
  mainImage?: SanityImageSource;
  publishedAt: string;
  body?: PortableTextBlock[];
};

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProjectPage({ params }: Props) {
  const project: Project = await client.fetch(PROJECT_QUERY, { slug: params.slug });

  if (!project) return <div>Project not found</div>;

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8">
      <Link href="/" className="mb-6 block text-lg font-medium hover:underline">
        ← Back to projects
      </Link>

      {project.mainImage && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
          <Image src={urlFor(project.mainImage)} alt={project.title} fill className="object-cover" priority />
        </div>
      )}

      <h1 className="text-5xl font-bold mb-6">{project.title}</h1>

      <p className="text-gray-600 mb-8">
        Published: {new Date(project.publishedAt).toLocaleDateString()}
      </p>

      {project.body && (
        <article className="prose prose-lg max-w-none">
          <PortableText value={project.body} />
        </article>
      )}
    </main>
  );
}
