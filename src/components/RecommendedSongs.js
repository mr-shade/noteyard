import Link from 'next/link';

export default function RecommendedSongs({ currentTitle, songs }) {
  // Filter out current song and get up to 3 recommended songs
  const recommendations = songs
    .filter(song => song.title !== currentTitle)
    .slice(0, 3);

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-8 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Recommended Songs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map(song => (
          <Link
            key={song.slug}
            href={`/songs/${song.slug}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4"
          >
            <h3 className="text-lg font-semibold hover:text-blue-600 transition-colors duration-200">
              {song.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              View Notes →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}