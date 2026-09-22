# Reproducible Hyperliquid research demo

Approved scope: make this public repository the canonical portfolio version, fix misleading missing data and stale dates, and provide a clean shareable demo without credentials.

1. Centralize daily metric normalization and coverage. Missing, invalid, duplicate or failed observations remain unavailable; observed zero remains zero. Calculate a total/share only when every tracked venue is covered. Make source dates visible.
2. Use those functions in the existing dashboard. Remove the frozen open-interest cutoff, fetch independent series concurrently, fix weekly aggregation and comparison windows, and label bundled research snapshots.
3. Generate one deterministic, self-contained HTML demo from synthetic Artemis-shaped fixtures through the same production functions. Include complete, missing and stale scenarios, methodology and downloadable observations. No requests, tracking or credentials.
4. Add regression tests, responsive/browser checks, lock dependencies to a maintained Next.js release, and document clean-checkout commands. Prepare a PR and artifact; do not merge.

Acceptance: null/zero/coverage/date tests pass; lint, TypeScript and production build pass; identical demo exports from two runs; desktop/mobile UI, theme, scenarios and data export work; no private input or third-party request in the offline demo.
