"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

export default function Header() {
  const { lang, setLang } = useLang();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-7 mix-blend-normal pointer-events-none"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-auto">
        <Image
          src="/assets/95973132-847f-42b9-a240-90ddae984e5b.png"
          alt="Raio"
          width={96}
          height={28}
          className="h-7 w-auto"
          priority
        />
      </div>

      <div className="pointer-events-auto flex items-center gap-1">
        <button
          onClick={() => setLang("pt")}
          aria-label="Português"
          className={`min-w-[44px] min-h-[44px] flex items-center justify-center text-xs tracking-[0.12em] uppercase transition-opacity duration-500 ${
            lang === "pt"
              ? "text-white opacity-100"
              : "text-white opacity-35 hover:opacity-60"
          }`}
        >
          PT
        </button>
        <span className="text-white opacity-30 text-xs">|</span>
        <button
          onClick={() => setLang("en")}
          aria-label="English"
          className={`min-w-[44px] min-h-[44px] flex items-center justify-center text-xs tracking-[0.12em] uppercase transition-opacity duration-500 ${
            lang === "en"
              ? "text-white opacity-100"
              : "text-white opacity-35 hover:opacity-60"
          }`}
        >
          EN
        </button>
      </div>
    </motion.header>
  );
}
