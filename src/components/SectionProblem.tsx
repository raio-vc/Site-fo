"use client";

import { useLang } from "@/lib/LanguageContext";
import { content } from "@/lib/content";
import FadeIn from "./FadeIn";

export default function SectionProblem() {
  const { lang } = useLang();
  const c = content.problem;

  const paragraphs = c.body[lang].split("\n\n");

  return (
    <section
      id="problema"
      className="w-full"
      style={{ backgroundColor: "#F4F0E8", paddingTop: "clamp(80px, 12vw, 160px)", paddingBottom: "clamp(80px, 12vw, 160px)" }}
    >
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        {/* Eyebrow */}
        <FadeIn>
          <p className="text-warm-gray font-sans text-xs tracking-[0.18em] uppercase mb-10">
            {c.eyebrow[lang]}
          </p>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.1}>
          <h2
            className="font-serif text-charcoal leading-[1.1] mb-16 md:mb-20"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              whiteSpace: "pre-line",
              maxWidth: "28ch",
            }}
          >
            {c.headline[lang]}
          </h2>
        </FadeIn>

        {/* Body text — two columns on wider screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl">
          {paragraphs.map((p, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.1}>
              <p
                className="text-warm-gray font-sans font-light leading-relaxed"
                style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)" }}
              >
                {p}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
