import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/data/content";

const PAINS = [
  "Leaning or rotting post",
  "Rusted, dented, faded box",
  "HOA notice on the door",
  "Hit by a car or storm",
];

export const Hero = () => (
  <section
    id="top"
    data-testid="hero-section"
    className="relative min-h-[92vh] overflow-hidden bg-slate950"
  >
    <div className="absolute inset-0">
      <img
        src={IMAGES.hero}
        alt="Freshly installed premium mailbox at the curb of a suburban home"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-slate950/55 md:bg-gradient-to-r md:from-slate950 md:via-slate950/75 md:to-slate950/10" />
    </div>

    <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-40 lg:px-12 lg:pb-28">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="overline"
      >
        The mailbox specialists
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-6 max-w-4xl font-serif text-4xl font-normal leading-[1.03] text-bone sm:text-5xl lg:text-7xl"
      >
        From broken box to
        <br />
        <span className="italic text-brass">polished welcome.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.22 }}
        className="mt-8 max-w-xl text-sm leading-relaxed text-bone/75 md:text-base"
      >
        Mailbox replacement, repair, and curbside refresh — done fast and done
        right. One flat price, one visit, and a front curb that finally looks
        intentional.
      </motion.p>

      <motion.ul
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } }}
        className="mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
      >
        {PAINS.map((p) => (
          <motion.li
            key={p}
            variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
            className="flex items-center gap-3 border-l border-brass/50 pl-4 text-sm text-bone/80"
          >
            {p}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-12 flex flex-wrap items-center gap-4"
      >
        <a
          href="#book"
          data-testid="hero-primary-cta"
          className="group inline-flex items-center gap-3 bg-brass px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate950 transition-transform duration-300 hover:-translate-y-0.5"
        >
          Get my flat-rate quote
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
        <a
          href="#pricing"
          data-testid="hero-secondary-cta"
          className="inline-flex items-center gap-3 border border-bone/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:border-brass hover:text-brass"
        >
          See the packages
        </a>
      </motion.div>
    </div>
  </section>
);
