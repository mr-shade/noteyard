import Link from 'next/link';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About NoteYard</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead text-xl text-gray-700 dark:text-gray-300 mb-8">
          NoteYard is your comprehensive resource for learning and mastering musical notes for various songs through Sargam, Harmonium, and Flute notations.
        </p>

        <h2>Our Mission</h2>
        <p>
          We believe that music education should be accessible to everyone. Our mission is to provide high-quality, easy-to-follow musical notes and tutorials that help both beginners and experienced musicians enhance their skills.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Comprehensive Sargam notations for popular songs</li>
          <li>Detailed Harmonium notes with finger positions</li>
          <li>Flute notations with breathing techniques</li>
          <li>Regular updates with new songs and tutorials</li>
          <li>User-friendly interface for easy navigation</li>
        </ul>

        <h2>Our Commitment to Quality</h2>
        <p>
          Each piece of content on NoteYard is carefully curated and verified by experienced musicians to ensure accuracy and clarity. We continuously update our content based on user feedback and musical trends.
        </p>

        <h2>Community Guidelines</h2>
        <p>
          We foster a supportive community where musicians can learn and grow together. We encourage respectful interaction and knowledge sharing among our users.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p>
            Have questions or suggestions? We&apos;d love to hear from you!
          </p>
          <ul className="mt-4">
            <li>Email: sh20raj@gmail.com</li>
            <li>Follow us on social media for updates and tips</li>
          </ul>
        </div>

        <div className="mt-8">
          <h2>Legal Information</h2>
          <p>
            For more information about using our service, please review our{' '}
            <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}