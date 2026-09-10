import { motion } from "framer-motion";
import { GALLERY, SHOTS } from "@/data/content";

export const Gallery = () => (
  <section
    id="gallery"
    data-testid="gallery-section"
    className="bg-bone px-6 py-24 lg:px-12 lg:py-40"
  >
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="overline">The work</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.02] text-slate950 sm:text-5xl lg:text-6xl">
            Our latest
            <br />
            <span className="italic text-slate950/45">transformations.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-slate950/55">
          Finished builds, finish details, and the bench they came from. Every
          one installed in a single visit.
        </p>
      </div>

      <div className="mt-16 grid auto-rows-[280px] grid-cols-1 gap-5 lg:grid-cols-12 lg:auto-rows-[300px]">
        {GALLERY.map((g, i) => (
          <motion.figure
            key={g.title}
            data-testid={`gallery-item-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden border border-stone ${g.span}`}
          >
            <img
              src={SHOTS[g.src]}
              alt={g.title}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate950/85 via-slate950/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-500 group-hover:translate-y-0 lg:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brass">
                {g.meta}
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-tight text-bone lg:text-3xl">
                {g.title}
              </h3>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);
