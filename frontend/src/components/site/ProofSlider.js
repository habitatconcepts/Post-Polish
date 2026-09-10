import { useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { PROOF, SHOTS } from "@/data/content";

export const ProofSlider = () => {
  const [pos, setPos] = useState(52);

  return (
    <section
      id="proof"
      data-testid="proof-section"
      className="bg-bone py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="max-w-2xl">
          <p className="overline text-brass">Raw to finished</p>
          <h2 className="mt-6 font-serif text-4xl leading-[1.02] text-slate950 sm:text-5xl lg:text-6xl">
            The same timber,
            <span className="italic text-brass"> forty hours apart.</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-slate950/65 md:text-base">
            Drag to see what the bench does to a stack of rough stock — cut,
            bevelled, torched, brushed, braced, and squared before it ever
            reaches a curb.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 select-none overflow-hidden border border-slate950/15"
        >
          <img
            src={SHOTS[PROOF.before.src]}
            alt={PROOF.before.caption}
            className="block aspect-[4/3] w-full object-cover lg:aspect-[16/9]"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          >
            <img
              src={SHOTS[PROOF.after.src]}
              alt={PROOF.after.caption}
              className="block aspect-[4/3] w-full object-cover lg:aspect-[16/9]"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-brass"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brass text-slate950">
              <MoveHorizontal size={18} />
            </span>
          </div>

          <span
            data-testid="proof-label-before"
            className="absolute bottom-5 left-5 bg-slate950/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-bone"
          >
            {PROOF.before.label}
          </span>
          <span
            data-testid="proof-label-after"
            className="absolute bottom-5 right-5 bg-brass px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate950"
          >
            {PROOF.after.label}
          </span>

          <input
            type="range"
            min="0"
            max="100"
            value={pos}
            data-testid="before-after-range"
            aria-label="Reveal the finished build"
            onChange={(e) => setPos(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </motion.div>

        <div className="mt-8 grid gap-6 text-xs uppercase tracking-[0.18em] text-slate950/45 sm:grid-cols-2">
          <p>{PROOF.before.caption}</p>
          <p className="sm:text-right">{PROOF.after.caption}</p>
        </div>
      </div>
    </section>
  );
};
