'use client';

import React from 'react';

/**
 * Realistic Wire-O spiral binding matching a traditional wall calendar.
 * Dark metal wire coils loop through holes in the paper — 
 * top half arcs upward behind paper, bottom half curves down in front.
 */
export default function SpiralBind() {
  const coilCount = 15;
  const spacing = 40;
  const pad = 30;
  const totalWidth = coilCount * spacing + pad * 2;
  const viewH = 64;
  const paperY = 30; // Y position of paper top edge

  return (
    <div
      className="spiral-binding w-full overflow-visible relative z-30 pointer-events-none"
      style={{ height: '48px', marginBottom: '-12px' }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${totalWidth} ${viewH}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Dark metallic wire gradient — front facing */}
          <linearGradient id="wireFront" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="18%" stopColor="#555" />
            <stop offset="35%" stopColor="#888" />
            <stop offset="50%" stopColor="#999" />
            <stop offset="65%" stopColor="#888" />
            <stop offset="82%" stopColor="#555" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>

          {/* Back wire gradient — darker */}
          <linearGradient id="wireBack" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#111" />
            <stop offset="50%" stopColor="#333" />
            <stop offset="100%" stopColor="#111" />
          </linearGradient>

          {/* Shadow for front coil on paper */}
          <filter id="coilDrop" x="-30%" y="-20%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
            <feOffset dx="1" dy="2" result="s" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Hole inner shadow */}
          <radialGradient id="holeGrad" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#1a1410" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#333" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {Array.from({ length: coilCount }).map((_, i) => {
          const cx = pad + i * spacing + spacing / 2;
          const rx = 7.5;   // coil half-width
          const twist = 2;  // 3D perspective shift

          // Control point heights for bezier arcs
          const backPeakY = paperY - 26;  // how far up the back arc goes
          const frontPeakY = paperY + 28; // how far down the front arc goes

          return (
            <g key={i}>
              {/* 1. Shadow on paper surface from front coil */}
              <ellipse
                cx={cx + 2}
                cy={paperY + 4}
                rx={rx + 2}
                ry={3}
                fill="rgba(0,0,0,0.12)"
              />

              {/* 2. BACK ARC — wire behind paper, arcs upward (visible above paper edge) */}
              <path
                d={`M ${cx - rx} ${paperY}
                    C ${cx - rx} ${backPeakY},
                      ${cx + rx + twist} ${backPeakY},
                      ${cx + rx + twist} ${paperY}`}
                fill="none"
                stroke="url(#wireBack)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* 3. Back arc highlight — subtle shine on back wire */}
              <path
                d={`M ${cx - rx + 2} ${paperY - 2}
                    C ${cx - rx + 2} ${backPeakY + 6},
                      ${cx + rx + twist - 2} ${backPeakY + 6},
                      ${cx + rx + twist - 2} ${paperY - 2}`}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeLinecap="round"
              />

              {/* 4. Holes in paper where wire passes through */}
              <ellipse
                cx={cx - rx + 0.5}
                cy={paperY}
                rx={3}
                ry={2.2}
                fill="url(#holeGrad)"
              />
              <ellipse
                cx={cx + rx + twist - 0.5}
                cy={paperY}
                rx={3}
                ry={2.2}
                fill="url(#holeGrad)"
              />

              {/* 5. FRONT ARC — wire loops down in front of paper, with shadow */}
              <path
                d={`M ${cx - rx} ${paperY}
                    C ${cx - rx} ${frontPeakY},
                      ${cx + rx + twist} ${frontPeakY},
                      ${cx + rx + twist} ${paperY}`}
                fill="none"
                stroke="url(#wireFront)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#coilDrop)"
              />

              {/* 6. Primary specular highlight on front arc */}
              <path
                d={`M ${cx - 3} ${paperY + 8}
                    C ${cx - 3} ${frontPeakY - 4},
                      ${cx + 4 + twist * 0.4} ${frontPeakY - 4},
                      ${cx + 4 + twist * 0.4} ${paperY + 8}`}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* 7. Edge highlight — left side of front wire */}
              <path
                d={`M ${cx - rx + 0.5} ${paperY + 4}
                    C ${cx - rx + 0.5} ${frontPeakY - 6},
                      ${cx - rx + 2} ${frontPeakY - 6},
                      ${cx - rx + 2} ${paperY + 4}`}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.6"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
