'use client';

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCalendarStore } from '@/store/calendarStore';
import { useCalendar } from '@/hooks/useCalendar';
import { MONTH_TINTS } from '@/lib/constants';
import { formatDateKey } from '@/lib/dateUtils';
import SpiralBind from '@/components/ui/SpiralBind';
import PaperTexture from '@/components/ui/PaperTexture';
import ThemeToggle from '@/components/ui/ThemeToggle';
import CalendarHeroImage from './CalendarHeroImage';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import CalendarNotes from './CalendarNotes';
import CalendarRangeBar from './CalendarRangeBar';

export default function CalendarRoot() {
  const currentMonth = useCalendarStore((s) => s.currentMonth);
  const theme = useCalendarStore((s) => s.theme);
  const direction = useCalendarStore((s) => (s as any).direction); // Cast since I added it to ExtendedState
  const reducedMotion = useReducedMotion();
  const { grid, month } = useCalendar();

  // Track which dates have notes via localStorage keys scan
  const [noteKeys, setNoteKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const keys = new Set<string>();
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('calendar-range-')) {
          const val = localStorage.getItem(key);
          if (val && JSON.parse(val)) {
            const datesPart = key.replace('calendar-range-', '');
            const [start, end] = datesPart.split(':');
            if (start && start !== 'none') keys.add(start);
            if (end && end !== 'none') keys.add(end);
          }
        }
      }
    } catch {
      // ignore
    }
    setNoteKeys(keys);
  }, [currentMonth]);

  const tint = MONTH_TINTS[month];

  // Mobile notes bottom sheet
  const [mobileNotesOpen, setMobileNotesOpen] = useState(false);

  return (
    <motion.div
      initial={reducedMotion ? undefined : { y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' }}
      className="relative w-full max-w-[1400px] mx-auto"
      data-month={month}
      style={{
        // Subtle monthly tint
        ['--month-tint' as string]: theme === 'light' ? tint?.light : tint?.dark,
      }}
    >
      {/* Paper card container */}
      <div
        className="relative bg-[var(--color-paper)] rounded-[1.25rem] overflow-hidden
                    shadow-[0_8px_40px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]"
      >
        <PaperTexture />

        {/* Spiral binding at top */}
        <SpiralBind />

        {/* Theme toggle */}
        <div className="absolute top-12 right-4 z-20">
          <ThemeToggle />
        </div>

        {/* Animated content area */}
        <div style={{ perspective: '2000px' }}>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={currentMonth.getTime()}
              custom={direction}
              variants={{
                initial: (dir: number) => ({
                  rotateX: dir > 0 ? 80 : -80,
                  opacity: 0,
                  z: -200,
                  y: dir > 0 ? 100 : -100,
                }),
                animate: {
                  rotateX: 0,
                  opacity: 1,
                  z: 0,
                  y: 0,
                },
                exit: (dir: number) => ({
                  rotateX: dir > 0 ? -80 : 80,
                  opacity: 0,
                  z: -200,
                  y: dir > 0 ? -100 : 100,
                }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.7,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.4 }
              }}
              style={{
                transformOrigin: 'top center',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Desktop layout: side-by-side */}
              <div className="hidden lg:flex relative z-10">
                {/* Left panel — Hero */}
                <div className="w-[40%] p-8 border-r border-[var(--color-grid-line)]">
                  <CalendarHeroImage />
                </div>

                {/* Right panel — Header + Grid + Range Bar + Notes */}
                <div className="w-[60%] p-8 flex flex-col">
                  <CalendarHeader />
                  <CalendarRangeBar />
                  <div className="flex-1">
                    <CalendarGrid noteKeys={noteKeys} />
                  </div>
                  {/* Notes shifted to right side below the dates */}
                  <div className="mt-8 pt-8 border-t border-[var(--color-grid-line)]">
                    <CalendarNotes />
                  </div>
                </div>
              </div>

              {/* Tablet layout */}
              <div className="hidden md:flex lg:hidden flex-col relative z-10">
                <div className="p-4">
                  <CalendarHeroImage />
                </div>
                <div className="px-4 pb-2">
                  <CalendarHeader />
                  <CalendarRangeBar />
                </div>
                <div className="px-4 pb-4">
                  <CalendarGrid noteKeys={noteKeys} />
                </div>
                <div className="px-4 pb-6">
                  <CalendarNotes />
                </div>
              </div>

              {/* Mobile layout */}
              <div className="flex md:hidden flex-col relative z-10">
                <div className="p-3">
                  <CalendarHeroImage />
                </div>
                <div className="px-3 pb-1">
                  <CalendarHeader />
                  <CalendarRangeBar />
                </div>
                <div className="px-2 pb-3">
                  <CalendarGrid noteKeys={noteKeys} />
                </div>

                {/* Mobile notes trigger */}
                <button
                  onClick={() => setMobileNotesOpen(true)}
                  className="mx-3 mb-3 px-4 py-3 rounded-xl bg-[var(--color-card)]
                             border border-[var(--color-grid-line)] text-[var(--color-ink)]
                             font-ui text-sm text-left shadow-sm cursor-pointer
                             hover:bg-[var(--color-selection-mid)] transition-colors"
                  aria-label="Open notes panel"
                >
                  <span className="font-display italic text-[var(--color-ink-muted)]">Notes</span>
                  <span className="text-[var(--color-ink-muted)] ml-2 text-xs">Tap to open</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile bottom sheet for notes */}
      {mobileNotesOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileNotesOpen(false)}
          />
          {/* Sheet */}
          <motion.div
            initial={reducedMotion ? undefined : { y: '100%' }}
            animate={{ y: 0 }}
            exit={reducedMotion ? undefined : { y: '100%' }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: 'easeOut' }}
            className="relative bg-[var(--color-paper)] rounded-t-2xl px-5 py-4
                       max-h-[70vh] overflow-y-auto shadow-2xl"
          >
            {/* Handle bar */}
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 rounded-full bg-[var(--color-ink-muted)] opacity-40" />
            </div>
            <CalendarNotes />
            <button
              onClick={() => setMobileNotesOpen(false)}
              className="w-full mt-4 py-3 rounded-xl bg-[var(--color-accent)] text-white
                         font-ui text-sm font-medium cursor-pointer"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
