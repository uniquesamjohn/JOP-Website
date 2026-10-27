# JOP CBT Center — Professional Corporate Website

A modern, accessible, multi-page corporate website for **JOP CBT Center**, a computer-based testing and digital services provider.

Developed using semantic **HTML5**, modern **CSS3** (utilizing a custom gradient-based design system and responsive grid architecture), and **Vanilla JavaScript (ES6+)**.

---

## 1. Project Overview

**JOP CBT Center** provides professional computer-based testing infrastructure, examination administration support, and digital services. This website serves as the official corporate online presence for the centre, showcasing its facilities, capacity, operational governance, and service categories.

### Key Highlights
- **100% Vanilla Codebase:** Zero external frameworks, dependencies, or package managers (No React, Next.js, Bootstrap, Tailwind, or jQuery).
- **Premium Gradient Visual Identity:** Built with custom CSS design tokens featuring sophisticated dark navy, royal blue, and cyan gradients.
- **Strict Factual Accuracy:** Adheres strictly to client requirements. Board of Directors and unavailable factual details (addresses, phone numbers, verified accreditations) are respectfully and clearly designated with elegant **In Progress** placeholders.
- **Genuine Facility Assets:** Includes verified facility photographs depicting the entrance gate, solar power arrays, and the 250-capacity CBT testing hall.
- **Fully Responsive & Accessible:** Optimized for seamless performance across smartphones, tablets, laptops, and 4K displays with ARIA attributes and reduced-motion considerations.

---

## 2. File & Directory Structure

```text
JOP Website/
│
├── index.html              # Homepage (Hero, Welcome, Services, CBT Benefits, Infrastructure, CTA, Footer)
├── services.html           # Services Page (Detailed breakdown of all 6 core service categories)
├── about.html              # About Us (Who We Are, Mission & Vision, Core Values, Board of Directors, Management, Gallery)
├── resources.html          # Resources & Infrastructure (250-seater, 24/7 Power, Accreditation, CCTV, Biometrics, Internet)
├── contact.html            # Contact Us (Enquiries, Information Cards, Validated Form, Location Placeholder)
│
├── css/
│   ├── style.css           # Global design tokens, gradients, typography, components, animations
│   └── responsive.css      # Breakpoint-specific layout adjustments for desktop, tablet, and mobile
│
├── js/
│   └── script.js           # Mobile drawer navigation, active link detection, scroll observer, form validation
│
├── assets/
│   ├── images/             # Verified facility photographs (CBT hall, solar installations, gate, compound)
│   ├── icons/              # Scalable iconography
│   └── logo/               # Vector logo SVG and official banner
│
└── README.md               # Project documentation and deployment instructions
```

---

## 3. How to Run Locally

Because this is a pure static web application, no compilation or build steps are required.

### Method 1: VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension by *Ritwick Dey* (if not already installed).
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The site will launch automatically in your default web browser (typically at `http://127.0.0.1:5500/index.html`).

### Method 2: Direct File Opening
- Simply double-click `index.html` (or any other HTML file) in your file explorer to open it directly in any modern browser (Google Chrome, Microsoft Edge, Safari, Firefox).

---

## 4. Brand Color & Gradient System

The visual identity uses CSS custom properties configured in `css/style.css`:

```css
/* Primary Brand Gradient (Midnight Espresso to Roasted Walnut to Glowing Copper) */
--grad-primary: linear-gradient(135deg, #180D07 0%, #442415 52%, #C2642E 100%);

/* Secondary Gradient (Deep Mocha to Warm Chestnut to Luminous Caramel) */
--grad-secondary: linear-gradient(120deg, #24140B 0%, #6E3B20 58%, #D97706 100%);

/* Accent Gradient (Golden Honey to Rich Terracotta) */
--grad-accent: linear-gradient(135deg, #E0853D 0%, #944C21 100%);

/* Light Section Gradient (Soft Alabaster Linen to Warm Oat / Milk Latte) */
--grad-light-section: linear-gradient(135deg, #FDFBF7 0%, #F5EFE6 100%);

/* Dark Premium Gradient (Midnight Espresso to Roasted Mocha to Deep Walnut) */
--grad-dark-premium: linear-gradient(145deg, #120905 0%, #22120A 55%, #3D2012 100%);
```

---

## 5. Client Information & Customisation Guide

When verified details are ready to be integrated, follow these straightforward steps:

### 1. Replacing the Text Logo with the Official Logo
In each HTML file (`index.html`, `services.html`, etc.), the `.brand-logo` link in `<header>` and `<footer>` is structured for seamless swapping:
```html
<!-- Replace the .brand-logo-mark and .brand-logo-content with: -->
<a href="index.html" class="brand-logo" aria-label="JOP CBT Center Homepage">
  <img src="assets/logo/official-logo.png" alt="JOP CBT Center Logo" height="48">
</a>
```

### 2. Updating the Board of Directors
In `about.html`, locate the section `<section class="section section-white" aria-labelledby="board-heading">` and replace the `.in-progress-placeholder` container with director profiles:
```html
<div class="cards-grid-3">
  <!-- Director Card -->
  <div class="card">
    <img src="assets/images/director-name.jpg" alt="Director Name" class="director-photo">
    <h3 class="card-title">Director Name</h3>
    <span class="designation">Designation / Role</span>
    <p class="card-description">Executive biography...</p>
  </div>
</div>
```

### 3. Updating Verified Contact Details
In `contact.html` and the footer of all pages, replace the `<span class="badge-in-progress">In Progress</span>` badges inside `.contact-info-value` with actual verified strings:
- **Office Address:** Enter physical compound street address.
- **Phone Number:** Enter official phone numbers (e.g. `<a href="tel:+234...">+234...</a>`).
- **Email Address:** Enter corporate email (e.g. `<a href="mailto:info@jopcbt.com">info@jopcbt.com</a>`).
- **WhatsApp:** Enter official WhatsApp click-to-chat link.
- **Google Maps:** In `contact.html`, replace the map placeholder with a responsive Google Maps `<iframe>`.

### 4. Connecting the Contact Form to a Backend
In `js/script.js`, replace the client-side evaluation interceptor inside `contactForm.addEventListener('submit', ...)` with an AJAX/Fetch request or form endpoint (e.g., Formspree, EmailJS, or client-approved server API).

---

## 6. Static Deployment Guide

The website is production-ready for deployment on any static web host:

- **Netlify:** Drag and drop the project folder into Netlify Drop, or connect via Git repository.
- **Vercel:** Import repository and deploy without custom build commands (Framework Preset: "Other").
- **GitHub Pages:** Push the repository to GitHub, go to **Settings > Pages**, and set the source branch to `main` (root directory).
- **Cloudflare Pages / AWS S3 / cPanel:** Upload the files directly to the root public folder (`public_html` or bucket root).

---

## 7. Compliance & Standards
- **HTML5:** 100% valid semantic markup with ARIA landmarks.
- **Accessibility:** WCAG AA compliant text contrast over gradient and white surfaces.
- **Performance:** Lightweight, fast-loading, zero render-blocking framework scripts.
