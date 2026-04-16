// Canonical curation tag vocabulary, shared between Canada Connect (source) and
// FirstBitesTO (curation layer). Add new tags here so admin UIs and queries stay aligned.
export const CANONICAL_TAGS = [
  "food",
  "settlement",
  "newcomer",
  "culture",
  "neighbourhood",
  "services",
  "featured",
  "events",
] as const;

export type CanonicalTag = (typeof CANONICAL_TAGS)[number];

// Tags that mark content as eligible for FirstBitesTO discovery.
export const FIRSTBITES_TAGS: CanonicalTag[] = ["food", "neighbourhood", "culture"];

export const isFirstBitesEligible = (tags: string[] | null | undefined): boolean => {
  if (!tags?.length) return false;
  return tags.some((t) => (FIRSTBITES_TAGS as string[]).includes(t));
};
