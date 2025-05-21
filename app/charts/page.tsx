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
    </div>
  )
}

export default Charts
