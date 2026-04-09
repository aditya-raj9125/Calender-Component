'use client';

import React from 'react';

/**
 * Realistic Wire-O spiral binding.
 * 
 * The trick to making spirals look REAL vs flat ovals:
 * Each wire coil is drawn in 3 layers:
 *   1. Back arc (behind paper, arcs upward — visible above paper edge)
 *   2. Front arc (in front of paper, curves down — visible on paper surface)
 *   3. Crossing patch — a short segment of back wire drawn ON TOP of front 
 *      wire at the RIGHT junction. This creates opposing overlaps:
 *      • Left junction: front wire over back = wire emerges from behind
 *      • Right junction: back wire over front = wire goes behind
 *      = TRUE SPIRAL / HELIX crossing illusion
 */
export default function SpiralBind() {
  const coilCount = 17;
  const spacing = 34;
  const pad = 14;
  const totalWidth = coilCount * spacing + pad * 2;
  const viewH = 60;
  const paperY = 26; // paper top edge — wire goes above/below this line

  return (
    <div
      className="spiral-binding w-full overflow-visible relative z-30 pointer-events-none"
      style={{ height: '46px', marginBottom: '-8px' }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${totalWidth} ${viewH}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Front wire — cylindrical metallic shading (light axis = top) */}
          <linearGradient id="wFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6a6a6a" />
            <stop offset="20%" stopColor="#505050" />
            <stop offset="40%" stopColor="#7a7a7a" />
            <stop offset="50%" stopColor="#8a8a8a" />
            <stop offset="60%" stopColor="#6a6a6a" />
            <stop offset="80%" stopColor="#3a3a3a" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>

          {/* Back wire — darker, recessed */}
          <linearGradient id="wBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="40%" stopColor="#252525" />
            <stop offset="100%" stopColor="#111" />
          </linearGradient>

          {/* Cross-section wire gradient (horizontal, for crossing segments) */}
          <linearGradient id="wCross" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#222" />
            <stop offset="40%" stopColor="#555" />
            <stop offset="60%" stopColor="#444" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>

          {/* Drop shadow — angled light from top-left */}
          <filter id="wireSh" x="-20%" y="-10%" width="140%" height="150%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
            <feOffset dx="1" dy="1.8" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {Array.from({ length: coilCount }).map((_, i) => {
          const cx = pad + i * spacing + spacing / 2;
          const rx = 6.5;        // half-width of the coil
          const twist = 3;       // horizontal perspective offset → 3D tilt

          const arcH = 21;       // how far arcs extend from paper edge
          const backTop = paperY - arcH;
          const frontBot = paperY + arcH + 2; // front slightly larger (perspective)

          // Junction points
          const lx = cx - rx;                // left hole X
          const rrx = cx + rx + twist;       // right hole X (shifted by twist)

          return (
            <g key={i}>
              {/* ── Layer 1: Ambient shadow on paper ── */}
              <ellipse
                cx={cx + 1.5}
                cy={paperY + 4}
                rx={rx + 2}
                ry={2.5}
                fill="rgba(0,0,0,0.06)"
              />

              {/* ── Layer 2: BACK ARC — wire behind paper, arcs upward ── */}
              <path
                d={`M ${lx} ${paperY}
                    C ${lx} ${backTop},
                      ${rrx} ${backTop},
                      ${rrx} ${paperY}`}
                fill="none"
                stroke="url(#wBack)"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              {/* Back arc highlight */}
              <path
                d={`M ${lx + 1.5} ${paperY - 3}
                    C ${lx + 1.5} ${backTop + 5},
                      ${rrx - 1.5} ${backTop + 5},
                      ${rrx - 1.5} ${paperY - 3}`}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.7"
                strokeLinecap="round"
              />

              {/* ── Layer 3: Paper holes ── */}
              <ellipse cx={lx + 0.5} cy={paperY} rx={2.4} ry={1.6} fill="#080604" opacity="0.6" />
              <ellipse cx={rrx - 0.5} cy={paperY} rx={2.4} ry={1.6} fill="#080604" opacity="0.6" />

              {/* ── Layer 4: FRONT ARC — wire in front of paper, curves down ── */}
              <path
                d={`M ${lx} ${paperY}
                    C ${lx} ${frontBot},
                      ${rrx} ${frontBot},
                      ${rrx} ${paperY}`}
                fill="none"
                stroke="url(#wFront)"
                strokeWidth="3.2"
                strokeLinecap="round"
                filter="url(#wireSh)"
              />
              {/* Front arc specular highlight */}
              <path
                d={`M ${cx - 2} ${paperY + 8}
                    C ${cx - 2} ${frontBot - 5},
                      ${cx + 3 + twist * 0.3} ${frontBot - 5},
                      ${cx + 3 + twist * 0.3} ${paperY + 8}`}
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              {/* Left edge highlight on front wire */}
              <path
                d={`M ${lx + 0.8} ${paperY + 5}
                    C ${lx + 0.8} ${frontBot - 4},
                      ${lx + 2} ${frontBot - 4},
                      ${lx + 2} ${paperY + 5}`}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.5"
                strokeLinecap="round"
              />

              {/* ── Layer 5: ★ SPIRAL CROSSING at RIGHT junction ★
                    Short segment of BACK wire drawn ON TOP of front wire.
                    This creates the key visual:
                    • Left side: front over back (from Layer 4 order)
                    • Right side: back over front (this crossing segment)
                    = Wire appears to twist/spiral through the paper! ── */}
              <path
                d={`M ${rrx} ${paperY}
                    C ${rrx} ${paperY - 7},
                      ${rrx - 1.5} ${paperY - 10},
                      ${rrx - 3.5} ${paperY - 14}`}
                fill="none"
                stroke="url(#wCross)"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              {/* Tiny highlight on crossing segment */}
              <path
                d={`M ${rrx - 0.3} ${paperY - 1}
                    C ${rrx - 0.3} ${paperY - 5},
                      ${rrx - 1.5} ${paperY - 7},
                      ${rrx - 3} ${paperY - 10}`}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
