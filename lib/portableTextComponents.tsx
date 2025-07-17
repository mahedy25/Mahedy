import Image from 'next/image';
import { PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-extrabold mt-12 mb-4 text-neutral-900">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-3 text-neutral-900">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-2 text-neutral-900">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-1 text-neutral-900">{children}</h4>,
    normal: ({ children }) => <p className="text-lg leading-relaxed text-[#333333] mb-6">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-6 py-4 my-8 bg-gray-50 rounded-r-md italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 text-lg text-[#333333] mb-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-lg text-[#333333] mb-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-extrabold text-[#990000]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">{children}</code>,
  },
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value as SanityImageSource)?.width(800).url();
      if (!imageUrl) return null;
      return (
        <figure className="my-12">
          <Image
            src={imageUrl}
            alt={value.alt || 'Project image'}
            width={800}
            height={0}
            className="rounded-lg shadow-lg w-full h-auto"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};