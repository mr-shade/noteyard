'use client';

import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CacheManager, isOnline, getNetworkType, shouldPreloadContent } from '@/utils/cache';

export default function PWAProvider({ children }) {
  const [isOnlineState, setIsOnlineState] = useState(true);
  const [hasShownOfflineToast, setHasShownOfflineToast] = useState(false);
  const [networkType, setNetworkType] = useState('unknown');
  const [cacheInfo, setCacheInfo] = useState(null);

  useEffect(() => {
    // Check initial online status
    setIsOnlineState(isOnline());
    setNetworkType(getNetworkType());

    // Initialize cache
    CacheManager.preloadEssentialResources();
    CacheManager.clearOldCaches();

    // Get cache info
    CacheManager.getCacheSize().then(setCacheInfo);

    const handleOnline = () => {
      setIsOnlineState(true);
      setHasShownOfflineToast(false);
      setNetworkType(getNetworkType());
      
      toast.success('You are back online! 🌐', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          background: '#10b981',
          color: 'white',
          borderRadius: '8px',
          padding: '12px 16px',
        },
        iconTheme: {
          primary: 'white',
          secondary: '#10b981',
        },
      });

      // Cache current page when back online
      CacheManager.cacheCurrentPage();
    };

    const handleOffline = () => {
      setIsOnlineState(false);
      if (!hasShownOfflineToast) {
        toast.error('You are offline. The app will continue to work with cached content! 📱', {
          duration: 5000,
          position: 'bottom-center',
          style: {
            background: '#ef4444',
            color: 'white',
            borderRadius: '8px',
            padding: '12px 16px',
            maxWidth: '90vw',
          },
          iconTheme: {
            primary: 'white',
            secondary: '#ef4444',
          },
        });
        setHasShownOfflineToast(true);
      }
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Monitor network type changes
    if ('connection' in navigator) {
      const connection = navigator.connection;
      const handleConnectionChange = () => {
        setNetworkType(getNetworkType());
        
        // Show warning for slow connections
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          toast('Slow connection detected. Using cached content when possible. 🐌', {
            duration: 4000,
            position: 'bottom-center',
            style: {
              background: '#f59e0b',
              color: 'white',
              borderRadius: '8px',
              padding: '12px 16px',
            },
          });
        }
      };
      
      connection.addEventListener('change', handleConnectionChange);
    }

    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        toast.success('App updated! Please refresh for the latest version. ✨', {
          duration: 5000,
          position: 'bottom-center',
          style: {
            background: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            padding: '12px 16px',
          },
        });
      });

      // Listen for PWA install prompt
      let deferredPrompt;
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install prompt after a delay
        setTimeout(() => {
          toast.custom((t) => (
            <div className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">📱</span>
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Install Noteyard
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                      Install our app for a better offline experience!
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    if (deferredPrompt) {
                      deferredPrompt.prompt();
                      deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                          toast.success('Thanks for installing Noteyard! 🎉');
                        }
                        deferredPrompt = null;
                      });
                    }
                  }}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Install
                </button>
              </div>
              <div className="flex border-l border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Later
                </button>
              </div>
            </div>
          ), {
            duration: 10000,
            position: 'bottom-center',
          });
        }, 3000); // Show install prompt after 3 seconds
      });

      // Cache songs when visiting them
      const currentPath = window.location.pathname;
      if (currentPath.includes('/songs/')) {
        CacheManager.cacheSongContent(currentPath);
      }
    }

    // Preload content if on good connection
    if (shouldPreloadContent() && isOnlineState) {
      // Preload homepage and popular songs
      const importantPages = ['/', '/songs'];
      importantPages.forEach(page => {
        if (page !== window.location.pathname) {
          fetch(page).catch(() => {}); // Silent fail
        }
      });
    }

    // Cleanup event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [hasShownOfflineToast]);

  return (
    <>
      {children}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
            padding: '12px 16px',
          },
        }}
      />
      
      {/* Offline indicator */}
      {!isOnlineState && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 px-4 text-sm font-medium z-50">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            You're offline - Using cached content
          </span>
        </div>
      )}

      {/* Network type indicator (for slow connections) */}
      {isOnlineState && (networkType === '2g' || networkType === 'slow-2g') && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-1 px-4 text-xs font-medium z-40">
          <span className="inline-flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Slow connection - {networkType.toUpperCase()}
          </span>
        </div>
      )}

      {/* Cache info indicator (development only) */}
      {process.env.NODE_ENV === 'development' && cacheInfo && (
        <div className="fixed bottom-20 right-4 bg-blue-500 text-white text-xs p-2 rounded-lg opacity-75 z-30">
          Cache: {Math.round(cacheInfo.used / 1024 / 1024)}MB / {Math.round(cacheInfo.available / 1024 / 1024)}MB
        </div>
      )}
    </>
  );
}
