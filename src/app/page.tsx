'use client';

import CalendarRoot from '@/components/calendar/CalendarRoot';

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center p-4 md:p-8 lg:p-12 bg-[var(--color-paper)]">
      <CalendarRoot />
    </main>
  );
}
