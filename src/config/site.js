/**
 * site.js — every piece of copy on the site lives here.
 * Swap names, taglines, prices and bio text in this one file;
 * no component contains hardcoded content.
 */

export const site = {
  // ── Identity ──────────────────────────────────────────────
  studioName: "IBRAHIMTARIQPHOTOGRAPHY",
  studioSuffix: "",
  tagline: "Weddings, photographed the way they felt.",
  city: "Islamabad · available across Pakistan",

  // ── Hero ──────────────────────────────────────────────────
  hero: {
    lead: "Quiet, honest wedding photography for people who would rather live their day than pose through it.",
    ctaPrimary: { label: "View the portfolio", to: "/portfolio" },
    ctaSecondary: { label: "Check my date", to: "/contact" },
  },

  // ── About ─────────────────────────────────────────────────
  about: {
    heading: "The person behind the camera",
    // Placeholder bio — replace with his real story.
    body: [
      "I've spent the last seven years photographing weddings across Pakistan — from three-day shaadis in Lahore to twelve-guest nikkahs on a rooftop in Islamabad. My work leans documentary: I look for the in-between moments, the glance before the entrance, the grandmother who cried first.",
      "I shoot with available light wherever possible and edit for warmth and truth, not trends. You'll barely notice me on the day; you'll notice the photographs for the rest of your life.",
    ],
  },

  // ── Packages (placeholder names / prices / inclusions) ───
  packages: [
    {
      name: "Essential",
      price: "PKR 165,000",
      note: "For intimate events and single-day coverage.",
      includes: [
        "Up to 6 hours of coverage",
        "One photographer",
        "350+ edited photographs",
        "Private online gallery",
        "Delivery within 4 weeks",
      ],
      featured: false,
    },
    {
      name: "Signature",
      price: "PKR 285,000",
      note: "The full wedding day, start to finish.",
      includes: [
        "Up to 12 hours of coverage",
        "Two photographers",
        "700+ edited photographs",
        "Private online gallery",
        "Sneak peek within 72 hours",
        "Delivery within 4 weeks",
      ],
      featured: true, // visually emphasised card
    },
    {
      name: "Luxury",
      price: "PKR 465,000",
      note: "Multi-day events — mehndi, baraat and walima.",
      includes: [
        "Up to 3 events / days",
        "Two photographers",
        "1,500+ edited photographs",
        "Fine-art album (30 pages)",
        "Sneak peek within 72 hours",
        "Priority delivery within 3 weeks",
      ],
      featured: false,
    },
  ],
  packagesFootnote:
    "Every wedding is different — if none of these fit exactly, write to me and we'll shape something that does.",

  // ── Contact ───────────────────────────────────────────────
  contact: {
    heading: "Tell me about your day",
    sub: "Share your date and a little about what you're planning. I reply to every inquiry personally, usually within a day.",
    successTitle: "Message sent",
    successBody: "Thank you — I'll be in touch soon. If it's urgent, my Instagram DMs are always open.",
    email: "hello@ibrahimtariqphotography.com",
    instagram: "@ibrahimtariqphotography",
  },
};
