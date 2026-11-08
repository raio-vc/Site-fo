"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content } from "@/lib/content";
import Header from "./Header";

export default function SectionHero() {
  const { lang } = useLang();
  const c = content.hero;

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col"
      style={{ backgroundColor: "#1C1C1A" }}
    >
      {/* Full-bleed image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/assets/aaaaf0ea-f78e-4585-9641-573b68163875.jpg"
          alt="Kintsugi vessel"
          fill
          className="object-cover object-center"
          style={{ opacity: 0.45 }}
          priority
        />
        {/* Gradient overlay — heavier at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(28,28,26,0.4) 0%, rgba(28,28,26,0.25) 40%, rgba(28,28,26,0.75) 100%)",
          }}
        />
      </div>

      <Header />

      {/* Headline — vertical center */}
      <div className="relative flex-1 flex flex-col justify-end px-8 md:px-16 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <h1
            className="font-serif text-white leading-[1.05] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", whiteSpace: "pre-line" }}
          >
            {c.headline[lang]}
          </h1>
          <p
            className="text-white font-sans font-light tracking-wide"
            style={{ opacity: 0.6, fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
          >
            {c.sub[lang]}
          </p>
        </motion.div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.2, delay: 1.6 }}
      >
        <div className="w-px h-12 bg-white opacity-40" />
      </motion.div>
    </section>
  );
}
