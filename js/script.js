/**
 * ============================================================================
 * JOP CBT CENTER — MASTER JAVASCRIPT
 * Accessible Navigation, Scroll Observers, Form Validation & Dynamic UI
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DYNAMIC COPYRIGHT YEAR
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. ACTIVE NAVIGATION LINK DETECTION
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // --------------------------------------------------------------------------
  // 3. RESPONSIVE MOBILE NAVIGATION
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen.toString());
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking any nav link in mobile view
    mobileNav.querySelectorAll('.nav-link, .btn').forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. HEADER STYLING ON SCROLL
  // --------------------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --------------------------------------------------------------------------
  // 5. SCROLL-TRIGGERED ENTRANCE ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // If reduced motion is requested or IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // --------------------------------------------------------------------------
  // 6. CONTACT FORM VALIDATION & "IN PROGRESS" HANDLING
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-status-alert');

  if (contactForm) {
    const validateField = (input) => {
      const value = input.value.trim();
      const feedbackEl = document.getElementById(`${input.id}-error`);
      let isValid = true;
      let errorMsg = '';

      if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMsg = 'This field is required.';
      } else if (input.type === 'email' && value) {
        // RFC 5322 standard email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMsg = 'Please enter a valid email address.';
        }
      } else if (input.id === 'contact-phone' && value) {
        // Simple international & local phone verification
        const phoneRegex = /^[+0-9\s\-()]{7,20}$/;
        if (!phoneRegex.test(value)) {
          isValid = false;
          errorMsg = 'Please enter a valid telephone number.';
        }
      }

      if (feedbackEl) {
        if (!isValid) {
          feedbackEl.textContent = errorMsg;
          feedbackEl.classList.add('error');
          input.setAttribute('aria-invalid', 'true');
        } else {
          feedbackEl.textContent = '';
          feedbackEl.classList.remove('error');
          input.removeAttribute('aria-invalid');
        }
      }

      return isValid;
    };

    // Attach blur validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') {
          validateField(input);
        }
      });
    });

    // Form submission interceptor
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      inputs.forEach((input) => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        const firstError = contactForm.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return;
      }

      // Explicit prompt rule:
      // "Because the website does not have a backend or approved external submission service,
      // do not simulate successful delivery of enquiries.
      // Display a clear 'In Progress' status for submission functionality and keep actual submission
      // disabled until it has been connected to an approved service. Do not store sensitive form data."
      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. ACCESSIBLE SMOOTH SCROLL FOR IN-PAGE ANCHORS
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
          targetElement.focus({ preventScroll: true });
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 8. INTERACTIVE BACKDROPS & CURSOR PARALLAX SPOTLIGHT
  // --------------------------------------------------------------------------
  if (!prefersReducedMotion) {
    const interactiveSections = document.querySelectorAll('.section-interactive-bg');

    interactiveSections.forEach((section) => {
      const spotlight = section.querySelector('.ambient-cursor-spotlight');
      const parallaxItems = section.querySelectorAll('.floating-icon-item');

      let isHovered = false;
      let rafId = null;
      let targetX = 0;
      let targetY = 0;

      const updateParallax = () => {
        if (!isHovered) return;

        parallaxItems.forEach((item) => {
          const depth = parseFloat(item.getAttribute('data-parallax')) || 0.04;
          const moveX = targetX * depth;
          const moveY = targetY * depth;
          item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });

        rafId = null;
      };

      section.addEventListener('mouseenter', () => {
        isHovered = true;
        if (spotlight) spotlight.style.opacity = '1';
      });

      section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (spotlight) {
          spotlight.style.left = `${mouseX}px`;
          spotlight.style.top = `${mouseY}px`;
        }

        targetX = mouseX - rect.width / 2;
        targetY = mouseY - rect.height / 2;

        if (!rafId) {
          rafId = requestAnimationFrame(updateParallax);
        }
      });

      section.addEventListener('mouseleave', () => {
        isHovered = false;
        if (spotlight) spotlight.style.opacity = '0';

        parallaxItems.forEach((item) => {
          item.style.transform = 'translate3d(0, 0, 0)';
        });

        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      });
    });
  }
});
