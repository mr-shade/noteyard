import Link from 'next/link';
import { getAllSongs } from '@/utils/songs';
import SongsList from '@/components/SongsList';

export const dynamic = 'force-static';

export const metadata = {
  title: 'All Songs - NoteYard - Free Harmonium, Piano & Flute Notes',
  description: 'Browse our complete collection of free music notes for Harmonium, Piano, and Flute. Thousands of songs with Sargam notation, perfect for beginners and advanced musicians.',
  keywords: [
    'music notes collection',
    'harmonium notes',
    'piano notes', 
    'flute notes',
    'sargam notes',
    'free music notation',
    'learn music',
    'musical tutorials',
    'noteyard songs'
  ],
  authors: [{ name: 'NoteYard' }],
  creator: 'NoteYard',
  publisher: 'NoteYard',
  openGraph: {
    title: 'All Songs - NoteYard - Free Music Notes',
    description: 'Browse our complete collection of free music notes for Harmonium, Piano, and Flute. Thousands of songs with Sargam notation.',
    type: 'website',
    url: 'https://noteyard.30tools.com/songs',
    siteName: 'NoteYard',
    images: [
      {
        url: 'https://noteyard.30tools.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteYard - Free Music Notes Collection'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Songs - NoteYard - Free Music Notes',
    description: 'Browse our complete collection of free music notes for Harmonium, Piano, and Flute.',
    creator: '@noteyard',
    images: ['https://noteyard.30tools.com/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://noteyard.30tools.com/songs'
  }
};

export default async function SongsPage() {
  const songs = await getAllSongs();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Knowledge Hub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover comprehensive notes and documentation on various topics
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-gray-800"></div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <SongsList initialSongs={songs} />
        </div>
      </div>
    </div>
  );
}