import Marquee from "react-fast-marquee";
import { TRUST_ITEMS } from "@/data/content";

export const TrustRibbon = () => (
  <div
    data-testid="trust-ribbon"
    className="overflow-hidden border-b border-stone bg-bone py-7"
  >
    <Marquee speed={16} gradient={false} pauseOnHover>
      {TRUST_ITEMS.map((t) => (
        <span
          key={t}
          className="mx-14 font-serif text-2xl italic text-slate950/60 lg:text-3xl"
        >
          {t}
          <span className="ml-14 align-middle text-sm not-italic text-brass">
            ✦
          </span>
        </span>
      ))}
    </Marquee>
  </div>
);
