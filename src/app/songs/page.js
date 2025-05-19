'use client';

import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

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
  const [filteredSongs, setFilteredSongs] = useState(songs);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredSongs(songs);
      return;
    }
    
    const filtered = songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSongs(filtered);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Songs Collection</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSongs.map(song => (
          <article key={song.slug} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200">
            <Link href={`/songs/${song.slug}`} className="block">
              <h2 className="text-xl font-semibold hover:text-blue-600 transition-colors duration-200">{song.title}</h2>
              {song.date && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{new Date(song.date).toLocaleDateString()}</p>
              )}
              <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400">
                <span>View Notes</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {filteredSongs.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No songs found matching your search.
        </p>
      )}
    </div>
  );
}