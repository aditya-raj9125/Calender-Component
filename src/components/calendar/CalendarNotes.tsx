'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { format } from 'date-fns';
import { useMonthNotes, useRangeNotes } from '@/hooks/useNotes';
import { useCalendarStore } from '@/store/calendarStore';
import { formatDisplayRange } from '@/lib/dateUtils';

export default function CalendarNotes() {
  const currentMonth = useCalendarStore((s) => s.currentMonth);
  const selectedStart = useCalendarStore((s) => s.selectedStart);
  const selectedEnd = useCalendarStore((s) => s.selectedEnd);
  const reducedMotion = useReducedMotion();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const [monthNotes, setMonthNotes] = useMonthNotes(year, month);
  const [rangeNotes, setRangeNotes] = useRangeNotes(selectedStart, selectedEnd);

  const monthTextareaRef = useRef<HTMLTextAreaElement>(null);
  const rangeTextareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  useEffect(() => {
    autoResize(monthTextareaRef.current);
  }, [monthNotes]);

  useEffect(() => {
    autoResize(rangeTextareaRef.current);
  }, [rangeNotes]);

  const hasRange = selectedStart && selectedEnd;

  return (
    <div className="flex flex-col gap-4">
      {/* Month Notes */}
      <div className="relative">
        <label
          htmlFor="month-notes"
          className="block text-sm font-display italic text-[var(--color-ink-muted)] mb-2"
        >
          Notes — {format(currentMonth, 'MMMM yyyy')}
        </label>
        <div className="relative">
          <textarea
            ref={monthTextareaRef}
            id="month-notes"
            value={monthNotes}
            onChange={(e) => setMonthNotes(e.target.value)}
            placeholder="Write your notes here..."
            rows={4}
            className="w-full bg-transparent text-[var(--color-ink)] font-ui text-sm
                       leading-[1.75rem] px-3 py-2 rounded-lg
                       border border-[var(--color-grid-line)]
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
                       focus:border-transparent resize-none
                       placeholder:text-[var(--color-ink-muted)] placeholder:opacity-50"
            style={{
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 27px, var(--color-grid-line) 27px, var(--color-grid-line) 28px)',
              backgroundPositionY: '8px',
              maxHeight: '200px',
            }}
            aria-label={`Monthly notes for ${format(currentMonth, 'MMMM yyyy')}`}
          />
          <span className="absolute bottom-2 right-3 text-[10px] text-[var(--color-ink-muted)]">
            {monthNotes.length > 0 ? `${monthNotes.split(/\s+/).filter(Boolean).length} words` : ''}
          </span>
        </div>
      </div>

      {/* Range Notes */}
      <AnimatePresence>
        {hasRange && (
          <motion.div
            initial={reducedMotion ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-2 border-t border-[var(--color-grid-line)]">
              <label
                htmlFor="range-notes"
                className="block text-xs font-mono text-[var(--color-accent)] mb-2"
              >
                {formatDisplayRange(selectedStart!, selectedEnd!)}
              </label>
              <textarea
                ref={rangeTextareaRef}
                id="range-notes"
                value={rangeNotes}
                onChange={(e) => setRangeNotes(e.target.value)}
                placeholder="Notes for this date range..."
                rows={3}
                className="w-full bg-transparent text-[var(--color-ink)] font-ui text-sm
                           leading-[1.75rem] px-3 py-2 rounded-lg
                           border border-[var(--color-grid-line)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
                           focus:border-transparent resize-none
                           placeholder:text-[var(--color-ink-muted)] placeholder:opacity-50"
                style={{ maxHeight: '150px' }}
                aria-label={`Notes for date range ${formatDisplayRange(selectedStart!, selectedEnd!)}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
