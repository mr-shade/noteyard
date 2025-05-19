import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | NoteYard',
  description: 'Learn how NoteYard collects, uses, and protects your personal information.',
  openGraph: {
    title: 'Privacy Policy | NoteYard',
    description: 'Learn how NoteYard collects, uses, and protects your personal information.',
    url: 'https://noteyard.pages.dev/privacy'
  }
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          At NoteYard, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, including:
        </p>
        <ul>
          <li>Search queries and browsing activity on our website</li>
          <li>Device information and IP addresses</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>
          We use the collected information to:
        </p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Analyze website usage and trends</li>
          <li>Personalize your experience</li>
          <li>Communicate with you about our services</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We do not sell or rent your personal information to third parties. We may share your information with:
        </p>
        <ul>
          <li>Service providers who assist in our operations</li>
          <li>Analytics partners</li>
          <li>Law enforcement when required by law</li>
        </ul>

        <h2>Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to:
        </p>
        <ul>
          <li>Remember your preferences</li>
          <li>Analyze site traffic and usage</li>
          <li>Provide personalized advertisements</li>
        </ul>

        <h2>Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at privacy@noteyard.pages.dev.
        </p>

        <p className="mt-8">
          Last updated: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
}