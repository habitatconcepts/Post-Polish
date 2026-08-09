import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PACKAGES } from "@/data/content";

export const Packages = ({ onSelect }) => (
  <section
    id="pricing"
    data-testid="pricing-section"
    className="border-y border-stone bg-stone/40 px-6 py-24 lg:px-12 lg:py-36"
  >
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="overline">Flat-rate packages</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-slate950 sm:text-5xl lg:text-6xl">
            One price.
            <br />
            <span className="italic text-slate950/50">Everything included.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate950/60 md:text-base">
          Hardware, labor, haul-away of the old unit, and cleanup — all in one
          upfront number. No hourly meters, no surprise line items.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PACKAGES.map((p, i) => (
          <motion.div
            key={p.id}
            data-testid={`package-card-${p.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative flex flex-col border p-9 lg:p-11 ${
              p.featured
                ? "border-brass bg-slate950 lg:-mt-6 lg:mb-[-1.5rem] lg:shadow-[0_30px_60px_rgba(12,22,39,0.18)]"
                : "border-stone bg-white"
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-9 bg-brass px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate950">
                Most popular
              </span>
            )}
            <h3
              className={`font-serif text-3xl lg:text-4xl ${
                p.featured ? "text-bone" : "text-slate950"
              }`}
            >
              {p.name}
            </h3>
            <p
              className={`mt-3 text-sm ${
                p.featured ? "text-bone/60" : "text-slate950/55"
              }`}
            >
              {p.tagline}
            </p>

            <div className="mt-9 flex items-baseline gap-2">
              <span
                className={`font-serif text-5xl ${
                  p.featured ? "text-brass" : "text-slate950"
                }`}
              >
                {p.price}
              </span>
            </div>
            <p
              className={`mt-2 text-[11px] uppercase tracking-[0.16em] ${
                p.featured ? "text-bone/45" : "text-slate950/40"
              }`}
            >
              {p.priceNote}
            </p>

            <ul className="mt-9 flex-1 space-y-4">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check
                    size={15}
                    strokeWidth={2.2}
                    className="mt-1 shrink-0 text-brass"
                  />
                  <span
                    className={`text-sm leading-snug ${
                      p.featured ? "text-bone/80" : "text-slate950/70"
                    }`}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              data-testid={`package-select-${p.id}`}
              onClick={() => onSelect(p.serviceValue)}
              className={`mt-11 w-full px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                p.featured
                  ? "bg-brass text-slate950 hover:bg-bone"
                  : "border border-slate950 text-slate950 hover:bg-slate950 hover:text-bone"
              }`}
            >
              {p.cta}
            </button>
          </motion.div>
        ))}
      </div>

      <p className="mt-14 max-w-3xl border-l-2 border-brass pl-6 font-serif text-xl italic leading-snug text-slate950/75 lg:text-2xl">
        Got a unique layout or a specific HOA requirement? Let's build it. Every
        quote is firm before we touch a shovel.
      </p>
    </div>
  </section>
);
