'use client';

import React from 'react';
import { useCalendarStore } from '@/store/calendarStore';

/**
 * Clean wall background with subtle texture and a nail/pin mounting point.
 * Matches the reference: light gray wall, soft shadow, centered nail.
 */
export default function WallBackground() {
  const theme = useCalendarStore((s) => s.theme);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      {/* Base wall color — clean, minimal */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          backgroundColor: theme === 'light' ? '#E4DDD4' : '#141210',
        }}
      />

      {/* Subtle plaster grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
        }}
      />

      {/* Soft directional light from top */}
      <div
        className="absolute inset-0"
        style={{
          background: theme === 'light'
            ? 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.04) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.12) 100%)',
        }}
      />

      {/* Vignette — subtle darker edges */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 75% 70% at 50% 45%, transparent 0%, rgba(0,0,0,0.08) 100%)',
        }}
      />

      {/* Nail / pin at center-top of page */}
      <div className="absolute left-1/2 -translate-x-1/2 top-3 sm:top-5 md:top-7 flex flex-col items-center z-10">
        {/* Nail shadow on wall */}
        <div
          className="w-5 h-2 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)',
            transform: 'translateY(6px)',
          }}
        />
        {/* Nail head */}
        <div
          className="w-2.5 h-2.5 rounded-full relative"
          style={{
            background: theme === 'light'
              ? 'radial-gradient(circle at 35% 35%, #BBB, #777 50%, #555 100%)'
              : 'radial-gradient(circle at 35% 35%, #666, #444 50%, #333 100%)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          <div className="absolute w-0.5 h-0.5 rounded-full bg-white/30 top-[2px] left-[3px]" />
        </div>
        {/* String/wire from nail down to calendar */}
        <div
          className="w-px"
          style={{
            height: '14px',
            background: theme === 'light'
              ? 'linear-gradient(to bottom, #999, #BBB, transparent)'
              : 'linear-gradient(to bottom, #555, #777, transparent)',
          }}
        />
      </div>
    </div>
  );
}
