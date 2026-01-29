"use client";

import { useEffect, useState } from "react";
import cards from "@/util/cards";

const cardsPlaceholer: Card[] = cards;

export default function Cards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    setCards(cardsPlaceholer);
    console.log("oi");
  }, []);

  return (
    <div className="fixed w-full bottom-0 justify-center min-h-1/4">
      <button
        className="bg-red-600 w-20 h-30 absolute"
        onClick={() => {
          let [head, ...tail] = [...cards];
          setCards(tail);
        }}
      >
        Test button - remove card
      </button>

      <div className="w-full h-full flex relative justify-center items-start mb-70">
        {cards.map((card, index) => {
          const mid = Math.floor(cards.length / 2);
          const rotation = (index - mid) * 5;
          const translateY = Math.abs(index - mid) * 10;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className="group absolute h-72 w-48 rounded-2xl p-[2px] transition-transform duration-300 ease-out"
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
              <div
                className={`absolute inset-0 rounded-2xl transition-opacity ${
                  isHovered ? "opacity-90 blur-md" : "opacity-50"
                }`}
                style={{
                  background: `radial-gradient(circle at top,
                    ${card.color}606, transparent 70%)`,
                }}
              />

              <div className="absolute inset-0 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[6px_6px] opacity-20 pointer-events-none" />

                <div className="relative px-3 pt-2">
                  <h3 className="text-sm font-semibold tracking-wide text-neutral-100">
                    {card.name}
                  </h3>
                  <div className="text-[10px] text-neutral-400 italic">
                    {card.principle.toUpperCase()}
                  </div>
                </div>

                <div className="relative hidden px-3 pb-3 group-hover:flex flex-col gap-1 text-[10px] text-neutral-300">
                  <div className="flex justify-between">
                    <span className="opacity-70">Domain</span>
                    <span className="capitalize">
                      OI
                      {card.domain.preferredZones.join(", ")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="opacity-70">Cost</span>
                    <span className="capitalize">
                      {card.cost.type} · {card.cost.value}
                    </span>
                  </div>
                </div>

                <div className="relative flex-1 flex items-center justify-center px-2">
                  <img
                    src={`${card.id}.png`}
                    alt={card.name}
                    className={`max-h-full object-contain transition-transform duration-300 ${
                      isHovered ? "scale-90" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
