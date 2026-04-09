'use client';

import CalendarRoot from '@/components/calendar/CalendarRoot';
import WallBackground from '@/components/ui/WallBackground';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center h-screen overflow-y-auto overflow-x-hidden">
      <WallBackground />

      {/* Spacer for nail + string area */}
      <div className="shrink-0 h-6 sm:h-10 md:h-14" />

      {/* Calendar hanging on the wall */}
      <div className="w-full px-3 sm:px-4 pb-6 sm:pb-10 flex justify-center">
        <CalendarRoot />
      </div>
    </main>
  );
}
