import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | NoteYard',
  description: 'Read our terms of service to understand the rules and guidelines for using NoteYard.',
  openGraph: {
    title: 'Terms of Service | NoteYard',
    description: 'Read our terms of service to understand the rules and guidelines for using NoteYard.',
    url: 'https://noteyard.pages.dev/terms'
  }
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using NoteYard, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          NoteYard provides musical notes, including Sargam, Harmonium, and Flute notes for various songs. The service is provided &quot;as is&quot; and we reserve the right to modify or discontinue it at any time.
        </p>

        <h2>3. User Conduct</h2>
        <p>
          You agree to use NoteYard only for lawful purposes and in accordance with these Terms. You must not:
        </p>
        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe upon intellectual property rights</li>
          <li>Distribute malicious code or interfere with the service</li>
          <li>Attempt to gain unauthorized access to any part of the service</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          All content on NoteYard, including but not limited to text, graphics, logos, and musical notes, is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.
        </p>

        <h2>5. Privacy</h2>
        <p>
          Your privacy is important to us. Please review our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link> to understand how we collect, use, and protect your information.
        </p>

        <h2>6. Disclaimer of Warranties</h2>
        <p>
          NoteYard is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the service.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          NoteYard shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page.
        </p>

        <h2>9. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at support@noteyard.pages.dev.
        </p>
      </div>
    </div>
  );
}