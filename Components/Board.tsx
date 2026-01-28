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
          "fill-purple-900 hover:fill-purple-800 stroke-purple-800";
        if (isEdge)
          fillClass =
            "fill-neutral-900 hover:fill-neutral-800 stroke-neutral-800";
        if (isCenter)
          fillClass = "fill-red-900 hover:fill-red-800 stroke-red-800";

        return (
          <g
            key={`${hex.q}-${hex.r}`}
            transform={`translate(${hex.x}, ${hex.y})`}
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
            <text
              className="fill-red-200 text-[8px] pointer-events-none"
              textAnchor="middle"
              dy="4"
            >
              {hex.q},{hex.r}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
