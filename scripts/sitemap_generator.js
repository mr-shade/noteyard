const fs = require('fs');
const path = require('path');

// Config
const BASE_URL = "https://noteyard.pages.dev";  // Base URL of the website
const SONGS_DIR = "songs";  // Directory containing song markdown files
const OUTPUT_FILE = "public/sitemap.xml";  // Output location
const SUPPORTED_FORMATS = new Set([".md"]);

function addUrl(urls, urlPath, priority = "0.5", changefreq = "weekly") {
    const url = `${BASE_URL.replace(/\/$/, '')}/${urlPath.replace(/^\//, '')}`;
    return `  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemap() {
    // Create output directory if it doesn't exist
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    
    let urls = [];
    
    // Add static pages
    urls.push(addUrl(urls, "", "1.0", "daily"));  // Homepage
    urls.push(addUrl(urls, "about", "0.8", "monthly"));
    urls.push(addUrl(urls, "privacy", "0.8", "monthly"));
    urls.push(addUrl(urls, "terms", "0.8", "monthly"));
    urls.push(addUrl(urls, "songs", "0.9", "daily"));
    
    // Add song pages
    try {
        const walkSync = (dir) => {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                
                if (stat.isDirectory()) {
                    walkSync(filePath);
                } else {
                    const ext = path.extname(file).toLowerCase();
                    if (SUPPORTED_FORMATS.has(ext)) {
                        const songSlug = path.basename(file, ext);
                        const relativePath = path.relative(SONGS_DIR, dir);
                        const urlPath = path.join('songs', relativePath, songSlug).replace(/\\/g, '/');
                        urls.push(addUrl(urls, urlPath, "0.7", "weekly"));
                    }
                }
            });
        };
        
        if (fs.existsSync(SONGS_DIR)) {
            walkSync(SONGS_DIR);
        }
    } catch (error) {
        console.error(`Error processing songs directory: ${error.message}`);
    }
    
    // Create XML
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
    
    // Write to sitemap.xml
    try {
        fs.writeFileSync(OUTPUT_FILE, xmlContent, 'utf8');
        console.log(`Sitemap generated successfully as '${OUTPUT_FILE}'`);
    } catch (error) {
        console.error(`Error writing sitemap file: ${error.message}`);
    }
}

// Run the generator
generateSitemap();