import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

async function generateHTML() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to desktop
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Navigating to dev server...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Optional: wait a moment for framer-motion animations to settle
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Extracting HTML...');
  const appHtml = await page.evaluate(() => {
    // Return innerHTML of the root element so we just get the app structure
    return document.getElementById('root')?.innerHTML || document.body.innerHTML;
  });
  
  await browser.close();

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
  // Removing Navbar class (often fixed top-0)
  $('*').each((_, el) => {
    const cls = $(el).attr('class') || '';
    if (cls.includes('fixed') && cls.includes('top-0') && cls.includes('z-[100]')) {
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
      const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'path', 'svg', 'circle', 'line', 'rect', 'polygon', 'polyline', 'text'];
      if (!voidElements.includes(el.tagName.toLowerCase())) {
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

      // Scroll reveals (if opacity is 0 from SSR/Puppeteer)
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
