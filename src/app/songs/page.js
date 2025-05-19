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
}