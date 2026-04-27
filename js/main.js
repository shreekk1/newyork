/**
 * main.js — Core JavaScript for My World Vlog
 * Handles: theme toggle, nav scroll, mobile drawer,
 *          scroll reveal, drag gallery, active nav links
 *
 * Safe to use on EVERY page — all selectors are null-checked
 * so missing elements never cause crashes.
 */

(function () {
  'use strict';

  /* ============================================================
     THEME — light / dark toggle with localStorage persistence
  ============================================================ */
  var html     = document.documentElement;
  var btnLight = document.getElementById('btnLight');
  var btnDark  = document.getElementById('btnDark');

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (btnLight) btnLight.classList.toggle('active', theme === 'light');
    if (btnDark)  btnDark.classList.toggle('active',  theme === 'dark');
    try { localStorage.setItem('mw-theme', theme); } catch (e) { /* ignore */ }
  }

  // On first load: use saved preference → system preference → light
  var saved = null;
  try { saved = localStorage.getItem('mw-theme'); } catch (e) { /* ignore */ }
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (prefersDark ? 'dark' : 'light'));

  if (btnLight) btnLight.addEventListener('click', function () { setTheme('light'); });
  if (btnDark)  btnDark.addEventListener('click',  function () { setTheme('dark');  });

  /* ============================================================
     NAV — add shadow when user scrolls down
  ============================================================ */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ============================================================
     MOBILE DRAWER — burger open/close
  ============================================================ */
  var burger     = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  function openDrawer() {
    if (!mobileMenu || !burger) return;
    mobileMenu.hidden = false;
    mobileMenu.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeDrawer() {
    if (!mobileMenu || !burger) return;
    mobileMenu.hidden = true;
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  if (burger) {
    burger.addEventListener('click', function () {
      var isOpen = burger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeDrawer() : openDrawer();
    });
  }

  // Close drawer when a link inside it is clicked
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Close drawer on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.hidden) {
      closeDrawer();
      if (burger) burger.focus(); // return focus to burger button
    }
  });

  /* ============================================================
     SCROLL REVEAL — fade elements in as they enter the viewport
  ============================================================ */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    // Respect user accessibility setting — show everything immediately
    revealEls.forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  } else if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target); // only animate once
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback for old browsers — show everything
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ============================================================
     ACTIVE NAV LINK — highlight the current section in the navbar
  ============================================================ */
  var sections  = document.querySelectorAll('section[id]');
  var navLinks  = document.querySelectorAll('.nav-links a');

  if (sections.length > 0 && navLinks.length > 0 && 'IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });

    sections.forEach(function (sec) { sectionObserver.observe(sec); });
  }

  /* ============================================================
     DRAG-TO-SCROLL GALLERY STRIP — mouse drag on desktop
  ============================================================ */
  var strip = document.querySelector('.strip-inner');
  if (strip) {
    var isDragging = false;
    var startX, scrollLeft;

    strip.addEventListener('mousedown', function (e) {
      isDragging = true;
      strip.style.cursor = 'grabbing';
      startX     = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
    });

    function stopDrag() {
      isDragging = false;
      strip.style.cursor = 'grab';
    }

    strip.addEventListener('mouseleave', stopDrag);
    strip.addEventListener('mouseup',    stopDrag);

    strip.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      var x    = e.pageX - strip.offsetLeft;
      var walk = (x - startX) * 1.6;
      strip.scrollLeft = scrollLeft - walk;
    });

    // Keyboard accessibility for strip
    strip.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') strip.scrollLeft += 240;
      if (e.key === 'ArrowLeft')  strip.scrollLeft -= 240;
    });
  }

  /* ============================================================
     GALLERY FILTER — filter buttons on gallery page
  ============================================================ */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active button
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var category = btn.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ============================================================
     LIGHTBOX — click gallery images to view full size
  ============================================================ */
  var lightbox     = document.getElementById('lightbox');
  var lightboxImg  = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var currentIndex = 0;
  var lightboxImages = [];

  if (lightbox && lightboxImg) {
    // Collect all gallery images
    document.querySelectorAll('.gallery-item img').forEach(function (img, i) {
      lightboxImages.push({ src: img.src, alt: img.alt });

      img.parentElement.addEventListener('click', function () {
        currentIndex = i;
        openLightbox(i);
      });

      // Keyboard: Enter or Space opens lightbox
      img.parentElement.setAttribute('tabindex', '0');
      img.parentElement.setAttribute('role', 'button');
      img.parentElement.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          currentIndex = i;
          openLightbox(i);
        }
      });
    });

    function openLightbox(index) {
      if (!lightboxImages[index]) return;
      lightboxImg.src = lightboxImages[index].src;
      lightboxImg.alt = lightboxImages[index].alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
      openLightbox(currentIndex);
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % lightboxImages.length;
      openLightbox(currentIndex);
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev)  lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext)  lightboxNext.addEventListener('click', nextImage);

    // Click outside image to close
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation in lightbox
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });
  }

  /* ============================================================
     CONTACT FORM — validation + XSS-safe submission
  ============================================================ */
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {

    // Helper: escape HTML to prevent XSS if we ever display user input
    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Helper: show a field error
    function showFieldError(fieldId, msg) {
      var field = document.getElementById(fieldId);
      var errorEl = document.getElementById(fieldId + 'Error');
      if (field)   field.classList.add('invalid');
      if (errorEl) { errorEl.textContent = msg; errorEl.classList.add('visible'); }
    }

    // Helper: clear a field error
    function clearFieldError(fieldId) {
      var field = document.getElementById(fieldId);
      var errorEl = document.getElementById(fieldId + 'Error');
      if (field)   field.classList.remove('invalid');
      if (errorEl) { errorEl.textContent = ''; errorEl.classList.remove('visible'); }
    }

    // Clear errors on input change
    contactForm.querySelectorAll('input, textarea, select').forEach(function (el) {
      el.addEventListener('input', function () { clearFieldError(el.id); });
    });

    // Sanitize: strip all HTML tags from a string
    function stripTags(str) {
      return String(str).replace(/<[^>]*>/g, '').trim();
    }

    // Email format check
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    }

    // Validate form — returns true if valid
    function validateForm() {
      var valid = true;

      var name    = stripTags(document.getElementById('name')    ? document.getElementById('name').value    : '');
      var email   = stripTags(document.getElementById('email')   ? document.getElementById('email').value   : '');
      var subject = stripTags(document.getElementById('subject') ? document.getElementById('subject').value : '');
      var message = stripTags(document.getElementById('message') ? document.getElementById('message').value : '');
      var honey   = document.getElementById('website')           ? document.getElementById('website').value : '';

      // Honeypot check — bots fill hidden fields; humans don't
      if (honey.length > 0) {
        // Silently reject bot submissions
        return false;
      }

      if (name.length < 2) {
        showFieldError('name', 'Please enter your name (at least 2 characters).');
        valid = false;
      }

      if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address.');
        valid = false;
      }

      if (subject.length < 3) {
        showFieldError('subject', 'Please enter a subject.');
        valid = false;
      }

      if (message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters.');
        valid = false;
      }

      if (message.length > 2000) {
        showFieldError('message', 'Message is too long (max 2000 characters).');
        valid = false;
      }

      return valid;
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Always prevent default — we handle submission

      var formMsg  = document.getElementById('formMsg');
      var submitBtn = document.getElementById('submitBtn');

      // Clear previous messages
      if (formMsg) { formMsg.className = 'form-msg'; formMsg.textContent = ''; }

      if (!validateForm()) return;

      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Sending…';
      }

      /*
       * ── HOW TO CONNECT A REAL BACKEND ──
       *
       * Option A — Formspree (free, no backend needed):
       *   1. Go to https://formspree.io and create a free account
       *   2. Create a form and copy your form ID (looks like: xpzgwqkr)
       *   3. Change the fetch URL below to:
       *      'https://formspree.io/f/YOUR_FORM_ID'
       *   4. That's it! Formspree emails you each submission.
       *
       * Option B — Netlify Forms (if deploying to Netlify):
       *   1. Add  data-netlify="true"  to your <form> tag
       *   2. Remove the fetch below — Netlify handles it automatically
       *
       * Option C — Your own backend / API endpoint:
       *   Replace the URL below with your API route.
       */

      var formData = {
        name:    escapeHtml(document.getElementById('name')    ? document.getElementById('name').value.trim()    : ''),
        email:   escapeHtml(document.getElementById('email')   ? document.getElementById('email').value.trim()   : ''),
        subject: escapeHtml(document.getElementById('subject') ? document.getElementById('subject').value.trim() : ''),
        message: escapeHtml(document.getElementById('message') ? document.getElementById('message').value.trim() : '')
      };

      // ── Replace this URL with your real form endpoint ──
      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(function (res) {
        if (!res.ok) throw new Error('Server error');
        return res.json();
      })
      .then(function () {
        if (formMsg) {
          formMsg.className = 'form-msg success';
          formMsg.textContent = '✓ Message sent! I\'ll get back to you soon.';
        }
        contactForm.reset();
      })
      .catch(function () {
        if (formMsg) {
          formMsg.className = 'form-msg error';
          // Safe generic error — never expose server details
          formMsg.textContent = 'Something went wrong. Please try again or email me directly.';
        }
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
      });
    });
  }

  /* ============================================================
     AUTO-UPDATE FOOTER YEAR (on any page that has #year)
  ============================================================ */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})(); // end IIFE — no globals leaked
