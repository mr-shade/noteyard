import os
from xml.etree.ElementTree import Element, SubElement, ElementTree

# Config
BASE_URL = "https://noteyard.pages.dev"  # Base URL of the website
url = BASE_URL
SONGS_DIR = "songs"  # Directory containing song markdown files
OUTPUT_FILE = "public/sitemap.xml"  # Output location
SUPPORTED_FORMATS = {'.md'}

def add_url(urlset, path, priority="0.5", changefreq="weekly"):
    url_element = SubElement(urlset, "url")
    loc = SubElement(url_element, "loc")
    loc.text = f"{BASE_URL.rstrip('/')}/{path.lstrip('/')}"
    
    freq = SubElement(url_element, "changefreq")
    freq.text = changefreq
    
    pri = SubElement(url_element, "priority")
    pri.text = priority

def generate_sitemap():
    # Create output directory if it doesn't exist
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    # Create the root <urlset> element
    urlset = Element("urlset", {
        "xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"
    })
    
    # Add static pages
    add_url(urlset, "", priority="1.0", changefreq="daily")  # Homepage
    add_url(urlset, "about", priority="0.8", changefreq="monthly")
    add_url(urlset, "privacy", priority="0.8", changefreq="monthly")
    add_url(urlset, "terms", priority="0.8", changefreq="monthly")
    add_url(urlset, "songs", priority="0.9", changefreq="daily")
    
    # Add song pages
    for root, _, files in os.walk(SONGS_DIR):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in SUPPORTED_FORMATS:
                song_slug = os.path.splitext(file)[0]
                add_url(urlset, f"songs/{song_slug}", priority="0.7", changefreq="weekly")

                url_element = SubElement(urlset, "url")
                loc = SubElement(url_element, "loc")
                loc.text = url

    # Write to sitemap.xml
    tree = ElementTree(urlset)
    tree.write(OUTPUT_FILE, encoding="utf-8", xml_declaration=True)
    print(f"Sitemap generated successfully as '{OUTPUT_FILE}'")

if __name__ == "__main__":
    generate_sitemap()
