import Link from 'next/link'

import ContentWrapper from '@/components/(layout)/content-wrapper'
import Blurb from '@/components/blurb'
import ArtemisLogo from '@/components/(layout)/artemis-logo'

const DOC_URL = 'https://app.artemisanalytics.com/docs/snowflake-share/tables/hyperliquid'

export default function WhyPublicGood() {
  return (
    <div className="w-full pt-12 pb-20 flex flex-col items-center gap-12">
      <ContentWrapper>
        <div className="w-full max-w-[980px] mx-auto flex flex-col gap-8">
          <Blurb
            title="Why we’re doing this as a public good"
            description="Open Hyperliquid data for everyone. So the community can audit, build, and make this the #1 Hyperliquid dashboard."
            textAlignment="center"
          />
        <div className="ml-auto">
            <ArtemisLogo poweredBy />
        </div>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Why this matters</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">Open, verifiable data</span> — core market data should be
                accessible so anyone can audit, reproduce, and build — no gatekeeping.
              </li>
              <li>
                <span className="text-foreground font-medium">Community-first</span> — open data lets researchers, builders,
                and traders test ideas together and iterate faster.
              </li>
              <li>
                <span className="text-foreground font-medium">Better products for everyone</span> — with shared raw data, we
                can collectively build the best Hyperliquid dashboard.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">What’s included (open, raw datasets)</h2>
            <p className="text-muted-foreground">
              Artemis is open sourcing multiple Hyperliquid tables (starting Aug 17, 2025). See the full reference here:{' '}
              <Link href={DOC_URL} target="_blank" className="text-[var(--color-pluto-purple-500)] underline">
                Hyperliquid data reference
              </Link>
              .
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">Node Fills (all trades)</span>: Perp and spot trades on
                Hypercore (time, user, hash, coin, fee, side, price, size, liquidation, etc.). Filter out rows where
                <code className="mx-1">_metadata = true</code>.
              </li>
              <li>
                <span className="text-foreground font-medium">Perp and Spot Balances (daily snapshots)</span>: Positions,
                margin, and spot balances per address (JSON payload + timestamp).
              </li>
              <li>
                <span className="text-foreground font-medium">Node Order Statuses</span>: All orders created on L2Book
                (limit/market/stop, trigger conditions, status).
              </li>
              <li>
                <span className="text-foreground font-medium">Node TWAP Statuses</span>: TWAP order state and progress on
                Hypercore.
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              Note: data volume is significant (e.g., Node Order Statuses ≈ 54 GB/day as of 2025-09-19).
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Managed analytics tables (ready-to-query)</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">ez_metrics</span>: protocol-level trading activity (perp/spot
                volume, DAU, txns), fees/revenue (perp/spot/chain/auction), cash-flow allocations (burned/buyback/service),
                plus token and supply metrics (price, market cap, turnover, supply changes).
              </li>
              <li>
                <span className="text-foreground font-medium">ez_metrics_by_chain</span>: same applicable metrics, broken down
                by chain for cross-chain analysis.
              </li>
            </ul>
            <p className="text-muted-foreground">
              Explore schemas and sample queries in the{' '}
              <Link href={DOC_URL} target="_blank" className="text-[var(--color-pluto-purple-500)] underline">
                documentation
              </Link>
              .
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">How to access</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">S3 (raw, open data)</span>: Use AWS CLI with requester-pays;
                docs include commands and a boto3 script for bulk copy.
              </li>
              <li>
                <span className="text-foreground font-medium">Snowflake Share (managed)</span>: Query <code>ez_metrics</code>
                {' '}and <code>ez_metrics_by_chain</code> directly for analysis.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Community goal</h2>
            <p className="text-muted-foreground">
              We want this to be the most transparent, useful Hyperliquid dashboard — built in the open and powered by shared
              data. Bring your ideas and we’ll turn them into features, together.
            </p>
          </section>
        </div>
      </ContentWrapper>
    </div>
  )
}


