# Noteyard - Song Discovery & Markdown Converter

A Python utility and static site generator for extracting article content (such as song notes or lyrics) from webpages, converting it to clean markdown, and publishing it as a searchable, browsable song library on GitHub Pages.

## Features
- Extracts song notes, lyrics, or articles from URLs (article/main tags)
- Converts HTML to Markdown or MDX for easy publishing
- CLI for scraping and saving content
- Search and browse songs by title, lyrics, or tags
- Shows related songs based on metadata or content similarity
- Supports GitHub Pages static site deployment
- Error handling for HTTP requests and file operations

## Installation
```bash
pip install requests beautifulsoup4
```

## Usage

### 1. Scrape and Save Songs
- Prepare a CSV file (e.g., `extracted_urls.csv`) with columns: `url`, `is_scraped`, `updated_at`.
- Run the script to extract and save markdown files:

```bash
python scrape_and_save_markdown.py
```

Markdown files will be saved in the `songs/` directory.

### 2. Song Content Structure
Each song is stored as a markdown (or MDX) file in the `songs/` folder. Example structure:

```mdx
---
title: "Song Title"
artist: "Artist Name"
tags: ["love", "pop", "2024"]
---

# Song Title

Lyrics or notes here...

## Related Songs
- [[Another Song]](./another-song.md)
```

- Use frontmatter for metadata (title, artist, tags).
- Add a "Related Songs" section with links to similar songs.

### 3. Search and Browse
- The site (when published on GitHub Pages) will allow users to:
  - Browse all songs
  - Search by title, lyrics, or tags
  - View related songs on each song page

You can use a static site generator (like Next.js with MDX, Astro, or Jekyll) to enable search and related song features. See [example Next.js MDX setup](https://nextjs.org/docs/pages/building-your-application/configuring/mdx) or [Astro content collections](https://docs.astro.build/en/guides/content-collections/).

### 4. Deploy to GitHub Pages
- Push your repository to GitHub.
- Set up GitHub Pages in your repo settings (usually from the `main` branch or `/docs` folder).
- If using a static site generator, build the site and publish the output folder.

## Contributing
- Add new song URLs to the CSV and run the scraper.
- Submit markdown/MDX files for new songs.
- Improve search or related song logic in your static site generator.

## License
MIT