// Common scroll handler for all pages
// Disables scrolling when content fits on screen and centers content

(function() {
  'use strict';

  function handleScrollVisibility() {
    const body = document.body;
    const html = document.documentElement;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Get the actual scrollable height
    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    // Get the actual scrollable width
    const documentWidth = Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    );

    // Disable scrolling if content fits within viewport (with small tolerance)
    const tolerance = 5; // 5px tolerance for rounding errors
    const fitsVertically = documentHeight <= windowHeight + tolerance;
    const fitsHorizontally = documentWidth <= windowWidth + tolerance;

    // Handle page wrapper alignment
    const pageWrapper = document.querySelector('.page-wrapper');
    const registerContainer = document.querySelector('.register-container');
    const loginContainer = document.querySelector('.login-container');
    
    // Special handling for register and login pages - they have internal scrolling
    // Allow container scrolling when content overflows (due to zoom or validation errors)
    if (registerContainer || loginContainer) {
      const container = registerContainer || loginContainer;
      // Check if container content overflows its max-height (needs internal scroll)
      // Use a small tolerance to account for rounding
      const containerNeedsScroll = container && (container.scrollHeight > container.clientHeight + 5);
      
      if (containerNeedsScroll) {
        // Container has internal scroll (due to zoom or validation errors), 
        // disable body scroll but allow container scroll
        if (pageWrapper) pageWrapper.style.alignItems = 'center';
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
      } else if (fitsVertically && fitsHorizontally) {
        // Content fits in viewport, center it and disable scrolling
        if (pageWrapper) pageWrapper.style.alignItems = 'center';
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
      } else {
        // Page content overflows viewport, enable body scroll
        if (pageWrapper) pageWrapper.style.alignItems = 'flex-start';
        body.style.overflowY = 'auto';
        html.style.overflowY = 'auto';
        body.style.overflowX = 'hidden';
        html.style.overflowX = 'hidden';
      }
    } else if (pageWrapper) {
      if (fitsVertically && fitsHorizontally) {
        // Center content when it fits
        pageWrapper.style.alignItems = 'center';
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
      } else {
        // Align to start when content overflows
        pageWrapper.style.alignItems = 'flex-start';
        body.style.overflow = '';
        html.style.overflow = '';
        // Ensure vertical scrolling is enabled if needed
        if (!fitsVertically) {
          body.style.overflowY = 'auto';
          html.style.overflowY = 'auto';
        }
        // Ensure horizontal scrolling is disabled (we only want vertical)
        body.style.overflowX = 'hidden';
        html.style.overflowX = 'hidden';
      }
    } else {
      // Fallback if no page-wrapper found
      if (fitsVertically && fitsHorizontally) {
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
        html.style.overflow = '';
        if (!fitsVertically) {
          body.style.overflowY = 'auto';
          html.style.overflowY = 'auto';
        }
        body.style.overflowX = 'hidden';
        html.style.overflowX = 'hidden';
      }
    }
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Small delay to ensure all content is rendered
      setTimeout(handleScrollVisibility, 100);
    });
  } else {
    setTimeout(handleScrollVisibility, 100);
  }

  // Run on resize and orientation change
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleScrollVisibility, 150);
  });
  
  window.addEventListener('orientationchange', function() {
    setTimeout(handleScrollVisibility, 300);
  });

  // Run after images and fonts load
  window.addEventListener('load', function() {
    setTimeout(handleScrollVisibility, 100);
  });

  // Also check when content changes (for dynamic content)
  const observer = new MutationObserver(function() {
    setTimeout(handleScrollVisibility, 100);
  });

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }

  // Expose function for manual calls if needed
  window.handleScrollVisibility = handleScrollVisibility;
})();

