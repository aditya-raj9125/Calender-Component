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
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={reducedMotion ? undefined : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, 560px"
          />
          {/* Gradient overlay for text readability at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Inspirational quote overlay — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-4 pb-14 sm:pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={key + '-quote'}
            initial={reducedMotion ? undefined : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reducedMotion ? undefined : { y: -8, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, delay: 0.15, ease: 'easeOut' }}
          >
            <p className="font-display text-white text-xs sm:text-sm leading-snug italic drop-shadow-lg max-w-[65%]">
              {image.quote}
            </p>
            <span className="block mt-1 text-white/60 text-[10px] sm:text-xs font-ui tracking-wide">
              {image.author}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Chevron badge — year + month in bottom right */}
      <div className="absolute bottom-0 right-0 z-10">
        <svg
          viewBox="0 0 200 160"
          className="w-[110px] h-[88px] sm:w-[150px] sm:h-[120px]"
          preserveAspectRatio="xMaxYMax meet"
        >
          <polygon
            points="50,0 200,0 200,160 0,160 110,80"
            fill="var(--color-accent)"
          />
          <text
            x="140"
            y="68"
            textAnchor="middle"
            fill="white"
            fontSize="15"
            fontFamily="var(--font-mono)"
            letterSpacing="3"
          >
            {year}
          </text>
          <text
            x="140"
            y="108"
            textAnchor="middle"
            fill="white"
            fontSize="26"
            fontWeight="bold"
            fontFamily="var(--font-display)"
            letterSpacing="2"
          >
            {format(currentMonth, 'MMMM').toUpperCase()}
          </text>
        </svg>
      </div>

      {/* Photo credit */}
      <span className="absolute top-2 left-2 text-[9px] text-white/40 font-ui z-10">
        Photo: {image.credit}
      </span>
    </div>
  );
}

const CalendarHeroImage = memo(CalendarHeroImageInner);
export default CalendarHeroImage;
