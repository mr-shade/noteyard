import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// This function runs at build time
export async function generateStaticParams() {
  const songsDirectory = path.join(process.cwd(), 'songs');
  const filenames = fs.readdirSync(songsDirectory);
  return filenames.filter(filename => filename.endsWith('.md'));
}

// Get all songs data
async function getAllSongs() {
  const songsDirectory = path.join(process.cwd(), 'songs');
  const filenames = fs.readdirSync(songsDirectory);
  
  const songs = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(songsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Basic frontmatter parsing
      const frontmatterMatch = fileContents.match(/---\n([\s\S]*?)\n---/);
      const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
      const title = frontmatter.match(/title:\s*(.*)/);
      const date = frontmatter.match(/date:\s*(.*)/);
      
      return {
        slug,
        title: title ? title[1] : slug,
        date: date ? date[1] : null
      };
    });
  
  return songs;
}

export default async function SongsPage() {
  const songs = await getAllSongs();
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Songs Collection</h1>
      <div className="space-y-4">
        {songs.map(song => (
          <article key={song.slug} className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
            <Link href={`/songs/${song.slug}`} className="block">
              <h2 className="text-xl font-semibold hover:text-blue-600">{song.title}</h2>
              {song.date && (
                <p className="text-gray-600 text-sm mt-2">{new Date(song.date).toLocaleDateString()}</p>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}