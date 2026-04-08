import { create } from 'zustand';
import { addMonths, subMonths, startOfMonth, isBefore, isSameDay, isAfter } from 'date-fns';
import type { CalendarState, Theme } from '@/lib/types';

interface ExtendedCalendarState extends CalendarState {
  direction: number;
}

export const useCalendarStore = create<ExtendedCalendarState>((set) => ({
  currentMonth: startOfMonth(new Date()),
  selectedStart: null,
  selectedEnd: null,
  hoverDate: null,
  theme: 'light' as Theme,
  isSelectingRange: false,
  direction: 0,

  navigateMonth: (direction) =>
    set((state) => {
      const nextMonth = direction === 'next'
        ? addMonths(state.currentMonth, 1)
        : subMonths(state.currentMonth, 1);
      return {
        currentMonth: nextMonth,
        direction: direction === 'next' ? 1 : -1,
      };
    }),

  goToToday: () =>
    set((state) => {
      const today = startOfMonth(new Date());
      let direction = 0;
      if (isAfter(today, state.currentMonth)) direction = 1;
      if (isBefore(today, state.currentMonth)) direction = -1;
      return { currentMonth: today, direction };
    }),

  setRangeStart: (date) =>
    set({ selectedStart: date, selectedEnd: null, isSelectingRange: true, hoverDate: null }),

  setRangeEnd: (date) =>
    set((state) => {
      if (!state.selectedStart) return {};
      if (isSameDay(date, state.selectedStart)) {
        return { selectedEnd: date, isSelectingRange: false, hoverDate: null };
      }
      if (isBefore(date, state.selectedStart)) {
        return {
          selectedStart: date,
          selectedEnd: state.selectedStart,
          isSelectingRange: false,
          hoverDate: null,
        };
      }
      return { selectedEnd: date, isSelectingRange: false, hoverDate: null };
    }),

  setHoverDate: (date) => set({ hoverDate: date }),

  clearSelection: () =>
    set({ selectedStart: null, selectedEnd: null, isSelectingRange: false, hoverDate: null }),

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  setTheme: (theme) => set({ theme }),
}));
