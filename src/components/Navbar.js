'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Add scroll event handler for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-2 shadow-md' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`text-3xl font-bold font-serif ${scrolled ? 'text-gray-900 dark:text-white' : 'text-black dark:text-white'}`}>
              <span className={`${scrolled ? 'text-emerald-600 dark:text-emerald-400' : 'text-emerald-700 dark:text-emerald-400'}`}>Note</span>Yard
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/songs"
              className={`text-base font-medium transition-colors ${
                scrolled 
                  ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400' 
                  : 'text-gray-900 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              Notes
            </Link>
            <Link
              href="/about"
              className={`text-base font-medium transition-colors ${
                scrolled 
                  ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400' 
                  : 'text-gray-900 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              About
            </Link>
            <div className="relative">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    router.push(`/songs?search=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
                className={`w-56 px-4 py-2 text-sm rounded-full focus:outline-none focus:ring transition-all ${
                  scrolled
                    ? 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-emerald-500'
                    : 'bg-black/10 dark:bg-white/10 backdrop-blur-sm border-transparent text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:border-gray-300 dark:focus:border-gray-700'
                }`}
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    router.push(`/songs?search=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                aria-label="Search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <Link 
              href="/songs" 
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                scrolled
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
              }`}
            >
              Explore Notes
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full focus:outline-none ${
                scrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-xl rounded-b-2xl mt-2 animate-slideDown">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    router.push(`/songs?search=${encodeURIComponent(searchQuery.trim())}`);
                    setIsOpen(false);
                  }
                }}
                className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 
                           bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 
                           focus:border-emerald-500"
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    router.push(`/songs?search=${encodeURIComponent(searchQuery.trim())}`);
                    setIsOpen(false);
                  }
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            <Link
              href="/songs"
              className="block w-full px-4 py-3 rounded-xl text-left text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Notes
            </Link>
            <Link
              href="/about"
              className="block w-full px-4 py-3 rounded-xl text-left text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            
            <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-800">
              <Link 
                href="/songs" 
                className="block w-full bg-black dark:bg-white text-white dark:text-black font-medium px-4 py-3 rounded-xl text-center text-lg transition-colors hover:bg-gray-900 dark:hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Explore All Notes
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}