import requests
from bs4 import BeautifulSoup

def extract_notes_from_url(url, output_file=None):
    """Extract content from article tags of a webpage, convert to markdown, and optionally save to file.
    
    Args:
        url (str): The URL of the webpage to extract content from
        output_file (str, optional): Path to save the markdown output. If None, only returns the markdown.
        
    Returns:
        str: The markdown content or status message
    """
    # Send HTTP request to the URL
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for bad status codes
    except requests.exceptions.RequestException as e:
        return f"Failed to retrieve the webpage: {str(e)}"

    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the article tag - primary target
    article = soup.find('article')
    
    # If no article tag found, try to find main content area
    if not article:
        article = soup.find('main') or soup.find('div', class_=['content', 'main-content', 'post-content'])
    
    # If still no content found, use the body
    if not article:
        article = soup.body
    
    if not article:
        return "Could not find article content on the page."
    
    # Convert HTML to markdown
    markdown_result = convert_html_to_markdown(article)
    
    # Save to file if output_file is provided
    if output_file:
        try:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(markdown_result)
            return f"Content successfully saved to {output_file}"
        except IOError as e:
            return f"Error saving to file: {str(e)}"
    
    return markdown_result

def convert_html_to_markdown(element):
    """Convert HTML elements to markdown format.
    
    Args:
        element: BeautifulSoup element to convert
        
    Returns:
        str: Markdown formatted text
    """
    markdown = ""
    
    # Process all child elements
    for child in element.children:
        if child.name is None:  # Text node
            text = child.string
            if text and text.strip():
                markdown += text.strip() + "\n\n"
        elif child.name == 'h1':
            markdown += f"# {child.get_text().strip()}\n\n"
        elif child.name == 'h2':
            markdown += f"## {child.get_text().strip()}\n\n"
        elif child.name == 'h3':
            markdown += f"### {child.get_text().strip()}\n\n"
        elif child.name == 'h4':
            markdown += f"#### {child.get_text().strip()}\n\n"
        elif child.name == 'h5':
            markdown += f"##### {child.get_text().strip()}\n\n"
        elif child.name == 'h6':
            markdown += f"###### {child.get_text().strip()}\n\n"
        elif child.name == 'p':
            markdown += f"{child.get_text().strip()}\n\n"
        elif child.name == 'a':
            href = child.get('href', '')
            text = child.get_text().strip()
            markdown += f"[{text}]({href})\n\n"
        elif child.name == 'img':
            src = child.get('src', '')
            alt = child.get('alt', 'Image')
            markdown += f"![{alt}]({src})\n\n"
        elif child.name == 'ul':
            for li in child.find_all('li', recursive=False):
                markdown += f"* {li.get_text().strip()}\n"
            markdown += "\n"
        elif child.name == 'ol':
            for i, li in enumerate(child.find_all('li', recursive=False)):
                markdown += f"{i+1}. {li.get_text().strip()}\n"
            markdown += "\n"
        elif child.name == 'pre' or child.name == 'code':
            markdown += f"```\n{child.get_text()}\n```\n\n"
        elif child.name == 'blockquote':
            lines = child.get_text().strip().split('\n')
            for line in lines:
                markdown += f"> {line}\n"
            markdown += "\n"
        elif child.name in ['div', 'section', 'article', 'main', 'header', 'footer']:
            # Recursively process container elements
            markdown += convert_html_to_markdown(child)
    
    return markdown

# Example usage:
if __name__ == "__main__":
    url = "https://www.notationsworld.com/shayad-love-aaj-kal-sargam-and-flute-notes.html"
    
    # Option 1: Just get the markdown content
    markdown_content = extract_notes_from_url(url)
    print("Preview of extracted content:")
    print(markdown_content[:500] + "..." if len(markdown_content) > 500 else markdown_content)
    
    # Option 2: Save to file
    output_file = "extracted_article.md"
    result = extract_notes_from_url(url, output_file)
    print(result)
