import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { STEPS } from "@/data/content";

export const HowItWorks = ({ onSelect }) => (
  <section
    id="process"
    data-testid="process-section"
    className="bg-bone px-6 py-24 lg:px-12 lg:py-36"
  >
    <div className="mx-auto max-w-[1400px]">
      <p className="overline">How it works</p>
      <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.05] text-slate950 sm:text-5xl lg:text-6xl">
        Booked in minutes.
        <br />
        <span className="italic text-slate950/50">Done in one visit.</span>
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-px border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            data-testid={`process-step-${s.n}`}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.09 }}
            className="group bg-bone p-9 transition-colors duration-500 hover:bg-white lg:p-11"
          >
            <span className="font-serif text-5xl text-brass/60 transition-colors duration-500 group-hover:text-brass">
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
          onClick={() =>
            onSelect("Recover — storm / vehicle damage (priority)")
          }
          className="shrink-0 bg-clay px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-0.5"
        >
          Get priority service
        </button>
      </div>
    </div>
  </section>
);
