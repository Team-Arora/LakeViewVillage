# Aura / Five Oaks comparison evidence

Checked October 23, 2026. Scope: original comparison article, existing homepage card destination, article table and image support. No publication or remote push.

Primary intent: compare Aura at Lakeview Village vs. Five Oaks by Caivan. Supporting intent: Mississauga stacked towns vs. Oakville freehold towns; floor plans, deposits and timing. This is an editorial intent selection, not a measured keyword-volume or ranking claim.

## Sources

Aura builder kit in `Mississauga - Aura - Lakeview Village/`:
- `Aura-Final-Release-Quick-Facts.pdf`: high $500s band, 789–1,138 sq. ft., two to three bedrooms, underground parking, Lakeshore corridor. No visible document date; do not label its price as freshly issued.
- `FAQ - Aura.pdf`, June 2026: stacked homes with ground-level entry, first tentative closing December 2027–March 2028, unit maintenance $199.99 and parking $64.95 monthly. The article dates these historic figures explicitly.
- `Deposit Structure - Aura Towns.pdf`, June 1, 2026: $65,000 total, including $10,000 at occupancy.
- Existing `lib/project.ts` and floor-plan content: Main/Upper residences and included parking.

Five Oaks kit in the sibling `fiveoaksbycaivan/Oakville - Five Oaks - Singles & Towns/`:
- `Five-Oaks-Quick-Facts.pdf`: Dundas West / Neyagawa, freehold singles and towns, collection-wide areas, selected natural-heritage backing lots, school catchments not finalized.
- `1. Single Detached/2. Price Lists - Singles - Five Oaks.pdf`, October 6, 2026: collection starts $1,549,990 / $1,599,224 / $1,828,734 in the column including all tax rebates. Areas include finished basement recreation room. Bonus/premium/change conditions apply.
- `1. Single Detached/4. Deposit Structure - Five Oaks.pdf`, October 6: totals $80k / $100k / $110k / $145k / $145k / $170k; extra $25k for lots 2–21 at 365 days.
- Each townhome collection's `2. Price List ...` sheet, October 20: Ashford $799,106 and Sept–Oct 2028; 24′ $1,039,990 and October 2028; Advantage $1,099,990 and March 2029. After-rebate prices include limited-time bonuses. 24′ areas include finished basement recreation room.

Live primary-source checks:
- https://caivan.com/aura/ — stacked/two-storey waterfront townhome positioning and underground parking.
- https://caivan.com/greater-toronto-area/oakville/five-oaks/ — six collections, legal-suite positioning, garage configuration, creek/park setting. The shorter `/oakville/five-oaks/` URL failed in the web reader; the canonical community path above opened successfully.

## Editorial boundaries

No universal rebate entitlement, fee-free freehold assertion, guaranteed rent, school ranking, guaranteed school placement, travel-time claim or overall winner. Current lot availability is unknown. Detached closing dates are not inferred from townhome sheets. Dates and historic prices are clearly qualified. Primary source links are visible in the article.

## Images

Originals preserved. Supplied Caivan renderings copied and optimized to WebP with Pillow, maximum 1600 pixels wide:
- `Renderings/Ashford Towns Elevation B.jpg` → `public/blog/five-oaks-ashford-towns.webp` (1600 × 890).
- `Renderings/40_ Collection The Starling Corner Elevation B.jpg` → `public/blog/five-oaks-starling-detached.webp` (1600 × 924).
- Existing Aura rendering reused. All figures captioned as artist’s renderings with collection-specific alt text.

The article enters the existing POSTS registry, so the blog index, latest homepage articles, static params and sitemap include it automatically. Homepage comparison card links internally; article links to Five Oaks externally and Aura plans/registration internally.

## Validation

- `npx tsc --noEmit`, `git diff --check` and final `npm run build` passed; comparison route statically generated.
- Local production server on port 3097: browser confirmed article H1, canonical, three tables, three figures and two Five Oaks destination links.
- Browser confirmed homepage comparison link, blog index entry and sitemap inclusion.
- At 390px viewport: document width 390px, table containers 348px with horizontal scrolling for 600px tables. Mobile header screenshot visually reviewed. Images are lazy loaded.
- React review: static server-rendered content, no added client JS or data fetching; explicit image dimensions, semantic captions/table headers and keyboard-focusable table scrolling regions.
