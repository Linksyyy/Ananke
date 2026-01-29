"use client";

import { useState } from "react";

interface TCard {
  name: string;
  attack: number;
  element: string;
}

let cardsPlaceholer: [TCard] = [
  { name: "test name", attack: 12, element: "water" },
];
for (let i = 1; i < 11; i++)
  cardsPlaceholer.push({ name: "test name", attack: 12, element: "water" });

export default function Cards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const totalCards = cardsPlaceholer.length;
  const middleIndex = Math.floor(totalCards / 2);

  return (
    <div className="fixed w-full bottom-0 justify-center min-h-1/4">
      <div className="w-full h-full flex relative justify-center items-start">
        {cardsPlaceholer.map((card, index) => {
          const rotation = (index - middleIndex) * 5;
          const translateY = Math.abs(index - middleIndex) * 10;

          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className={`absolute h-70 w-45 bg-neutral-700 border border-black rounded-2xl p-3 transition-transform duration-300 ease-in-out`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: isHovered
                  ? `translateX(-80%) translateY(-6px) rotate(0deg) scale(1.2)`
                  : `translateX(-50%) rotate(${rotation}deg) translateY(${translateY}px)`,
                transformOrigin: "bottom center",
                left: `calc(50% + ${(index - middleIndex) * 80}px)`,
                zIndex: index,
              }}
            >
              {card.name}
              {index}
            </div>
          );
        })}
      </div>
    </div>
  );
}
