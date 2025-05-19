import Link from 'next/link';
import { getAllSongs } from '@/utils/songs';
import SongsList from '@/components/SongsList';

export const dynamic = 'force-static';

export default async function SongsPage() {
  const songs = await getAllSongs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Knowledge Hub
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
          Discover comprehensive notes and documentation on various topics
        </p>
        
        <SongsList initialSongs={songs} />
      </div>
    </div>
  );
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Knowledge Hub
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
          Discover comprehensive notes and documentation on various topics
        </p>
        
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {filteredSongs.map(song => (
            <article 
              key={song.slug} 
              className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <Link href={`/songs/${song.slug}`} className="flex flex-col flex-1 p-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-3">
                    {song.title}
                  </h2>
                  {song.date && (
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(song.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                </div>
                <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  <span>Read more</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {filteredSongs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or browse all topics
            </p>
          </div>
        )}
      </div>
    </div>
  );
}