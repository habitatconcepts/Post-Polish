import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SHOTS } from "@/data/content";

export const SignatureShowcase = ({ onSelect }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["8%", "-6%"]);

  return (
    <section
      id="signature"
      ref={ref}
      data-testid="signature-showcase"
      className="grain relative overflow-hidden bg-[#070E1A] px-6 py-24 lg:px-12 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brass/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="max-w-3xl">
          <p className="overline">Signature Series</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.02] text-bone sm:text-5xl lg:text-6xl">
            When the build
            <br />
            <span className="italic text-brass">becomes the landmark.</span>
          </h2>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-bone/60 md:text-base">
            Charred Shou Sugi Ban timber, heritage structures, and themed
            commercial displays for auto shops, real estate offices, and
            businesses that want the curb to do the talking.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <motion.figure
            style={{ y: yA }}
            className="group relative overflow-hidden border border-bone/12 lg:col-span-5"
          >
            <img
              src={SHOTS.shouBridge}
              alt="Charred Shou Sugi Ban timber components stacked in the driveway shop"
              className="aspect-[3/4] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent opacity-80" />
            <figcaption className="absolute inset-x-0 bottom-0 p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brass">
                Shou Sugi Ban
              </p>
              <h3 className="mt-3 font-serif text-2xl text-bone lg:text-3xl">
                Charred by hand
              </h3>
              <p className="mt-2 text-sm text-bone/60">
                Timber torched, brushed, and sealed — weatherproof by fire.
              </p>
            </figcaption>
          </motion.figure>

          <motion.figure
            style={{ y: yB }}
            className="group relative overflow-hidden border border-bone/12 lg:col-span-7"
          >
            <img
              src={SHOTS.carDisplay}
              alt="Bespoke Mustang display assembly mounted on a charred timber post"
              className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] lg:aspect-[16/13]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent opacity-80" />
            <figcaption className="absolute inset-x-0 bottom-0 p-7 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brass">
                Commercial &amp; themed
              </p>
              <h3 className="mt-3 font-serif text-2xl text-bone lg:text-4xl">
                The Mustang display
              </h3>
              <p className="mt-2 max-w-md text-sm text-bone/60">
                Fabricated brackets, steel silhouette, plate detail — a
                storefront statement that happens to hold the mail.
              </p>
            </figcaption>
          </motion.figure>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-brass/40 p-8 lg:flex-row lg:items-center lg:p-10">
          <p className="max-w-2xl font-serif text-xl italic leading-snug text-bone/80 lg:text-2xl">
            Bring us the idea. We'll draw it, price it firm, and build it once.
          </p>
          <button
            type="button"
            data-testid="signature-showcase-cta"
            onClick={() => onSelect("The Signature Series — custom / commercial build")}
            className="group inline-flex shrink-0 items-center gap-3 bg-brass px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate950 transition-transform duration-300 hover:-translate-y-0.5"
          >
            Request a Custom Quote
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
