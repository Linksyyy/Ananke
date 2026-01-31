"use client";

import { useEffect, useState } from "react";
import cardsTest from "@/src/util/cards";
import Card from "./Card";
import { useCards } from "@/src/store/cardsStore";

export default function Cards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { cards, setCards } = useCards();

  useEffect(() => {
    setCards(cardsTest);
    setTimeout(() => setLoaded(true), 300);
  }, []);

  return (
    <div className="fixed w-full bottom-0 justify-center min-h-1/4">
      <div className="w-full h-full flex relative justify-center items-start mb-70">
        {cards.map((card, index) => {
          const mid = Math.floor(cards.length / 2);
          const isHovered = hoveredIndex === index;

          const rotation = loaded ? (index - mid) * 5 : (index - mid) * 3;
          const spaceBetween = loaded ? 80 : 10;
          const translateY = Math.abs(index - mid) * 10;

          return (
            <div
              key={index}
              className="absolute transition-all duration-300 ease-out"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: isHovered
                  ? `translateX(-100%) translateY(-14px) rotate(0deg) scale(1.35)`
                  : `translateX(-50%) rotate(${rotation}deg) translateY(${translateY}px)`,
                transformOrigin: "bottom center",
                left: `calc(50% + ${(index - mid) * spaceBetween}px)`,
                zIndex: index,
              }}
            >
              <Card card={card} isHovered={isHovered} index={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
