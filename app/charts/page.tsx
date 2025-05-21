import Chart from '@/components/chart'
import { VALUE_FORMAT } from '@/constants/chart'

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

import {
  USE_CASE_BY_CURRENCY_CONFIG,
  B2B_VOLUMES_DATA,
  B2B_VOLUMES_DATA_CONFIG,
  B2B_PERCENT_OF_CURRENCY_FLOWS_DATA,
  AVG_B2B_TXN_SIZE_BY_CHAIN_DATA,
  AVG_B2B_TXN_SIZE_BY_CHAIN_CONFIG
} from '@/constants/data/use-case'

const Charts = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-12 flex flex-col items-center gap-8 font-[family-name:var(--font-geist-sans)]">
      <Chart
        title="Stablecoin Activity by Type"
        data={STABLECOIN_ACTIVITY_BY_TYPE_DATA}
        dataConfig={STABLECOIN_ACTIVITY_BY_TYPE_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        isTimeSeries
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Volume by Blockchain"
        data={STABLECOIN_VOLUME_BY_CHAIN_DATA}
        dataConfig={STABLECOIN_VOLUME_BY_CHAIN_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        isTimeSeries
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Volume by Currency"
        data={STABLECOIN_VOLUME_BY_CURRENCY_DATA}
        dataConfig={STABLECOIN_VOLUME_BY_CURRENCY_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        isTimeSeries
        hidePoweredBy
      />
      <Chart
        title="Percent of Stablecoin Flows by Country"
        data={STABLECOIN_FLOWS_BY_COUNTRY_DATA}
        dataConfig={STABLECOIN_FLOWS_BY_COUNTRY_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        hideLegend
        hidePoweredBy
      />

      <h1 className="text-2xl font-bold">
        B2B Stablecoin Volume by Region (of our Data Partners)
      </h1>
      <Chart
        title="Stablecoin Volume by Blockchain in Latin America"
        data={LATIN_AMERICA_BY_CHAIN_DATA}
        dataConfig={REGION_BY_CHAIN_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Volume by Currency in Latin America"
        data={LATIN_AMERICA_BY_CURRENCY_DATA}
        dataConfig={REGION_BY_CURRENCY_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Volume by Blockchain in Africa"
        data={AFRICA_BY_CHAIN_DATA}
        dataConfig={REGION_BY_CHAIN_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Volume by Currency in Africa"
        data={AFRICA_BY_CURRENCY_DATA}
        dataConfig={REGION_BY_CURRENCY_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Volume by Blockchain in Americas"
        data={AMERICAS_BY_CHAIN_DATA}
        dataConfig={REGION_BY_CHAIN_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Volume by Currency in Americas"
        data={AMERICAS_BY_CURRENCY_DATA}
        dataConfig={REGION_BY_CURRENCY_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Volume by Blockchain in Europe"
        data={EUROPE_BY_CHAIN_DATA}
        dataConfig={REGION_BY_CHAIN_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Volume by Currency in Europe"
        data={EUROPE_BY_CURRENCY_DATA}
        dataConfig={REGION_BY_CURRENCY_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Volume by Blockchain in Asia"
        data={ASIA_BY_CHAIN_DATA}
        dataConfig={REGION_BY_CHAIN_CONFIG_WITH_XRP}
        valueFormat={VALUE_FORMAT.percentage}
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Volume by Currency in Asia"
        data={ASIA_BY_CURRENCY_DATA}
        dataConfig={REGION_BY_CURRENCY_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        hidePoweredBy
      />

      <h1 className="text-2xl font-bold">Use Case Breakdowns</h1>
      <Chart
        title="B2B Stablecoin Volumes"
        data={B2B_VOLUMES_DATA}
        dataConfig={B2B_VOLUMES_DATA_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        isTimeSeries
        hideLegend
        hidePoweredBy
      />
      <Chart
        title="B2B Percent of Currency Flows"
        data={B2B_PERCENT_OF_CURRENCY_FLOWS_DATA}
        dataConfig={USE_CASE_BY_CURRENCY_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        isTimeSeries
        hidePoweredBy
      />
      <Chart
        title="Average B2B Transaction Size by Blockchain"
        data={AVG_B2B_TXN_SIZE_BY_CHAIN_DATA}
        dataConfig={AVG_B2B_TXN_SIZE_BY_CHAIN_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        hideLegend
        hidePoweredBy
      />
    </div>
  )
}

export default Charts
