"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import { content } from "@/lib/content";
import FadeIn from "./FadeIn";

export default function SectionMetaphor() {
  const { lang } = useLang();
  const c = content.metaphor;

  return (
    <section id="metafora" className="w-full">
      {/* Full-bleed image */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(480px, 60vw, 760px)" }}>
        <Image
          src="/assets/76d26cb9-399a-41b3-8e64-08100c418843.jpg"
          alt="Kintsugi vessel"
          fill
          className="object-cover object-center"
          style={{ filter: "brightness(0.85) saturate(0.9)" }}
        />
        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #F4F0E8)" }}
        />
      </div>

      {/* Text beneath */}
      <div
        className="w-full"
        style={{ backgroundColor: "#F4F0E8", paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(80px, 12vw, 140px)" }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <FadeIn>
            <p className="text-warm-gray font-sans text-xs tracking-[0.18em] uppercase mb-8">
              {c.eyebrow[lang]}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="font-serif text-charcoal italic mb-8"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              {c.headline.pt}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="text-warm-gray font-sans font-light leading-relaxed max-w-2xl"
              style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)" }}
            >
              {c.body[lang]}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
