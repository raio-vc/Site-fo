"use client";

import { useLang } from "@/lib/LanguageContext";
import { content } from "@/lib/content";
import FadeIn from "./FadeIn";
import ConstellationSVG from "./ConstellationSVG";

export default function SectionConstellation() {
  const { lang } = useLang();
  const c = content.constellation;

  return (
    <section
      id="constelacao"
      className="w-full"
      style={{
        backgroundColor: "#EDE8DC",
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <FadeIn>
          <p className="text-warm-gray font-sans text-xs tracking-[0.18em] uppercase mb-10">
            {c.eyebrow[lang]}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <FadeIn delay={0.1}>
              <h2
                className="font-serif text-charcoal leading-[1.1] mb-6"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                  whiteSpace: "pre-line",
                }}
              >
                {c.headline[lang]}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p
                className="text-warm-gray font-sans font-light leading-relaxed"
                style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
              >
                {c.sub[lang]}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} direction="right">
            <ConstellationSVG centered={false} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
