import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { RITUAL } from "@/data/content";

export const Ritual = () => (
  <section
    id="ritual"
    data-testid="ritual-section"
    className="grain relative overflow-hidden bg-slate950 px-6 py-24 lg:px-12 lg:py-36"
  >
    <div className="relative mx-auto max-w-[1400px]">
      <div className="max-w-3xl">
        <p className="overline">The P&amp;P experience</p>
        <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-bone sm:text-5xl lg:text-6xl">
          The ritual
          <br />
          <span className="italic text-brass">of quality.</span>
        </h2>
        <p className="mt-7 max-w-xl text-sm leading-relaxed text-bone/60 md:text-base">
          Anyone can sink a post. The difference is in the preparation, the
          finish, and what we leave behind.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-px border border-bone/15 bg-bone/15 md:grid-cols-3">
        {RITUAL.map((r, i) => {
          const Icon = Icons[r.icon] || Icons.Circle;
          return (
            <motion.div
              key={r.title}
              data-testid={`ritual-card-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-slate950 p-9 transition-colors duration-500 hover:bg-bone/[0.04] lg:p-12"
            >
              <Icon
                size={28}
                strokeWidth={1.3}
                className="text-brass transition-transform duration-500 group-hover:-translate-y-0.5"
              />
              <h3 className="mt-8 font-serif text-2xl text-bone lg:text-3xl">
                {r.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-bone/65">
                {r.copy}
              </p>
              <div className="hairline mt-10 w-full" />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
