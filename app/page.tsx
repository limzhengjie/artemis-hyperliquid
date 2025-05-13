import Chart from '@/components/chart'
import StatSummaryTile from '@/components/stat-summary-tile'

import {
  AVG_RETENTION_RATE_DATA,
  AVG_RETENTION_RATE_CONFIG,
  PAYMENT_USAGE_BY_TYPE_DATA,
  PAYMENT_USAGE_BY_TYPE_CONFIG,
  VALUE_FORMAT
} from '@/constants/chart'

export default function Overview() {
  const dummyStats = [
    { period: 'Last Month', value: 560, pctChange: 10 },
    { period: 'Last Year', value: 560, pctChange: -5 },
    { period: 'Last 3 Months', value: 560, pctChange: 10 }
  ]

  return (
    <div className="w-full max-w-screen-xl mx-auto p-8 pb-20 flex flex-col gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <StatSummaryTile miniStatsData={dummyStats} />
      <Chart
        title="Avg Retention Rate Across Crypto Categories"
        data={AVG_RETENTION_RATE_DATA}
        dataConfig={AVG_RETENTION_RATE_CONFIG}
        valueFormat={VALUE_FORMAT.percentage}
        xAxisLabel="Months"
      />
      <Chart
        title="Payment Usage by Type"
        data={PAYMENT_USAGE_BY_TYPE_DATA}
        dataConfig={PAYMENT_USAGE_BY_TYPE_CONFIG}
        valueFormat={VALUE_FORMAT.currency}
        isTimeSeries
      />
    </div>
  )
}
