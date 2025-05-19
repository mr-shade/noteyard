'use client';

import { useState, useRef, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // If clicked outside of the input, unfocus
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    inputRef.current.focus();
  };

  return (
    <div className="mb-4">
      <div 
        className={`relative max-w-2xl mx-auto transition-all duration-300 ${
          isFocused ? 'transform scale-[1.01]' : ''
        }`}
      >
        <div className={`
          relative flex items-center w-full rounded-2xl border border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-800
          ${isFocused ? 'shadow-lg' : 'shadow-sm'}
          transition-all duration-200
        `}>
          <div className="pl-4">
            <svg
              className={`h-5 w-5 ${
                isFocused ? 'text-emerald-500 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'
              } transition-colors duration-200`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for notes, songs, or artists..."
            className="w-full px-3 py-4 text-base text-gray-800 dark:text-white bg-transparent focus:outline-none"
          />

          {searchTerm && (
            <button
              onClick={handleClear}
              className="px-3 py-2 mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Clear search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {isFocused && (
          <div className="absolute mt-1 w-full text-xs text-gray-500 dark:text-gray-400 px-4 py-2">
            Try searching for <button onClick={() => {setSearchTerm('aarti'); onSearch('aarti');}} className="text-emerald-600 dark:text-emerald-400 hover:underline">"aarti"</button>, <button onClick={() => {setSearchTerm('aaj'); onSearch('aaj');}} className="text-emerald-600 dark:text-emerald-400 hover:underline">"aaj"</button>, or <button onClick={() => {setSearchTerm('kunj'); onSearch('kunj');}} className="text-emerald-600 dark:text-emerald-400 hover:underline">"kunj"</button>
          </div>
        )}
      </div>
    </div>
  );
}