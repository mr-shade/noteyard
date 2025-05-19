import Link from 'next/link';
import fs from 'fs';
import path from 'path';

async function getFeaturedSongs() {
  const songsDirectory = path.join(process.cwd(), 'songs');
  const filenames = fs.readdirSync(songsDirectory);
  
  const songs = filenames
    .filter(filename => filename.endsWith('.md'))
    .slice(0, 6) // Get first 6 songs for featured section
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(songsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const frontmatterMatch = fileContents.match(/---\n([\s\S]*?)\n---/);
      const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
      const title = frontmatter.match(/title:\s*(.*)/);
      
      return {
        slug,
        title: title ? title[1] : slug.replace(/-/g, ' ')
      };
    });
  
  return songs;
}

export default async function HomePage() {
  const featuredSongs = await getFeaturedSongs();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to NoteYard
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover and learn your favorite songs with Sargam, Harmonium, and Flute notes
            </p>
            <Link
              href="/songs"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors duration-200"
            >
              Explore Songs
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-[#0a0a0a]"></div>
      </section>

      {/* Featured Songs Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Featured Songs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSongs.map((song) => (
            <Link
              key={song.slug}
              href={`/songs/${song.slug}`}
              className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors duration-200">
                  {song.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  View Sargam Notes →
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/songs"
            className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
          >
            View All Songs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose NoteYard?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Notes</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Detailed Sargam, Harmonium, and Flute notes for each song
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎼</div>
              <h3 className="text-xl font-semibold mb-3">Easy to Follow</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Notes arranged in an easy-to-understand format
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-3">Large Collection</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Wide variety of songs across different genres
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
