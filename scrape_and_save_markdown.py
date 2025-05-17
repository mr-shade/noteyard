import os
import csv
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from datetime import datetime

# Function to convert a title or URL slug into SEO-friendly filename
def seo_friendly_filename(title_or_url):
    return (
        title_or_url.strip()
        .lower()
        .replace(" ", "-")
        .replace("_", "-")
        .replace("'", "")
        .replace('"', "")
        .replace("?", "")
        .replace(",", "")
        .replace(":", "")
        .replace(".", "")
        .replace("--", "-")
    )

def convert_html_to_markdown(element):
    markdown = ""
    for child in element.children:
        if child.name is None:
            text = child.string
            if text and text.strip():
                markdown += text.strip() + "\n\n"
        elif child.name in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            level = int(child.name[1])
            markdown += f"{'#' * level} {child.get_text().strip()}\n\n"
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
        elif child.name in ['pre', 'code']:
            markdown += f"```\n{child.get_text()}\n```\n\n"
        elif child.name == 'blockquote':
            lines = child.get_text().strip().split('\n')
            for line in lines:
                markdown += f"> {line}\n"
            markdown += "\n"
        elif child.name in ['div', 'section', 'article', 'main']:
            markdown += convert_html_to_markdown(child)
    return markdown

def extract_notes_from_url(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {str(e)}")
        return None, None

    soup = BeautifulSoup(response.text, 'html.parser')
    article = soup.find('article') or soup.find('main') or soup.find('div', class_='content') or soup.body
    if not article:
        print(f"Content not found on {url}")
        return None, None

    # Try to extract a title for filename
    title_tag = soup.find('h1') or soup.title
    title_text = title_tag.get_text().strip() if title_tag else urlparse(url).path.split('/')[-1]
    seo_name = seo_friendly_filename(title_text)

    markdown = convert_html_to_markdown(article)
    return seo_name, markdown

def scrape_all_from_csv(csv_file, output_folder='songs'):
    os.makedirs(output_folder, exist_ok=True)
    updated_rows = []
    scraped_count = 0

    with open(csv_file, 'r', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        rows = list(reader)

    for row in rows:
        if row['is_scraped'].lower() == 'true':
            updated_rows.append(row)
            continue

        url = row['url']
        seo_name, markdown = extract_notes_from_url(url)
        if markdown:
            filename = os.path.join(output_folder, f"{seo_name}.md")
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(markdown)
            row['is_scraped'] = 'True'
            row['updated_at'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            scraped_count += 1
            print(f"✅ Saved: {filename}")
        else:
            print(f"❌ Skipped: {url}")
        updated_rows.append(row)

    with open(csv_file, 'w', newline='', encoding='utf-8') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=reader.fieldnames)
        writer.writeheader()
        writer.writerows(updated_rows)

    print(f"\n✅ Scraping complete. {scraped_count} new files saved.")

if __name__ == "__main__":
    scrape_all_from_csv("extracted_urls.csv", output_folder="songs")
