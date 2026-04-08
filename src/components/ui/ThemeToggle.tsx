'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useCalendarStore } from '@/store/calendarStore';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Theme } from '@/lib/types';

export default function ThemeToggle() {
  const theme = useCalendarStore((s) => s.theme);
  const setTheme = useCalendarStore((s) => s.setTheme);
  const toggleTheme = useCalendarStore((s) => s.toggleTheme);
  const [savedTheme, setSavedTheme] = useLocalStorage<Theme>('calendar-theme', 'light');

  // Sync from localStorage on mount
  useEffect(() => {
    setTheme(savedTheme);
  }, [savedTheme, setTheme]);

  // Sync to DOM and localStorage on change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    setSavedTheme(theme);
  }, [theme, setSavedTheme]);

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full
                 bg-[var(--color-card)] text-[var(--color-ink)] border border-[var(--color-grid-line)]
                 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </motion.button>
  );
}
