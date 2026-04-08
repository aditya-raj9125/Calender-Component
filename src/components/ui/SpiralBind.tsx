'use client';

import React from 'react';

export default function SpiralBind() {
  const loopCount = 20; 
  const spacing = 48;
  const totalWidth = loopCount * spacing;

  return (
    <div className="spiral-binding w-full overflow-hidden absolute top-0 left-0 right-0 h-10 z-30 pointer-events-none" aria-hidden="true">
      <svg
        viewBox={`0 0 ${totalWidth} 60`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Main metallic gradient - directional light from top-left */}
          <linearGradient id="ringFrontGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#333" />
            <stop offset="15%" stopColor="#666" />
            <stop offset="30%" stopColor="#bbb" />
            <stop offset="45%" stopColor="#fff" />
            <stop offset="55%" stopColor="#fff" />
            <stop offset="70%" stopColor="#bbb" />
            <stop offset="85%" stopColor="#666" />
            <stop offset="100%" stopColor="#333" />
          </linearGradient>

          {/* Darker gradient for the back of the rings */}
          <linearGradient id="ringBackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#111" />
            <stop offset="50%" stopColor="#333" />
            <stop offset="100%" stopColor="#111" />
          </linearGradient>

          {/* Directional cast shadow on paper */}
          <filter id="castShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="2" dy="3" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Contact shadow (Ambient Occlusion) at the holes */}
          <radialGradient id="contactShadowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          {/* Hole inner shadow for depth */}
          <filter id="deepHole" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
            <feOffset dx="0" dy="1.5" />
            <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {Array.from({ length: loopCount }).map((_, i) => {
          const x = i * spacing + 24;
          const twist = 2; // Spiral twist offset

          return (
            <g key={i}>
              {/* 1. Contact shadow at the base */}
              <ellipse
                cx={x}
                cy="14"
                rx="10"
                ry="6"
                fill="url(#contactShadowGrad)"
              />

              {/* 2. The "Back" part of the ring loop (behind the paper/visible in hole) */}
              <path
                d={`M ${x - 9} 12 C ${x - 9} -8, ${x + 9 + twist} -8, ${x + 9 + twist} 12`}
                fill="none"
                stroke="url(#ringBackGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* 3. The Hole in the paper */}
              <ellipse
                cx={x}
                cy="12"
                rx="7"
                ry="4"
                fill="#000"
                filter="url(#deepHole)"
              />

              {/* 4. The "Front" part of the ring loop (casting shadow) */}
              <path
                d={`M ${x - 9} 12 C ${x - 9} 50, ${x + 9 + twist} 50, ${x + 9 + twist} 12`}
                fill="none"
                stroke="url(#ringFrontGrad)"
                strokeWidth="3.8"
                strokeLinecap="round"
                filter="url(#castShadow)"
              />

              {/* 5. Sharp Specular Highlight on front part */}
              <path
                d={`M ${x - 6} 30 C ${x - 6} 42, ${x + 3} 42, ${x + 3} 30`}
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* 6. Subtle internal highlight on the top curve */}
              <path
                d={`M ${x - 7} 35 C ${x - 7} 45, ${x - 2} 45, ${x - 2} 35`}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
