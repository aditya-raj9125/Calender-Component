import type { MonthImage } from './types';

export const MONTH_IMAGES: Record<number, MonthImage> = {
  0: {
    url: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1600&q=80',
    alt: 'Snow-covered mountain peaks under a clear winter sky',
    credit: 'Unsplash',
    quote: "Winter is the time for comfort, for good food and warmth.",
    author: "Edith Sitwell"
  },
  1: {
    url: 'https://images.unsplash.com/photo-1486496146582-9a5521e67f8d?w=1600&q=80',
    alt: 'Misty forest with frost-covered trees',
    credit: 'Unsplash',
    quote: "To appreciate the beauty of a snowflake it is necessary to stand out in the cold.",
    author: "Aristotle"
  },
  2: {
    url: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=1600&q=80',
    alt: 'Cherry blossom trees in early spring bloom',
    credit: 'Unsplash',
    quote: "Spring is nature's way of saying, 'Let's party!'",
    author: "Robin Williams"
  },
  3: {
    url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1600&q=80',
    alt: 'Wildflower meadow under soft spring sunlight',
    credit: 'Unsplash',
    quote: "The earth laughs in flowers.",
    author: "Ralph Waldo Emerson"
  },
  4: {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80',
    alt: 'Lush green valley with rolling hills',
    credit: 'Unsplash',
    quote: "Spring adds new life and new beauty to all that is.",
    author: "Jessica Harrelson"
  },
  5: {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
    alt: 'Tropical beach with turquoise water and golden sand',
    credit: 'Unsplash',
    quote: "Summertime is always the best of what might be.",
    author: "Charles Bowden"
  },
  6: {
    url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1600&q=80',
    alt: 'Golden sunset over a summer lavender field',
    credit: 'Unsplash',
    quote: "Deep summer is when laziness finds respectability.",
    author: "Sam Keen"
  },
  7: {
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80',
    alt: 'Mountain lake reflecting towering peaks at golden hour',
    credit: 'Unsplash',
    quote: "The summer night is like a perfection of thought.",
    author: "Wallace Stevens"
  },
  8: {
    url: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1600&q=80',
    alt: 'Early autumn forest with turning leaves',
    credit: 'Unsplash',
    quote: "Autumn is a second spring when every leaf is a flower.",
    author: "Albert Camus"
  },
  9: {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    alt: 'Dramatic mountain range with autumn fog',
    credit: 'Unsplash',
    quote: "Life starts all over again when it gets crisp in the fall.",
    author: "F. Scott Fitzgerald"
  },
  10: {
    url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1600&q=80',
    alt: 'Coastal cliffs with crashing waves under cloudy skies',
    credit: 'Unsplash',
    quote: "Love the trees until their leaves fall off, then encourage them to try again next year.",
    author: "Chad Sugg"
  },
  11: {
    url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1600&q=80',
    alt: 'Snowy pine forest illuminated by soft winter light',
    credit: 'Unsplash',
    quote: "I prefer winter and fall, when you feel the bone structure of the landscape.",
    author: "Andrew Wyeth"
  },
};

export const MONTH_TINTS: Record<number, { light: string; dark: string }> = {
  0:  { light: '#EEF4FF', dark: '#0D1117' },
  1:  { light: '#F0F4FF', dark: '#0D1218' },
  2:  { light: '#FFF0F5', dark: '#170D12' },
  3:  { light: '#F0FFF4', dark: '#0D1710' },
  4:  { light: '#F0FFF0', dark: '#0D170D' },
  5:  { light: '#FFFFF0', dark: '#17170D' },
  6:  { light: '#FFF7ED', dark: '#17120D' },
  7:  { light: '#FFF8F0', dark: '#17130D' },
  8:  { light: '#FFF5EE', dark: '#170F0D' },
  9:  { light: '#FFF0E6', dark: '#170E0D' },
  10: { light: '#F5F0FF', dark: '#100D17' },
  11: { light: '#F0F8FF', dark: '#0D1317' },
};

export const DAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;

export const HOLIDAYS: Record<string, string> = {
  // Indian holidays
  '2025-01-26': 'Republic Day',
  '2025-03-14': 'Holi',
  '2025-04-14': 'Ambedkar Jayanti',
  '2025-05-01': 'May Day',
  '2025-08-15': 'Independence Day',
  '2025-10-02': 'Gandhi Jayanti',
  '2025-10-20': 'Diwali',
  '2025-11-05': 'Guru Nanak Jayanti',
  '2025-12-25': 'Christmas',
  '2026-01-01': 'New Year\'s Day',
  '2026-01-26': 'Republic Day',
  '2026-03-03': 'Holi',
  '2026-04-03': 'Good Friday',
  '2026-04-14': 'Ambedkar Jayanti',
  '2026-05-01': 'May Day',
  '2026-08-15': 'Independence Day',
  '2026-10-02': 'Gandhi Jayanti',
  '2026-10-09': 'Diwali',
  '2026-11-24': 'Guru Nanak Jayanti',
  '2026-12-25': 'Christmas',
  '2027-01-01': 'New Year\'s Day',
  '2027-01-26': 'Republic Day',
  // International
  '2026-02-14': 'Valentine\'s Day',
  '2026-03-08': 'Women\'s Day',
  '2026-06-21': 'Yoga Day',
  '2026-11-14': 'Children\'s Day',
};
