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
import { DATA_PARTNERS_LOGOS } from '@/constants/data-partners'

import { getCurrentDate, getStartDate } from '@/lib/dates'
import { getStablecoinSupplyData } from '@/lib/fetchStablecoinsData'

import Chart from '@/components/chart'
import StatSummaryTile from '@/components/stat-summary-tile'
import Blurb from '@/components/blurb'
import ContentWrapper from '@/components/(layout)/content-wrapper'
import Quotes from '@/components/quotes'
import LogoMarquee from '@/components/logo-marquee'
import LogoGrid from '@/components/logo-grid'
import DownloadReport from '@/components/download-report'

import ReportImage from '@/public/report.svg'

export default async function Overview() {
  const endDate = getCurrentDate()

  const stablecoinSupply5YearData = await getStablecoinSupplyData(
    getStartDate(365 * 5) as string,
    endDate as string,
    'weekly'
  )

  const stablecoinSupply4YearData = await getStablecoinSupplyData(
    getStartDate(365 * 4 + 10) as string, // 10 days to buffer extra days to ensure we have data for the last 365 days
    endDate as string,
    'daily'
  )

  const latestStablecoinSupply =
    stablecoinSupply4YearData[stablecoinSupply4YearData.length - 1].value

  const latestStablecoinSupplyChange =
    stablecoinSupply4YearData[stablecoinSupply4YearData.length - 1].value -
    stablecoinSupply4YearData[stablecoinSupply4YearData.length - 2].value

  return (
    <div className="w-full pb-12 flex flex-col items-center gap-18 font-[family-name:var(--font-geist-sans)]">
      <div
        className="w-full flex items-center justify-center gap-12 pt-12 pb-12"
        style={{ background: 'var(--gradient-background)' }}
      >
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-3">
            <div className="flex flex-col gap-6">
              <Blurb
                title="Stablecoins: The Emerging Market Story"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                textAlignment="center"
              />
              <DownloadReport />
            </div>
            <StatSummaryTile
              mainStatLabel="ISSUED STABLECOINS"
              mainStat={{
                value: latestStablecoinSupply,
                type: VALUE_FORMAT.currency
              }}
              mainStatChange={{
                value: latestStablecoinSupplyChange,
                type: VALUE_FORMAT.currency,
                label: 'over the last day'
              }}
              sparklineData={stablecoinSupply5YearData}
              miniStatsData={stablecoinSupply4YearData}
            />
          </div>
        </ContentWrapper>
      </div>

      <ContentWrapper>
        <p className="text-center text-muted-foreground">
          Special Thanks to the Artemis Data Partners
        </p>
      </ContentWrapper>
      <div className="w-full flex flex-col gap-12 -mt-4 mb-6 md:mb-12">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="Stablecoin Market Cap Trends Upwards While Prices Rebound"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            />
          </div>
          <div className="col-span-2 md:order-1">
            <Chart
              title="Stablecoin vs Crypto Performance (Index to 100)"
              data={AVG_RETENTION_RATE_DATA}
              dataConfig={AVG_RETENTION_RATE_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              xAxisLabel="Months"
            />
          </div>
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="High Retention, Low Volatility: Why Stablecoins Are Built to Stay"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            />
          </div>
          <div className="col-span-2 md:order-1">
            <Chart
              title="Avg Retention Rate Across Crypto Categories"
              data={AVG_RETENTION_RATE_DATA}
              dataConfig={AVG_RETENTION_RATE_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              xAxisLabel="Months"
            />
          </div>
        </div>
      </ContentWrapper>

      <div
        className="w-full flex items-center justify-center pt-24 pb-24"
        style={{ background: 'var(--gradient-background-download)' }}
      >
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center gap-8 relative">
            <div
              className="absolute left-0 top-1/2 -translate-x-1/2"
              style={{
                width: '508px',
                height: '2px',
                background:
                  'linear-gradient(180deg, #5E4EB5 0%, rgba(255, 255, 255, 0) 100%)',
                transform: 'rotate(90deg)',
                opacity: 0.1
              }}
            />
            <div
              className="absolute right-0 top-1/2 translate-x-1/2"
              style={{
                width: '508px',
                height: '2px',
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #5E4EB5 100%)',
                transform: 'rotate(90deg)',
                opacity: 0.1
              }}
            />
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
                textAlignment="left"
              />
              <DownloadReport />
            </div>
          </div>
        </ContentWrapper>
      </div>

      <ContentWrapper>
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="text-4xl font-bold">Stablecoin Data Partners</p>
          <p className="text-muted-foreground">
            Join us to define the stablecoin data standard of the future
          </p>
          <LogoGrid dataPartners={DATA_PARTNERS_LOGOS} />
          <Button variant="cta" className="mt-3" asChild>
            <a href="mailto:team@artemisanalytics.xyz">Become a Data Partner</a>
          </Button>
        </div>
      </ContentWrapper>
    </div>
  )
}
