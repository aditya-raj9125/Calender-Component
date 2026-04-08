'use client';

import React, { useMemo, useCallback } from 'react';
import { isSameDay, isBefore, isAfter } from 'date-fns';
import { useCalendar } from '@/hooks/useCalendar';
import { useRangeSelection } from '@/hooks/useRangeSelection';
import { isInRange as checkInRange, formatDateKey } from '@/lib/dateUtils';
import { DAY_LABELS } from '@/lib/constants';
import CalendarDayCell from './CalendarDayCell';
import { useCalendarStore } from '@/store/calendarStore';

interface CalendarGridProps {
  noteKeys: Set<string>;
}

export default function CalendarGrid({ noteKeys }: CalendarGridProps) {
  const { grid } = useCalendar();
  const {
    selectedStart,
    selectedEnd,
    isSelectingRange,
    hoverDate,
    handleDayClick,
    handleDayHover,
  } = useRangeSelection();

  const effectiveEnd = useMemo(() => {
    if (selectedEnd) return selectedEnd;
    if (isSelectingRange && hoverDate && selectedStart) return hoverDate;
    return null;
  }, [selectedEnd, isSelectingRange, hoverDate, selectedStart]);

  const isGhostMode = isSelectingRange && !selectedEnd && hoverDate !== null;

  const getCellState = useCallback(
    (date: Date) => {
      if (!selectedStart) {
        return { isRangeStart: false, isRangeEnd: false, isInRange: false, isGhostRange: false, isSingleSelect: false };
      }

      const start = selectedStart;
      const end = effectiveEnd;

      if (!end) {
        return {
          isRangeStart: isSameDay(date, start),
          isRangeEnd: false,
          isInRange: false,
          isGhostRange: false,
          isSingleSelect: isSameDay(date, start),
        };
      }

      const effectiveStart = isBefore(start, end) ? start : end;
      const effectiveEndDate = isAfter(end, start) ? end : start;

      const isStart = isSameDay(date, effectiveStart);
      const isEnd = isSameDay(date, effectiveEndDate);
      const inRange = !isStart && !isEnd && checkInRange(date, effectiveStart, effectiveEndDate);
      const singleSelect = isStart && isEnd;

      return {
        isRangeStart: isStart && !singleSelect,
        isRangeEnd: isEnd && !singleSelect,
        isInRange: isGhostMode ? false : inRange,
        isGhostRange: isGhostMode ? inRange : false,
        isSingleSelect: singleSelect,
      };
    },
    [selectedStart, effectiveEnd, isGhostMode]
  );

  return (
    <div role="grid" aria-label="Calendar grid" className="w-full">
      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-2" role="row">
        {DAY_LABELS.map((label, i) => (
          <div
            key={label}
            role="columnheader"
            className={`
              text-center text-xs font-mono font-medium tracking-wider py-2
              ${i >= 5 ? 'text-[var(--color-accent-warm)]' : 'text-[var(--color-ink-muted)]'}
            `}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day cells grid */}
      {grid.map((week, weekIdx) => (
        <div key={weekIdx} className="grid grid-cols-7" role="row">
          {week.map((cell) => {
            const key = formatDateKey(cell.date);
            const state = getCellState(cell.date);
            return (
              <div key={key} className="group relative">
                <CalendarDayCell
                  cell={cell}
                  isRangeStart={state.isRangeStart}
                  isRangeEnd={state.isRangeEnd}
                  isInRange={state.isInRange}
                  isGhostRange={state.isGhostRange}
                  isSingleSelect={state.isSingleSelect}
                  hasNote={noteKeys.has(key)}
                  onSelect={handleDayClick}
                  onHover={handleDayHover}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
