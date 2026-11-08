"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content } from "@/lib/content";
import FadeIn from "./FadeIn";

/*
 * Chosen image: 36424b88-3be5-4dcf-aa79-c0baf5cd92f2.jpg
 * Reason: most dramatic branching kintsugi crack network — multiple forking gold
 * veins running from the right shoulder down and left, with two prominent branches
 * and several smaller forks near the base. Far more narrative richness than the
 * single-crack images.
 *
 * Image dimensions: 1500×2000. SVG viewBox: 750×1000 (scaled ×0.5).
 */
const IMAGE_SRC = "/assets/36424b88-3be5-4dcf-aa79-c0baf5cd92f2.jpg";
const VIEW_W = 750;
const VIEW_H = 1000;

/*
 * Crack paths traced by visual inspection of the gold veins in the image.
 *
 * Coordinate origin (0,0) is top-left of the image frame.
 * The vessel body occupies roughly x:[120,630], y:[165,890].
 *
 * startAt / endAt: scroll progress thresholds (0–1) at which pathLength
 * animates from 0 → 1 for that individual crack segment.
 */
const CRACKS = [
  {
    // Main diagonal — sweeps from upper-right shoulder down to lower-left body
    d: "M 505,268 C 470,335 428,398 382,462 C 338,526 283,598 228,668",
    startAt: 0.0,
    endAt: 0.38,
  },
  {
    // Right fork — branches from midpoint of main crack, curves down and right
    d: "M 382,462 C 424,508 462,558 497,618 C 518,652 530,718 528,800",
    startAt: 0.18,
    endAt: 0.52,
  },
  {
    // Neck spur — small upward crack at the collar/shoulder junction
    d: "M 505,268 C 492,252 478,241 462,232",
    startAt: 0.0,
    endAt: 0.14,
  },
  {
    // Left lower — continues the main diagonal toward the base
    d: "M 228,668 C 216,712 213,762 220,826",
    startAt: 0.33,
    endAt: 0.56,
  },
  {
    // Base fork — small branch off the right fork near the lower body
    d: "M 528,800 C 522,822 512,842 500,852",
    startAt: 0.48,
    endAt: 0.62,
  },
  {
    // Lid crack — hairline crack across the ivory lid at the top
    d: "M 352,182 C 374,176 396,174 418,178 C 432,180 442,186 448,192",
    startAt: 0.0,
    endAt: 0.1,
  },
];

// ─── Single animated crack path ───────────────────────────────────────────────

function AnimatedCrack({
  d,
  startAt,
  endAt,
  scrollProgress,
}: {
  d: string;
  startAt: number;
  endAt: number;
  scrollProgress: MotionValue<number>;
}) {
  const pathLength = useTransform(scrollProgress, [startAt, endAt], [0, 1], {
    clamp: true,
  });
  const opacity = useTransform(scrollProgress, [startAt, startAt + 0.02], [0, 1], {
    clamp: true,
  });

  return (
    <motion.path
      d={d}
      stroke="#C9A96E"
      strokeWidth={2.2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pathLength, opacity }}
    />
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function KintsugiAnimation() {
  const { lang } = useLang();
  const c = content.metaphor;

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring-smoothed progress: stiffness 60 + damping 20 → slow, organic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Image: grayscale 1 → 0 as scroll reaches 60%
  const grayscale = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const imageFilter = useTransform(grayscale, (g) => `grayscale(${g})`);

  // Vessel: subtle scale-up as scroll begins — tiny parallax flourish
  const vesselScale = useTransform(smoothProgress, [0, 1], [1.0, 1.04]);

  // Scroll hint fades out early
  const hintOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  return (
    <>
      {/* ── Scroll-driven animation section ── */}
      <section
        ref={containerRef}
        id="kintsugi"
        aria-label="Kintsugi animation"
        style={{ minHeight: "300vh", backgroundColor: "#1C1C1A" }}
      >
        {/* Sticky viewport */}
        <div
          className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
          style={{ height: "100vh" }}
        >
          {/* Vessel + SVG container */}
          <motion.div
            className="relative"
            style={{
              width: "clamp(260px, 42vw, 580px)",
              aspectRatio: `${VIEW_W} / ${VIEW_H}`,
              scale: vesselScale,
            }}
          >
            {/* Kintsugi vessel image */}
            <motion.div
              className="absolute inset-0"
              style={{ filter: imageFilter }}
            >
              <Image
                src={IMAGE_SRC}
                alt="Kintsugi vessel — gold veins reveal as you scroll"
                fill
                sizes="(max-width: 768px) 70vw, 42vw"
                className="object-cover object-center"
                priority
              />
            </motion.div>

            {/* SVG crack overlay — paths drawn over the image */}
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
              style={{
                filter: "drop-shadow(0 0 6px rgba(201, 169, 110, 0.6))",
              }}
            >
              {CRACKS.map((crack, i) => (
                <AnimatedCrack
                  key={i}
                  d={crack.d}
                  startAt={crack.startAt}
                  endAt={crack.endAt}
                  scrollProgress={smoothProgress}
                />
              ))}
            </svg>
          </motion.div>

          {/* Scroll hint — fades as user begins to scroll */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            style={{ opacity: hintOpacity }}
            aria-hidden="true"
          >
            <span
              className="font-sans text-xs tracking-[0.22em] uppercase select-none"
              style={{ color: "rgba(244,240,232,0.38)" }}
            >
              scroll
            </span>
            <div
              className="w-px"
              style={{ height: "52px", backgroundColor: "rgba(244,240,232,0.25)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Metaphor text section — appears below the scroll sequence ── */}
      <section
        id="metafora"
        className="w-full"
        style={{
          backgroundColor: "#1C1C1A",
          paddingTop: "clamp(80px, 10vw, 140px)",
          paddingBottom: "clamp(100px, 14vw, 180px)",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <FadeIn>
            <p
              className="font-sans text-xs tracking-[0.18em] uppercase mb-8"
              style={{ color: "rgba(201,169,110,0.7)" }}
            >
              {c.eyebrow[lang]}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="font-serif italic mb-8"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "#F4F0E8",
                lineHeight: 1.1,
              }}
            >
              {c.headline.pt}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="font-sans font-light leading-relaxed max-w-2xl"
              style={{
                fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
                color: "rgba(244,240,232,0.6)",
              }}
            >
              {c.body[lang]}
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
