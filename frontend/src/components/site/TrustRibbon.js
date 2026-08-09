import Marquee from "react-fast-marquee";
import { TRUST_ITEMS } from "@/data/content";

export const TrustRibbon = () => (
  <div
    data-testid="trust-ribbon"
    className="border-y border-stone bg-stone/60 py-5"
  >
    <Marquee speed={28} gradient={false} pauseOnHover>
      {TRUST_ITEMS.map((t) => (
        <span
          key={t}
          className="mx-16 font-serif text-lg italic text-slate950/70"
        >
          {t}
          <span className="ml-16 text-brass">✦</span>
        </span>
      ))}
    </Marquee>
  </div>
);
