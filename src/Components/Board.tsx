"use client";

import { useEffect, useState } from "react";
import { useCards } from "../store/cardsStore";

export default function Board() {
  const { selectedCard } = useCards();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const radius = 5;
  const scale = 1;
  const size = 32 * scale;

  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    return `${size * Math.cos(angle)},${size * Math.sin(angle)}`;
  }).join(" ");

  const axialToPixel = (q: number, r: number) => {
    const x = size * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
    const y = size * (3 / 2) * r;
    return { x, y };
  };

  const hexes = [];
  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      const s = -q - r;
      if (Math.abs(s) <= radius) {
        const distance = Math.max(Math.abs(q), Math.abs(r), Math.abs(s));
        hexes.push({ q, r, s, distance, ...axialToPixel(q, r) });
      }
    }
  }

  return (
    <div className="border-2 rounded-4xl border-neutral-900">
      <svg width="720" height="700" viewBox="-300 -300 600 600">
        <defs>
          <polygon id="hex-shape" points={hexPoints} />
        </defs>

        {hexes.map((hex) => {
          const isCenter = hex.distance <= 1;
          const isEdge = hex.distance === radius;

          let fillClass =
            "fill-boardInnerRing stroke-purple-900 " +
            "drop-shadow-[0_0px_4px_rgba(0,0,0,0.6)] " +
            `${selectedCard && "hover:scale-110"} ${selectedCard && "hover:drop-shadow-[0_0px_6px_rgba(140,90,220,0.5)]"}`;

          if (isEdge)
            fillClass =
              "fill-boardEdge stroke-neutral-800 " +
              "drop-shadow-[0_0px_6px_rgba(0,0,0,0.9)] " +
              `${selectedCard && "hover:scale-105"} ${selectedCard && "hover:drop-shadow-[0_0px_20px_rgba(0,0,0,0.9)]"}`;

          if (isCenter)
            fillClass =
              "fill-boardCenter stroke-red-900 " +
              "drop-shadow-[0_0_0px_rgba(200,40,80,0.7)] " +
              `${selectedCard && "hover:scale-115"} ${selectedCard && "hover:drop-shadow-[0_0px_6px_rgba(220,60,100,0.9)]"}`;

          return (
            <g
              key={`${hex.q}-${hex.r}`}
              className="group"
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.parentNode?.appendChild(target);
              }}
              onClick={() => console.log(hex)}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted 
                  ? `translate(${hex.x}px, ${hex.y}px) scale(1)` 
                  : `translate(${hex.x}px, ${hex.y}px) scale(0) translateY(20px)`,
                transition: "opacity 500ms ease-out, transform 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transitionDelay: `${hex.distance * 80}ms`,
              }}
            >
              <use
                href="#hex-shape"
                className={`scale-90 transition-transform transition-color duration-200 ease-in-out ${fillClass}`}
                strokeWidth="2"
              />
              <text
                dy={-10}
                textAnchor="middle"
                className="text-[8px] fill-neutral-400 opacity-0 group-hover:opacity-100 pointer-events-none"
              >
                {hex.q}q, {hex.r}r1, {hex.s}s
              </text>
              <circle
                cx="0"
                cy="0"
                r="10"
                className="fill-neutral-400/10 opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
