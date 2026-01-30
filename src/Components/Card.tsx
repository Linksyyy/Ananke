"use client";

export default function Card({
  card,
  isHovered,
}: {
  card: Card;
  isHovered: boolean;
}) {
  return (
    <div className="group h-72 w-48 rounded-2xl p-2">
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity ${
          isHovered ? "opacity-10 blur-md" : "opacity-10"
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
}
