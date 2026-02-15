export const EVENT_CATEGORIES = [
  "Settlement & Orientation",
  "Employment & Career",
  "Immigration & Legal",
  "Language & Education",
  "Health & Wellness",
  "Community & Cultural",
  "Youth & Family",
  "Business & Entrepreneurship",
  "Housing & Financial Literacy",
  "Social & Networking",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];
