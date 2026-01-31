"use client";

import { useEffect, useState } from "react";
import { useCards } from "../store/cardsStore";

export default function ExtendedCard() {
  const { selectedCard, unsetSelectedCard } = useCards();
  const [isActive, setIsActive] = useState(false);
  const [cardToDisplay, setCardToDisplay] = useState(selectedCard);
  const animationDelay = 200;

  useEffect(() => {
    if (selectedCard) {
      if (cardToDisplay) {
        setIsActive(false);
        setTimeout(() => {
          setCardToDisplay(selectedCard);
          setIsActive(true);
        }, animationDelay);
      } else {
        setCardToDisplay(selectedCard);
        setIsActive(true);
      }
    } else {
      setIsActive(false);
      setTimeout(() => setCardToDisplay(null), animationDelay);
    }
  }, [selectedCard]);

  return (
    <div
      className={`
        absolute inset-0 z-50 flex items-center justify-center
        transition-all duration-${animationDelay.toString()} ease-out
      `}
    >
      {cardToDisplay && (
        <button
          className="absolute inset-0 bg-red-800 opacity-0 rounded-3xl hover:opacity-40 z-10 transition-all duration-300"
          onClick={unsetSelectedCard}
        >
          X
        </button>
      )}
      <div
        className={`
          relative w-[400px] h-[600px] =>
          rounded-3xl border border-neutral-800 bg-neutral-950
          shadow-2xl p-6 flex flex-col gap-6
          transition-all duration-${animationDelay.toString()} ease-out
          ${
            isActive && cardToDisplay
              ? "opacity-[0.98] scale-100 rotate-y-0"
              : "opacity-0 scale-50 -rotate-y-90"
          }
        `}
      >
        {cardToDisplay && (
          <>
            <div className="w-full h-[280px] flex items-center justify-center rounded-2xl bg-neutral-900">
              <img
                src={`${cardToDisplay.name
                  .toLowerCase()
                  .replaceAll(" ", "-")}.png`}
                alt={cardToDisplay.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex-1 flex flex-col gap-4 text-neutral-200">
              <div className="border-b border-neutral-800 pb-2">
                <h2 className="text-2xl font-semibold tracking-wide">
                  {cardToDisplay.name}
                </h2>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">
                  {cardToDisplay.principle}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-neutral-400">Color</span>
                  <div className="mt-1 font-medium">{cardToDisplay.color}</div>
                </div>

                <div>
                  <span className="text-neutral-400">Cost</span>
                  <div className="mt-1 font-medium capitalize">
                    {cardToDisplay.cost.value} · {cardToDisplay.cost.type}
                  </div>
                </div>

                <div>
                  <span className="text-neutral-400">Domain</span>
                  <div className="mt-1 font-medium capitalize">
                    {cardToDisplay.domain.preferredZones.join(", ")}
                  </div>
                </div>

                <div>
                  <span className="text-neutral-400">Amplification</span>
                  <div className="mt-1 font-medium">
                    ×{cardToDisplay.domain.amplification}
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-3 text-xs grid grid-cols-3 gap-2 text-neutral-300">
                <div>
                  Unique:{" "}
                  <span
                    className={
                      cardToDisplay.constraints.unique
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {String(cardToDisplay.constraints.unique)}
                  </span>
                </div>
                <div>
                  Irreversible:{" "}
                  <span
                    className={
                      cardToDisplay.constraints.irreversible
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {String(cardToDisplay.constraints.irreversible)}
                  </span>
                </div>
                <div>
                  Stackable:{" "}
                  <span
                    className={
                      cardToDisplay.constraints.stackable
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {String(cardToDisplay.constraints.stackable)}
                  </span>
                </div>
              </div>
              <div className="mt-auto text-xs text-neutral-400 italic">
                Bah tche
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
