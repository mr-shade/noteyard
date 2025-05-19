import fs from 'fs';
import path from 'path';
import { parseMarkdown } from './markdown';

export async function getAllSongs() {
  const songsDirectory = path.join(process.cwd(), 'songs');
  const filenames = fs.readdirSync(songsDirectory);
  
  const songs = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(songsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { frontmatter } = parseMarkdown(fileContents);
      
      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || null,
        description: frontmatter.description || null
      };
    });
  
  return songs;
}

export async function getSongBySlug(slug) {
  const songsDirectory = path.join(process.cwd(), 'songs');
  const fullPath = path.join(songsDirectory, `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter, content } = parseMarkdown(fileContents);
    
    // Get all songs for recommendations
    const allSongs = await getAllSongs();
    
    return { frontmatter, content, allSongs };
  } catch (error) {
    return null;
  }
}