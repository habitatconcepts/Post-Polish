import { Link } from "react-router-dom";

export const Footer = () => (
  <footer
    data-testid="site-footer"
    className="border-t border-bone/10 bg-slate950 px-6 py-16 lg:px-12"
  >
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl text-bone">Post</span>
            <span className="font-serif text-3xl italic text-brass">&amp;</span>
            <span className="font-serif text-3xl text-bone">Polish</span>
          </div>
          <p className="mt-4 max-w-md font-serif text-lg italic leading-snug text-bone/55">
            We don't just replace mailboxes. We restore the front-of-home first
            impression.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-4 text-xs uppercase tracking-[0.18em] text-bone/45">
          <a href="#services" className="transition-colors hover:text-brass">
            Services
          </a>
          <a href="#pricing" className="transition-colors hover:text-brass">
            Pricing
          </a>
          <a href="#book" className="transition-colors hover:text-brass">
            Book
          </a>
          <Link
            to="/admin/login"
            data-testid="footer-admin-link"
            className="transition-colors hover:text-brass"
          >
            Team login
          </Link>
        </div>
      </div>
      <div className="mt-14 flex flex-col justify-between gap-3 border-t border-bone/10 pt-7 text-[11px] uppercase tracking-[0.16em] text-bone/35 sm:flex-row">
        <span>© {new Date().getFullYear()} Post &amp; Polish</span>
        <span>Mailbox replacement, repair &amp; curbside refresh</span>
      </div>
    </div>
  </footer>
);
