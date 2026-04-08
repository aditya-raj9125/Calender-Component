'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { useCalendarStore } from '@/store/calendarStore';

export default function CalendarHeader() {
  const currentMonth = useCalendarStore((s) => s.currentMonth);
  const navigateMonth = useCalendarStore((s) => s.navigateMonth);
  const goToToday = useCalendarStore((s) => s.goToToday);
  const reducedMotion = useReducedMotion();
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    navigateMonth('prev');
  };

  const handleNext = () => {
    setDirection(1);
    navigateMonth('next');
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  const monthKey = format(currentMonth, 'yyyy-MM');

  return (
    <div className="flex items-center justify-between px-2 py-3 md:py-4">
      {/* Prev button */}
      <motion.button
        onClick={handlePrev}
        className="flex items-center justify-center w-10 h-10 rounded-full
                   text-[var(--color-ink)] hover:bg-[var(--color-selection-mid)]
                   transition-colors outline-none focus-visible:ring-2
                   focus-visible:ring-[var(--color-accent)] cursor-pointer"
        whileHover={reducedMotion ? undefined : { scale: 1.1 }}
        whileTap={reducedMotion ? undefined : { scale: 0.95 }}
        aria-label={`Navigate to previous month`}
      >
        <ChevronLeft size={20} />
      </motion.button>

      {/* Month + Year display */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden h-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.h2
            key={monthKey}
            custom={direction}
            variants={reducedMotion ? undefined : variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeInOut' }}
            className="absolute font-display text-xl md:text-2xl font-bold tracking-tight text-[var(--color-ink)]"
          >
            {format(currentMonth, 'MMMM yyyy')}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Today button */}
      <motion.button
        onClick={goToToday}
        className="mr-2 px-3 py-1 text-xs font-mono font-medium rounded-full
                   bg-[var(--color-accent)] text-white
                   hover:opacity-90 transition-opacity
                   outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
                   cursor-pointer"
        whileHover={reducedMotion ? undefined : { scale: 1.05 }}
        whileTap={reducedMotion ? undefined : { scale: 0.95 }}
        aria-label="Navigate to current month"
      >
        Today
      </motion.button>

      {/* Next button */}
      <motion.button
        onClick={handleNext}
        className="flex items-center justify-center w-10 h-10 rounded-full
                   text-[var(--color-ink)] hover:bg-[var(--color-selection-mid)]
                   transition-colors outline-none focus-visible:ring-2
                   focus-visible:ring-[var(--color-accent)] cursor-pointer"
        whileHover={reducedMotion ? undefined : { scale: 1.1 }}
        whileTap={reducedMotion ? undefined : { scale: 0.95 }}
        aria-label={`Navigate to next month`}
      >
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );
}
