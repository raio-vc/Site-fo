"use client";

import { useLang } from "@/lib/LanguageContext";
import { content } from "@/lib/content";
import FadeIn from "./FadeIn";

export default function SectionContact() {
  const { lang } = useLang();
  const c = content.contact;

  return (
    <section
      id="contato"
      className="w-full flex flex-col items-center justify-center text-center"
      style={{
        backgroundColor: "#EDE8DC",
        paddingTop: "clamp(100px, 14vw, 180px)",
        paddingBottom: "clamp(100px, 14vw, 180px)",
      }}
    >
      <div className="max-w-2xl mx-auto px-8 md:px-16 flex flex-col items-center">
        <FadeIn>
          <p className="text-warm-gray font-sans text-xs tracking-[0.18em] uppercase mb-12">
            {c.eyebrow[lang]}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            className="font-serif text-charcoal italic leading-[1.25] mb-16"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", maxWidth: "32ch" }}
          >
            {c.headline[lang]}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <a
            href={`mailto:${c.email}`}
            className="font-sans text-charcoal tracking-wide transition-opacity duration-500 hover:opacity-60"
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
              textDecoration: "underline",
              textUnderlineOffset: "5px",
              textDecorationColor: "#C9A96E",
              minHeight: "44px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {c.email}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
