'use client';

// Cache utilities for offline functionality
export const CACHE_NAMES = {
  STATIC: 'noteyard-static-v1',
  DYNAMIC: 'noteyard-dynamic-v1',
  IMAGES: 'noteyard-images-v1',
  SONGS: 'noteyard-songs-v1'
};

export class CacheManager {
  static async preloadEssentialResources() {
    if ('caches' in window) {
      try {
        const cache = await caches.open(CACHE_NAMES.STATIC);
        const essentialUrls = [
          '/',
          '/offline.html',
          '/manifest.json',
          '/icon.svg'
        ];
        
        await cache.addAll(essentialUrls);
        console.log('Essential resources cached successfully');
      } catch (error) {
        console.warn('Failed to cache essential resources:', error);
      }
    }
  }

  static async cacheCurrentPage() {
    if ('caches' in window) {
      try {
        const cache = await caches.open(CACHE_NAMES.DYNAMIC);
        await cache.add(window.location.pathname);
        console.log('Current page cached:', window.location.pathname);
      } catch (error) {
        console.warn('Failed to cache current page:', error);
      }
    }
  }

  static async cacheSongContent(url) {
    if ('caches' in window && url.includes('/songs/')) {
      try {
        const cache = await caches.open(CACHE_NAMES.SONGS);
        await cache.add(url);
        console.log('Song content cached:', url);
      } catch (error) {
        console.warn('Failed to cache song content:', error);
      }
    }
  }

  static async getCacheSize() {
    if ('caches' in window && 'storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        return {
          used: estimate.usage || 0,
          available: estimate.quota || 0,
          percentage: ((estimate.usage || 0) / (estimate.quota || 1)) * 100
        };
      } catch (error) {
        console.warn('Failed to get cache size:', error);
        return null;
      }
    }
    return null;
  }

  static async clearOldCaches() {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(name => 
          !Object.values(CACHE_NAMES).includes(name)
        );
        
        await Promise.all(
          oldCaches.map(cacheName => caches.delete(cacheName))
        );
        
        console.log('Old caches cleared:', oldCaches);
      } catch (error) {
        console.warn('Failed to clear old caches:', error);
      }
    }
  }
}

export const isOnline = () => {
  return navigator.onLine;
};

export const getNetworkType = () => {
  if ('connection' in navigator) {
    return navigator.connection.effectiveType || 'unknown';
  }
  return 'unknown';
};

export const shouldPreloadContent = () => {
  const connection = navigator.connection;
  if (!connection) return true;
  
  // Don't preload on slow connections or when data saver is on
  if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    return false;
  }
  
  return true;
};
