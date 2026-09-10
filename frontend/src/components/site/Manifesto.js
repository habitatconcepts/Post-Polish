import { motion } from "framer-motion";
import { MANIFESTO, SHOTS } from "@/data/content";

export const Manifesto = () => (
  <section
    id="manifesto"
    data-testid="manifesto-section"
    className="bg-bone px-6 py-24 lg:px-12 lg:py-40"
  >
    <div className="mx-auto max-w-[1400px]">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="overline">The manifesto</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.02] text-slate950 sm:text-5xl">
              Four things
              <br />
              <span className="italic text-slate950/45">we refuse to</span>
              <br />
              compromise.
            </h2>
            <div className="mt-12 hidden overflow-hidden border border-stone lg:block">
              <motion.img
                src={SHOTS.stain}
                alt="A can of semi-transparent stain and sealer with a finishing cloth on the bench"
                initial={{ scale: 1.12, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {MANIFESTO.map((m, i) => (
            <motion.li
              key={m.n}
              data-testid={`manifesto-chapter-${m.n}`}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.75, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t border-slate950/12 py-10 last:border-b lg:py-14"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-14">
                <span className="font-serif text-5xl leading-none text-brass/70 transition-colors duration-500 group-hover:text-brass lg:text-6xl">
                  {m.n}
                </span>
                <div className="max-w-2xl">
                  <h3 className="font-serif text-3xl leading-tight text-slate950 lg:text-[2.6rem]">
                    {m.title}
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-slate950/62 md:text-base">
                    {m.copy}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
