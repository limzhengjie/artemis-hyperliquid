import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { VALUE_FORMAT } from '@/constants/chart'

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

import {
  STABLECOIN_ACTIVITY_BY_TYPE_DATA,
  STABLECOIN_ACTIVITY_BY_TYPE_CONFIG,
  STABLECOIN_VOLUME_BY_CHAIN_DATA,
  STABLECOIN_VOLUME_BY_CHAIN_CONFIG,
  STABLECOIN_VOLUME_BY_CURRENCY_DATA,
  STABLECOIN_VOLUME_BY_CURRENCY_CONFIG,
  STABLECOIN_FLOWS_BY_COUNTRY_DATA,
  STABLECOIN_FLOWS_BY_COUNTRY_CONFIG
} from '@/constants/data/overview'

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
      <div className="w-full -mt-4 mb-4">
        <LogoMarquee />
      </div>

      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="How Big are Stablecoin Payments, Really?"
            description="Based on the data provided by contributing firms and the additional on-chain estimates, we were able to characterize $92.4 billion of stablecoin settlements for various payment types between January 2023 and February 2025, with the vast majority of these settling on blockchains directly. The annual run rate pace for these settlements totalled approximately $72.3 billion in February 2025."
            textAlignment="center"
          />
          <Chart
            title="Stablecoin Activity by Type"
            data={STABLECOIN_ACTIVITY_BY_TYPE_DATA}
            dataConfig={STABLECOIN_ACTIVITY_BY_TYPE_CONFIG}
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
              title="Top Blockchains Used for Stablecoin Transactions in 2024"
              description="The most popular blockchains employed to settle customer flows, as a share of value sent, were Tron, followed by Ethereum, Polygon (Ethereum L2), and Binance Smart Chain. This mirrors survey findings from our 2024 report which found that users preferentially used those same five blockchains, albeit with Ethereum being the most popular network."
            />
          </div>
          <div className="col-span-2 md:order-1">
            <Chart
              title="Stablecoin Volume by Blockchain"
              data={STABLECOIN_VOLUME_BY_CHAIN_DATA}
              dataConfig={STABLECOIN_VOLUME_BY_CHAIN_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
            />
          </div>
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="The Most Used Stablecoins for Global Transactions"
            description="Tether's USDT was by far the most popular stablecoin used to settle flows for firms in the study. We explore the breakdown of USDT versus Circle's USDC on a country-by-country basis later in the report."
          />
          <div className="col-span-2">
            <Chart
              title="Stablecoin Volume by Token"
              data={STABLECOIN_VOLUME_BY_CURRENCY_DATA}
              dataConfig={STABLECOIN_VOLUME_BY_CURRENCY_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
            />
          </div>
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="Which Countries Send the Most Stablecoins?"
              description="Based on the geographic data provided by firms for the study, combined with additional geographic attribution estimates obtained by looking at IP addresses and timezones of on-chain entities as their transactions reach blockchain nodes, we were able to identify countries originating the bulk of stablecoin transactions. The USA, Singapore, Hong Kong, Japan, and the UK were the top stablecoin sending countries."
            />
          </div>
          <div className="col-span-2 md:order-1">
            <Chart
              title="Percent of Stablecoin Flows by Country"
              data={STABLECOIN_FLOWS_BY_COUNTRY_DATA}
              dataConfig={STABLECOIN_FLOWS_BY_COUNTRY_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hideLegend
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
          <p className="text-4xl font-bold">Artemis Data Partners</p>
          <p className="text-muted-foreground">
            Join us to define the stablecoin data standard of the future
          </p>
          <LogoGrid dataPartners={DATA_PARTNERS_LOGOS} />
          <Link
            href="https://ry0v9n8oa4l.typeform.com/to/pibk76PA"
            target="_blank"
          >
            <Button variant="cta" className="mt-3">
              Join Us
            </Button>
          </Link>
        </div>
      </ContentWrapper>
    </div>
  )
}
