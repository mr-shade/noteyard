import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { parseMarkdown } from '@/utils/markdown';

// This function runs at build time to generate static paths
export async function generateStaticParams() {
  const songsDirectory = path.join(process.cwd(), 'songs');
  const filenames = fs.readdirSync(songsDirectory);
  
  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      slug: filename.replace(/\.md$/, '')
    }));
}

// This function runs at build time for each generated page
async function getSongData(slug) {
  const songsDirectory = path.join(process.cwd(), 'songs');
  const fullPath = path.join(songsDirectory, `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter, content } = parseMarkdown(fileContents);
    return { frontmatter, content };
  } catch (error) {
    return null;
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  const songData = await getSongData(slug);
  
  if (!songData) {
    notFound();
  }

  const { frontmatter, content } = songData;

  return (
    <article className="max-w-4xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{frontmatter.title}</h1>
        {frontmatter.date && (
          <time className="text-gray-600">{new Date(frontmatter.date).toLocaleDateString()}</time>
        )}
        {frontmatter.description && (
          <p className="text-lg text-gray-700 mt-2">{frontmatter.description}</p>
        )}
      </header>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}