'use client';

import { useCallback } from 'react';
import { useCalendarStore } from '@/store/calendarStore';

export function useRangeSelection() {
  const selectedStart = useCalendarStore((s) => s.selectedStart);
  const selectedEnd = useCalendarStore((s) => s.selectedEnd);
  const isSelectingRange = useCalendarStore((s) => s.isSelectingRange);
  const hoverDate = useCalendarStore((s) => s.hoverDate);
  const setRangeStart = useCalendarStore((s) => s.setRangeStart);
  const setRangeEnd = useCalendarStore((s) => s.setRangeEnd);
  const setHoverDate = useCalendarStore((s) => s.setHoverDate);
  const clearSelection = useCalendarStore((s) => s.clearSelection);

  const handleDayClick = useCallback(
    (date: Date) => {
      if (!isSelectingRange) {
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
    },
    [isSelectingRange, setRangeStart, setRangeEnd]
  );

  const handleDayHover = useCallback(
    (date: Date | null) => {
      if (isSelectingRange) {
        setHoverDate(date);
      }
    },
    [isSelectingRange, setHoverDate]
  );

  return {
    selectedStart,
    selectedEnd,
    isSelectingRange,
    hoverDate,
    handleDayClick,
    handleDayHover,
    clearSelection,
  };
}
