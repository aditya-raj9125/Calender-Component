'use client';

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, CalendarDays } from 'lucide-react';
import { useCalendarStore } from '@/store/calendarStore';
import { formatDisplayRange, getDaysBetween } from '@/lib/dateUtils';

export default function CalendarRangeBar() {
  const selectedStart = useCalendarStore((s) => s.selectedStart);
  const selectedEnd = useCalendarStore((s) => s.selectedEnd);
  const clearSelection = useCalendarStore((s) => s.clearSelection);
  const reducedMotion = useReducedMotion();

  const hasRange = selectedStart && selectedEnd;

  return (
    <AnimatePresence>
      {hasRange && (
        <motion.div
          initial={reducedMotion ? undefined : { scale: 0.85, opacity: 0, height: 0 }}
          animate={{ scale: 1, opacity: 1, height: 'auto' }}
          exit={reducedMotion ? undefined : { scale: 0.85, opacity: 0, height: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-full
                        bg-[var(--color-card)] border border-[var(--color-grid-line)]
                        shadow-sm text-sm font-mono mx-2 mb-3"
          >
            <CalendarDays size={16} className="text-[var(--color-accent)] flex-shrink-0" />

            <span className="text-[var(--color-ink)] truncate">
              {formatDisplayRange(selectedStart!, selectedEnd!)}
            </span>

            <span className="text-[var(--color-ink-muted)] text-xs whitespace-nowrap">
              {getDaysBetween(selectedStart!, selectedEnd!)} days
            </span>

            <button
              onClick={clearSelection}
              className="ml-auto flex items-center justify-center w-6 h-6 rounded-full
                         hover:bg-[var(--color-selection-mid)] text-[var(--color-ink-muted)]
                         hover:text-[var(--color-ink)] transition-colors cursor-pointer
                         outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              aria-label="Clear date selection"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
