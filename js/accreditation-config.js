/**
 * ============================================================================
 * JOP CBT CENTRE — ACCREDITATION CONFIGURATION
 * Structured data & feature toggle for JAMB, WAEC & NECO Accreditation
 * ============================================================================
 */

window.JOP_ACCREDITATION_CONFIG = {
  // Master toggle: set to false to hide the accreditation section & hero highlight
  enabled: true,

  // Optional Hero Trust Highlight (only displayed when enabled === true AND all bodies have verified === true)
  showHeroHighlight: true,
  heroHighlightText: 'JAMB \u2022 WAEC \u2022 NECO Accredited Centre',

  // Section header content
  sectionTag: 'Institutional Recognition',
  sectionHeading: 'Accredited by Leading Examination Bodies',
  sectionDescription:
    'JOP CBT Centre is accredited by JAMB, WAEC and NECO, demonstrating our commitment to providing reliable, secure and professionally managed computer-based examination facilities.',

  // Structured accreditation cards
  bodies: [
    {
      id: 'jamb',
      acronym: 'JAMB',
      fullName: 'Joint Admissions and Matriculation Board',
      designation: 'Accredited CBT Centre',
      logoSrc: 'assets/logo/jamb-logo.png',
      logoAlt: 'Official logo of the Joint Admissions and Matriculation Board (JAMB)',
      verified: true
    },
    {
      id: 'waec',
      acronym: 'WAEC',
      fullName: 'West African Examinations Council',
      designation: 'Accredited Examination Centre',
      logoSrc: 'assets/logo/waec-logo.png',
      logoAlt: 'Official logo of the West African Examinations Council (WAEC)',
      verified: true
    },
    {
      id: 'neco',
      acronym: 'NECO',
      fullName: 'National Examinations Council',
      designation: 'Accredited Examination Centre',
      logoSrc: 'assets/logo/neco-logo.png',
      logoAlt: 'Official logo of the National Examinations Council (NECO)',
      verified: true
    }
  ]
};

