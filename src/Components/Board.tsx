"use client";

export default function Board() {
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
        hexes.push({ q, r, s, ...axialToPixel(q, r) });
      }
    }
  }

  return (
    <svg width="720" height="700" viewBox="-300 -300 600 600">
      <defs>
        <polygon id="hex-shape" points={hexPoints} />
      </defs>

      {hexes.map((hex) => {
        const isCenter =
          Math.max(Math.abs(hex.q), Math.abs(hex.r), Math.abs(hex.s)) <= 1;

        const isEdge =
          Math.max(Math.abs(hex.q), Math.abs(hex.r), Math.abs(hex.s)) == radius;

        let fillClass =
          "fill-boardInnerRing stroke-purple-900 " +
          "drop-shadow-[0_0_6px_rgba(80,50,150,0.3)] " +
          "hover:scale-110 hover:drop-shadow-[0_0px_6px_rgba(140,90,220,0.5)]";

        if (isEdge)
          fillClass =
            "fill-boardEdge stroke-neutral-800 " +
            "drop-shadow-[0_0px_4px_rgba(0,0,0,0.9)] " +
            "hover:fill-neutral-800 hover:scale-105";

        if (isCenter)
          fillClass =
            "fill-boardCenter stroke-red-900 " +
            "drop-shadow-[0_0_4px_rgba(200,40,80,0.7)] " +
            "hover:scale-115 hover:drop-shadow-[0_0px_6px_rgba(220,60,100,0.9)]";

        return (
          <g
            key={`${hex.q}-${hex.r}`}
            transform={`translate(${hex.x}, ${hex.y})`}
            className="group"
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.parentNode?.appendChild(target);
            }}
          >
            <use
              href="#hex-shape"
              className={`scale-90 transition-transform transition-color duration-200 ease-in-out hover:scale-110 ${fillClass}`}
              strokeWidth="2"
            />
            <circle
              cx="0"
              cy="0"
              r="10"
              z={200}
              className="fill-neutral-400/10 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"
            />
          </g>
        );
      })}
    </svg>
  );
}
