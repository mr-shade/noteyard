import matter from 'gray-matter';
import { marked } from 'marked';

export function parseMarkdown(content) {
  // Parse frontmatter and content
  const { data, content: markdownContent } = matter(content);
  
  // Convert markdown to HTML
  const htmlContent = marked(markdownContent);
  
  return {
    frontmatter: data,
    content: htmlContent
  };
}