'use client'

import { useState, useEffect, useRef } from 'react'
import { VALUE_FORMAT } from '@/constants/chart'
import Chart from '@/components/chart'
import ContentWrapper from '@/components/(layout)/content-wrapper'
import Blurb from '@/components/blurb'
import AnimatedTabs, { Tab } from '@/components/tabs'

import {
  REGION_BY_CURRENCY_CONFIG,
  REGION_BY_CHAIN_CONFIG,
  REGION_BY_CHAIN_CONFIG_WITH_XRP,
  LATIN_AMERICA_BY_CHAIN_DATA,
  LATIN_AMERICA_BY_CURRENCY_DATA,
  AFRICA_BY_CHAIN_DATA,
  AFRICA_BY_CURRENCY_DATA,
  AMERICAS_BY_CHAIN_DATA,
  AMERICAS_BY_CURRENCY_DATA,
  ASIA_BY_CHAIN_DATA,
  ASIA_BY_CURRENCY_DATA,
  EUROPE_BY_CHAIN_DATA,
  EUROPE_BY_CURRENCY_DATA
} from '@/constants/data/regions'

const REGIONS: Tab[] = [
  { id: 'latin-america', label: 'Latin America' },
  { id: 'africa', label: 'Africa' },
  { id: 'americas', label: 'Americas' },
  { id: 'europe', label: 'Europe' },
  { id: 'asia', label: 'Asia' }
]

const Regions = () => {
  const [activeTab, setActiveTab] = useState(REGIONS[0].id)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // scroll to the section corresponding to the active tab
    const element = document.getElementById(activeTab)
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }, [activeTab])

  return (
    <div className="w-full flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* Header section */}
      <div className="w-full bg-white pt-6 lg:pt-12 pb-4 flex flex-col items-center gap-3 lg:gap-6">
        <ContentWrapper>
          <Blurb
            title="Stablecoin Volume by Region"
            description="Of the companies included in the broader study, 52% provided geographic-level reporting, enabling analysis of stablecoin usage patterns across both regional and national contexts. These insights shed light on how stablecoin-powered companies, including fintechs, exchanges, payment platforms, and on/off-ramp providers, operate across markets. By examining regional behavior, we can identify that USDT and Tron are the most popular Stablecoin and Chain used around the world."
          />
        </ContentWrapper>
        <ContentWrapper>
          <div className="w-full flex justify-center">
            <AnimatedTabs
              tabs={REGIONS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </ContentWrapper>
      </div>

      {/* Content section */}
      <div className="w-full pb-12 flex flex-col items-center gap-12">
        <ContentWrapper>
          <h3 className="text-2xl font-bold mb-4" id="latin-america">
            Latin America
          </h3>
          <p className="text-muted-foreground text-md mb-4">
            Across Latin America, Tron dominates as the primary blockchain for
            stablecoin settlement, especially in Colombia, Ecuador, and Brazil,
            where it accounts for the vast majority of observed activity. USDT
            is the primary stablecoin across the region, though Argentina stands
            out for its relatively high USDC usage, likely driven by local
            startups responding to chronic currency instability.
          </p>
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <Chart
              title="Stablecoin Volume by Blockchain in Latin America"
              data={LATIN_AMERICA_BY_CHAIN_DATA}
              dataConfig={REGION_BY_CHAIN_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hidePoweredBy
            />
            <Chart
              title="Stablecoin Volume by Token in Latin America"
              data={LATIN_AMERICA_BY_CURRENCY_DATA}
              dataConfig={REGION_BY_CURRENCY_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hidePoweredBy
            />
          </div>
        </ContentWrapper>

        <ContentWrapper>
          <h3 className="text-2xl font-bold mb-4" id="africa">
            Africa
          </h3>
          <p className="text-muted-foreground text-md mb-4">
            In Africa, Tron and Ethereum dominate stablecoin settlement, with
            Tron leading in North and West African markets, while Ethereum sees
            more use in Kenya, Nigeria, South Africa, and Uganda. USDT remains
            the primary stablecoin across the continent, though USDC has gained
            notable traction in select countries like Nigeria and South Africa.
          </p>
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <Chart
              title="Stablecoin Volume by Blockchain in Africa"
              data={AFRICA_BY_CHAIN_DATA}
              dataConfig={REGION_BY_CHAIN_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hidePoweredBy
            />
            <Chart
              title="Stablecoin Volume by Token in Africa"
              data={AFRICA_BY_CURRENCY_DATA}
              dataConfig={REGION_BY_CURRENCY_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hidePoweredBy
            />
          </div>
        </ContentWrapper>

        <ContentWrapper>
          <h3 className="text-2xl font-bold mb-4" id="americas">
            Americas
          </h3>
          <p className="text-muted-foreground text-md mb-4">
            In the Americas, Tron leads stablecoin settlement across most
            markets, with Ethereum showing stronger presence in the U.S. and
            Jamaica. USDT overwhelmingly dominates stablecoin volume
            region-wide, though USDC sees meaningful adoption in the U.S. and
            modest presence in countries like Mexico and Jamaica.
          </p>
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <Chart
              title="Stablecoin Volume by Blockchain in Americas"
              data={AMERICAS_BY_CHAIN_DATA}
              dataConfig={REGION_BY_CHAIN_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hidePoweredBy
            />
            <Chart
              title="Stablecoin Volume by Token in Americas"
              data={AMERICAS_BY_CURRENCY_DATA}
              dataConfig={REGION_BY_CURRENCY_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hidePoweredBy
            />
          </div>
        </ContentWrapper>

        <ContentWrapper>
          <h3 className="text-2xl font-bold mb-4" id="europe">
            Europe
          </h3>
          <p className="text-muted-foreground text-md mb-4">
            In Europe, Tron dominates stablecoin settlement across nearly all
            markets, with Ethereum playing a secondary role and leading only in
            Spain. USDT accounts for over 90% of stablecoin volume throughout
            the region, while USDC and other stablecoins see minimal usage.
          </p>
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <Chart
              title="Stablecoin Volume by Blockchain in Europe"
              data={EUROPE_BY_CHAIN_DATA}
              dataConfig={REGION_BY_CHAIN_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hidePoweredBy
            />
            <Chart
              title="Stablecoin Volume by Token in Europe"
              data={EUROPE_BY_CURRENCY_DATA}
              dataConfig={REGION_BY_CURRENCY_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hidePoweredBy
            />
          </div>
        </ContentWrapper>

        <ContentWrapper>
          <h3 className="text-2xl font-bold mb-4" id="asia">
            Asia
          </h3>
          <p className="text-muted-foreground text-md mb-4">
            Asia shows the most diverse network landscape, with Tron leading in
            many markets but Ethereum, BSC, and Polygon (notably in India) also
            seeing meaningful adoption. USDT dominates stablecoin usage across
            the region, though India stands out with USDC capturing nearly half
            of local volume.
          </p>
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <Chart
              title="Stablecoin Volume by Blockchain in Asia"
              data={ASIA_BY_CHAIN_DATA}
              dataConfig={REGION_BY_CHAIN_CONFIG_WITH_XRP}
              valueFormat={VALUE_FORMAT.percentage}
              hidePoweredBy
            />
            <Chart
              title="Stablecoin Volume by Token in Asia"
              data={ASIA_BY_CURRENCY_DATA}
              dataConfig={REGION_BY_CURRENCY_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hidePoweredBy
            />
          </div>
        </ContentWrapper>
      </div>
    </div>
  )
}

export default Regions
