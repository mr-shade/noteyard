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
    console.error(`Error loading song data for ${slug}:`, error);
    return null;
  }
}

// Generate metadata for SEO optimization
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const songData = await getSongData(slug);

  if (!songData) {
    return {
      title: 'Song Not Found - NoteYard',
      description: 'The requested song notes were not found.'
    };
  }

  const { frontmatter } = songData;
  
  // Clean the title by removing "# " prefix and markdown formatting
  const cleanTitle = frontmatter.title?.replace(/^#\s*/, '').replace(/[#*_]/g, '') || 'Song Notes';
  
  // Create SEO-optimized title
  const title = `${cleanTitle} - NoteYard - Free Harmonium, Piano & Flute Notes`;
  
  // Create SEO-optimized description
  const description = frontmatter.description || 
    `Learn ${cleanTitle} with free Sargam, Harmonium, Piano and Flute notes. Easy step-by-step musical notation tutorial for beginners and advanced players.`;

  return {
    title,
    description,
    keywords: [
      cleanTitle,
      'sargam notes',
      'harmonium notes', 
      'piano notes',
      'flute notes',
      'free music notes',
      'musical notation',
      'learn music',
      'indian classical music',
      'noteyard'
    ],
    authors: [{ name: 'NoteYard' }],
    creator: 'NoteYard',
    publisher: 'NoteYard',
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: frontmatter.date,
      url: `https://noteyard.vercel.app/songs/${slug}`,
      siteName: 'NoteYard',
      images: [
        {
          url: 'https://noteyard.vercel.app/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${cleanTitle} - Free Music Notes`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@noteyard',
      images: ['https://noteyard.vercel.app/og-image.jpg']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://noteyard.vercel.app/songs/${slug}`
    }
  };
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

  // Clean the title for structured data
  const cleanTitle = frontmatter.title?.replace(/^#\s*/, '').replace(/[#*_]/g, '') || 'Song Notes';

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    "name": cleanTitle,
    "description": frontmatter.description || `Learn ${cleanTitle} with free musical notation`,
    "datePublished": frontmatter.date,
    "publisher": {
      "@type": "Organization",
      "name": "NoteYard",
      "url": "https://noteyard.vercel.app"
    },
    "mainEntity": {
      "@type": "Article",
      "headline": cleanTitle,
      "description": frontmatter.description,
      "datePublished": frontmatter.date,
      "author": {
        "@type": "Organization",
        "name": "NoteYard"
      },
      "publisher": {
        "@type": "Organization",
        "name": "NoteYard",
        "url": "https://noteyard.vercel.app"
      }
    },
    "genre": "Educational Music",
    "about": [
      "Harmonium Notes",
      "Piano Notes", 
      "Flute Notes",
      "Sargam Notation",
      "Music Education"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
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
    </>
  );
}