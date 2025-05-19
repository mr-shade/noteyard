const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SONGS_DIR = path.join(process.cwd(), 'songs');

// Function to convert title to SEO-friendly slug
function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
}

// Function to generate description from title
function generateDescription(title) {
  // Remove common suffixes and clean up the title
  const cleanTitle = title
    .replace(/–\s*sargam[\s,]*harmonium[\s,]*and[\s,]*flute[\s,]*notes/i, '')
    .replace(/piano\s*notes[\s,]*for[\s,]*beginners/i, '')
    .replace(/guitar\s*tabs[\s,]*for[\s,]*beginners/i, '')
    .replace(/\|.*$/, '') // Remove everything after |
    .trim();

  return `Learn ${cleanTitle} notes, sargam, harmonium notations and flute notes. Easy step-by-step tutorial for beginners.`;
}

// Function to fix markdown file
async function fixMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  
  // Extract title from filename or content
  let title = fileName
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Try to extract title from content if it starts with a heading
  const contentTitle = content.match(/^#\s*(.+)$/m);
  if (contentTitle) {
    title = contentTitle[1].trim();
  }

  // Generate frontmatter data
  const frontmatterData = {
    title,
    description: generateDescription(title),
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    slug: toSlug(title)
  };

  // Remove existing frontmatter if any
  let cleanContent = content.replace(/^---[\s\S]*?---\n/, '');
  
  // Add new frontmatter
  const newContent = matter.stringify(cleanContent, frontmatterData);

  // Generate new filename
  const newFileName = `${frontmatterData.slug}.md`;
  const newFilePath = path.join(SONGS_DIR, newFileName);

  // Write the updated content
  fs.writeFileSync(newFilePath, newContent, 'utf8');

  // If the filename changed, delete the old file
  if (filePath !== newFilePath) {
    fs.unlinkSync(filePath);
  }

  return {
    oldPath: filePath,
    newPath: newFilePath,
    title: frontmatterData.title
  };
}

// Main function to process all markdown files
async function main() {
  // Get all markdown files
  const files = fs.readdirSync(SONGS_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(SONGS_DIR, file));

  console.log(`Found ${files.length} markdown files to process...\n`);

  // Process each file
  for (const file of files) {
    try {
      const result = await fixMarkdownFile(file);
      console.log(`✓ Processed: ${path.basename(result.oldPath)} -> ${path.basename(result.newPath)}`);
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }

  console.log('\nAll files processed!');
}

// Run the script
main().catch(console.error);