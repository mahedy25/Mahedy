import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { notFound } from "next/navigation";

import ProjectContent from "../../components/ProjectContent";
import { client } from "../sanity/client";

// Sanity image builder config
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Query must be a string with backticks
const PROJECT_QUERY = `*[_type == "projects" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  publishedAt,
  body,
  slug
}`;

const options = { next: { revalidate: 30 } };

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params before using
  const { slug } = await params;

  // Fetch project with slug param
  const project = await client.fetch<SanityDocument>(
    PROJECT_QUERY,
    { slug },
    options
  );

  if (!project) {
    notFound();
  }

  const imageUrl = project.mainImage
    ? urlFor(project.mainImage)?.width(550).height(310).url() ?? null
    : null;

  return <ProjectContent project={project} imageUrl={imageUrl} />;
}
