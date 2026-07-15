/* =========================================================================
   SCROLL TO TOP BUTTON JAVASCRIPT LOGIC
   ========================================================================= */

const initScrollToTop = () => {
  const scrollBtn = document.getElementById('scroll-to-top');
  if (!scrollBtn) return;

  // Toggle button visibility based on scroll position
  const toggleVisibility = () => {
    // Get scroll height compatible with all mobile/desktop browsers
    const scrolled = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    
    // Appear after scrolling down past 300px
    if (scrolled > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  };

  // Scroll smoothly back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Listen to window scroll events (passive for performance)
  window.addEventListener('scroll', toggleVisibility, { passive: true });
  
  // Click handler
  scrollBtn.addEventListener('click', scrollToTop);
  
  // Also support accessibility spacebar / enter triggers once focused
  scrollBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });

  // Initial execution in case page loads scrolled down
  toggleVisibility();
};

// Robust execution wrapper ensuring initialization works even if DOMContentLoaded has already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollToTop);
} else {
  initScrollToTop();
}
