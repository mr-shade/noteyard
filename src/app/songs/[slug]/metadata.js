export async function generateMetadata({ params }) {
  const { slug } = params;
  const songData = await getSongData(slug);

  if (!songData) {
    return {};
  }

  const { frontmatter } = songData;
  const title = `${frontmatter.title} - Sargam, Harmonium And Flute Notes`;
  const description = frontmatter.description || `Learn ${frontmatter.title} on Harmonium, Flute and Sargam. Get detailed musical notes and comprehensive learning resources.`;

  return {
    title,
    description,
    keywords: [
      frontmatter.title,
      'sargam notes',
      'harmonium notes',
      'flute notes',
      'music notes',
      'learn music',
      'indian classical music'
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: frontmatter.date,
      url: `https://noteyard.pages.dev/songs/${slug}`,
      images: [
        {
          url: frontmatter.image || 'https://noteyard.pages.dev/og-image.jpg',
          width: 1200,
          height: 630,
          alt: frontmatter.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [frontmatter.image || 'https://noteyard.pages.dev/og-image.jpg']
    }
  };
}