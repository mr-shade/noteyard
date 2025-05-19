import Link from 'next/link';

export default function RecommendedSongs({ currentTitle, songs }) {
  // Filter out current song and randomly select recommendations
  const filteredSongs = songs.filter(song => song.title !== currentTitle);
  const recommendations = [];
  
  // Get up to 3 random songs
  while (recommendations.length < 3 && filteredSongs.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredSongs.length);
    recommendations.push(filteredSongs[randomIndex]);
    filteredSongs.splice(randomIndex, 1);
  }

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">More notes you might enjoy</h2>
        <Link
          href="/songs"
          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 text-sm font-medium flex items-center group"
        >
          See all
          <svg 
            className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {recommendations.map((song, index) => (
          <Link
            key={song.slug}
            href={`/songs/${song.slug}`}
            className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full"
          >
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600"></div>
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium text-gray-800 dark:text-gray-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                  </svg>
                </div>
                <span className="ml-3 text-xs text-gray-500 dark:text-gray-400">
                  Musical Notes
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 mb-2">
                {song.title}
              </h3>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-auto pt-3 flex items-center">
                <span>Read notes</span>
                <svg 
                  className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}