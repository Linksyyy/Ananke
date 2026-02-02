import React from "react";

interface PieceProps {
  card: {
    name: string;
    id: string;
    color?: string;
  };
}

const Piece: React.FC<PieceProps> = React.memo(({ card }) => {
  let formaSVG;
  const commonProps = {
    className:
      "fill-current text-white drop-shadow-md transition-all duration-300",
    stroke: "currentColor",
    strokeWidth: "1.2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (card.name.toLowerCase()) {
    case "lattice":
      formaSVG = (
        <g
          className="fill-current text-neutral-600 dark:text-neutral-400 drop-shadow-md"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M-10 12 h20 v-20 h-20 z" fill="#4E4B48" />
          <rect x="-8" y="-6" width="16" height="4" fill="#3A3835" />
          <rect x="-8" y="-12" width="16" height="4" fill="#3A3835" />
          <g className="fill-neutral-700" strokeWidth="0">
            <circle cx="-8" cy="12" r="1.5" />
            <circle cx="8" cy="12" r="1.5" />
          </g>
          <circle
            cx="0"
            cy="-14"
            r="2"
            className="fill-neutral-700"
            stroke="white"
            strokeWidth="0.5"
          />
        </g>
      );
      break;

    case "antinomy":
      formaSVG = (
        <g className="fill-current" strokeWidth="0">
          <path
            d="M-14 14 L0 -14 L14 14 Z"
            className="fill-white drop-shadow-md"
          />

          <path
            d="M-14 -14 L0 14 L14 -14 Z"
            className="fill-slate-900 drop-shadow-md"
          />

          <circle cx="0" cy="0" r="2.5" className="fill-gray-500" />
        </g>
      );
      break;

    case "attrition":
      formaSVG = (
        <g
          className="fill-current text-purple-600 dark:text-purple-400"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Forma principal erodida */}
          <path
            d="M-10 10 L0 -10 L10 10 L6 10 L4 4 L-4 4 L-6 10 Z"
            className="fill-purple-700 opacity-80"
          />

          {/* Fragmentos/Erosão */}
          <g strokeWidth="0.5" className="opacity-60">
            <path d="M-12 12 L-10 10 L-14 8 Z" />
            <path d="M12 12 L10 10 L14 8 Z" />
            <path d="M0 -10 L2 -12 L-2 -12 Z" />
            <line x1="-4" y1="4" x2="-6" y2="2" />
            <line x1="4" y1="4" x2="6" y2="2" />
          </g>

          {/* Brilho do núcleo de energia */}
          <circle
            cx="0"
            cy="-6"
            r="1.5"
            className="fill-white drop-shadow-[0_0_4px_rgba(192,132,252,0.9)]"
          />
        </g>
      );
      break;

    case "rubra":
      formaSVG = (
        <g {...commonProps} className="text-red-600 dark:text-red-400">
          <circle r="3" cx="0" cy="4" className="fill-red-500 animate-pulse" />
          <path
            d="M0 4 C-2 -2 -12 -5 -10 -12 M0 4 C2 -2 12 -5 10 -12 M0 1 C-2 10 1 6 -10 -20 M0 4 C5 4 -2 6 10 -20 M0 4 C-2 -8 4 -10 0 -18"
            fill="none"
            strokeWidth="1.6"
            className="drop-shadow-[0_0_2px_rgba(255,0,0,0.5)]"
          />
          <g className="fill-current">
            <circle cx="-10" cy="-12" r="1.2" />
            <circle cx="10" cy="-12" r="1.2" />
            <circle cx="0" cy="-18" r="1.5" />
            <circle cx="-10" cy="-20" r="1" />
            <circle cx="10" cy="-20" r="1" />
          </g>
          <circle
            r="15"
            className="fill-none stroke-red-500/30"
            strokeDasharray="1 5"
            strokeWidth="0.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 0"
              to="360 0 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      );
      break;

    case "schism":
      formaSVG = (
        <g
          className="fill-current text-gray-700 dark:text-gray-300 drop-shadow-md"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M-10 12 L-2 -10 L-2 12 Z"
            className="fill-gray-600 dark:fill-gray-400"
          />
          <path
            d="M10 12 L2 -10 L2 12 Z"
            className="fill-gray-600 dark:fill-gray-400"
          />

          <g className="fill-none stroke-white/50 dark:stroke-black/50 stroke-0.5">
            <line x1="-6" y1="2" x2="-2" y2="2" />
            <line x1="6" y1="2" x2="2" y2="2" />
            <line x1="-6" y1="-2" x2="-2" y2="-2" />
            <line x1="6" y1="-2" x2="2" y2="-2" />
          </g>
        </g>
      );
      break;

    case "telluric":
      formaSVG = (
        <g
          className="fill-current text-gray-700 dark:text-gray-400 drop-shadow-md"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M-12 10 Q-15 -5 0 -14 Q15 -5 12 10 Z" fill="#545b4c" />
          <circle
            cx="0"
            cy="-6"
            r="6"
            fill="#3a5f3a"
            stroke="white"
            strokeWidth="1"
          />
          <circle cx="0" cy="-6" r="3" fill="white" strokeWidth="0.5" />
        </g>
      );
      break;

    case "tesseract":
      formaSVG = (
        <g {...commonProps} className="animate-[pulse_3s_ease-in-out_infinite]">
          <path
            d="M-10 -10 L10 -10 L10 10 L-10 10 Z"
            className="fill-none stroke-cyan-400"
            strokeWidth="1"
          />
          <path
            d="M-4 -4 L4 -4 L4 4 L-4 4 Z"
            className="fill-cyan-500/20 stroke-cyan-300"
            strokeWidth="0.8"
          />
          <g className="stroke-cyan-200/50" strokeWidth="0.5">
            <line x1="-10" y1="-10" x2="-4" y2="-4" />
            <line x1="10" y1="-10" x2="4" y2="-4" />
            <line x1="10" y1="10" x2="4" y2="4" />
            <line x1="-10" y1="10" x2="-4" y2="4" />
          </g>
          <circle
            r="1.5"
            cx="0"
            cy="0"
            className="fill-white shadow-lg shadow-cyan-500"
          />
        </g>
      );
      break;
    case "null":
      formaSVG = (
        <g
          className="fill-current text-slate-800 dark:text-slate-200"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M-14 14 L-7 0 L-14 -14 Z"
            className="fill-slate-700 dark:fill-slate-300"
          />
          <path
            d="M14 14 L7 0 L14 -14 Z"
            className="fill-slate-700 dark:fill-slate-300"
          />
          <path
            d="M0 -14 L-7 0 L7 0 Z"
            className="fill-slate-600 dark:fill-slate-400"
          />
          <path
            d="M0 14 L-7 0 L7 0 Z"
            className="fill-slate-600 dark:fill-slate-400"
          />

          <g className="fill-none stroke-black dark:stroke-white stroke-0.5">
            <line x1="-7" y1="0" x2="7" y2="0" />
            <line x1="-7" y1="0" x2="0" y2="-14" />
            <line x1="-7" y1="0" x2="0" y2="14" />
            <line x1="7" y1="0" x2="0" y2="-14" />
            <line x1="7" y1="0" x2="0" y2="14" />
          </g>
        </g>
      );
      break;

    default:
      formaSVG = (
        <circle
          r="10"
          className="fill-blue-500"
          stroke="white"
          strokeWidth="2"
        />
      );
  }

  return (
    <g className="pointer-events-none">
      1
      <circle r="14" className="fill-black/20 blur-[2px]" />
      {formaSVG}
      <text
        y="18"
        textAnchor="middle"
        className="fill-white font-bold tracking-tighter select-none"
        style={{ fontSize: "6px", textShadow: "1px 1px 2px black" }}
      >
        {card.id.substring(0, 4)}
      </text>
    </g>
  );
});

export default Piece;
