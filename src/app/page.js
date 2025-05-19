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
      {/* Hero Section - Medium inspired with accent color background */}
      <section className="relative py-24 lg:py-32 bg-[#FFC017] dark:bg-[#2C2C2C] border-b border-black dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-black dark:text-white leading-tight">
                Learn music notes, the easy way.
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-800 dark:text-gray-200 max-w-xl">
                Discover comprehensive Sargam, Harmonium, and Flute notes for your favorite songs—beautifully curated to enhance your musical journey.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/songs"
                  className="inline-block bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Explore Notes
                </Link>
                <Link
                  href="/about"
                  className="inline-block border border-black dark:border-white text-black dark:text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>
            <div className="mt-12 md:mt-0 md:w-1/2 flex justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -right-4 bg-emerald-500 dark:bg-emerald-600 w-24 h-24 rounded-full opacity-70 z-0"></div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 dark:bg-blue-600 w-20 h-20 rounded-full opacity-60 z-0"></div>
                <div className="relative z-10 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl transform rotate-1">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Quick Example</h3>
                  <div className="font-mono text-sm text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-auto">
                    <div className="mb-3">// Aarti Kunj Bihari Ki</div>
                    <div className="mb-1">Sa Re Ga Ma Pa Dha Ni Sa</div>
                    <div className="mb-1">Aarti Kunj Bihari Ki</div>
                    <div className="mb-3">Pa Dha Ni Sa Ni Dha Pa Ma</div>
                    <div className="mb-1">Shri Girdhar Krishna Murari Ki</div>
                    <div>Ma Pa Dha Ni Sa Ni Dha Pa...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Songs Section - Medium blog style cards */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block mb-2 px-3 py-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">FEATURED COLLECTION</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Popular Notes</h2>
          </div>
          <Link
            href="/songs"
            className="mt-4 md:mt-0 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium inline-flex items-center group"
          >
            View all notes
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSongs.map((song) => (
            <Link
              key={song.slug}
              href={`/songs/${song.slug}`}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                <div className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600"></div>
                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {song.title[0]}
                    </div>
                    <span className="ml-3 text-xs font-medium text-gray-600 dark:text-gray-400">Musical Notes</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                    {song.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                    Complete Sargam, Harmonium and Flute notes for this beautiful melody.
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">5 min read</span>
                    <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Read notes
                      <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-14">
          <Link
            href="/songs"
            className="inline-block border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white px-8 py-4 rounded-full font-medium transition-colors duration-200"
          >
            Explore All Notes
          </Link>
        </div>
      </section>

      {/* Features Section - Modern cards with illustrations */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block mb-2 px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Making Music Learning Simple</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Our meticulously crafted notes help musicians of all skill levels master their favorite songs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 mb-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Comprehensive Notes</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Detailed Sargam, Harmonium, and Flute notes with clear notations for seamless learning.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 mb-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Beginner Friendly</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Notes arranged in an easy-to-understand format with helpful learning tips for beginners.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 mb-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Extensive Collection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Growing library of songs across various genres, regularly updated with new additions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-600 dark:bg-emerald-700 rounded-3xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 md:p-12 lg:p-16 md:flex md:items-center md:justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to start your musical journey?</h2>
                <p className="text-emerald-100 md:text-lg mb-0">
                  Explore our comprehensive collection of musical notes and enhance your skills today.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Link
                  href="/songs"
                  className="inline-block bg-white hover:bg-gray-100 text-emerald-600 font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
