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

  // Calculate estimated reading time
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <header className="px-8 pt-12 pb-8 border-b dark:border-gray-700">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {frontmatter.title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm">
            {frontmatter.date && (
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
          {frontmatter.description && (
            <p className="text-xl text-gray-700 dark:text-gray-300 mt-6 leading-relaxed">
              {frontmatter.description}
            </p>
          )}
        </header>
        
        <div className="px-8 py-12">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-code:text-gray-900 dark:prose-code:text-white
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
              prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
              prose-blockquote:border-blue-600 dark:prose-blockquote:border-blue-400 leading-5"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </article>
      
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Recommended Reading</h2>
        <RecommendedSongs 
          currentTitle={frontmatter.title}
          songs={allSongs}
        />
      </div>
    </div>
  );
}