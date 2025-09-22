import Chart from '@/components/chart'
import { VALUE_FORMAT, CHART_TYPES } from '@/constants/chart'
import { getCurrentDate, getStartDate } from '@/lib/dates'
import { fetchAllPerpsVolume } from '@/lib/fetchHyperliquidData'

import {
  STABLECOIN_ACTIVITY_BY_TYPE_DATA,
  STABLECOIN_ACTIVITY_BY_TYPE_CONFIG,
  STABLECOIN_BUSINESS_ACTIVITY_BY_TYPE_CONFIG,
  STABLECOIN_CONSUMER_ACTIVITY_BY_TYPE_CONFIG,
  STABLECOIN_VOLUME_BY_CHAIN_DATA,
  STABLECOIN_VOLUME_BY_CHAIN_CONFIG,
  STABLECOIN_VOLUME_BY_CURRENCY_DATA,
  STABLECOIN_VOLUME_BY_CURRENCY_CONFIG,
  STABLECOIN_FLOWS_BY_COUNTRY_DATA,
  STABLECOIN_FLOWS_BY_COUNTRY_CONFIG,
  STABLECOIN_COMPANIES_BY_CHAIN_DATA,
  STABLECOIN_COMPANIES_BY_CHAIN_CONFIG
} from '@/constants/data/overview'

import { BINANCE_HYPERLIQUID_SPOT_DATA, BINANCE_HYPERLIQUID_SPOT_CONFIG } from '@/constants/data/binance-hyperliquid'

import {
  USE_CASE_BY_CURRENCY_CONFIG,
  B2B_VOLUMES_DATA,
  B2B_VOLUMES_DATA_CONFIG,
  B2B_PERCENT_OF_CURRENCY_FLOWS_DATA,
  AVG_B2B_TXN_SIZE_BY_CHAIN_DATA,
  AVG_B2B_TXN_SIZE_BY_CHAIN_CONFIG,
  CRYPTO_CARD_LINKED_VOLUMES_DATA,
  CRYPTO_CARD_LINKED_VOLUMES_CONFIG,
  AVG_CARD_TXN_SIZE_BY_TYPE_DATA,
  AVG_CARD_TXN_SIZE_BY_TYPE_CONFIG,
  P2P_VOLUMES_DATA,
  P2P_VOLUMES_CONFIG,
  AVG_P2P_TXN_SIZE_BY_APPLICATION_DATA,
  AVG_P2P_TXN_SIZE_BY_APPLICATION_CONFIG,
  B2C_VOLUMES_DATA,
  B2C_VOLUMES_CONFIG,
  PREFUNDING_DATA,
  PREFUNDING_CONFIG
} from '@/constants/data/use-case'

const Charts = async () => {
  const endDate = getCurrentDate()
  const startDate = getStartDate(180) as string

  const PERP_VOLUME_BY_SYMBOL_DATA = await fetchAllPerpsVolume(
    startDate,
    endDate as string
  )

  const PERP_VOLUME_BY_SYMBOL_CONFIG = {
    aevo: { label: 'Aevo', color: '#8C7CF7', type: CHART_TYPES.stacked100, stackId: 'perps' },
    apex: { label: 'Apex', color: '#70A9FF', type: CHART_TYPES.stacked100, stackId: 'perps' },
    avantis: { label: 'Avantis', color: '#51B495', type: CHART_TYPES.stacked100, stackId: 'perps' },
    blue: { label: 'Bluefin', color: '#F7BD5F', type: CHART_TYPES.stacked100, stackId: 'perps' },
    drift: { label: 'Drift', color: '#FF8A65', type: CHART_TYPES.stacked100, stackId: 'perps' },
    dydx: { label: 'dYdX', color: '#4DB6AC', type: CHART_TYPES.stacked100, stackId: 'perps' },
    gns: { label: 'Gains', color: '#BA68C8', type: CHART_TYPES.stacked100, stackId: 'perps' },
    gmx: { label: 'GMX', color: '#FFD54F', type: CHART_TYPES.stacked100, stackId: 'perps' },
    hold: { label: 'Hold', color: '#90A4AE', type: CHART_TYPES.stacked100, stackId: 'perps' },
    hype: { label: 'Hyperliquid', color: '#EF5350', type: CHART_TYPES.stacked100, stackId: 'perps' },
    jup: { label: 'Jupiter', color: '#66BB6A', type: CHART_TYPES.stacked100, stackId: 'perps' },
    ktc: { label: 'KTX', color: '#26C6DA', type: CHART_TYPES.stacked100, stackId: 'perps' },
    mcb: { label: 'MCB', color: '#D4E157', type: CHART_TYPES.stacked100, stackId: 'perps' },
    perp: { label: 'Perpetual', color: '#9575CD', type: CHART_TYPES.stacked100, stackId: 'perps' },
    // snx intentionally omitted: "Metric not available for asset."
    vrtx: { label: 'Vertex', color: '#FFB74D', type: CHART_TYPES.stacked100, stackId: 'perps' },
    lighter: { label: 'Lighter', color: '#26A69A', type: CHART_TYPES.stacked100, stackId: 'perps' }
  } as const

  return (
    <div className="w-full max-w-6xl mx-auto p-12 flex flex-col items-center gap-8 font-[family-name:var(--font-geist-sans)]">
      <Chart
        title="Perp Volume Share by Venue"
        data={[...PERP_VOLUME_BY_SYMBOL_DATA]}
        dataConfig={PERP_VOLUME_BY_SYMBOL_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        isTimeSeries
        hidePoweredBy
        chartHeight={320}
      />
      <Chart
        title="Stablecoin Payments by Type"
        data={STABLECOIN_ACTIVITY_BY_TYPE_DATA}
        dataConfig={STABLECOIN_ACTIVITY_BY_TYPE_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        isTimeSeries
        yAxisDomainToMax
        hidePoweredBy
        chartHeight={320}
      />
      <Chart
        title="Stablecoin Business Payments by Type"
        data={STABLECOIN_ACTIVITY_BY_TYPE_DATA}
        dataConfig={STABLECOIN_BUSINESS_ACTIVITY_BY_TYPE_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        isTimeSeries
        yAxisDomainToMax
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Consumer Payments by Type"
        data={STABLECOIN_ACTIVITY_BY_TYPE_DATA}
        dataConfig={STABLECOIN_CONSUMER_ACTIVITY_BY_TYPE_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        isTimeSeries
        hidePoweredBy
      />
      <Chart
        title="Number of Stablecoin Companies by Blockchain"
        data={STABLECOIN_COMPANIES_BY_CHAIN_DATA}
        dataConfig={STABLECOIN_COMPANIES_BY_CHAIN_CONFIG}
        valueFormat={VALUE_FORMAT.number}
        hideLegend
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
        title="Stablecoin Volume by Token"
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

      <h1 className="text-2xl font-bold">Binance vs Hyperliquid</h1>
      <Chart
        title="Binance vs Hyperliquid Spot Volume (Weekly)"
        data={[...BINANCE_HYPERLIQUID_SPOT_DATA]}
        dataConfig={BINANCE_HYPERLIQUID_SPOT_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        isTimeSeries
        hidePoweredBy
        chartHeight={320}
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
      <Chart
        title="Crypto Card Linked Volumes"
        data={CRYPTO_CARD_LINKED_VOLUMES_DATA}
        dataConfig={CRYPTO_CARD_LINKED_VOLUMES_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        isTimeSeries
        hideLegend
        hidePoweredBy
      />
      <Chart
        title="Average Card Transaction Size by Card Type"
        data={AVG_CARD_TXN_SIZE_BY_TYPE_DATA}
        dataConfig={AVG_CARD_TXN_SIZE_BY_TYPE_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        hideLegend
        hidePoweredBy
      />
      <Chart
        title="P2P Stablecoin Volumes"
        data={P2P_VOLUMES_DATA}
        dataConfig={P2P_VOLUMES_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        isTimeSeries
        hideLegend
        hidePoweredBy
      />
      <Chart
        title="Average P2P Transaction Size by Application"
        data={AVG_P2P_TXN_SIZE_BY_APPLICATION_DATA}
        dataConfig={AVG_P2P_TXN_SIZE_BY_APPLICATION_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        hideLegend
        hidePoweredBy
      />
      <Chart
        title="B2C Stablecoin Volumes"
        data={B2C_VOLUMES_DATA}
        dataConfig={B2C_VOLUMES_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        isTimeSeries
        hideLegend
        hidePoweredBy
      />
      <Chart
        title="Stablecoin Prefunding"
        data={PREFUNDING_DATA}
        dataConfig={PREFUNDING_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        isTimeSeries
        hidePoweredBy
      />
    </div>
  )
}

export default Charts
