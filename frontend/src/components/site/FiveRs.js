import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SERVICES, SHOTS } from "@/data/content";

const SPANS = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

export const FiveRs = () => (
  <section
    id="services"
    data-testid="services-section"
    className="bg-bone px-6 py-24 lg:px-12 lg:py-36"
  >
    <div className="mx-auto max-w-[1400px]">
      <div className="max-w-3xl">
        <p className="overline">What we do</p>
        <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-slate950 sm:text-5xl lg:text-6xl">
          One specialty.
          <br />
          <span className="italic text-slate950/50">Five ways we fix it.</span>
        </h2>
        <p className="mt-7 max-w-xl text-sm leading-relaxed text-slate950/60 md:text-base">
          We don't do gutters, fences, or odd jobs. We do mailboxes — which is
          exactly why yours will be done right.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-12">
        {SERVICES.map((s, i) => {
          const Icon = Icons[s.icon] || Icons.Circle;
          const isFirst = i === 0;
          return (
            <motion.article
              key={s.key}
              data-testid={`service-card-${s.key.toLowerCase()}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className={`group relative flex flex-col justify-between overflow-hidden border border-stone p-8 lg:p-12 ${
                SPANS[i]
              } ${isFirst ? "bg-slate950" : "bg-white"} transition-colors duration-500 hover:border-brass`}
            >
              {isFirst && (
                <img
                  src={SHOTS.designerCaps}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-[1200ms] group-hover:scale-105"
                />
              )}
              <div className="relative">
                <Icon
                  size={26}
                  strokeWidth={1.4}
                  className={isFirst ? "text-brass" : "text-slate950/40"}
                />
                <h3
                  className={`mt-8 font-serif text-3xl lg:text-4xl ${
                    isFirst ? "text-bone" : "text-slate950"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`mt-4 max-w-md text-sm leading-relaxed ${
                    isFirst ? "text-bone/70" : "text-slate950/60"
                  }`}
                >
                  {s.copy}
                </p>
              </div>
              <div className="hairline relative mt-10 w-full" />
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);
