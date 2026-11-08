"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content } from "@/lib/content";
import FadeIn from "./FadeIn";

export default function SectionServices() {
  const { lang } = useLang();
  const c = content.services;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="servicos"
      className="w-full"
      style={{
        backgroundColor: "#1C1C1A",
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <FadeIn>
          <p
            className="font-sans text-xs tracking-[0.18em] uppercase mb-10"
            style={{ color: "#C9A96E", opacity: 0.8 }}
          >
            {c.eyebrow[lang]}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="font-serif leading-[1.1] mb-16"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              color: "#F4F0E8",
            }}
          >
            {c.headline[lang]}
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          {c.items.map((item, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.07}>
              <div
                style={{ borderTop: "1px solid rgba(244, 240, 232, 0.1)" }}
              >
                <button
                  className="w-full flex items-center justify-between py-7 text-left group"
                  style={{ minHeight: "72px" }}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <div className="flex items-center gap-8">
                    <span
                      className="font-sans text-xs tracking-[0.1em]"
                      style={{ color: "#C9A96E", opacity: 0.7, minWidth: "2.5rem" }}
                    >
                      {item.number}
                    </span>
                    <span
                      className="font-serif"
                      style={{
                        fontSize: "clamp(1.1rem, 2.2vw, 1.55rem)",
                        color: open === i ? "#C9A96E" : "#F4F0E8",
                        transition: "color 0.4s ease",
                      }}
                    >
                      {item.title[lang]}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="font-sans text-2xl font-light"
                    style={{ color: "#C9A96E", opacity: 0.7, marginLeft: "24px", flexShrink: 0 }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="pb-8 ml-20 max-w-2xl"
                        style={{ borderLeft: "2px solid #C9A96E", paddingLeft: "24px" }}
                      >
                        <p
                          className="font-sans font-light leading-relaxed"
                          style={{ color: "#D4CBBF", fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
                        >
                          {item.description[lang]}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: "1px solid rgba(244, 240, 232, 0.1)" }} />
        </div>
      </div>
    </section>
  );
}
