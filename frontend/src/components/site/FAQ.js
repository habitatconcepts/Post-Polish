import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/data/content";

export const FAQ = () => (
  <section
    id="faq"
    data-testid="faq-section"
    className="border-t border-stone bg-stone/40 px-6 py-24 lg:px-12 lg:py-36"
  >
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="overline">Questions</p>
        <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-slate950 sm:text-5xl">
          Frequently
          <br />
          <span className="italic text-slate950/50">asked.</span>
        </h2>
      </div>

      <div className="lg:col-span-8">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              data-testid={`faq-item-${i}`}
              className="border-b border-slate950/10"
            >
              <AccordionTrigger className="py-7 text-left font-serif text-xl text-slate950 hover:no-underline lg:text-2xl">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-8 pr-10 text-sm leading-relaxed text-slate950/65 md:text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);
