import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isAfter,
  isBefore,
  isWeekend as dateFnsIsWeekend,
  format,
  differenceInCalendarDays,
  getDay,
} from 'date-fns';
import type { DayCell } from './types';
import { HOLIDAYS } from './constants';

export function getMonthGrid(year: number, month: number): DayCell[][] {
  const monthStart = startOfMonth(new Date(year, month, 1));
  const monthEnd = endOfMonth(monthStart);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const allDays = eachDayOfInterval({ start: gridStart, end: gridEnd });
  const today = new Date();

  // Ensure we always have 6 rows (42 cells)
  while (allDays.length < 42) {
    const lastDay = allDays[allDays.length - 1];
    const nextDay = new Date(lastDay);
    nextDay.setDate(nextDay.getDate() + 1);
    allDays.push(nextDay);
  }

  const grid: DayCell[][] = [];
  for (let i = 0; i < 6; i++) {
    const week: DayCell[] = [];
    for (let j = 0; j < 7; j++) {
      const date = allDays[i * 7 + j];
      const key = formatDateKey(date);
      week.push({
        date,
        isCurrentMonth: isSameMonth(date, monthStart),
        isToday: isSameDay(date, today),
        isWeekend: isWeekend(date),
        holiday: HOLIDAYS[key] ?? null,
        dayNumber: date.getDate(),
      });
    }
    grid.push(week);
  }
  return grid;
}

export function isInRange(date: Date, start: Date, end: Date): boolean {
  const effectiveStart = isBefore(start, end) ? start : end;
  const effectiveEnd = isAfter(end, start) ? end : start;
  return (isAfter(date, effectiveStart) || isSameDay(date, effectiveStart)) &&
         (isBefore(date, effectiveEnd) || isSameDay(date, effectiveEnd));
}

export function isRangeStart(date: Date, start: Date | null): boolean {
  if (!start) return false;
  return isSameDay(date, start);
}

export function isRangeEnd(date: Date, end: Date | null): boolean {
  if (!end) return false;
  return isSameDay(date, end);
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function isWeekend(date: Date): boolean {
  const day = getDay(date);
  return day === 0 || day === 6;
}

export function isHoliday(date: Date): { name: string } | null {
  const key = formatDateKey(date);
  const name = HOLIDAYS[key];
  return name ? { name } : null;
}

export function getDaysBetween(start: Date, end: Date): number {
  return Math.abs(differenceInCalendarDays(end, start)) + 1;
}

export function formatDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDisplayRange(start: Date, end: Date): string {
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (isSameDay(start, end)) {
    return format(start, 'MMM d, yyyy');
  }

  if (sameMonth) {
    return `${format(start, 'MMM d')} → ${format(end, 'd, yyyy')}`;
  }

  if (sameYear) {
    return `${format(start, 'MMM d')} → ${format(end, 'MMM d, yyyy')}`;
  }

  return `${format(start, 'MMM d, yyyy')} → ${format(end, 'MMM d, yyyy')}`;
}
