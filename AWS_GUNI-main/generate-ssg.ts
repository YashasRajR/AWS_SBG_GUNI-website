import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import App from './src/App';

async function generateHTML() {
  console.log('Rendering React App to String...');
  
  // Render the App wrapped in StaticRouter to avoid BrowserRouter errors in Node
  const appHtml = ReactDOMServer.renderToString(
    React.createElement(StaticRouter, { location: '/' }, 
      React.createElement(App)
    )
  );

  console.log('Loading HTML into Cheerio...');
  const $ = cheerio.load(appHtml, null, false);

  // Apply GUNI CMS Rules

  // 1. Convert specific semantic tags to div to avoid breaking parent CMS layout
  const tagsToConvert = ['section', 'header', 'footer', 'nav', 'aside', 'main', 'article'];
  tagsToConvert.forEach(tag => {
    $(tag).each((_, el) => {
      el.tagName = 'div';
    });
  });

  // 2. Remove header entirely as per PROTOCOL RULE 1
  // Assuming the header has a specific class or id, e.g., Navbar
  $('#navbar').remove();
  $('.fixed.top-0').remove(); // Typical navbar class

  // 3. Ensure top-level sections have unique IDs and convert headings
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const tagName = el.tagName.toLowerCase();
    const existingClasses = $(el).attr('class') || '';
    $(el).attr('class', `${tagName}-style ${existingClasses}`);
    el.tagName = 'div';
  });

  // 4. Fill empty elements with zero-width space
  $('*').each((_, el) => {
    if ($(el).children().length === 0 && $(el).text().trim() === '') {
      // Only for non-self-closing tags
      const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
      if (!voidElements.includes(el.tagName)) {
        $(el).html('&#x200d;');
      }
    }
  });

  // 5. Convert Image Extensions to .avif and use absolute CDN URLs
  $('img').each((_, el) => {
    let src = $(el).attr('src');
    if (src && src.startsWith('/')) {
      // Replace extension with .avif
      src = src.replace(/\.(png|jpe?g|webp)$/i, '.avif');
      // Add mock absolute CDN
      src = `https://d2z4x7fn3a0wyp.cloudfront.net${src}`;
      $(el).attr('src', src);
    }
  });

  // Extract all the compiled CSS
  // We need to build the project first using Vite to get the actual minified CSS
  let cssContent = '';
  const distCssDir = path.join(process.cwd(), 'dist', 'assets');
  if (fs.existsSync(distCssDir)) {
    const files = fs.readdirSync(distCssDir);
    const cssFile = files.find(f => f.endsWith('.css'));
    if (cssFile) {
      cssContent = fs.readFileSync(path.join(distCssDir, cssFile), 'utf-8');
    }
  }

  // To follow rule B (Styles before sections), we can inject the entire CSS block before the main container,
  // or we can just place it in the <head> but the protocol says "Place <style> Tags Direct Before Sections".
  // Since we have global tailwind classes, we will inject it right before the first major div.
  
  // Custom JS for Interactions (Lightbox, Modals)
  const vanillaJS = `
    document.addEventListener('DOMContentLoaded', () => {
      // Intersection Observer for Framer Motion replacement
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'none';
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.motion-div, [style*="opacity: 0"]').forEach(el => observer.observe(el));
      
      // Lightbox logic for Gallery
      // Assuming gallery cards have an onclick or we can attach one
      document.querySelectorAll('.gallery-card, [class*="cursor-zoom-in"]').forEach(card => {
        card.addEventListener('click', (e) => {
          const img = card.querySelector('img');
          if (img) {
            const lightbox = document.getElementById('vanilla-lightbox');
            if (lightbox) {
              lightbox.querySelector('img').src = img.src;
              lightbox.style.display = 'flex';
            }
          }
        });
      });
      
      const lb = document.getElementById('vanilla-lightbox');
      if (lb) {
        lb.addEventListener('click', () => lb.style.display = 'none');
      }
    });
  `;

  const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AWS SBG GUNI</title>
  <script>${vanillaJS}</script>
</head>
<body>
  <style>${cssContent}</style>
  <div id="app-root">
    ${$.html()}
  </div>
  
  <!-- Lightbox Container -->
  <div id="vanilla-lightbox" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.9); align-items:center; justify-content:center;">
    <img src="" style="max-width:90vw; max-height:90vh; border-radius:8px;" />
  </div>
</body>
</html>
  `;

  const outDir = path.join(process.cwd(), 'single-page-html');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
  fs.writeFileSync(path.join(outDir, 'index.html'), finalHtml);
  console.log('Successfully generated single-page-html/index.html');
}

generateHTML().catch(console.error);
