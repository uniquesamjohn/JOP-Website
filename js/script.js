/**
 * ============================================================================
 * JOP CBT CENTRE — MASTER JAVASCRIPT & CENTRAL CONFIGURATION
 * Accessible Navigation, Centralised Data Config, Scroll Observers,
 * Partnership & Inspection Form Validation, and Dynamic UI
 * ============================================================================
 */

/**
 * Centralised configuration for JOP CBT Centre operational specifications,
 * WAEC & JAMB accreditation metadata, and backend/enquiry endpoints.
 *
 * COMPLIANCE NOTE: Management has confirmed WAEC and JAMB accreditation.
 * Before final production release, verify physical accreditation certificates,
 * centre code records, and logo usage permissions, then set
 * `managementVerificationPending: false`.
 */
const JOP_SITE_CONFIG = Object.freeze({
  centreName: 'JOP CBT Centre',
  location: {
    city: 'Abeokuta',
    state: 'Ogun State',
    address:
      '4 Ijoko Lane, opposite Lisabi Nursery and Primary School, Erunbe, Abeokuta 110222, Ogun State',
  },
  contact: {
    phoneDisplay: '+234 803 726 2757',
    whatsappNumber: '2348037262757',
    businessHours: 'Mon–Sat: 8:00 AM – 6:00 PM',
    // Optional REST endpoint (e.g. Formspree or institutional API gateway).
    // Keep empty in client-side code unless a public form endpoint is configured.
    partnershipEndpoint: '',
  },
  capacity: {
    primaryWorkstations: 250,
    backupComputers: '~50',
    totalAvailableSystems: '300',
  },
  accreditation: {
    heroBadgeText: 'WAEC & JAMB Accredited CBT Centre',
    sectionHeading: 'Accredited by Leading Examination Bodies',
    sectionDescription:
      'JOP CBT Centre is accredited by the West African Examinations Council (WAEC) and the Joint Admissions and Matriculation Board (JAMB), reflecting our commitment to maintaining recognised standards for computer-based examination delivery.',
    managementVerificationPending: true,
    bodies: {
      waec: {
        id: 'waec',
        shortName: 'WAEC',
        fullName: 'West African Examinations Council',
        statusLabel: 'Accredited Centre',
        logoSrc: 'assets/logo/waec-logo.png',
        logoAlt: 'Official logo of the West African Examinations Council (WAEC)',
        verificationStatus: 'Accredited CBT Centre (Subject to final certificate publication sign-off)',
      },
      jamb: {
        id: 'jamb',
        shortName: 'JAMB',
        fullName: 'Joint Admissions and Matriculation Board',
        statusLabel: 'Accredited Centre',
        logoSrc: 'assets/logo/jamb-logo.png',
        logoAlt: 'Official logo of the Joint Admissions and Matriculation Board (JAMB)',
        verificationStatus: 'Accredited CBT Centre (Subject to final certificate publication sign-off)',
      },
    },
  },
});

window.JOP_SITE_CONFIG = JOP_SITE_CONFIG;

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DYNAMIC COPYRIGHT YEAR & CENTRALISED DATA BINDING
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Bind centralised workstation capacity figures across the DOM
  document.querySelectorAll('[data-jop-stat="primary-workstations"]').forEach((el) => {
    el.textContent = String(JOP_SITE_CONFIG.capacity.primaryWorkstations);
  });

  document.querySelectorAll('[data-jop-stat="backup-computers"]').forEach((el) => {
    el.textContent = String(JOP_SITE_CONFIG.capacity.backupComputers);
  });

  // Bind centralised accreditation data to accreditation cards if present
  Object.values(JOP_SITE_CONFIG.accreditation.bodies).forEach((body) => {
    const card = document.querySelector(`[data-accreditation-card="${body.id}"]`);
    if (!card) return;

    const imgEl = card.querySelector('[data-accreditation-logo]');
    if (imgEl) {
      imgEl.setAttribute('src', body.logoSrc);
      imgEl.setAttribute('alt', body.logoAlt);
    }

    const shortEl = card.querySelector('[data-accreditation-short]');
    if (shortEl) shortEl.textContent = body.shortName;

    const fullEl = card.querySelector('[data-accreditation-full]');
    if (fullEl) fullEl.textContent = body.fullName;

    const statusEl = card.querySelector('[data-accreditation-status]');
    if (statusEl) statusEl.textContent = body.statusLabel;
  });

  // --------------------------------------------------------------------------
  // 2. ACTIVE NAVIGATION LINK DETECTION & MAGNETIC SLIDING INDICATOR
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const setActiveNavLinks = (activeHash = '') => {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const [linkPage, linkHash] = href.split('#');
      const normalizedPage = linkPage || 'index.html';

      let isMatch = false;
      if (activeHash && (currentPath === 'index.html' || currentPath === '')) {
        isMatch = linkHash && `#${linkHash}` === activeHash;
      } else {
        isMatch =
          !linkHash &&
          (normalizedPage === currentPath || (currentPath === '' && normalizedPage === 'index.html'));
      }

      if (isMatch) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  };

  setActiveNavLinks();

  const desktopNav = document.querySelector('.desktop-nav');
  let moveIndicatorTo = () => {};
  let getActiveDesktopLink = () => null;

  if (desktopNav) {
    const desktopLinks = desktopNav.querySelectorAll('.nav-link');
    const indicator = document.createElement('span');
    indicator.className = 'nav-sliding-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    desktopNav.appendChild(indicator);
    desktopNav.classList.add('has-sliding-indicator');

    moveIndicatorTo = (targetLink) => {
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

    getActiveDesktopLink = () => desktopNav.querySelector('.nav-link.active');

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

  // Highlight in-page sections (#accreditation, #partnerships) on homepage scroll
  if (currentPath === 'index.html' || currentPath === '') {
    const trackedSections = ['accreditation', 'partnerships']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (trackedSections.length) {
      const updateSectionNavOnScroll = () => {
        const scrollPos = window.scrollY + 180;
        let matchedHash = '';

        trackedSections.forEach((sec) => {
          const top = sec.offsetTop;
          const bottom = top + sec.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            matchedHash = `#${sec.id}`;
          }
        });

        setActiveNavLinks(matchedHash);
        if (desktopNav && !desktopNav.classList.contains('is-hovering-nav')) {
          moveIndicatorTo(getActiveDesktopLink());
        }
      };

      window.addEventListener('scroll', updateSectionNavOnScroll, { passive: true });
    }
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

    mobileNav.querySelectorAll('.nav-link, .btn').forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });

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
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // --------------------------------------------------------------------------
  // 6. SHARED VALIDATION HELPERS & WHATSAPP NUMBER RESOLUTION
  // --------------------------------------------------------------------------
  const getPublishedWhatsAppNumber = () => {
    const telLink = document.querySelector('a[href^="tel:"]');
    if (telLink) {
      const rawNumber = telLink.getAttribute('href').replace(/^tel:/i, '');
      const digitsOnly = rawNumber.replace(/\D/g, '').replace(/^0+/, '');
      if (digitsOnly) {
        return digitsOnly.startsWith('234') ? digitsOnly : `234${digitsOnly}`;
      }
    }
    return JOP_SITE_CONFIG.contact.whatsappNumber;
  };

  const validateFormControl = (input) => {
    const value = input.value.trim();
    const feedbackEl = document.getElementById(`${input.id}-error`);
    let isValid = true;
    let errorMsg = '';

    if (input.hasAttribute('required') && !value) {
      isValid = false;
      errorMsg =
        input.tagName === 'SELECT'
          ? 'Please select an option.'
          : 'This field is required.';
    } else if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMsg = 'Please enter a valid official email address.';
      }
    } else if (input.type === 'tel' && value) {
      const phoneRegex = /^[+0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMsg = 'Please enter a valid telephone number.';
      }
    } else if (input.type === 'number' && value) {
      const numVal = Number(value);
      if (Number.isNaN(numVal) || numVal < 1) {
        isValid = false;
        errorMsg = 'Please enter a valid number of candidates (at least 1).';
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

  // --------------------------------------------------------------------------
  // 6A. CONTACT FORM VALIDATION & WHATSAPP ENQUIRY REDIRECTION (CONTACT & MODAL)
  // --------------------------------------------------------------------------
  const initWhatsAppEnquiryForm = (formElement, statusAlertElement) => {
    if (!formElement) return;

    const inputs = formElement.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => validateFormControl(input));
      input.addEventListener('change', () => validateFormControl(input));
      input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') {
          validateFormControl(input);
        }
      });
    });

    formElement.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      inputs.forEach((input) => {
        if (!validateFormControl(input)) {
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
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Enquiry Type: ${subjectText}`,
        '',
        `Message: ${message}`,
        '',
        'Thank you.',
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

  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-status-alert');
  initWhatsAppEnquiryForm(contactForm, formFeedback);

  // --------------------------------------------------------------------------
  // 6B. INSTITUTIONAL PARTNERSHIP & FACILITY INSPECTION ENQUIRY FORM
  // --------------------------------------------------------------------------
  const partnershipForm = document.getElementById('partnership-form');
  if (partnershipForm) {
    const partnerInputs = partnershipForm.querySelectorAll('input, select, textarea');
    const submitBtn = document.getElementById('partnership-submit-btn');
    const submitBtnLabel = document.getElementById('partnership-submit-label');
    const submitSpinner = document.getElementById('partnership-submit-spinner');
    const successBanner = document.getElementById('partnership-form-success');
    const errorBanner = document.getElementById('partnership-form-error');
    const errorBannerText = document.getElementById('partnership-form-error-text');
    const intentBadge = document.getElementById('partnership-form-intent-badge');
    const serviceSelect = document.getElementById('partner-required-service');

    // Minimum date for preferred examination date is today
    const preferredDateInput = document.getElementById('partner-preferred-date');
    if (preferredDateInput) {
      const todayIso = new Date().toISOString().split('T')[0];
      preferredDateInput.setAttribute('min', todayIso);
    }

    partnerInputs.forEach((input) => {
      input.addEventListener('blur', () => validateFormControl(input));
      input.addEventListener('change', () => validateFormControl(input));
      input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') {
          validateFormControl(input);
        }
      });
    });

    // Intent buttons (Book a Facility Inspection, Discuss a Partnership, Request a Proposal, Request a Consultation)
    document.querySelectorAll('[data-partnership-intent]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        const intent = trigger.getAttribute('data-partnership-intent');
        const targetFormCard = document.getElementById('partnership-form-card') || partnershipForm;

        if (targetFormCard) {
          e.preventDefault();
          targetFormCard.classList.add('is-visible');
          targetFormCard.scrollIntoView({
            behavior: !prefersReducedMotion ? 'smooth' : 'auto',
            block: 'start',
          });

          if (serviceSelect) {
            if (intent === 'inspection') {
              serviceSelect.value = 'Facility Inspection & Readiness Assessment';
              if (intentBadge) intentBadge.textContent = 'Facility Inspection Booking';
            } else if (intent === 'proposal') {
              serviceSelect.value = 'Institutional Testing Partnerships';
              if (intentBadge) intentBadge.textContent = 'Proposal Request';
            } else if (intent === 'consultation') {
              serviceSelect.value = 'Digital Assessment and Testing Solutions';
              if (intentBadge) intentBadge.textContent = 'Assessment Consultation Request';
            } else {
              if (!serviceSelect.value) {
                serviceSelect.value = 'Institutional Testing Partnerships';
              }
              if (intentBadge) intentBadge.textContent = 'Institutional Partnership Enquiry';
            }
          }

          setTimeout(() => {
            const orgInput = document.getElementById('partner-org-name');
            if (orgInput) orgInput.focus({ preventScroll: true });
          }, 450);
        }
      });
    });

    partnershipForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (successBanner) successBanner.style.display = 'none';
      if (errorBanner) errorBanner.style.display = 'none';

      let isFormValid = true;
      partnerInputs.forEach((input) => {
        if (!validateFormControl(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        if (errorBanner) {
          if (errorBannerText) {
            errorBannerText.textContent =
              'Please review the highlighted fields below and complete all required institutional details.';
          }
          errorBanner.style.display = 'flex';
        }
        const firstInvalid = partnershipForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const payload = {
        organisationName: document.getElementById('partner-org-name')?.value.trim() || '',
        contactPerson: document.getElementById('partner-contact-person')?.value.trim() || '',
        officialEmail: document.getElementById('partner-email')?.value.trim() || '',
        phoneNumber: document.getElementById('partner-phone')?.value.trim() || '',
        organisationType: document.getElementById('partner-org-type')?.value.trim() || '',
        requiredService: document.getElementById('partner-required-service')?.value.trim() || '',
        expectedCandidates: document.getElementById('partner-candidates')?.value.trim() || '',
        preferredDate:
          document.getElementById('partner-preferred-date')?.value.trim() || 'To be scheduled',
        additionalRequirements:
          document.getElementById('partner-requirements')?.value.trim() || 'None specified',
        submittedAt: new Date().toISOString(),
      };

      // Activate loading indicator state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
      }
      if (submitBtnLabel) {
        submitBtnLabel.textContent = 'Processing Request...';
      }
      if (submitSpinner) {
        submitSpinner.style.display = 'inline-block';
      }

      try {
        // If a remote endpoint is configured in JOP_SITE_CONFIG, submit via fetch()
        if (JOP_SITE_CONFIG.contact.partnershipEndpoint) {
          const response = await fetch(JOP_SITE_CONFIG.contact.partnershipEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(`Endpoint returned status ${response.status}`);
          }
        } else {
          // Brief UX transition before launching verified institutional WhatsApp dispatch
          await new Promise((resolve) => setTimeout(resolve, 550));
        }

        const whatsappNumber = getPublishedWhatsAppNumber();
        const whatsappText = [
          'JOP CBT Centre — Institutional Partnership / Inspection Enquiry',
          '',
          `Organisation Name: ${payload.organisationName}`,
          `Contact Person: ${payload.contactPerson}`,
          `Official Email: ${payload.officialEmail}`,
          `Phone Number: ${payload.phoneNumber}`,
          `Organisation Type: ${payload.organisationType}`,
          `Required Service: ${payload.requiredService}`,
          `Expected Candidates: ${payload.expectedCandidates}`,
          `Preferred Exam / Inspection Date: ${payload.preferredDate}`,
          '',
          `Additional Requirements: ${payload.additionalRequirements}`,
        ].join('\n');

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

        if (successBanner) {
          successBanner.style.display = 'flex';
          successBanner.focus();
        }

        const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        if (!newWindow && !JOP_SITE_CONFIG.contact.partnershipEndpoint) {
          window.location.href = whatsappUrl;
        }
      } catch (err) {
        if (errorBanner) {
          if (errorBannerText) {
            errorBannerText.textContent =
              'We could not reach the automated server gateway. Please use the direct WhatsApp or telephone contact option (+234 803 726 2757) to complete your request immediately.';
          }
          errorBanner.style.display = 'flex';
          errorBanner.focus();
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
        }
        if (submitBtnLabel) {
          submitBtnLabel.textContent = 'Submit Partnership Enquiry';
        }
        if (submitSpinner) {
          submitSpinner.style.display = 'none';
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6C. QUICK WHATSAPP ENQUIRY MODAL ("ENQUIRE NOW" & STEP 01 CARD)
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
            <span class="enquiry-modal-badge">• DIRECT INSTITUTIONAL &amp; CANDIDATE ENQUIRY</span>
            <h2 id="enquiry-modal-title" class="enquiry-modal-title">Book an Inspection or Enquire</h2>
            <p id="enquiry-modal-subtitle" class="enquiry-modal-subtitle">
              Complete your details below to open a pre-filled enquiry with JOP CBT Centre in Abeokuta.
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
              <label for="modal-contact-name" class="form-label">Full Name / Contact Person <span class="required">*</span></label>
              <input type="text" id="modal-contact-name" name="name" class="form-input" placeholder="e.g. Adebayo Johnson" required autocomplete="name">
              <div id="modal-contact-name-error" class="form-feedback" aria-live="polite"></div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="modal-contact-email" class="form-label">Email Address <span class="required">*</span></label>
                <input type="email" id="modal-contact-email" name="email" class="form-input" placeholder="name@organisation.com" required autocomplete="email">
                <div id="modal-contact-email-error" class="form-feedback" aria-live="polite"></div>
              </div>

              <div class="form-group">
                <label for="modal-contact-phone" class="form-label">Phone Number</label>
                <input type="tel" id="modal-contact-phone" name="phone" class="form-input" placeholder="+234..." autocomplete="tel">
                <div id="modal-contact-phone-error" class="form-feedback" aria-live="polite"></div>
              </div>
            </div>

            <div class="form-group">
              <label for="modal-contact-subject" class="form-label">Enquiry Type <span class="required">*</span></label>
              <select id="modal-contact-subject" name="subject" class="form-select" required>
                <option value="">Select an Enquiry Type</option>
                <option value="facility-inspection">Book a Facility Inspection</option>
                <option value="test-centre-booking">Computer-Based Examination Hosting / Venue Booking</option>
                <option value="corporate-testing">Recruitment, Aptitude &amp; Certification Testing</option>
                <option value="partnership-proposal">Institutional Testing Partnership / Proposal</option>
                <option value="exam-registration">Exam Registration &amp; Result Checking Assistance</option>
              </select>
              <div id="modal-contact-subject-error" class="form-feedback" aria-live="polite"></div>
            </div>

            <div class="form-group">
              <label for="modal-contact-message" class="form-label">Message &amp; Requirements <span class="required">*</span></label>
              <textarea id="modal-contact-message" name="message" class="form-textarea" placeholder="Please share your organisation name, preferred inspection or examination date, estimated candidate count, or questions..." required style="min-height: 110px;"></textarea>
              <div id="modal-contact-message-error" class="form-feedback" aria-live="polite"></div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
              <button type="submit" class="btn btn-primary btn-lg" style="flex-grow: 1;">
                Continue via WhatsApp
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

  const openEnquiryModal = (triggerEl, defaultSubject = '') => {
    if (!modalBackdrop) return;
    lastFocusedTrigger = triggerEl || document.activeElement;

    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (defaultSubject) {
      const subjectSelect = modalBackdrop.querySelector('#modal-contact-subject');
      if (subjectSelect) {
        subjectSelect.value = defaultSubject;
      }
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

  // Bind modal triggers (.nav-cta .btn unless it has data-partnership-intent on index.html, and [data-open-enquiry-modal])
  const enquiryTriggers = document.querySelectorAll('[data-open-enquiry-modal], .nav-cta .btn');
  enquiryTriggers.forEach((trigger) => {
    // If the button is handled by in-page partnership form scroll on homepage, skip modal hijack
    if (
      trigger.hasAttribute('data-partnership-intent') &&
      document.getElementById('partnership-form')
    ) {
      return;
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const preset = trigger.getAttribute('data-modal-subject') || 'facility-inspection';
      openEnquiryModal(trigger, preset);
    });

    if (trigger.hasAttribute('data-open-enquiry-modal')) {
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const preset = trigger.getAttribute('data-modal-subject') || '';
          openEnquiryModal(trigger, preset);
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

    targetElement.classList.add('is-visible');
    targetElement.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      el.classList.add('is-visible');
    });

    targetElement.scrollIntoView({ behavior: smooth && !prefersReducedMotion ? 'smooth' : 'auto' });
    return true;
  };

  if (window.location.hash) {
    requestAnimationFrame(() => {
      scrollToHashSection(window.location.hash, false);
    });
  }

  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      if (this.hasAttribute('data-partnership-intent') && document.getElementById('partnership-form')) {
        return;
      }

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
