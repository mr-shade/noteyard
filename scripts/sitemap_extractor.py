import requests
import xml.etree.ElementTree as ET
import csv
from datetime import datetime

def extract_urls_from_sitemap(sitemap_url):
    """
    Extract all URLs from an XML sitemap.
    """
    try:
        response = requests.get(sitemap_url)
        response.raise_for_status()
        root = ET.fromstring(response.content)
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        urls = [url_element.text for url_element in root.findall('.//ns:url/ns:loc', namespace)]
        return urls
    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve the sitemap {sitemap_url}: {str(e)}")
        return []
    except ET.ParseError as e:
        print(f"Failed to parse XML from {sitemap_url}: {str(e)}")
        return []

def save_urls_to_csv(all_urls, output_file):
    """
    Save extracted URLs to a CSV file.
    """
    try:
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ['url_id', 'url', 'is_scraped', 'created_at', 'updated_at']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for i, url in enumerate(all_urls, 1):
                writer.writerow({
                    'url_id': i,
                    'url': url,
                    'is_scraped': False,
                    'created_at': current_time,
                    'updated_at': current_time
                })
        return f"Successfully saved {len(all_urls)} URLs to {output_file}"
    except IOError as e:
        return f"Error saving to file: {str(e)}"

def main():
    # List of sitemap URLs
    sitemap_urls = [
        "https://www.notationsworld.com/post-sitemap.xml",
        "https://www.notationsworld.com/post-sitemap2.xml",
        "https://www.notationsworld.com/post-sitemap3.xml"
    ]
    
    output_file = "extracted_urls.csv"
    all_urls = []

    print("Extracting URLs from multiple sitemaps...")
    for sitemap_url in sitemap_urls:
        print(f"Processing: {sitemap_url}")
        urls = extract_urls_from_sitemap(sitemap_url)
        print(f"  Found {len(urls)} URLs.")
        all_urls.extend(urls)

    if all_urls:
        result = save_urls_to_csv(all_urls, output_file)
        print(result)

        # Show preview
        print("\nPreview of extracted URLs:")
        for i, url in enumerate(all_urls[:5], 1):
            print(f"{i}. {url}")
        if len(all_urls) > 5:
            print(f"... and {len(all_urls) - 5} more URLs")
    else:
        print("No URLs found in any sitemap.")

if __name__ == "__main__":
    main()
