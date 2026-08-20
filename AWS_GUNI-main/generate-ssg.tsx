import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

// Import the AppContent component
import { AppContent } from './src/App';

async function generateHTML() {
  console.log('Rendering React App to String...');
  
  // Render the AppContent directly
  const appHtml = ReactDOMServer.renderToString(
    React.createElement(AppContent)
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
  // Identify the header/navbar and remove it
  $('nav').remove();
  $('.fixed.top-0').remove(); // Typical navbar classes if converted to div
  // Assuming the Navbar root element has a specific identifier
  // We can just remove the first major div that acts as nav
  $('*').each((_, el) => {
    const cls = $(el).attr('class') || '';
    if (cls.includes('fixed top-0') && cls.includes('z-[100]')) {
      $(el).remove();
    }
  });

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
      src = src.replace(/\.(png|jpe?g|webp)$/i, '.avif');
      src = `https://d2z4x7fn3a0wyp.cloudfront.net${src}`;
      $(el).attr('src', src);
    }
  });

  // Load CSS from the built project
  let cssContent = '';
  const distCssDir = path.join(process.cwd(), 'dist', 'assets');
  if (fs.existsSync(distCssDir)) {
    const files = fs.readdirSync(distCssDir);
    const cssFile = files.find(f => f.endsWith('.css'));
    if (cssFile) {
      cssContent = fs.readFileSync(path.join(distCssDir, cssFile), 'utf-8');
    }
  }

  // Pre-process CSS to remove global tags
  // Replace `body {` with `.body-wrap {`, etc. to avoid bleeding
  cssContent = cssContent.replace(/body\s*\{/g, '.body-wrap {');
  cssContent = cssContent.replace(/html\s*\{/g, '.html-wrap {');

  // Custom Vanilla JS for Interactions
  const vanillaJS = `
    document.addEventListener('DOMContentLoaded', () => {
      // Setup Lightbox
      const lightbox = document.createElement('div');
      lightbox.id = 'vanilla-lightbox';
      lightbox.style.cssText = 'display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.9); align-items:center; justify-content:center;';
      const img = document.createElement('img');
      img.style.cssText = 'max-width:90vw; max-height:90vh; border-radius:8px;';
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = 'position:absolute; top:20px; right:30px; font-size:40px; color:white; background:none; border:none; cursor:pointer;';
      lightbox.appendChild(img);
      lightbox.appendChild(closeBtn);
      document.body.appendChild(lightbox);
      
      closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.style.display = 'none';
      });

      // Gallery Click handlers
      document.querySelectorAll('.gallery-card, [class*="cursor-zoom-in"], [class*="hover:scale-105"]').forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          const cardImg = card.querySelector('img') || card;
          if (cardImg && cardImg.src) {
            img.src = cardImg.src;
            lightbox.style.display = 'flex';
          }
        });
      });

      // Marquee Pause on Hover Fix
      document.querySelectorAll('.animate-marquee, .animate-marquee-reverse').forEach(marquee => {
        marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
        marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
      });

      // Scroll reveals
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'none';
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('[style*="opacity: 0"]').forEach(el => observer.observe(el));
    });
  `;

  // Wrap in a div to inject <style> block as per CMS Rule 1B
  // Place custom style blocks directly before the top-level section they apply to
  
  const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AWS SBG GUNI</title>
  <script>${vanillaJS}</script>
</head>
<body class="body-wrap bg-black text-white">
  <style>${cssContent}</style>
  <div id="main-content" class="html-wrap">
    ${$.html()}
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
