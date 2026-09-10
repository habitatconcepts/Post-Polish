const A = "https://customer-assets-jai6qajn.emergentagent.net/job_post-and-polish/artifacts";

// Real project photos. Swap URLs here; keys stay the same.
export const SHOTS = {
  rowThreePosts: `${A}/558xs9bi_IMG_8268.webp`,
  designerCaps: `${A}/4kjn73vo_IMG_8261.webp`,
  shouBridge: `${A}/kvmm9zbq_att.F0SAbgqOmAHhUKHQO_lkQgM9ULCWvhUAyn1JoEHldMA.webp`,
  carDisplay: `${A}/eqxpw3ap_IMG_8244.webp`,
  driveway: `${A}/f68jat7t_IMG_7992.webp`,
  charredFrame: `${A}/r7m28e7g_att.vz-lcwyac8IQ-NdyT0J21vd-d9l90uaRIgmUPcbd8zk%202.webp`,
  rawCuts: `${A}/qjiebp2m_att.V4OKmTIaRQiCiTVfaJ4DTCQ1x-wTyNlt7-ekFIlYJGI.webp`,
  tools: `${A}/9nfthltb_IMG_6237%202.webp`,
  boxesPrep: `${A}/z4oc1vkf_IMG_6539.webp`,
  stain: `${A}/6nvg79qo_IMG_7983.webp`,
};

export const PROOF = {
  before: { src: "rawCuts", label: "Raw stock", caption: "Rough timber, cut and bevelled on the sawhorses." },
  after: { src: "charredFrame", label: "Charred & assembled", caption: "Torched, brushed, braced and squared — ready to set." },
};

export const MANIFESTO = [
  {
    n: "01",
    title: "The curb is the handshake",
    copy:
      "Before anyone sees your door, they see the post at the street. We treat that six-foot stretch of your property like the front of a building, not an afterthought.",
  },
  {
    n: "02",
    title: "Built in a driveway, on purpose",
    copy:
      "Every post is cut, fitted, and finished on sawhorses before it ever meets your yard. Bench-built means square joints, tight brackets, and no improvising in the dirt.",
  },
  {
    n: "03",
    title: "220 grit is the standard",
    copy:
      "Hand-sanded to 220, edges eased by hand, wiped clean, then sealed. You notice it with your hand before you notice it with your eyes.",
  },
  {
    n: "04",
    title: "Integrity, not upsell",
    copy:
      "If a reset will do, we say so. If the post is rotten, we say that too. One flat number, quoted before the shovel, honoured after.",
  },
];

export const CRAFT_COPY = {
  overline: "Hand-crafted",
  title: "Driveway to curbside.",
  lead:
    "Post & Polish started the way most good trades do — sawhorses in an open driveway, a tray of tools laid out in order, and a refusal to hand over anything we wouldn't want at the end of our own walk.",
  body:
    "That hasn't changed. Every build is assembled and finished before it travels, so what arrives at your curb is complete: joints tight, hardware torqued, finish cured, edges eased. Integrity-driven builds means the parts you can't see are done to the same standard as the face of the post.",
  points: [
    "Bench-built on sawhorses, never improvised on site",
    "Every tool laid out before the first cut",
    "Hidden hardware finished like visible hardware",
    "We haul away everything we take out",
  ],
};

export const PROCESS_SHOTS = [
  {
    src: "rawCuts",
    label: "Stock & cuts",
    copy:
      "Timber picked by hand, cut square, and bevelled on the sawhorses before anything is fastened.",
  },
  {
    src: "driveway",
    label: "Bench assembly",
    copy:
      "Arms and braces clamped, squared, and fastened on stands — every joint checked before it travels.",
  },
  {
    src: "stain",
    label: "220-grit & seal",
    copy:
      "Sanded to 220, edges eased by hand, then stained and sealed with a semi-transparent finish.",
  },
];

export const GALLERY = [
  { src: "rowThreePosts", title: "Designer row, three finishes", meta: "Designer Series · black, barn red, white", span: "lg:col-span-7 lg:row-span-2" },
  { src: "carDisplay", title: "Mustang display build", meta: "Signature Series · themed commercial", span: "lg:col-span-5" },
  { src: "charredFrame", title: "Charred timber arbour frame", meta: "Signature Series · Shou Sugi Ban", span: "lg:col-span-5" },
  { src: "designerCaps", title: "Solar caps & carved finials", meta: "Finish detail · hardware", span: "lg:col-span-4" },
  { src: "boxesPrep", title: "Boxes prepped & flagged", meta: "Bench prep · every install", span: "lg:col-span-4" },
  { src: "driveway", title: "On the stands, mid-build", meta: "The driveway shop", span: "lg:col-span-4" },
];

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
    id: "essential",
    name: "The Essential",
    tagline: "Done properly, done quickly.",
    price: "$349",
    priceNote: "flat · all-inclusive · one visit",
    featured: false,
    features: [
      "Quality retail wood or vinyl post",
      "Professional, code-compliant install",
      "Old post removal & haul-away",
      "Set plumb and level to postal height",
      "Full site cleanup",
    ],
    cta: "Book The Essential",
    serviceValue: "The Essential — code-compliant install",
  },
  {
    id: "designer",
    name: "The Designer Series",
    tagline: "Where the craftsman finish shows.",
    price: "$699",
    priceNote: "flat · all-inclusive · one visit",
    featured: true,
    features: [
      "Hand-sanded to a 220-grit finish",
      "Rounded, eased edges throughout",
      "Premium paint or stain, fully sealed",
      "Integrated solar safety lighting",
      "Premium hardware & house numbers",
    ],
    cta: "Book The Designer Series",
    serviceValue: "The Designer Series — craftsman finish",
  },
  {
    id: "signature",
    name: "The Signature Series",
    tagline: "Architectural builds, one of a kind.",
    price: "Quote by project",
    priceNote: "firm price before work begins",
    featured: false,
    features: [
      "Fully architectural custom builds",
      "Charred Shou Sugi Ban finishes",
      "Commercial & business builds",
      "Auto shops, real estate offices, themed displays",
      "Design consultation included",
    ],
    cta: "Request a Custom Quote",
    serviceValue: "The Signature Series — custom / commercial build",
  },
];

export const MATERIAL_NOTE =
  "We install wood, vinyl, and decorative metal — matched to your home's siding, fencing, or HOA requirements so the post looks like it was always meant to be there.";

export const RITUAL = [
  {
    icon: "ShieldCheck",
    title: "Professional Prep",
    copy:
      "We handle the 811 utility checks and the removal of your old post before a single hole is dug.",
  },
  {
    icon: "Hand",
    title: "Craftsman Finish",
    copy:
      "Hand-sanded, leveled to perfection, and wiped to a shine — the details you only notice up close.",
  },
  {
    icon: "Stamp",
    title: "The P&P Stamp",
    copy:
      "We leave a professional yard stake and a worksite cleaner than we found it. Every time.",
  },
];

export const SERVICE_OPTIONS = [
  "The Essential — code-compliant install",
  "The Designer Series — craftsman finish",
  "The Signature Series — custom / commercial build",
  "Reset — straighten a leaning post",
  "Refresh — paint, numbers & hardware",
  "Recover — storm / vehicle damage (priority)",
];

export const STEPS = [
  {
    n: "01",
    title: "Pick your tier",
    copy:
      "The Essential, The Designer Series, or a Signature build. Clear flat rates — no phone tag.",
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
    a: "The Essential and The Designer Series are completed in a single visit, usually inside a couple of hours. Signature Series builds get their own timeline with the quote.",
  },
  {
    q: "Will my new mailbox meet HOA and postal requirements?",
    a: "Every install is set to postal height and placement guidelines. We also install wood, vinyl, and decorative metal matched to your siding, fencing, or specific HOA style requirements — just mention them when you book.",
  },
  {
    q: "Can you just fix my leaning post without replacing everything?",
    a: "Absolutely. That's our Reset service — we straighten and re-set the post and secure the box, keeping what still works.",
  },
  {
    q: "What if I'm not sure which tier I need?",
    a: "Describe your current mailbox in the notes field. We'll recommend The Essential, The Designer Series, or a Signature build and confirm the price before anything is scheduled.",
  },
  {
    q: "Do you build for businesses too?",
    a: "Yes — Signature Series covers commercial and business builds: auto shops, real estate offices, and themed displays. Request a custom quote and we'll design to your branding.",
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
