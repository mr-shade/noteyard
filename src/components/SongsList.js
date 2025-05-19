'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function SongsList({ initialSongs }) {
  const [filteredSongs, setFilteredSongs] = useState(initialSongs);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredSongs(initialSongs);
      return;
    }
    
    const searchTerms = searchTerm.toLowerCase().split(/\s+/);
    const filtered = initialSongs.filter(song => {
      const titleWords = song.title.toLowerCase();
      return searchTerms.every(term => titleWords.includes(term));
    });
    setFilteredSongs(filtered);
  };

  return (
    <>
      <div className="mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {filteredSongs.map(song => (
          <article 
            key={song.slug} 
            className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <Link href={`/songs/${song.slug}`} className="flex flex-col flex-1 p-6">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {song.title[0]}
                  </div>
                  {song.date && (
                    <time className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                      {new Date(song.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-3">
                  {song.title}
                </h2>
                {song.description && (
                  <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-2">
                    {song.description}
                  </p>
                )}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform duration-200">
                  <span>Read more</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    Notes
                  </span>
                </div>
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
    </>
  );
}