"use client";

import { useCards } from "../store/cardsStore";

export default function ExtendedCard() {
  const { selectedCard, unsetSelectedCard } = useCards();
  const isActive = Boolean(selectedCard);

  return (
    <div
      className={`
        absolute inset-0 z-50 flex items-center justify-center
        transition-all duration-200 ease-out
      `}
    >
      {selectedCard && (
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
          transition-all duration-300 ease-out
          ${
            isActive
              ? "opacity-[0.98] translate-y-0 scale-100"
              : "opacity-0 -translate-y-12 scale-[1.06]"
          }
        `}
      >
        {selectedCard && (
          <>
            <div className="w-full h-[280px] flex items-center justify-center rounded-2xl bg-neutral-900">
              <img
                src={`${selectedCard.name.toLowerCase().replaceAll(" ", "-")}.png`}
                alt={selectedCard.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex-1 flex flex-col gap-4 text-neutral-200">
              <div className="border-b border-neutral-800 pb-2">
                <h2 className="text-2xl font-semibold tracking-wide">
                  {selectedCard.name}
                </h2>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">
                  {selectedCard.principle}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-neutral-400">Color</span>
                  <div className="mt-1 font-medium">{selectedCard.color}</div>
                </div>

                <div>
                  <span className="text-neutral-400">Cost</span>
                  <div className="mt-1 font-medium">
                    {selectedCard.cost.value} · {selectedCard.cost.type}
                  </div>
                </div>

                <div>
                  <span className="text-neutral-400">Domain</span>
                  <div className="mt-1 font-medium">
                    {selectedCard.domain.preferredZones.join(", ")}
                  </div>
                </div>

                <div>
                  <span className="text-neutral-400">Amplification</span>
                  <div className="mt-1 font-medium">
                    ×{selectedCard.domain.amplification}
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-3 text-xs grid grid-cols-3 gap-2 text-neutral-300">
                <div>
                  Unique:{" "}
                  <span
                    className={
                      selectedCard.constraints.unique
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  >
                    {String(selectedCard.constraints.unique)}
                  </span>
                </div>
                <div>
                  Irreversible:{" "}
                  <span
                    className={
                      selectedCard.constraints.irreversible
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  >
                    {String(selectedCard.constraints.irreversible)}
                  </span>
                </div>
                <div>
                  Stackable:{" "}
                  <span
                    className={
                      selectedCard.constraints.stackable
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {String(selectedCard.constraints.stackable)}
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
