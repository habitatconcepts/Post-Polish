import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { CRAFT_COPY, SHOTS } from "@/data/content";

export const HandCrafted = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "10%"]);

  return (
    <section
      id="craft"
      ref={ref}
      data-testid="handcrafted-section"
      className="border-y border-stone bg-stone/40 px-6 py-24 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="overline">{CRAFT_COPY.overline}</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.02] text-slate950 sm:text-5xl lg:text-6xl">
              {CRAFT_COPY.title}
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-slate950/72 lg:text-lg">
              {CRAFT_COPY.lead}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate950/62 md:text-base">
              {CRAFT_COPY.body}
            </p>

            <ul className="mt-10 space-y-4">
              {CRAFT_COPY.points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <Check size={15} className="mt-1 shrink-0 text-brass" />
                  <span className="text-sm leading-snug text-slate950/70">
                    {p}
                  </span>
                </motion.li>
              ))}
            </ul>

            <figure className="mt-14 overflow-hidden border border-slate950/12">
              <img
                src={SHOTS.tools}
                alt="Overhead tray of a craftsman's tools: level, square, chisel, sanding block, 220-grit paper and black hardware"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="bg-bone px-6 py-4 text-[11px] uppercase tracking-[0.18em] text-slate950/45">
                Tools of the trade — laid out before the first cut
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden border border-slate950/12">
              <motion.img
                style={{ y }}
                src={SHOTS.driveway}
                alt="Driveway workshop: a cedar post on sawhorses mid-build with clamps, drill and offcuts"
                className="h-[520px] w-full object-cover will-change-transform lg:h-[760px]"
              />
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-slate950/55">
              The driveway shop where every Post &amp; Polish build starts —
              cut, fitted, and finished on sawhorses before it ever sees your
              curb.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
