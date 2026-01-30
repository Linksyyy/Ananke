"use client";

import { useEffect, useState } from "react";
import cardsTest from "@/src/util/cards";
import Card from "./Card";
import { useCards } from "@/src/store/cardsStore";

export default function Cards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { cards, setCards } = useCards();

  useEffect(() => {
    setCards(cardsTest);
    console.log("oi");
  }, []);

  return (
    <div className="fixed w-full bottom-0 justify-center min-h-1/4">
      <div className="w-full h-full flex relative justify-center items-start mb-70">
        {cards.map((card, index) => {
          const mid = Math.floor(cards.length / 2);
          const rotation = (index - mid) * 5;
          const translateY = Math.abs(index - mid) * 10;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className="absolute transition-transform duration-300 ease-out"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: isHovered
                  ? `translateX(-100%) translateY(-14px) rotate(0deg) scale(1.35)`
                  : `translateX(-50%) rotate(${rotation}deg) translateY(${translateY}px)`,
                transformOrigin: "bottom center",
                left: `calc(50% + ${(index - mid) * 80}px)`,
                zIndex: index,
              }}
            >
              <Card card={card} isHovered={isHovered} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
