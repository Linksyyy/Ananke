"use client";

import { useEffect, useState } from "react";
import { useCards } from "../store/cardsStore";
import Piece from "./Piece";

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
    <div className="absolute right-5 flex justify-center items-center w-100 h-7/10 my-20 bg-neutral-900 mx-10 rounded-4xl shadow-2xl overflow-hidden">
      <div className="relative bg-neutral-950 flex flex-col w-[92%] h-[95%] rounded-3xl p-6 text-neutral-200">
        {!cardToDisplay && (
          <div className="flex flex-col h-full justify-center items-center text-center">
            <h1 className="text-gray-200 text-sm font-medium mb-1">
              Select a card to view details
            </h1>
            <h2 className="text-gray-500 text-[11px] font-mono tracking-tight uppercase flex items-center gap-1">
              Press <span className="text-gray-300 font-bold">[0-9]</span> to pick •
              <span className="text-gray-300 font-bold"> [X]</span> to deselect
            </h2>
          </div>
        )}

        {cardToDisplay && (
          <div
            className={`
              flex flex-col gap-6 h-full
              transition-opacity duration-${animationDelay.toString()} ease-out
              ${isActive ? "opacity-100" : "opacity-0"}
            `}
          >
            <button
              className="absolute inset-0 bg-red-800 opacity-0 hover:opacity-40 rounded-3xl text-white text-xs flex items-center justify-center transition-opacity duration-200"
              onClick={unsetSelectedCard}
            >
              X
            </button>
            
            <div className="w-full h-[240px] flex items-center justify-center rounded-xl bg-neutral-900">
              <img
                src={`${cardToDisplay.name
                  .toLowerCase()
                  .replaceAll(" ", "-")}.png`}
                alt={cardToDisplay.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex-1 flex flex-col gap-4">
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
                  <span className="text-neutral-400">Piece</span>
                  <div className="mt-1 font-medium bg-neutral-800 justify-center flex p-1 rounded-md">
                    <svg className="w-20 h-20" viewBox="-25 -25 50 50">
                      <Piece card={cardToDisplay} />
                    </svg>
                  </div>
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
              <div className="mt-auto text-xs text-neutral-400 italic text-left">
                Bah tche
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
