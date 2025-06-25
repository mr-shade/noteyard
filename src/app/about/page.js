import Link from 'next/link';
import { FaMusic } from 'react-icons/fa';

export const metadata = {
  title: 'About Us | NoteYard',
  description: 'Learn about NoteYard - your trusted source for Sargam, Harmonium, and Flute notes.',
  openGraph: {
    title: 'About Us | NoteYard',
    description: 'Learn about NoteYard - your trusted source for Sargam, Harmonium, and Flute notes.',
    url: 'https://noteyard.pages.dev/about'
  }
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Hero Section */}
      <div className="flex items-center mb-8 gap-4">
        <div className="bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full p-4 shadow-lg">
          <FaMusic className="text-white text-4xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">About NoteYard</h1>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead text-xl text-gray-700 dark:text-gray-300 mb-8">
          NoteYard is your comprehensive resource for learning and mastering musical notes for various songs through Sargam, Harmonium, and Flute notations.
        </p>
        <hr className="my-8 border-blue-200 dark:border-blue-800" />
        <h2>Our Mission</h2>
        <p>
          We believe that music education should be accessible to everyone. Our mission is to provide high-quality, easy-to-follow musical notes and tutorials that help both beginners and experienced musicians enhance their skills.
        </p>
        <h2>What We Offer</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <li>🎶 Comprehensive Sargam notations for popular songs</li>
          <li>🎹 Detailed Harmonium notes with finger positions</li>
          <li>🎵 Flute notations with breathing techniques</li>
          <li>🆕 Regular updates with new songs and tutorials</li>
          <li>🧭 User-friendly interface for easy navigation</li>
        </ul>
        <hr className="my-8 border-blue-200 dark:border-blue-800" />
        <h2>Our Commitment to Quality</h2>
        <p>
          Each piece of content on NoteYard is carefully curated and verified by experienced musicians to ensure accuracy and clarity. We continuously update our content based on user feedback and musical trends.
        </p>
        <h2>Community Guidelines</h2>
        <p>
          We foster a supportive community where musicians can learn and grow together. We encourage respectful interaction and knowledge sharing among our users.
        </p>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg mt-8 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p>
            Have questions or suggestions? We&apos;d love to hear from you!
          </p>
          <ul className="mt-4">
            <li>Email: <a href="mailto:sh20raj@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">sh20raj@gmail.com</a></li>
            <li>Follow us on social media for updates and tips</li>
          </ul>
        </div>
        <div className="mt-8">
          <h2>Legal Information</h2>
          <p>
            For more information about using our service, please review our{' '}
            <Link href="/terms" className="inline-block px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/privacy" className="inline-block px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

// Add fade-in animation
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .animate-fade-in {
      animation: fadeIn 0.8s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: none; }
    }
  `;
  document.head.appendChild(style);
}