"use client";

export default function Board() {
  const radius = 4;
  const scale = 1;
  const size = 32 * scale;

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
        hexes.push({ q, r, ...axialToPixel(q, r) });
      }
    }
  }

  return (
    <svg width="650" height="500" viewBox="-300 -300 600 600">
      <defs>
        <polygon
          id="hex-shape"
          points={`${scale * 25.98}, ${scale * -15} ${scale * 25.98},${scale * 15} 0,${scale * 30} ${scale * -25.98},${scale * 15} ${scale * -25.98},${scale * -15} 0,${scale * -30}`}
        />
      </defs>

      {hexes.map((hex) => (
        <g
          key={`${hex.q}-${hex.r}`}
          transform={`translate(${hex.x}, ${hex.y})`}
        >
          <use
            href="#hex-shape"
            className="fill-purple-900 stroke-purple-950 hover:fill-purple-600 hover:size-w-100 transition-colors duration-200"
            strokeWidth="2"
          />
          <text className="fill-red-200 text-[8px]" textAnchor="middle" dy="4">
            {hex.q},{hex.r}
          </text>
        </g>
      ))}
    </svg>
  );
}
