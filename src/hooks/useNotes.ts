'use client';

import { useLocalStorage } from './useLocalStorage';
import { format } from 'date-fns';
import { formatDateKey } from '@/lib/dateUtils';

export function useNotes() {
  return { useMonthNotes, useRangeNotes };
}

export function useMonthNotes(year: number, month: number) {
  const key = `calendar-notes-${format(new Date(year, month, 1), 'yyyy-MM')}`;
  return useLocalStorage<string>(key, '');
}

export function useRangeNotes(start: Date | null, end: Date | null) {
  const startKey = start ? formatDateKey(start) : 'none';
  const endKey = end ? formatDateKey(end) : 'none';
  const key = `calendar-range-${startKey}:${endKey}`;
  return useLocalStorage<string>(key, '');
}
