export const LogoMark = ({ className = "h-12", testId = "brand-logo" }) => (
  <svg
    viewBox="0 0 760 330"
    role="img"
    aria-label="NE Post & Polish — mailbox and post specialists"
    data-testid={testId}
    className={`${className} w-auto select-none`}
  >
    <defs>
      <radialGradient id="ppPatina" cx="50%" cy="48%" r="76%">
        <stop offset="52%" stopColor="#F6F1E4" />
        <stop offset="82%" stopColor="#EFE4CE" />
        <stop offset="100%" stopColor="#D8A97A" />
      </radialGradient>
      <linearGradient id="ppPost" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#33200F" />
        <stop offset="18%" stopColor="#5C3720" />
        <stop offset="46%" stopColor="#70432454" />
        <stop offset="46.01%" stopColor="#6E4224" />
        <stop offset="78%" stopColor="#4A2A16" />
        <stop offset="100%" stopColor="#2C1B0C" />
      </linearGradient>
      <linearGradient id="ppCap" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7C4220" />
        <stop offset="42%" stopColor="#AE5F2C" />
        <stop offset="100%" stopColor="#6A3717" />
      </linearGradient>
      <linearGradient id="ppCapTop" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#95501F" />
        <stop offset="55%" stopColor="#C06F33" />
        <stop offset="100%" stopColor="#7E4319" />
      </linearGradient>
      <clipPath id="ppPostClip">
        <rect x="84" y="92" width="62" height="190" />
      </clipPath>
    </defs>

    <rect width="760" height="330" fill="url(#ppPatina)" />

    <rect
      x="26"
      y="24"
      width="708"
      height="282"
      fill="none"
      stroke="#14284A"
      strokeWidth="4"
    />
    <rect
      x="38"
      y="36"
      width="684"
      height="258"
      fill="none"
      stroke="#14284A"
      strokeWidth="1.3"
    />
    <g stroke="#14284A" strokeWidth="1.3" fill="none">
      <path d="M38 62 L64 36" />
      <path d="M722 62 L696 36" />
      <path d="M38 268 L64 294" />
      <path d="M722 268 L696 294" />
    </g>

    <g>
      <rect x="84" y="92" width="62" height="190" fill="url(#ppPost)" />
      <g clipPath="url(#ppPostClip)">
        <g stroke="#291704" fill="none" opacity="0.55">
          <path d="M93 92 C88 146, 97 206, 91 282" strokeWidth="2.6" />
          <path d="M104 92 C109 138, 100 214, 107 282" strokeWidth="1.6" />
          <path d="M115 92 C110 152, 120 200, 113 282" strokeWidth="3" />
          <path d="M126 92 C131 140, 122 218, 129 282" strokeWidth="1.6" />
          <path d="M137 92 C133 148, 141 208, 136 282" strokeWidth="2.2" />
        </g>
        <ellipse
          cx="112"
          cy="198"
          rx="6.5"
          ry="11"
          fill="none"
          stroke="#291704"
          strokeWidth="2.4"
          opacity="0.6"
        />
        <path
          d="M84 92 L146 92 L146 104 L84 104 Z"
          fill="#291704"
          opacity="0.18"
        />
      </g>
      <rect
        x="84"
        y="92"
        width="62"
        height="190"
        fill="none"
        stroke="#291704"
        strokeWidth="2.4"
      />

      <path d="M74 92 L156 92 L148 74 L82 74 Z" fill="url(#ppCap)" />
      <rect x="80" y="64" width="70" height="10" fill="url(#ppCapTop)" />
      <path d="M88 64 L142 64 L132 50 L98 50 Z" fill="url(#ppCapTop)" />
      <path
        d="M74 92 L156 92 L148 74 L82 74 Z M80 64 h70 v10 h-70 Z M88 64 L142 64 L132 50 L98 50 Z"
        fill="none"
        stroke="#3B2110"
        strokeWidth="2.2"
      />
    </g>

    <g fill="#16305C">
      <path d="M203 252 C238 240, 292 231, 352 227 C444 220, 566 218, 664 224 C686 226, 698 232, 690 239 C650 246, 512 252, 396 256 C322 259, 252 259, 216 255 C202 253, 198 254, 203 252 Z" />
      <path d="M197 253 C188 255, 180 258, 173 262 C182 262, 192 259, 200 256 Z" />
      <path d="M694 228 C704 229, 712 232, 718 236 C709 238, 700 238, 693 237 Z" />
      <path d="M714 233 L728 235 L713 238 Z" />
    </g>
    <g fill="#0E2144" opacity="0.35">
      <path d="M300 232 C400 226, 520 224, 620 227 C520 231, 400 234, 300 238 Z" />
      <path d="M240 248 C300 251, 360 252, 420 251 C360 255, 300 255, 240 252 Z" />
    </g>
    <g fill="url(#ppPatina)" opacity="0.85">
      <path d="M282 240 C320 237, 360 235, 392 234.4 C360 238, 320 240.6, 282 242.4 Z" />
      <path d="M492 244.6 C536 243.6, 580 241, 616 237.6 C580 243, 536 246.6, 492 247.4 Z" />
    </g>

    <g
      fontFamily="'Cormorant Garamond', Georgia, 'Times New Roman', serif"
      fontSize="98"
      fontWeight="600"
      letterSpacing="1"
      textAnchor="middle"
    >
      <text
        x="452"
        y="196"
        fill="#3F0C10"
        opacity="0.5"
        textLength="466"
        lengthAdjust="spacingAndGlyphs"
      >
        NE POST &amp; POLISH
      </text>
      <text
        x="448"
        y="190"
        fill="#C4837C"
        opacity="0.5"
        textLength="466"
        lengthAdjust="spacingAndGlyphs"
      >
        NE POST &amp; POLISH
      </text>
      <text
        x="450"
        y="193"
        fill="#7B1C22"
        textLength="466"
        lengthAdjust="spacingAndGlyphs"
      >
        NE POST &amp; POLISH
      </text>
    </g>
  </svg>
);
