import Link from 'next/link';

export default function RecommendedSongs({ currentTitle, songs }) {
  // Filter out current song and randomly select 3 recommendations
  const filteredSongs = songs.filter(song => song.title !== currentTitle);
  const recommendations = [];
  
  // Get 3 random songs
  while (recommendations.length < 3 && filteredSongs.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredSongs.length);
    recommendations.push(filteredSongs[randomIndex]);
    filteredSongs.splice(randomIndex, 1);
  }

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-8 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Discover More</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recommendations.map(song => (
          <Link
            key={song.slug}
            href={`/songs/${song.slug}`}
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              {song.title}
            </h3>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 flex items-center">
              <span>Explore Notes</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}