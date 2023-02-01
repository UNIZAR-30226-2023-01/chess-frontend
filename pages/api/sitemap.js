import {SitemapStream, streamToPromise} from 'sitemap';
import fs from 'fs';

export default async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    const files = fs.readdirSync('./pages');
    const blacklist = ['_app.js', '_document.js', '_error.js', 'api'];
    const filteredFiles = files
        .filter((file) => !blacklist.includes(file))
        .map((file) => file.replace('.js', ''));

    // Create each URL row
    filteredFiles.forEach((url) => {
      smStream.write({
        url: `/${url}`,
        changefreq: 'daily',
        priority: 0.9,
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
};
