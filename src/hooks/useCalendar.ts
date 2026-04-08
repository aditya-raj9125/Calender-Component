'use client';

import { useMemo } from 'react';
import { getMonthGrid } from '@/lib/dateUtils';
import { useCalendarStore } from '@/store/calendarStore';

export function useCalendar() {
  const currentMonth = useCalendarStore((s) => s.currentMonth);

  const grid = useMemo(
    () => getMonthGrid(currentMonth.getFullYear(), currentMonth.getMonth()),
    [currentMonth]
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  return { grid, year, month, currentMonth };
}
