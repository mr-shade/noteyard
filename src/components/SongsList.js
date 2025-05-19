'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function SongsList({ initialSongs }) {
  const [filteredSongs, setFilteredSongs] = useState(initialSongs);
  const [selectedFilterTag, setSelectedFilterTag] = useState('all');
  
  // List of music types for filtering
  const filterTags = [
    { id: 'all', label: 'All Notes' },
    { id: 'sargam', label: 'Sargam' },
    { id: 'harmonium', label: 'Harmonium' },
    { id: 'flute', label: 'Flute' }
  ];

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
  
  // Function to handle filter tag selection
  const handleFilterTagChange = (tagId) => {
    setSelectedFilterTag(tagId);
    
    if (tagId === 'all') {
      setFilteredSongs(initialSongs);
      return;
    }
    
    // In a real app, you'd filter based on actual tags
    // For now, we'll just simulate filtering by showing all songs
    setFilteredSongs(initialSongs);
  };

  // Calculate an estimated reading time for each song
  const calculateReadingTime = () => {
    // In a real app, this would be based on content length
    return Math.floor(Math.random() * 5) + 3; // 3-7 minutes
  };

  return (
    <>
      {/* Search and filters section */}
      <div className="mb-10">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {/* Filter tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {filterTags.map(tag => (
            <button
              key={tag.id}
              onClick={() => handleFilterTagChange(tag.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedFilterTag === tag.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Songs grid - Medium style layout */}
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {filteredSongs.map((song, index) => {
          // Generate a consistent image pattern based on the slug for visual variety
          const patternNum = song.slug.length % 5 + 1;
          return (
            <article 
              key={song.slug} 
              className="group relative flex flex-col"
            >
              <Link href={`/songs/${song.slug}`} className="flex flex-col flex-1">
                {/* Article image/pattern */}
                <div className={`relative aspect-video mb-5 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 bg-pattern-${patternNum}`}>
                  <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-serif font-bold opacity-25">
                    {song.title[0]}
                  </div>
                  
                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium bg-black/50 text-white rounded-full">
                      Musical Notes
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2 mb-2">
                    {song.title}
                  </h2>
                  
                  {song.description ? (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      {song.description}
                    </p>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      Complete Sargam, Harmonium and Flute notes for {song.title}.
                    </p>
                  )}
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <div className="flex items-center">
                      <div className="w-7 h-7 mr-3 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-900 dark:text-gray-100 font-medium">Notes</span>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {song.date ? new Date(song.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'NoteYard'}
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{calculateReadingTime()} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {filteredSongs.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
            <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            We couldn't find any notes that match your search. Try adjusting your search terms or browse all notes.
          </p>
          <button
            onClick={() => {
              setFilteredSongs(initialSongs);
              setSelectedFilterTag('all');
            }}
            className="inline-flex items-center px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-colors"
          >
            View all notes
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      )}
      
      {filteredSongs.length > 0 && filteredSongs.length < initialSongs.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setFilteredSongs(initialSongs);
              setSelectedFilterTag('all');
            }}
            className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-medium transition-colors"
          >
            Clear filters
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}