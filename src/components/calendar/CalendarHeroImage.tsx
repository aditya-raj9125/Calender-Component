'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { format } from 'date-fns';
import { MONTH_IMAGES } from '@/lib/constants';
import { useCalendarStore } from '@/store/calendarStore';

function CalendarHeroImageInner() {
  const currentMonth = useCalendarStore((s) => s.currentMonth);
  const reducedMotion = useReducedMotion();
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();
  const image = MONTH_IMAGES[month];
  const key = `${year}-${month}`;

  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-[var(--radius-calendar)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={reducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 40vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Chevron badge */}
      <div className="absolute bottom-0 right-0 z-10">
        <svg
          viewBox="0 0 200 160"
          className="w-[140px] h-[112px] md:w-[180px] md:h-[144px] lg:w-[200px] lg:h-[160px]"
          preserveAspectRatio="xMaxYMax meet"
        >
          <polygon
            points="40,0 200,0 200,160 0,160 100,80"
            fill="var(--color-accent)"
          />
          <text
            x="140"
            y="70"
            textAnchor="middle"
            fill="white"
            fontSize="16"
            fontFamily="var(--font-mono)"
            letterSpacing="4"
          >
            {year}
          </text>
          <text
            x="140"
            y="110"
            textAnchor="middle"
            fill="white"
            fontSize="28"
            fontWeight="bold"
            fontFamily="var(--font-display)"
            letterSpacing="2"
          >
            {format(currentMonth, 'MMM').toUpperCase()}
          </text>
        </svg>
      </div>

      {/* Credit */}
      <span className="absolute bottom-2 left-3 text-[10px] text-white/60 font-ui">
        Photo: {image.credit}
      </span>
    </div>
  );
}

const CalendarHeroImage = memo(CalendarHeroImageInner);
export default CalendarHeroImage;
