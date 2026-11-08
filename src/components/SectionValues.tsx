"use client";

import { useLang } from "@/lib/LanguageContext";
import { content } from "@/lib/content";
import FadeIn from "./FadeIn";

export default function SectionValues() {
  const { lang } = useLang();
  const c = content.values;

  return (
    <section
      id="valores"
      className="w-full"
      style={{
        backgroundColor: "#F4F0E8",
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <FadeIn>
          <p className="text-warm-gray font-sans text-xs tracking-[0.18em] uppercase mb-16 md:mb-24">
            {c.eyebrow[lang]}
          </p>
        </FadeIn>

        <div className="flex flex-col gap-20 md:gap-28">
          {c.items.map((item, i) => (
            <FadeIn key={i} delay={0.05 + i * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-16 items-baseline">
                <span
                  className="font-serif text-stone"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 1, opacity: 0.45 }}
                >
                  {item.number}
                </span>
                <div>
                  <h3
                    className="font-serif text-charcoal mb-4"
                    style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}
                  >
                    {item.title[lang]}
                  </h3>
                  <p
                    className="text-warm-gray font-sans font-light leading-relaxed max-w-lg"
                    style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)" }}
                  >
                    {item.body[lang]}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
