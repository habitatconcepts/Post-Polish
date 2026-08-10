export const IMAGES = {
  hero: "https://static.prod-images.emergentagent.com/jobs/a4777f44-32ce-49d6-a498-88a190fbf0e0/images/49989f1574be154ebdd34dbf529d4fbb074fe533cf41c0396de6b212289d3843.jpeg",
  before:
    "https://static.prod-images.emergentagent.com/jobs/a4777f44-32ce-49d6-a498-88a190fbf0e0/images/353cef35fa46f212f093c1a4f41046c5c60d315011fbebf9e3758353473eec60.jpeg",
  after:
    "https://static.prod-images.emergentagent.com/jobs/a4777f44-32ce-49d6-a498-88a190fbf0e0/images/8e536b55c6b43d9f91e22055723c0e399ca75476ff6f4f4831fb6b435db91c9b.jpeg",
  upgraded:
    "https://static.prod-images.emergentagent.com/jobs/a4777f44-32ce-49d6-a498-88a190fbf0e0/images/5f2e95fe8a81d04e1c5b00285ace26e4caccf08a025718ed3d624601285e2b33.jpeg",
};

export const SERVICES = [
  {
    key: "Replace",
    title: "Replace",
    icon: "Recycle",
    copy:
      "Full removal and replacement of broken, rusted, outdated, or damaged mailboxes. Old unit hauled away, new one set plumb.",
  },
  {
    key: "Reset",
    title: "Reset",
    icon: "MoveVertical",
    copy:
      "Straighten leaning posts, re-set loose bases, secure crooked installs. Keep what still works.",
  },
  {
    key: "Refresh",
    title: "Refresh",
    icon: "Sparkles",
    copy:
      "Repaint, new hardware, sharp new house numbers, and a full cosmetic clean-up.",
  },
  {
    key: "Recover",
    title: "Recover",
    icon: "Zap",
    copy:
      "Priority replacement after storm or vehicle damage. Mail delivery can't wait.",
  },
  {
    key: "Upgrade",
    title: "Upgrade",
    icon: "ArrowUpRight",
    copy:
      "Premium posts, architectural boxes, neighborhood-matching designs that lift the whole front view.",
  },
];

export const PACKAGES = [
  {
    id: "standard",
    name: "The Standard",
    tagline: "Fix the eyesore, cleanly and quickly.",
    price: "$299",
    priceNote: "flat · all-inclusive · one visit",
    featured: false,
    features: [
      "Durable post & classic box",
      "Removal & haul-away of old unit",
      "Clean, level, code-compliant set",
      "Basic house numbers",
      "Full site cleanup",
    ],
    cta: "Book Standard",
    serviceValue: "The Standard — replacement",
  },
  {
    id: "upgraded",
    name: "The Upgrade",
    tagline: "Noticeably elevate your curb appeal.",
    price: "$699",
    priceNote: "flat · all-inclusive · one visit",
    featured: true,
    features: [
      "Premium timber or architectural post",
      "Decorative or upgraded box",
      "Custom metal brackets & hardware",
      "Professional vinyl number decals",
      "Removal, haul-away & cleanup",
    ],
    cta: "Book The Upgrade",
    serviceValue: "The Upgrade — premium curb appeal",
  },
  {
    id: "landscape",
    name: "The Landscape",
    tagline: "The whole curbside, designed as one.",
    price: "From $1,499",
    priceNote: "call for a firm quote",
    featured: false,
    features: [
      "Premium post & architectural box",
      "Designed planting bed & edging",
      "Stone or masonry-adjacent base",
      "Low-voltage or solar lighting",
      "Mulch, cleanup & finish detailing",
    ],
    cta: "Call for a Quote",
    serviceValue: "The Landscape — full curbside design",
  },
];

export const SERVICE_OPTIONS = [
  "The Standard — replacement",
  "The Upgrade — premium curb appeal",
  "The Landscape — full curbside design",
  "Reset — straighten a leaning post",
  "Refresh — paint, numbers & hardware",
  "Recover — storm / vehicle damage (priority)",
];

export const STEPS = [
  {
    n: "01",
    title: "Pick your package",
    copy:
      "The Standard, The Upgrade, or The Landscape. Clear flat rates — no phone tag.",
  },
  {
    n: "02",
    title: "Choose a slot",
    copy:
      "Tell us the days that work. We confirm details and the exact all-inclusive price.",
  },
  {
    n: "03",
    title: "We do the work",
    copy:
      "Old unit out, new install set clean and level, site swept before we leave.",
  },
  {
    n: "04",
    title: "Enjoy the curb",
    copy:
      "Walk out to a mailbox you're proud of. Snap the after photo — everyone does.",
  },
];

export const FAQS = [
  {
    q: "Is the price really all-inclusive?",
    a: "Yes. Your flat rate covers hardware, labor, removal and haul-away of the old unit, and full site cleanup. The number we quote is the number you pay.",
  },
  {
    q: "How long does an installation take?",
    a: "The Standard and The Upgrade are completed in a single visit, usually inside a couple of hours. The Landscape gets its own timeline with the quote.",
  },
  {
    q: "Will my new mailbox meet HOA and postal requirements?",
    a: "Every install is set to postal height and placement guidelines, and we're happy to match specific HOA style requirements — just mention them when you book.",
  },
  {
    q: "Can you just fix my leaning post without replacing everything?",
    a: "Absolutely. That's our Reset service — we straighten and re-set the post and secure the box, keeping what still works.",
  },
  {
    q: "What if I'm not sure which tier I need?",
    a: "Describe your current mailbox in the notes field. We'll recommend The Standard, The Upgrade, or The Landscape and confirm the price before anything is scheduled.",
  },
  {
    q: "Do you only do mailboxes?",
    a: "That's the point. No gutters, no fences, no odd jobs. One specialty means yours gets done right the first time.",
  },
];

export const TRUST_ITEMS = [
  "Fully insured",
  "Flat-rate pricing",
  "One-visit installs",
  "Old unit hauled away",
  "HOA-friendly",
  "Locally owned",
  "Postal-compliant heights",
  "Site swept clean",
];
