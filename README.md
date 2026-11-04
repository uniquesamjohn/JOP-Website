# JOP CBT Center — Professional Corporate Website

A modern, accessible, multi-page corporate website for **JOP CBT Center**, a computer-based testing and digital services provider.

Developed using semantic **HTML5**, modern **CSS3** (utilizing a custom gradient-based design system and responsive grid architecture), and **Vanilla JavaScript (ES6+)**.

---

## 1. Project Overview

**JOP CBT Center** provides professional computer-based testing infrastructure, examination administration support, and digital services. This website serves as the official corporate online presence for the centre, showcasing its facilities, capacity, operational governance, and service categories.

### Key Highlights
- **100% Vanilla Codebase:** Zero external frameworks, dependencies, or package managers (No React, Next.js, Bootstrap, Tailwind, or jQuery).
- **Premium Navy Blue & Yellow Visual Identity:** Built with custom CSS design tokens featuring Primary Navy Blue (`#0B1F3A`), Secondary Navy Blue (`#163A63`), and Primary Yellow (`#FFD700` / `#E6C200`).
- **Strict Factual Accuracy:** Adheres strictly to client requirements. Board of Directors and unavailable factual details (verified accreditations, personnel profiles) are respectfully and clearly designated with elegant **In Progress** placeholders.
- **Genuine Facility Assets:** Includes verified facility photographs depicting the entrance gate, solar power arrays, and the CBT testing hall (equipped with 250 primary examination workstations and approximately 50 additional backup computers to support operational continuity).
- **Fully Responsive & Accessible:** Optimized for seamless performance across smartphones, tablets, laptops, and 4K displays with ARIA attributes and reduced-motion considerations.

---

## 2. File & Directory Structure

```text
JOP Website/
│
├── index.html              # Homepage (Hero, Welcome, Services, CBT Benefits, Infrastructure, CTA, Footer)
├── services.html           # Services Page (Detailed breakdown of all 6 core service categories)
├── about.html              # About Us (Who We Are, Mission & Vision, Core Values, Board of Directors, Management, Gallery)
├── resources.html          # Resources & Infrastructure (250 Primary Workstations + ~50 Backup, 24/7 Power, Accreditation, CCTV, Biometrics, Internet)
├── contact.html            # Contact Us (Enquiries, Information Cards, Validated WhatsApp Form, Location Map)
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
/* Core Brand Palette (Navy Blue & Yellow) */
--color-navy-primary: #0B1F3A;
--color-navy-secondary: #163A63;
--color-yellow-primary: #FFD700;
--color-yellow-hover: #E6C200;
--color-white: #FFFFFF;
--color-bg-light: #F5F7FA;
--color-text-dark: #1F2937;

/* Primary Brand Gradient (Deep Navy to Primary Navy Blue to Secondary Navy Blue) */
--grad-primary: linear-gradient(135deg, #071527 0%, #0B1F3A 55%, #163A63 100%);

/* Secondary Gradient (Primary Navy Blue to Secondary Navy Blue to Royal Navy) */
--grad-secondary: linear-gradient(120deg, #0B1F3A 0%, #163A63 60%, #1E4D82 100%);

/* Accent Gradient (Primary Yellow to Yellow Hover) */
--grad-accent: linear-gradient(135deg, #FFD700 0%, #E6C200 100%);

/* Light Section Gradient (Crisp White to Light Background) */
--grad-light-section: linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%);

/* Dark Premium Gradient (Deepest Navy to Primary Navy to Secondary Navy) */
--grad-dark-premium: linear-gradient(145deg, #061222 0%, #0B1F3A 55%, #163A63 100%);
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

### 4. Contact Form & WhatsApp Enquiry Redirection
In `js/script.js`, the `#contact-form` submission handler validates all required fields and redirects enquiries to JOP's official WhatsApp number (`https://wa.me/2348037262757?text=...`) with pre-populated, URL-encoded enquiry details. When an email backend is later activated, the submit handler can be extended with a `fetch()` call to the mail gateway.

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
