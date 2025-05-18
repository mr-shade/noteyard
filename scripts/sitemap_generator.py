import os
from xml.etree.ElementTree import Element, SubElement, ElementTree

# Config
SONGS_DIR = "songs"
BASE_URL = "https://example.com/songs/"  # Change this to your actual base URL
OUTPUT_FILE = "sitemap.xml"
SUPPORTED_FORMATS = {'.md', '.txt'}

def generate_sitemap():
    # Create the root <urlset> element
    urlset = Element("urlset", {
        "xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"
    })

    # Traverse the songs directory
    for root, _, files in os.walk(SONGS_DIR):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in SUPPORTED_FORMATS:
                rel_path = os.path.relpath(os.path.join(root, file), SONGS_DIR)
                rel_path = rel_path.replace("\\", "/")  # Normalize for Windows
                url = BASE_URL + rel_path

                url_element = SubElement(urlset, "url")
                loc = SubElement(url_element, "loc")
                loc.text = url

    # Write to sitemap.xml
    tree = ElementTree(urlset)
    tree.write(OUTPUT_FILE, encoding="utf-8", xml_declaration=True)
    print(f"Sitemap generated successfully as '{OUTPUT_FILE}'")

if __name__ == "__main__":
    generate_sitemap()
