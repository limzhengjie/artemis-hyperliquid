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
