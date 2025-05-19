import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { parseMarkdown } from '@/utils/markdown';
import RecommendedSongs from '@/components/RecommendedSongs';

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
    
    // Get all songs for recommendations
    const allSongs = fs.readdirSync(songsDirectory)
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const songSlug = filename.replace(/\.md$/, '');
        const songPath = path.join(songsDirectory, filename);
        const songContent = fs.readFileSync(songPath, 'utf8');
        const songData = parseMarkdown(songContent);
        
        return {
          slug: songSlug,
          title: songData.frontmatter.title
        };
      });
    
    return { frontmatter, content, allSongs };
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

  const { frontmatter, content, allSongs } = songData;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <header className="mb-8 border-b dark:border-gray-700 pb-8">
          <h1 className="text-3xl font-bold mb-4">{frontmatter.title}</h1>
          {frontmatter.date && (
            <time className="text-gray-600 dark:text-gray-400">
              {new Date(frontmatter.date).toLocaleDateString()}
            </time>
          )}
          {frontmatter.description && (
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
              {frontmatter.description}
            </p>
          )}
        </header>
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
      
      <RecommendedSongs 
        currentTitle={frontmatter.title}
        songs={allSongs}
      />
    </div>
  );
}