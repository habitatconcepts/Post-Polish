import { useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { IMAGES } from "@/data/content";

export const BeforeAfter = () => {
  const [pos, setPos] = useState(48);

  return (
    <section
      id="proof"
      data-testid="proof-section"
      className="grain relative overflow-hidden bg-slate950 px-6 py-24 lg:px-12 lg:py-36"
    >
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="overline">The proof</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-bone sm:text-5xl">
              Before &amp; after
              <br />
              <span className="italic text-brass">says it all.</span>
            </h2>
            <p className="mt-7 text-sm leading-relaxed text-bone/60 md:text-base">
              The contrast between a leaning, rusted eyesore and a crisp, plumb,
              polished install is instant. Drag the handle — then imagine your
              own curb.
            </p>
            <dl className="mt-12 space-y-8">
              <div>
                <dt className="font-serif text-4xl text-brass">1 visit</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-bone/45">
                  Typical turnaround
                </dd>
              </div>
              <div>
                <dt className="font-serif text-4xl text-brass">0 weekends</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-bone/45">
                  Lost to a DIY project
                </dd>
              </div>
            </dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <div
              data-testid="before-after-slider"
              className="relative aspect-[4/3] w-full select-none overflow-hidden border border-bone/15"
            >
              <img
                src={IMAGES.before}
                alt="Before: leaning rusted mailbox on a rotting post"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              >
                <img
                  src={IMAGES.after}
                  alt="After: plumb cedar post with clean black mailbox"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div
                className="pointer-events-none absolute inset-y-0 w-px bg-brass"
                style={{ left: `${pos}%` }}
              >
                <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brass text-slate950">
                  <MoveHorizontal size={17} />
                </span>
              </div>

              <span className="absolute left-4 top-4 bg-slate950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-bone/80 backdrop-blur">
                Before
              </span>
              <span className="absolute right-4 top-4 bg-brass px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate950">
                After
              </span>

              <input
                type="range"
                min="0"
                max="100"
                value={pos}
                data-testid="before-after-range"
                aria-label="Reveal after photo"
                onChange={(e) => setPos(Number(e.target.value))}
                className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
