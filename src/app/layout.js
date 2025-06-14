import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PWAProvider from '@/components/PWAProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://noteyard.vercel.app'),
  title: {
    default: 'NoteYard - Free Harmonium and piano song notes',
    template: '%s | NoteYard'
  },
  description: 'Discover and share comprehensive notes, articles, and documentation on various topics. NoteYard is your go-to platform for organized knowledge sharing.',
  keywords: ['notes', 'documentation', 'knowledge base', 'articles', 'learning platform'],
  authors: [{ name: 'NoteYard Team' }],
  creator: 'NoteYard',
  publisher: 'NoteYard',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'NoteYard',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://noteyard.vercel.app',
    title: 'NoteYard - Your Digital Knowledge Hub',
    description: 'Discover and share comprehensive notes, articles, and documentation on various topics.',
    siteName: 'NoteYard'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoteYard - Your Digital Knowledge Hub',
    description: 'Discover and share comprehensive notes, articles, and documentation on various topics.',
    creator: '@noteyard'
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NoteYard" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="icon" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1828915420581549"
         crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900`}
      >
        <PWAProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </PWAProvider>
      </body>
    </html>
  );
}
