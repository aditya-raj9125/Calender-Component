export interface DayCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  holiday: string | null;
  dayNumber: number;
}

export interface MonthImage {
  url: string;
  alt: string;
  credit: string;
  quote?: string;
  author?: string;
}

export type Theme = 'light' | 'dark';

export interface CalendarState {
  currentMonth: Date;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  hoverDate: Date | null;
  theme: Theme;
  isSelectingRange: boolean;

  navigateMonth: (direction: 'prev' | 'next') => void;
  goToToday: () => void;
  setRangeStart: (date: Date) => void;
  setRangeEnd: (date: Date) => void;
  setHoverDate: (date: Date | null) => void;
  clearSelection: () => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
