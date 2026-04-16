---
name: Unified Tag System
description: Tag-driven curation bridging Canada Connect (source) and FirstBitesTO (curation layer)
type: feature
---
Canada Connect is the single source of truth. FirstBitesTO never stores content — it only curates via tags.

**Schema:** `tags text[] NOT NULL DEFAULT '{}'` exists on `listings`, `events`, and `articles`, each with a GIN index for fast `tags && ARRAY[...]` queries.

**Canonical vocabulary** (defined in `src/lib/tags.ts`): `food`, `settlement`, `newcomer`, `culture`, `neighbourhood`, `services`, `featured`, `events`. Add new tags there first so admin UI and queries stay aligned.

**FirstBitesTO eligibility:** any item tagged `food`, `neighbourhood`, or `culture`. Restaurant trails on `/restaurants` query with `.or("tags.cs.{food},category.eq.Restaurants")` — the category fallback keeps trails populated while admins backfill tags. Existing `Restaurants`-category listings were auto-tagged `food` in the migration.

**Homepage rule:** food-tagged events are filtered OUT of the Canada Connect "Upcoming Events" cluster on the homepage and surface only inside FirstBitesTO sections.

**Never:** duplicate content into a separate FirstBitesTO table, or use cuisine string-matching as the primary curation signal in new code.
