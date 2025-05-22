import { VALUE_FORMAT } from '@/constants/chart'
import Chart from '@/components/chart'
import ContentWrapper from '@/components/(layout)/content-wrapper'
import Blurb from '@/components/blurb'

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

const Regions = () => {
  return (
    <div className="w-full pt-12 pb-12 flex flex-col items-center gap-12 font-[family-name:var(--font-geist-sans)]">
      <ContentWrapper>
        <Blurb
          title="Stablecoin Volume by Region"
          description=" Of the companies included in the broader study, 52% provided geographic-level reporting, enabling analysis of stablecoin usage patterns across both regional and national contexts."
        />
      </ContentWrapper>

      <ContentWrapper>
        <div className="w-full flex gap-4">
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
        <div className="w-full flex gap-4">
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
        <div className="w-full flex gap-4">
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
        <div className="w-full flex gap-4">
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
        <div className="w-full flex gap-4">
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
  )
}

export default Regions
