"use client";

import { useLang } from "@/lib/LanguageContext";
import { content } from "@/lib/content";
import FadeIn from "./FadeIn";
import ConstellationSVG from "./ConstellationSVG";

export default function SectionApproach() {
  const { lang } = useLang();
  const c = content.approach;

  const paragraphs = c.body[lang].split("\n\n");

  return (
    <section
      id="abordagem"
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
          {/* Text left */}
          <div>
            <FadeIn delay={0.1}>
              <h2
                className="font-serif text-charcoal leading-[1.1] mb-8"
                style={{
                  fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
                  whiteSpace: "pre-line",
                }}
              >
                {c.headline[lang]}
              </h2>
            </FadeIn>
            <div className="flex flex-col gap-5">
              {paragraphs.map((p, i) => (
                <FadeIn key={i} delay={0.2 + i * 0.1}>
                  <p
                    className="text-warm-gray font-sans font-light leading-relaxed"
                    style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
                  >
                    {p}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Centered constellation right */}
          <FadeIn delay={0.15} direction="right">
            <ConstellationSVG centered={true} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
