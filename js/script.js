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
  // 1B. ACCREDITATION SECTION COMPONENT & CONFIG CONTROLLER
  const initAccreditationSection = () => {
    const accreditationSection = document.getElementById('accreditation-section');
    const heroHighlight = document.getElementById('hero-accreditation-highlight');
    const config = window.JOP_ACCREDITATION_CONFIG;

    if (!config) return;

    const verifiedBodies = Array.isArray(config.bodies)
      ? config.bodies.filter((body) => body && body.verified !== false)
      : [];

    // Control Hero Trust Highlight visibility (only shown when enabled and all 3 bodies are verified)
    if (heroHighlight) {
      const allThreeVerified =
        config.enabled &&
        config.showHeroHighlight !== false &&
        Array.isArray(config.bodies) &&
        config.bodies.length >= 3 &&
        verifiedBodies.length === config.bodies.length;

      if (allThreeVerified) {
        const highlightTextEl = document.getElementById('hero-accreditation-text');
        if (highlightTextEl && config.heroHighlightText) {
          highlightTextEl.textContent = config.heroHighlightText;
        }
        heroHighlight.style.display = '';
      } else {
        heroHighlight.style.display = 'none';
      }
    }

    // Control Accreditation Section visibility and dynamic card rendering
    if (accreditationSection) {
      if (!config.enabled || verifiedBodies.length === 0) {
        accreditationSection.style.display = 'none';
        return;
      }

      accreditationSection.style.display = '';

      const tagEl = document.getElementById('accreditation-tag');
      const headingEl = document.getElementById('accreditation-heading');
      const descEl = document.getElementById('accreditation-description');
      const gridEl = document.getElementById('accreditation-cards-grid');

      if (tagEl && config.sectionTag) tagEl.textContent = config.sectionTag;
      if (headingEl && config.sectionHeading) headingEl.textContent = config.sectionHeading;
      if (descEl && config.sectionDescription) descEl.textContent = config.sectionDescription;

      if (gridEl) {
        gridEl.innerHTML = verifiedBodies
          .map(
            (body) => `
          <article class="accreditation-card reveal-on-scroll is-visible" data-accreditation-id="${body.id}">
            <div class="accreditation-logo-box">
              <img
                src="${body.logoSrc}"
                alt="${body.logoAlt}"
                class="accreditation-logo"
                width="124"
                height="124"
                loading="lazy"
              >
            </div>
            <h3 class="accreditation-acronym">${body.acronym}</h3>
            <p class="accreditation-fullname">${body.fullName}</p>
            <div class="accreditation-badge">
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>${body.designation}</span>
            </div>
          </article>
        `
          )
          .join('');
      }
    }
  };

  initAccreditationSection();

  // 2. ACTIVE NAVIGATION LINK DETECTION & MAGNETIC SLIDING INDICATOR
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

  const desktopNav = document.querySelector('.desktop-nav');
  if (desktopNav) {
    const desktopLinks = desktopNav.querySelectorAll('.nav-link');
    const indicator = document.createElement('span');
    indicator.className = 'nav-sliding-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    desktopNav.appendChild(indicator);
    desktopNav.classList.add('has-sliding-indicator');

    const moveIndicatorTo = (targetLink) => {
      if (!targetLink) {
        indicator.style.opacity = '0';
        return;
      }
      const navRect = desktopNav.getBoundingClientRect();
      const linkRect = targetLink.getBoundingClientRect();
      const offsetX = linkRect.left - navRect.left;

      indicator.style.width = `${linkRect.width}px`;
      indicator.style.transform = `translate3d(${offsetX}px, 0, 0)`;
      indicator.style.opacity = '1';
    };

    const getActiveDesktopLink = () => desktopNav.querySelector('.nav-link.active');

    // Initial position after layout & entrance animations settle
    requestAnimationFrame(() => {
      moveIndicatorTo(getActiveDesktopLink());
    });
    window.addEventListener('load', () => {
      moveIndicatorTo(getActiveDesktopLink());
    });

    desktopLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        desktopNav.classList.add('is-hovering-nav');
        moveIndicatorTo(link);
      });

      link.addEventListener('focus', () => {
        desktopNav.classList.add('is-hovering-nav');
        moveIndicatorTo(link);
      });
    });

    desktopNav.addEventListener('mouseleave', () => {
      desktopNav.classList.remove('is-hovering-nav');
      moveIndicatorTo(getActiveDesktopLink());
    });

    desktopNav.addEventListener('focusout', (e) => {
      if (!desktopNav.contains(e.relatedTarget)) {
        desktopNav.classList.remove('is-hovering-nav');
        moveIndicatorTo(getActiveDesktopLink());
      }
    });

    window.addEventListener(
      'resize',
      () => {
        moveIndicatorTo(getActiveDesktopLink());
      },
      { passive: true }
    );
  }

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
  // 6. CONTACT FORM VALIDATION & WHATSAPP ENQUIRY REDIRECTION (PAGE & MODAL)
  // --------------------------------------------------------------------------
  // Extract published JOP phone number from the page and format internationally without +, spaces, or leading zeroes
  const getPublishedWhatsAppNumber = () => {
    const telLink = document.querySelector('a[href^="tel:"]');
    if (telLink) {
      const rawNumber = telLink.getAttribute('href').replace(/^tel:/i, '');
      const digitsOnly = rawNumber.replace(/\D/g, '').replace(/^0+/, '');
      if (digitsOnly) {
        return digitsOnly.startsWith('234') ? digitsOnly : `234${digitsOnly}`;
      }
    }
    return '2348037262757';
  };

  const initWhatsAppEnquiryForm = (formElement, statusAlertElement) => {
    if (!formElement) return;

    const validateField = (input) => {
      const value = input.value.trim();
      const feedbackEl = document.getElementById(`${input.id}-error`);
      let isValid = true;
      let errorMsg = '';

      if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMsg =
          input.tagName === 'SELECT'
            ? 'Please select an enquiry type.'
            : 'This field is required.';
      } else if (input.type === 'email' && value) {
        // RFC 5322 standard email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMsg = 'Please enter a valid email address.';
        }
      } else if (input.type === 'tel' && value) {
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

    const inputs = formElement.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('change', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') {
          validateField(input);
        }
      });
    });

    formElement.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      inputs.forEach((input) => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        if (statusAlertElement) {
          statusAlertElement.style.display = 'none';
        }
        const firstError = formElement.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return;
      }

      const nameInput = formElement.querySelector('[name="name"]');
      const emailInput = formElement.querySelector('[name="email"]');
      const phoneInput = formElement.querySelector('[name="phone"]');
      const subjectSelect = formElement.querySelector('[name="subject"]');
      const messageInput = formElement.querySelector('[name="message"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = (phoneInput && phoneInput.value.trim()) || 'Not provided';
      const selectedOption = subjectSelect ? subjectSelect.options[subjectSelect.selectedIndex] : null;
      const subjectText = selectedOption && selectedOption.value ? selectedOption.text.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      const whatsappNumber = getPublishedWhatsAppNumber();
      const whatsappMessage = [
        'JOP CBT Centre — Website Enquiry',
        '',
        'Hello JOP CBT Centre,',
        '',
        `My name is ${name}.`,
        '',
        `Email: ${email}`,
        '',
        `Phone: ${phone}`,
        '',
        `Enquiry Type: ${subjectText}`,
        '',
        `Message: ${message}`,
        '',
        'I would like to make an enquiry about your services.',
        '',
        'Thank you.'
      ].join('\n');

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      if (statusAlertElement) {
        statusAlertElement.style.display = 'flex';
        statusAlertElement.focus();
      }

      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        window.location.href = whatsappUrl;
      }
    });
  };

  // Initialize the on-page Contact Form (contact.html)
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-status-alert');
  initWhatsAppEnquiryForm(contactForm, formFeedback);

  // --------------------------------------------------------------------------
  // 6B. QUICK WHATSAPP ENQUIRY MODAL ("ENQUIRE NOW" & STEP 01 CARD)
  // --------------------------------------------------------------------------
  const createEnquiryModal = () => {
    if (document.getElementById('enquiry-modal-backdrop')) {
      return document.getElementById('enquiry-modal-backdrop');
    }

    const modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'enquiry-modal-backdrop';
    modalBackdrop.className = 'enquiry-modal-backdrop';
    modalBackdrop.setAttribute('aria-hidden', 'true');

    modalBackdrop.innerHTML = `
      <div class="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-modal-title" aria-describedby="enquiry-modal-subtitle">
        <div class="enquiry-modal-header">
          <div>
            <span class="enquiry-modal-badge">• A SIMPLE PROCESS — STEP 01</span>
            <h2 id="enquiry-modal-title" class="enquiry-modal-title">Tell Us What You Need</h2>
            <p id="enquiry-modal-subtitle" class="enquiry-modal-subtitle">
              Complete your details below to open a pre-filled WhatsApp enquiry with JOP CBT Centre.
            </p>
          </div>
          <button type="button" class="enquiry-modal-close" id="enquiry-modal-close" aria-label="Close enquiry modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="enquiry-modal-body">
          <div id="modal-form-status-alert" class="form-notice" role="status" aria-live="polite" style="display: none; background: #F0FDF4; border-color: #15803D; color: #14532D;" tabindex="-1">
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <div>
              <strong>Opening WhatsApp...</strong><br>
              WhatsApp will now open with your pre-filled enquiry details. Please review the message and press <strong>Send</strong> inside WhatsApp to complete your enquiry.
            </div>
          </div>

          <form id="modal-enquiry-form" novalidate aria-label="Quick WhatsApp Enquiry Form">
            <div class="form-group">
              <label for="modal-contact-name" class="form-label">Full Name <span class="required">*</span></label>
              <input type="text" id="modal-contact-name" name="name" class="form-input" placeholder="e.g. Adebayo Johnson" required autocomplete="name">
              <div id="modal-contact-name-error" class="form-feedback" aria-live="polite"></div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="modal-contact-email" class="form-label">Email Address <span class="required">*</span></label>
                <input type="email" id="modal-contact-email" name="email" class="form-input" placeholder="name@example.com" required autocomplete="email">
                <div id="modal-contact-email-error" class="form-feedback" aria-live="polite"></div>
              </div>

              <div class="form-group">
                <label for="modal-contact-phone" class="form-label">Phone Number</label>
                <input type="tel" id="modal-contact-phone" name="phone" class="form-input" placeholder="+234..." autocomplete="tel">
                <div id="modal-contact-phone-error" class="form-feedback" aria-live="polite"></div>
              </div>
            </div>

            <div class="form-group">
              <label for="modal-contact-subject" class="form-label">Subject <span class="required">*</span></label>
              <select id="modal-contact-subject" name="subject" class="form-select" required>
                <option value="">Select an Enquiry Type</option>
                <option value="test-centre-booking">Testing Centre Booking / Assessment Hall Rental</option>
                <option value="exam-registration">Exam Registration &amp; Result Checking Assistance</option>
                <option value="corporate-testing">Corporate Recruitment / Certification Testing</option>
                <option value="general-enquiry">General Information &amp; Facility Inspection</option>
              </select>
              <div id="modal-contact-subject-error" class="form-feedback" aria-live="polite"></div>
            </div>

            <div class="form-group">
              <label for="modal-contact-message" class="form-label">Message <span class="required">*</span></label>
              <textarea id="modal-contact-message" name="message" class="form-textarea" placeholder="Please describe your requirements, prospective candidate numbers, or questions..." required style="min-height: 110px;"></textarea>
              <div id="modal-contact-message-error" class="form-feedback" aria-live="polite"></div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
              <button type="submit" class="btn btn-primary btn-lg" style="flex-grow: 1;">
                Send Enquiry via WhatsApp
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);

    const modalForm = document.getElementById('modal-enquiry-form');
    const modalAlert = document.getElementById('modal-form-status-alert');
    initWhatsAppEnquiryForm(modalForm, modalAlert);

    return modalBackdrop;
  };

  const modalBackdrop = createEnquiryModal();
  const modalCloseBtn = document.getElementById('enquiry-modal-close');
  let lastFocusedTrigger = null;

  const openEnquiryModal = (triggerEl) => {
    if (!modalBackdrop) return;
    lastFocusedTrigger = triggerEl || document.activeElement;

    // Close mobile nav if open
    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const firstInput = modalBackdrop.querySelector('#modal-contact-name');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 50);
    }
  };

  const closeEnquiryModal = () => {
    if (!modalBackdrop || !modalBackdrop.classList.contains('is-open')) return;
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus();
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeEnquiryModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeEnquiryModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!modalBackdrop || !modalBackdrop.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeEnquiryModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusableEls = modalBackdrop.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableEls.length) return;
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });

  // Bind all "Enquire Now" header/mobile-drawer buttons (.nav-cta .btn) and Step 01 cards ([data-open-enquiry-modal])
  const enquiryTriggers = document.querySelectorAll('.nav-cta .btn, [data-open-enquiry-modal]');
  enquiryTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openEnquiryModal(trigger);
    });

    if (trigger.hasAttribute('data-open-enquiry-modal')) {
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openEnquiryModal(trigger);
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 7. ACCESSIBLE SMOOTH SCROLL FOR IN-PAGE & CROSS-PAGE ANCHORS
  // --------------------------------------------------------------------------
  const scrollToHashSection = (hash, smooth = true) => {
    if (!hash || hash === '#') return false;
    const targetElement = document.querySelector(hash);
    if (!targetElement) return false;

    // Ensure reveal-on-scroll elements inside target section are immediately visible
    targetElement.classList.add('is-visible');
    targetElement.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      el.classList.add('is-visible');
    });

    targetElement.scrollIntoView({ behavior: smooth && !prefersReducedMotion ? 'smooth' : 'auto' });
    return true;
  };

  if (window.location.hash) {
    // Ensure accurate scroll positioning after layout settles on cross-page anchor navigation
    requestAnimationFrame(() => {
      scrollToHashSection(window.location.hash, false);
    });
  }

  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const [linkPath, hashPart] = href.split('#');
      if (!hashPart) return;

      const isSamePage =
        !linkPath ||
        linkPath === currentPath ||
        (currentPath === '' && linkPath === 'index.html');

      if (isSamePage) {
        const targetHash = `#${hashPart}`;
        if (scrollToHashSection(targetHash, true)) {
          e.preventDefault();
          history.pushState(null, '', targetHash);
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
