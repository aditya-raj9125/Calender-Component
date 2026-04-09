'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCalendarStore } from '@/store/calendarStore';
import { useCalendar } from '@/hooks/useCalendar';
import { MONTH_TINTS } from '@/lib/constants';
import { formatDateKey } from '@/lib/dateUtils';
import SpiralBind from '@/components/ui/SpiralBind';
import PaperTexture from '@/components/ui/PaperTexture';
import CalendarHeroImage from './CalendarHeroImage';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import CalendarNotes from './CalendarNotes';
import CalendarRangeBar from './CalendarRangeBar';

export default function CalendarRoot() {
  const currentMonth = useCalendarStore((s) => s.currentMonth);
  const theme = useCalendarStore((s) => s.theme);
  const direction = useCalendarStore((s) => (s as any).direction);
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
      initial={reducedMotion ? undefined : { y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.7, ease: 'easeOut' }}
      className="relative w-full max-w-[560px] mx-auto flex flex-col z-10"
      data-month={month}
      style={{
        ['--month-tint' as string]: theme === 'light' ? tint?.light : tint?.dark,
      }}
    >
      {/* Calendar card — portrait orientation like a real wall calendar */}
      <div
        className="calendar-card relative bg-[var(--color-paper)] overflow-hidden flex flex-col"
        style={{
          borderRadius: '0 0 12px 12px',
          boxShadow: theme === 'light'
            ? `
              0 4px 8px rgba(0,0,0,0.06),
              0 12px 24px rgba(0,0,0,0.08),
              0 32px 64px rgba(0,0,0,0.10),
              0 48px 96px rgba(0,0,0,0.06)
            `
            : `
              0 4px 8px rgba(0,0,0,0.2),
              0 12px 24px rgba(0,0,0,0.25),
              0 32px 64px rgba(0,0,0,0.3),
              0 48px 96px rgba(0,0,0,0.2)
            `,
        }}
      >
        <PaperTexture />

        {/* Spiral binding at top of card */}
        <SpiralBind />

        {/* Animated page content — flips when month changes */}
        <div style={{ perspective: '2000px' }} className="flex-1 min-h-0 flex flex-col">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={currentMonth.getTime()}
              custom={direction}
              variants={{
                initial: (dir: number) => ({
                  rotateX: dir > 0 ? 70 : -70,
                  opacity: 0,
                  z: -150,
                  y: dir > 0 ? 60 : -60,
                }),
                animate: {
                  rotateX: 0,
                  opacity: 1,
                  z: 0,
                  y: 0,
                },
                exit: (dir: number) => ({
                  rotateX: dir > 0 ? -70 : 70,
                  opacity: 0,
                  z: -150,
                  y: dir > 0 ? -60 : 60,
                }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.35 }
              }}
              style={{
                transformOrigin: 'top center',
                backfaceVisibility: 'hidden',
              }}
              className="flex flex-col"
            >
              {/* ========== TOP: Full-width Hero Image ========== */}
              <div className="w-full aspect-[4/3] sm:aspect-[16/10] relative">
                <CalendarHeroImage />
              </div>

              {/* ========== BOTTOM: Calendar body ========== */}
              <div className="flex flex-col relative z-10">
                {/* Navigation header */}
                <div className="px-3 sm:px-5">
                  <CalendarHeader />
                  <CalendarRangeBar />
                </div>

                {/* Desktop/Tablet: Two-column layout — Notes left, Grid right */}
                <div className="hidden sm:flex px-4 sm:px-5 pb-4 sm:pb-5 gap-4">
                  {/* Left: Notes */}
                  <div className="w-[32%] shrink-0 pt-1">
                    <CalendarNotes />
                  </div>

                  {/* Right: Grid */}
                  <div className="flex-1 min-w-0">
                    <CalendarGrid noteKeys={noteKeys} />
                  </div>
                </div>

                {/* Mobile: Stacked layout */}
                <div className="flex sm:hidden flex-col px-2 pb-3">
                  <div className="pb-2">
                    <CalendarGrid noteKeys={noteKeys} />
                  </div>

                  {/* Mobile notes trigger */}
                  <button
                    onClick={() => setMobileNotesOpen(true)}
                    className="mx-1 px-4 py-2.5 rounded-xl bg-[var(--color-card)]
                               border border-[var(--color-grid-line)] text-[var(--color-ink)]
                               font-ui text-sm text-left shadow-sm cursor-pointer
                               hover:bg-[var(--color-selection-mid)] transition-colors
                               active:scale-[0.98]"
                    aria-label="Open notes panel"
                  >
                    <span className="font-display italic text-[var(--color-ink-muted)]">Notes</span>
                    <span className="text-[var(--color-ink-muted)] ml-2 text-xs">Tap to open</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile bottom sheet for notes */}
      {mobileNotesOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
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
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 rounded-full bg-[var(--color-ink-muted)] opacity-40" />
            </div>
            <CalendarNotes />
            <button
              onClick={() => setMobileNotesOpen(false)}
              className="w-full mt-4 py-3 rounded-xl bg-[var(--color-accent)] text-white
                         font-ui text-sm font-medium cursor-pointer
                         active:scale-[0.98]"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
