"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/LanguageContext";
import { content } from "@/lib/content";

interface ConstellationSVGProps {
  centered?: boolean;
}

// Positions for the 7 satellite nodes (around a circle)
const SATELLITE_ANGLES = [0, 51, 103, 154, 206, 257, 308];
const SATELLITE_RADIUS = 190;
const CX = 280;
const CY = 260;

function polarToXY(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

// Fragmented: nodes scattered without a true center
const fragmentedPositions = [
  { x: 160, y: 80 },
  { x: 370, y: 60 },
  { x: 470, y: 180 },
  { x: 410, y: 360 },
  { x: 210, y: 420 },
  { x: 80, y: 320 },
  { x: 100, y: 180 },
];

// Edges for the fragmented diagram — random cross-connections
const fragmentedEdges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
  [0, 3], [1, 4], [2, 5],
];

export default function ConstellationSVG({ centered = false }: ConstellationSVGProps) {
  const { lang } = useLang();
  const nodes = content.constellation.nodes[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const positions = centered
    ? SATELLITE_ANGLES.map((a) => polarToXY(a, SATELLITE_RADIUS))
    : fragmentedPositions;

  const edges = centered
    ? nodes.map((_, i) => [nodes.length, i]) // center(7) to all satellites
    : fragmentedEdges;

  const allPositions = centered
    ? [...positions, { x: CX, y: CY }]
    : positions;

  const svgWidth = 560;
  const svgHeight = 520;

  return (
    <div ref={ref} className="w-full max-w-xl mx-auto" style={{ aspectRatio: `${svgWidth}/${svgHeight}` }}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Edges */}
        {edges.map(([a, b], i) => {
          const from = allPositions[a];
          const to = allPositions[b];
          return (
            <motion.line
              key={`edge-${i}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={centered ? "#C9A96E" : "#6B6560"}
              strokeWidth={centered ? 1.5 : 1}
              strokeDasharray={centered ? "0" : "4 4"}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: centered ? 0.7 : 0.35 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          );
        })}

        {/* Satellite nodes */}
        {nodes.map((label, i) => {
          const pos = positions[i];
          return (
            <motion.g
              key={`node-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={6}
                fill={centered ? "#C9A96E" : "#6B6560"}
                opacity={centered ? 0.9 : 0.55}
              />
              <text
                x={pos.x}
                y={pos.y + 20}
                textAnchor="middle"
                fontSize="11"
                fill="#6B6560"
                fontFamily="Inter, sans-serif"
                opacity={0.75}
              >
                {label.split(" ").map((word, wi) => (
                  <tspan key={wi} x={pos.x} dy={wi === 0 ? 0 : 13}>
                    {word}
                  </tspan>
                ))}
              </text>
            </motion.g>
          );
        })}

        {/* Center node (only in centered variant) */}
        {centered && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.0,
              type: "spring",
              stiffness: 150,
              damping: 18,
            }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <circle cx={CX} cy={CY} r={28} fill="#C9A96E" opacity={0.15} />
            <circle cx={CX} cy={CY} r={14} fill="#C9A96E" opacity={0.7} />
            <text
              x={CX}
              y={CY + 44}
              textAnchor="middle"
              fontSize="12"
              fill="#1C1C1A"
              fontFamily="Inter, sans-serif"
              fontWeight="500"
              letterSpacing="0.12em"
            >
              RAIO
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  );
}
