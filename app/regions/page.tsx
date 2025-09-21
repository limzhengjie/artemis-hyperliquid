'use client'

import { VALUE_FORMAT } from '@/constants/chart'
import Chart from '@/components/chart'
import ContentWrapper from '@/components/(layout)/content-wrapper'
import Blurb from '@/components/blurb'
import { BINANCE_HYPERLIQUID_SPOT_DATA, BINANCE_HYPERLIQUID_SPOT_CONFIG } from '@/constants/data/binance-hyperliquid'

// Replaced regional datasets with Binance/Hyperliquid spot comparison

const Regions = () => {

  return (
    <div className="w-full flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* Header section */}
      <div className="w-full bg-white pt-6 lg:pt-12 pb-4 flex flex-col items-center gap-3 lg:gap-6">
        <ContentWrapper>
          <Blurb
            title="Spot Volume: Binance vs Hyperliquid"
            description="Weekly spot trading volume comparison. Binance remains orders of magnitude larger, but Hyperliquid shows accelerating growth with episodic spikes across late 2024–2025."
          />
        </ContentWrapper>
      </div>

      {/* Content section */}
      <div className="w-full pb-12 flex flex-col items-center gap-12">
        <ContentWrapper>
          <div className="w-full flex flex-col gap-6">
            <Chart
              title="Binance vs Hyperliquid Spot Volume (Weekly)"
              data={BINANCE_HYPERLIQUID_SPOT_DATA as any}
              dataConfig={BINANCE_HYPERLIQUID_SPOT_CONFIG as any}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              hidePoweredBy
              chartHeight={360}
            />
          </div>
        </ContentWrapper>
      </div>
    </div>
  )
}

export default Regions
