import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { SHOTS } from "@/data/content";

const PAINS = [
  "Leaning or rotting post",
  "Rusted, dented, faded box",
  "HOA notice on the door",
  "Hit by a car or storm",
];

const LINES = ["From broken box", "to polished", "welcome."];

const lineVariants = {
  hidden: { y: "110%", rotate: 2 },
  show: (i) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.05, delay: 0.25 + i * 0.13, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const veil = useTransform(scrollYProgress, [0, 1], [0.5, 0.82]);

  return (
    <section
      id="top"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-[100svh] overflow-hidden bg-slate950"
    >
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={SHOTS.rowThreePosts}
          alt="Three finished Designer Series mailbox posts in red, white and black standing behind a flower bed"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>
      <motion.div
        style={{ opacity: veil }}
        className="absolute inset-0 bg-slate950"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate950 via-slate950/30 to-slate950/55 md:bg-gradient-to-r md:from-slate950 md:via-slate950/55 md:to-transparent" />

      <motion.div
        style={{ y: copyY }}
        className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-6 pb-24 pt-40 lg:px-12 lg:pb-32"
      >
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex items-center gap-5"
        >
          <span className="h-px w-16 bg-brass" />
          <p className="overline">New England mailbox specialists</p>
        </motion.div>

        <h1 className="mt-8 max-w-5xl font-serif text-[13vw] font-normal leading-[0.92] text-bone sm:text-6xl lg:text-[7.2rem]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="show"
                className={`block ${i === 2 ? "italic text-brass" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-10 max-w-lg text-sm leading-relaxed text-bone/70 md:text-base"
        >
          Mailbox replacement, repair, and curbside refresh — bench-built,
          hand-finished to 220 grit, installed in a single visit.
        </motion.p>

        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.9 } } }}
          className="mt-10 grid max-w-2xl grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2"
        >
          {PAINS.map((p) => (
            <motion.li
              key={p}
              variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
              className="flex items-center gap-3 border-l border-brass/50 pl-4 text-sm text-bone/75"
            >
              {p}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
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
            className="inline-flex items-center gap-3 border border-bone/25 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:border-brass hover:text-brass"
          >
            See the tiers
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#manifesto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 right-6 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-bone/50 transition-colors hover:text-brass lg:right-12 lg:flex"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
};
