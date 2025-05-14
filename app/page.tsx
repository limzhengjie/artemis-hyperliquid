import Image from 'next/image'

import { Button } from '@/components/ui/button'

import {
  AVG_RETENTION_RATE_DATA,
  AVG_RETENTION_RATE_CONFIG,
  PAYMENT_USAGE_BY_TYPE_DATA,
  PAYMENT_USAGE_BY_TYPE_CONFIG,
  VALUE_FORMAT
} from '@/constants/chart'

import { QUOTES } from '@/constants/quotes'
import { MEMBERS_LOGOS } from '@/constants/members'

import Chart from '@/components/chart'
import StatSummaryTile from '@/components/stat-summary-tile'
import Blurb from '@/components/blurb'
import ContentWrapper from '@/components/(layout)/content-wrapper'
import Quotes from '@/components/quotes'
import LogoMarquee from '@/components/logo-marquee'
import LogoGrid from '@/components/logo-grid'
import ReportImage from '@/public/report.svg'

export default function Overview() {
  const dummyStats = [
    { period: 'Last Month', value: 560, pctChange: 10 },
    { period: 'Last Year', value: 560, pctChange: -5 },
    { period: 'Last 3 Months', value: 560, pctChange: 10 }
  ]

  return (
    <div className="w-full pb-12 flex flex-col items-center gap-18 font-[family-name:var(--font-geist-sans)]">
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
        <p className="text-center text-muted-foreground">
          Special thanks to the Artemis Data Consortium Members
        </p>
      </ContentWrapper>
      <div className="w-full flex flex-col gap-12 -mt-4 mb-12">
        <LogoMarquee />
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
        className="w-full flex items-center justify-center gap-12 pt-24 pb-24"
        style={{ background: 'var(--gradient-background)' }}
      >
        <ContentWrapper>
          <Quotes quotes={QUOTES} />
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

      <div
        className="w-full flex items-center justify-center pt-24 pb-24"
        style={{ background: 'var(--gradient-background-download)' }}
      >
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Image
              src={ReportImage}
              alt="Report Download"
              width={555}
              height={100}
            />
            <div className="flex flex-col gap-8">
              <p className="text-[var(--color-pluto-purple-500)] text-sm font-medium font-[family-name:var(--font-geist-mono)]">
                2025 REPORT
              </p>
              <Blurb
                title="Get a Copy of Our Report Here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                textAlignment="center"
              />
            </div>
          </div>
        </ContentWrapper>
      </div>

      <ContentWrapper>
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="text-4xl font-bold">Stablecoin Data Consortium</p>
          <p className="text-muted-foreground">
            Join us to define the stablecoin data standard of the future
          </p>
          <LogoGrid members={MEMBERS_LOGOS} />
          <Button variant="cta" className="mt-3" asChild>
            <a href="mailto:team@artemisanalytics.xyz">Join the Consortium</a>
          </Button>
        </div>
      </ContentWrapper>
    </div>
  )
}
