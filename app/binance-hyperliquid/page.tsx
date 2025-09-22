import Chart from '@/components/chart'
import ContentWrapper from '@/components/(layout)/content-wrapper'
import Blurb from '@/components/blurb'
import { VALUE_FORMAT, CHART_TYPES } from '@/constants/chart'
import { BINANCE_HYPERLIQUID_SPOT_DATA } from '@/constants/data/binance-hyperliquid'

const BinanceHyperliquid = async () => {
  // no dynamic dates needed here

  // Override spot config locally to stacked percentage (do not change shared constant)
  const SPOT_PERCENT_CONFIG = {
    Hyperliquid: { label: 'Hyperliquid', color: '#EF5350', type: CHART_TYPES.stacked100, stackId: 'spot' },
    Binance: { label: 'Binance', color: '#5E9EFD', type: CHART_TYPES.stacked100, stackId: 'spot' },
  } as const

  return (
    <div className="w-full flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      <div className="w-full pt-8 pb-6 flex flex-col items-center">
        <ContentWrapper>
          <Blurb
            title="Binance vs Hyperliquid"
            description="Weekly spot and daily perp volume comparison. Binance dominates spot volume; Hyperliquid shows rapid growth on both spot and perps in 2025."
            textAlignment="left"
            titleAlignment="center"
            descriptionAlignment="left"
            fullWidth
          />
        </ContentWrapper>
      </div>

      <div className="w-full pb-12 flex flex-col items-center gap-12">
        <ContentWrapper>
          <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-4">
            <Blurb
              title="Spot share takeaways"
              description="Binance retains the overwhelming majority of spot volume across the period. Hyperliquid’s share trends upward through 2025 with several pronounced spikes, but remains a minority of total spot activity."
              textAlignment="left"
              titleAlignment="center"
              descriptionAlignment="left"
              fullWidth
            />
            <Chart
              title="Binance vs Hyperliquid Spot Volume (Weekly)"
              data={[...BINANCE_HYPERLIQUID_SPOT_DATA]}
              dataConfig={SPOT_PERCENT_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
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

export default BinanceHyperliquid


