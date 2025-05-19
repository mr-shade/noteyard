'use client';

export default function DMCAPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">DMCA Policy</h1>
      
      <div className="prose dark:prose-invert">
        <p className="mb-4">
          NoteYard respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond to notices of alleged copyright infringement.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Filing a DMCA Notice</h2>
        <p className="mb-4">
          To file a copyright infringement notification with us, you will need to send a written communication that includes substantially the following:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
          <li>Identification of the copyrighted work claimed to have been infringed.</li>
          <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled.</li>
          <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and email address.</li>
          <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
          <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Counter-Notification</h2>
        <p className="mb-4">
          If you believe that your content was wrongly removed due to a mistake or misidentification, you can file a counter-notification with us containing the following information:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Your physical or electronic signature.</li>
          <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled.</li>
          <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification.</li>
          <li>Your name, address, and telephone number, and a statement that you consent to the jurisdiction of the federal district court for the judicial district in which your address is located.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Information</h2>
        <p className="mb-4">
          Please send your DMCA notices to:<br />
          Email: dmca@noteyard.com
        </p>

        <p className="mt-8 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}