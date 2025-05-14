import {
  AVG_RETENTION_RATE_DATA,
  AVG_RETENTION_RATE_CONFIG,
  PAYMENT_USAGE_BY_TYPE_DATA,
  PAYMENT_USAGE_BY_TYPE_CONFIG,
  VALUE_FORMAT
} from '@/constants/chart'

import Chart from '@/components/chart'
import StatSummaryTile from '@/components/stat-summary-tile'
import Blurb from '@/components/blurb'
import ContentWrapper from '@/components/(layout)/content-wrapper'
import Quotes from '@/components/quotes'
export default function Overview() {
  const dummyStats = [
    { period: 'Last Month', value: 560, pctChange: 10 },
    { period: 'Last Year', value: 560, pctChange: -5 },
    { period: 'Last 3 Months', value: 560, pctChange: 10 }
  ]

  const dummyQuotes = [
    {
      quote:
        'Stablecoins are being used not just for crypto trading, but increasingly feature in the ordinary economic lives of these individuals.',
      author: 'Nic Carter, General Partner at Castle Island Ventures'
    },
    {
      quote: 'Some alpha about stablecoins and why they are super duper cool.',
      author: 'Rob Hadick, General Partner at Dragonfly'
    }
  ]

  return (
    <div className="w-full pb-12 flex flex-col items-center gap-32 font-[family-name:var(--font-geist-sans)]">
      <div
        className="w-full flex items-center justify-center gap-12 pt-12 pb-12"
        style={{ background: 'var(--gradient-background)' }}
      >
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <Blurb
              title="Stablecoins: The Emerging Market Story"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
              textAlignment="center"
            />
            <StatSummaryTile miniStatsData={dummyStats} />
          </div>
        </ContentWrapper>
      </div>

      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="How Big are Crypto Payments, Really?"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
            textAlignment="center"
          />
          <Chart
            title="Payment Usage by Type"
            data={PAYMENT_USAGE_BY_TYPE_DATA}
            dataConfig={PAYMENT_USAGE_BY_TYPE_CONFIG}
            valueFormat={VALUE_FORMAT.currency}
            isTimeSeries
            chartHeight={375}
          />
        </div>
      </ContentWrapper>

      <div
        className="w-full flex items-center justify-center gap-12 pt-12 pb-12"
        style={{ background: 'var(--gradient-background)' }}
      >
        <ContentWrapper>
          <Quotes quotes={dummyQuotes} />
        </ContentWrapper>
      </div>

      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="col-span-2">
            <Chart
              title="Stablecoin vs Crypto Performance (Index to 100)"
              data={AVG_RETENTION_RATE_DATA}
              dataConfig={AVG_RETENTION_RATE_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              xAxisLabel="Months"
            />
          </div>
          <Blurb
            title="Stablecoin Market Cap Trends Upwards While Prices Rebound"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <Blurb
            title="Stablecoins are Attractive Globally"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
          <div className="col-span-2">
            <Chart
              title="Adjusted Number of Transactions by Region"
              data={AVG_RETENTION_RATE_DATA}
              dataConfig={AVG_RETENTION_RATE_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              xAxisLabel="Months"
            />
          </div>
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="col-span-2">
            <Chart
              title="Avg Retention Rate Across Crypto Categories"
              data={AVG_RETENTION_RATE_DATA}
              dataConfig={AVG_RETENTION_RATE_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              xAxisLabel="Months"
            />
          </div>
          <Blurb
            title="High Retention, Low Volatility: Why Stablecoins Are Built to Stay"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
        </div>
      </ContentWrapper>
    </div>
  )
}
