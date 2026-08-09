import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Proof", href: "#proof" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled
          ? "border-stone/80 bg-bone/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
        <a
          href="#top"
          data-testid="nav-logo"
          className="group flex items-baseline gap-2"
        >
          <span
            className={`font-serif text-2xl leading-none ${
              scrolled ? "text-slate950" : "text-white"
            }`}
          >
            Post
          </span>
          <span className="text-brass font-serif text-2xl italic leading-none">
            &amp;
          </span>
          <span
            className={`font-serif text-2xl leading-none ${
              scrolled ? "text-slate950" : "text-white"
            }`}
          >
            Polish
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:text-brass ${
                scrolled ? "text-slate950/70" : "text-white/80"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#book"
            data-testid="nav-book-btn"
            className="border border-brass bg-brass px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate950 transition-colors duration-300 hover:bg-transparent hover:text-brass"
          >
            Get a quote
          </a>
        </nav>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className={`md:hidden ${scrolled ? "text-slate950" : "text-white"}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          data-testid="nav-mobile-panel"
          className="border-t border-stone bg-bone px-6 pb-8 pt-4 md:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-stone py-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate950"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="mt-6 block bg-slate950 px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-bone"
          >
            Get a quote
          </a>
        </div>
      )}
    </header>
  );
};
