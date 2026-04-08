'use client';

import React, { memo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { isSameDay, isBefore, isAfter } from 'date-fns';
import { format } from 'date-fns';
import type { DayCell } from '@/lib/types';

interface CalendarDayCellProps {
  cell: DayCell;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isGhostRange: boolean;
  isSingleSelect: boolean;
  hasNote: boolean;
  onSelect: (date: Date) => void;
  onHover: (date: Date | null) => void;
}

function CalendarDayCellInner({
  cell,
  isRangeStart,
  isRangeEnd,
  isInRange,
  isGhostRange,
  isSingleSelect,
  hasNote,
  onSelect,
  onHover,
}: CalendarDayCellProps) {
  const reducedMotion = useReducedMotion();

  const handleClick = useCallback(() => {
    if (cell.isCurrentMonth) {
      onSelect(cell.date);
    }
  }, [cell.date, cell.isCurrentMonth, onSelect]);

  const handleMouseEnter = useCallback(() => {
    if (cell.isCurrentMonth) {
      onHover(cell.date);
    }
  }, [cell.date, cell.isCurrentMonth, onHover]);

  const handleMouseLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  const ariaLabel = `${cell.isCurrentMonth ? 'Select' : ''} ${format(cell.date, 'MMMM d, yyyy')}${cell.holiday ? `, ${cell.holiday}` : ''}`;

  // Build class names for different states
  const isStartOrEnd = isRangeStart || isRangeEnd;
  const isSelected = isStartOrEnd || isSingleSelect;

  let bgClass = '';
  let textClass = 'text-[var(--color-ink)]';
  let roundedClass = '';

  if (!cell.isCurrentMonth) {
    textClass = 'text-[var(--color-ink-muted)] opacity-40';
  } else if (isSingleSelect) {
    bgClass = 'bg-[var(--color-selection-start)]';
    textClass = 'text-white';
    roundedClass = 'rounded-full';
  } else if (isRangeStart && isRangeEnd) {
    bgClass = 'bg-[var(--color-selection-start)]';
    textClass = 'text-white';
    roundedClass = 'rounded-full';
  } else if (isRangeStart) {
    bgClass = 'bg-[var(--color-selection-start)]';
    textClass = 'text-white';
    roundedClass = 'rounded-l-full';
  } else if (isRangeEnd) {
    bgClass = 'bg-[var(--color-selection-end)]';
    textClass = 'text-white';
    roundedClass = 'rounded-r-full';
  } else if (isInRange) {
    bgClass = 'bg-[var(--color-selection-mid)]';
  } else if (isGhostRange) {
    bgClass = 'bg-[var(--color-selection-mid)] opacity-60';
  } else if (cell.isWeekend && cell.isCurrentMonth) {
    textClass = 'text-[var(--color-accent-warm)]';
  }

  return (
    <motion.button
      role="gridcell"
      aria-label={ariaLabel}
      aria-selected={isSelected}
      aria-disabled={!cell.isCurrentMonth}
      tabIndex={cell.isCurrentMonth ? 0 : -1}
      disabled={!cell.isCurrentMonth}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative flex flex-col items-center justify-center
        min-h-[44px] min-w-[44px] p-1
        font-ui text-sm md:text-base
        transition-colors duration-150
        ${bgClass} ${textClass} ${roundedClass}
        ${cell.isCurrentMonth ? 'cursor-pointer' : 'cursor-default'}
        ${!isSelected && cell.isCurrentMonth && !isInRange && !isGhostRange ? 'hover:bg-[var(--color-selection-mid)]' : ''}
        outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1
      `}
      whileHover={
        cell.isCurrentMonth && !reducedMotion
          ? { scale: 1.08 }
          : undefined
      }
      whileTap={
        cell.isCurrentMonth && !reducedMotion
          ? { scale: 0.95 }
          : undefined
      }
      transition={reducedMotion ? { duration: 0 } : { duration: 0.15 }}
    >
      <span
        className={`
          relative z-10 leading-none font-medium
          ${cell.isToday && !isSelected ? 'text-[var(--color-accent)] font-bold' : ''}
        `}
      >
        {cell.dayNumber}
      </span>

      {/* Today ring */}
      {cell.isToday && !isSelected && (
        <span className="absolute inset-1 rounded-full border-2 border-[var(--color-accent)] today-pulse" />
      )}

      {/* Indicators row */}
      <span className="flex gap-0.5 mt-0.5">
        {cell.holiday && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-warm)]"
            title={cell.holiday}
          />
        )}
        {hasNote && (
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink)]" />
        )}
      </span>

      {/* Holiday tooltip */}
      {cell.holiday && cell.isCurrentMonth && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none
                         whitespace-nowrap text-[10px] px-2 py-0.5 rounded
                         bg-[var(--color-ink)] text-[var(--color-paper)]
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         hidden group-hover:block">
          {cell.holiday}
        </span>
      )}
    </motion.button>
  );
}

const CalendarDayCell = memo(CalendarDayCellInner);
export default CalendarDayCell;
