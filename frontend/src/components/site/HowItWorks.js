import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { STEPS, PROCESS_SHOTS, SHOTS } from "@/data/content";

export const HowItWorks = ({ onSelect }) => (
  <section
    id="process"
    data-testid="process-section"
    className="bg-bone px-6 py-24 lg:px-12 lg:py-40"
  >
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="overline">Our process</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.02] text-slate950 sm:text-5xl lg:text-6xl">
            Booked in minutes.
            <br />
            <span className="italic text-slate950/45">Finished to 220 grit.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-slate950/55">
          The part you see takes one visit. The part you don't takes a bench, a
          full tray of tools, and a lot of sanding.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PROCESS_SHOTS.map((p, i) => (
          <motion.figure
            key={p.label}
            data-testid={`process-shot-${i}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            className="group border border-stone bg-white"
          >
            <div className="overflow-hidden">
              <img
                src={SHOTS[p.src]}
                alt={p.label}
                className="aspect-[4/3] w-full object-cover object-[50%_35%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
            </div>
            <figcaption className="p-7 lg:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brass">
                Step {i + 1}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-slate950">
                {p.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate950/60">
                {p.copy}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-px border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            data-testid={`process-step-${s.n}`}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="group bg-bone p-9 transition-colors duration-500 hover:bg-white lg:p-11"
          >
            <span className="font-serif text-5xl text-brass/55 transition-colors duration-500 group-hover:text-brass">
              {s.n}
            </span>
            <h3 className="mt-7 font-serif text-2xl text-slate950">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate950/60">
              {s.copy}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-8 border border-clay/40 bg-clay/[0.06] p-9 lg:flex-row lg:items-center lg:p-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <Zap size={18} className="text-clay" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-clay">
              Recover — priority service
            </p>
          </div>
          <h3 className="mt-4 font-serif text-3xl text-slate950">
            Storm or vehicle damage? We prioritize it.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate950/65">
            A destroyed mailbox can't wait — mail delivery depends on it. Recover
            gets you a clean, compliant replacement fast.
          </p>
        </div>
        <button
          type="button"
          data-testid="recover-cta"
          onClick={() => onSelect("Recover — storm / vehicle damage (priority)")}
          className="shrink-0 bg-clay px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-0.5"
        >
          Get priority service
        </button>
      </div>
    </div>
  </section>
);
