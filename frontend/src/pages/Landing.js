import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { TrustRibbon } from "@/components/site/TrustRibbon";
import { Manifesto } from "@/components/site/Manifesto";
import { FiveRs } from "@/components/site/FiveRs";
import { Packages } from "@/components/site/Packages";
import { Gallery } from "@/components/site/Gallery";
import { SignatureShowcase } from "@/components/site/SignatureShowcase";
import { HandCrafted } from "@/components/site/HandCrafted";
import { ProofSlider } from "@/components/site/ProofSlider";
import { Ritual } from "@/components/site/Ritual";

import { HowItWorks } from "@/components/site/HowItWorks";
import { FAQ } from "@/components/site/FAQ";
import { BookingForm } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";
import { SERVICE_OPTIONS } from "@/data/content";

export default function Landing() {
  const [service, setService] = useState(SERVICE_OPTIONS[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  const pick = useCallback((value) => {
    setService(value);
    const el = document.getElementById("book");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="bg-bone">
      <Nav />
      <Hero />
      <TrustRibbon />
      <Manifesto />
      <FiveRs />
      <Packages onSelect={pick} />
      <Gallery />
      <SignatureShowcase onSelect={pick} />
      <HandCrafted />
      <ProofSlider />
      <Ritual />
      <HowItWorks onSelect={pick} />
      <FAQ />
      <BookingForm service={service} setService={setService} />
      <Footer />
    </div>
  );
}
