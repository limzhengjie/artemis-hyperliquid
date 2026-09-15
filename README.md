# Hyperliquid research dashboard

A research dashboard by Zheng Jie Lim for exploring Hyperliquid perpetual volume, spot activity and capital flows. This is the canonical public portfolio repository: improvements and demo instructions live here. The other experimental variants are not required.

The project demonstrates more than charting: dated observations, venue coverage, missing-data handling and reproducible research output. The live application uses Artemis data. Historical research datasets remain bundled and are labeled as snapshots.

## Run the demo

Requires Node.js 22.13+ and npm. No API keys, database, account or environment file.

```sh
npm ci
npm run demo
npm run demo:serve
```

Open **http://127.0.0.1:4348**. Alternatively, double-click `demo-dist/index.html` or send that single file to someone else. It contains its own styling, script and synthetic data, works offline, and makes no network or analytics requests. `demo-dist/observations.json` contains the full export. Regeneration is deterministic.

Try **Missing observations**: Hyperliquid's own volume remains visible, but its share becomes unavailable when another venue is missing. **Stale source** preserves the older observations and their real date. **Source unavailable** demonstrates an outage without fabricated zeroes.

Hover or tap anywhere in the chart to inspect the nearest date and all three venue values. Missing values stay labeled unavailable. With the chart focused, use arrow keys to move between dates, Home/End to jump and Escape to close the details. The footer links back to the personal site's Projects page.

The demo values are fictional, fixed to August 2026, and not estimates of actual activity. The three-venue cohort is deliberately small; it is not the whole market. Fixture data never substitutes for a failed live request. The demo runs through the same normalization and share calculations as the live dashboard.

## Run the application

```sh
npm run dev -- --port 4349
# Production:
npm run build
npm start -- --port 4349
```

The overview fetches the Artemis API on the server. The public endpoint may be unavailable or restrict requests; that state is displayed explicitly. Four independent metric requests run concurrently, have a 10-second timeout and a five-minute fetch cache. Daily metrics are requested through the last completed UTC day. The headline shows the latest reported observation with its own date and a lag notice; it never relabels an older value as current. The open-interest window follows the requested date rather than a frozen 2025 cutoff.

The legacy feedback feature needs a separately configured Supabase database and is not part of the offline demo. Analytics are optional: PostHog initializes only with `NEXT_PUBLIC_POSTHOG_KEY`; Vercel Analytics requires `NEXT_PUBLIC_ENABLE_ANALYTICS=true`. Neither is used by the standalone demo.

## Data rules

- Only finite non-negative numeric daily metric values are accepted. Explicit zero stays zero. Missing values, numeric strings, invalid dates and duplicate venue/day observations stay missing.
- Requested dates are retained, including gaps at the end. Every chart reports its source and observation date; bundled data is labeled **Research snapshot**.
- The fixed perp comparison cohort is Apex, Avantis, dYdX, Gains, GMX, Hyperliquid, Jupiter and Lighter. It is not total-market coverage; unavailable venues are never silently removed from the denominator.
- A total or percentage requires every venue in that chart's declared cohort. An incomplete denominator is not renormalized to 100%. A zero denominator has no defined percentage.
- Weekly volume requires seven distinct, complete UTC days, Monday to Sunday. Partial weeks stay missing. Binance comparisons use the same dated weekly interval.
- Changes use exact calendar dates relative to the displayed observation date. Missing history does not fall back to a different interval. Percentage changes from zero are unavailable.
- The historical open-interest comparison mixes perpetual and prediction-market venues. It is a descriptive comparison, not a homogeneous market-wide share. Bundled thesis copy is historical interpretation, not a live trading signal.

## Verify

```sh
npm test
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:browser
```

Browser tests cover desktop/mobile layouts, light/dark themes, keyboard controls, all four data states, chart gaps, the observation table and downloaded JSON. They assert no external requests and no page errors. The demo tests also compare two generated HTML files byte for byte. `BROWSER_EXECUTABLE` can point to an already installed Chromium binary.

## Project map

| Area | Purpose |
| --- | --- |
| `lib/market-data.ts` | Pure normalization, coverage, comparisons and aggregation |
| `lib/fetchHyperliquidData.ts` | Live transport, timeout and explicit error state |
| `app/page.tsx` | Live overview with dated data and research snapshots |
| `demo/fixture.ts` | Deterministic scenarios shaped like the Artemis response |
| `scripts/build-demo.ts` | Self-contained offline HTML and JSON export |
| `tests/` | Calculation and browser regressions |

Data and existing Artemis branding retain their original attribution. This repository does not grant a new license to third-party data or marks. The offline demo uses no third-party dataset. Next.js is pinned to the maintained 15.5 release line; see the [official August security release](https://nextjs.org/blog/august-2026-security-release).
