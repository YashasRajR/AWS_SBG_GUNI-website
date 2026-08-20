import fs from 'fs';
import path from 'path';

// Mock Data
const GALLERY_ITEMS = [
  { id: '1', title: 'Community Meetup 2023', image: '/gallery/community1.jpeg', date: 'Dec 2023' },
  { id: '2', title: 'Gujarat Builder Week', image: '/gallery/community2.png', date: 'Oct 2023' },
  { id: '3', title: 'Tech Symposium', image: '/gallery/Poster1.png', date: 'Aug 2023' },
  { id: '4', title: 'Cloud Workshop', image: '/gallery/Poster2.png', date: 'Jun 2023' },
  { id: '5', title: 'Speaker Session', image: '/gallery/speaker1.png', date: 'Apr 2023' },
  { id: '6', title: 'Tech Talk', image: '/gallery/speaker2.png', date: 'Feb 2023' },
  { id: '7', title: 'Hands-on Lab', image: '/gallery/workshop1.png', date: 'Jan 2023' },
  { id: '8', title: 'Code Camp', image: '/gallery/workshop2.png', date: 'Nov 2022' }
];

const TEAM_MEMBERS = [
  { name: 'Dr. Yashas Raj R', role: 'Community Leader', image: '/gallery/Yashas.png' },
  { name: 'Dr. Pravesh', role: 'Faculty Advisor', image: '/gallery/Pravesh.png' },
  { name: 'Harshil', role: 'Core Team', image: '/gallery/Harshil.png' },
  { name: 'Diksha', role: 'Core Team', image: '/gallery/Diksha.png' }
];

const EVENTS = [
  { id: '1', title: 'Gujarat Builder Week', date: 'March 15-20, 2024', image: '/gallery/gujarat_builder_week_poster.png' },
  { id: '2', title: 'AWS Cloud Computing Workshop', date: 'April 5, 2024', image: '/gallery/workshop1.png' },
  { id: '3', title: 'Tech Symposium 2024', date: 'May 10-12, 2024', image: '/gallery/Poster1.png' }
];

// Utility to convert to AVIF paths (assuming absolute CDN)
const cdnPath = (p) => {
  if (p.startsWith('/')) {
    // Example absolute CDN path replacing local PNGs with AVIFs
    return \`https://d2z4x7fn3a0wyp.cloudfront.net\${p.replace(/\\.(png|jpe?g|webp)$/i, '.avif')}\`;
  }
  return p;
};

// Global Tailwind & Custom CSS classes that must be embedded
const globalCSS = \`
  /* Tailwind base reset */
  *, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: #e5e7eb; }
  html { line-height: 1.5; -webkit-text-size-adjust: 100%; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
  body { margin: 0; line-height: inherit; background-color: #000; color: #fff; }
  
  /* Utilities */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .w-full { width: 100%; }
  .h-full { height: 100%; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .grid { display: grid; }
  .gap-4 { gap: 1rem; }
  .gap-6 { gap: 1.5rem; }
  .gap-8 { gap: 2rem; }
  .text-center { text-align: center; }
  .text-white { color: #fff; }
  .text-slate-400 { color: #94a3b8; }
  .bg-black { background-color: #000; }
  .overflow-hidden { overflow: hidden; }
  .rounded-xl { border-radius: 0.75rem; }
  .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
  
  /* CMS Rule D: Avoid naked heading tags */
  .h1-style { font-size: 3rem; font-weight: 800; line-height: 1; text-transform: uppercase; }
  .h2-style { font-size: 2.25rem; font-weight: 700; line-height: 1.2; text-transform: uppercase; }
  .h3-style { font-size: 1.5rem; font-weight: 600; line-height: 1.4; }
  .h4-style { font-size: 1.25rem; font-weight: 600; line-height: 1.4; }
  
  /* Empty Element Fix */
  .empty-spacer { display: inline-block; width: 0; height: 0; }
\`;

let htmlContent = \`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AWS SBG GUNI</title>
  <style>
    \${globalCSS}
  </style>
  <script>
    // Intersection Observer for scroll animations
    document.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
      
      // Lightbox logic
      window.openLightbox = (imgSrc) => {
        document.getElementById('lightbox-img').src = imgSrc;
        document.getElementById('lightbox').style.display = 'flex';
      };
      window.closeLightbox = () => {
        document.getElementById('lightbox').style.display = 'none';
      };
    });
  </script>
</head>
<body>
\`;

// HERO SECTION
htmlContent += \`
  <style>
    #home { min-height: 100vh; padding: 4rem 1rem; position: relative; background-color: #000; }
    #home .hero-bg { background-color: #0a0a0a; } /* fallback */
    #home .hero-bg { background: radial-gradient(circle at center, #1a0a2a 0%, #000 100%); }
    #home .hero-content { z-index: 10; position: relative; max-width: 64rem; margin: 0 auto; text-align: center; }
    #home .reveal-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    #home .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
  </style>
  <div id="home" class="hero-bg">
    <div class="hero-content reveal-on-scroll">
      <div class="h1-style text-white" style="margin-bottom: 1.5rem;">
        AWS Student Builders Group<br>
        <span style="color: #a855f7;">GUNI</span>
      </div>
      <div style="font-size: 1.25rem; color: #94a3b8; max-width: 600px; margin: 0 auto 2rem auto;">
        Empowering students to build, innovate, and grow with Amazon Web Services.
      </div>
      <a href="#about" style="display: inline-block; padding: 0.75rem 2rem; background-color: #a855f7; color: #fff; text-decoration: none; border-radius: 9999px; font-weight: bold;">
        Explore Community
      </a>
    </div>
  </div>
\`;

// ABOUT SECTION
htmlContent += \`
  <style>
    #about { padding: 6rem 1rem; background-color: #050505; }
    #about .about-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 4rem; }
    @media (min-width: 768px) { #about .about-container { grid-template-columns: 1fr 1fr; } }
    #about .about-card { background-color: #111; border: 1px solid #333; padding: 2rem; border-radius: 1rem; }
  </style>
  <div id="about">
    <div class="about-container">
      <div class="reveal-on-scroll">
        <div class="h2-style" style="margin-bottom: 1.5rem;">Who We Are</div>
        <div style="color: #94a3b8; line-height: 1.8;">
          AWS SBG GUNI is a community-driven technical group at Ganpat University. We focus on cloud computing, serverless architectures, machine learning, and modern web development using AWS services.
        </div>
      </div>
      <div class="about-card reveal-on-scroll">
        <div class="h3-style" style="margin-bottom: 1rem;">Our Mission</div>
        <div style="color: #94a3b8; line-height: 1.6;">
          To bridge the gap between academic learning and industry requirements by providing hands-on experience with AWS technologies.
        </div>
      </div>
    </div>
  </div>
\`;

// GALLERY SECTION (Marquee)
htmlContent += \`
  <style>
    #gallery { padding: 6rem 1rem; background-color: #000; overflow: hidden; }
    #gallery .marquee-container { display: flex; overflow: hidden; margin-bottom: 2rem; }
    #gallery .marquee { display: flex; gap: 1.5rem; animation: marquee 50s linear infinite; will-change: transform; }
    #gallery .marquee-reverse { display: flex; gap: 1.5rem; animation: marquee 50s linear infinite reverse; will-change: transform; }
    #gallery .marquee:hover, #gallery .marquee-reverse:hover { animation-play-state: paused; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 0.75rem)); } }
    #gallery .gallery-card { width: 300px; flex-shrink: 0; border-radius: 1rem; overflow: hidden; cursor: pointer; border: 1px solid rgba(255,255,255,0.1); }
    #gallery .gallery-card img { width: 100%; height: 200px; object-fit: cover; transition: transform 0.3s ease; }
    #gallery .gallery-card:hover img { transform: scale(1.05); }
    #gallery .lightbox { display: none; position: fixed; inset: 0; background-color: rgba(0,0,0,0.9); z-index: 100; align-items: center; justify-content: center; }
    #gallery .lightbox-close { position: absolute; top: 1rem; right: 1rem; color: #fff; font-size: 2rem; cursor: pointer; background: none; border: none; }
    #gallery .lightbox img { max-width: 90%; max-height: 90vh; border-radius: 0.5rem; }
  </style>
  <div id="gallery">
    <div style="text-align: center; margin-bottom: 3rem;" class="reveal-on-scroll">
      <div class="h2-style">Capturing the Journey</div>
    </div>
    
    <div class="marquee-container reveal-on-scroll">
      <div class="marquee">
        \${[...GALLERY_ITEMS, ...GALLERY_ITEMS].map(item => \`
          <div class="gallery-card" onclick="window.openLightbox('\${cdnPath(item.image)}')">
            <img src="\${cdnPath(item.image)}" alt="\${item.title}" loading="lazy" />
          </div>
        \`).join('')}
      </div>
    </div>
    
    <!-- Lightbox Modal -->
    <div id="lightbox" class="lightbox">
      <button class="lightbox-close" onclick="window.closeLightbox()">&times;</button>
      <img id="lightbox-img" src="" alt="Expanded Image" />
    </div>
  </div>
\`;

// TEAM SECTION
htmlContent += \`
  <style>
    #team { padding: 6rem 1rem; background-color: #050505; }
    #team .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
    #team .team-card { background-color: #111; border: 1px solid #333; border-radius: 1rem; padding: 1.5rem; text-align: center; transition: transform 0.3s ease, border-color 0.3s ease; }
    #team .team-card:hover { transform: translateY(-5px); border-color: #a855f7; }
    #team .team-card img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem auto; border: 2px solid #333; }
  </style>
  <div id="team">
    <div style="text-align: center; margin-bottom: 4rem;" class="reveal-on-scroll">
      <div class="h2-style">Meet the Crew</div>
    </div>
    <div class="team-grid">
      \${TEAM_MEMBERS.map(member => \`
        <div class="team-card reveal-on-scroll">
          <img src="\${cdnPath(member.image)}" alt="\${member.name}" loading="lazy" />
          <div class="h3-style" style="margin-bottom: 0.5rem;">\${member.name}</div>
          <div style="color: #a855f7; font-weight: 500;">\${member.role}</div>
        </div>
      \`).join('')}
    </div>
  </div>
\`;

// FOOTER SECTION
htmlContent += \`
  <style>
    #footer { padding: 4rem 1rem; background-color: #000; border-top: 1px solid #222; text-align: center; }
  </style>
  <div id="footer">
    <div style="color: #94a3b8;">
      &copy; 2024 AWS SBG GUNI. All rights reserved.
    </div>
  </div>
\`;

htmlContent += \`
</body>
</html>
\`;

fs.mkdirSync(path.join(process.cwd(), 'single-page-html'), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), 'single-page-html', 'index.html'), htmlContent);
console.log('Successfully generated single-page-html/index.html');
