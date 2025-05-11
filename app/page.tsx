import Image from 'next/image'

import Chart from '@/components/chart'
import StatSummaryTile from '@/components/stat-summary-tile'

export default function Overview() {
  const dummyStats = [
    { period: 'Last Month', value: 560, pctChange: 10 },
    { period: 'Last Year', value: 560, pctChange: -5 },
    { period: 'Last 3 Months', value: 560, pctChange: 10 }
  ]

  return (
    <div className="w-full max-w-screen-xl mx-auto p-8 pb-20 flex flex-col gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <StatSummaryTile miniStatsData={dummyStats} />
      <Chart title="Payment Usage by Type" />
    </div>
  )
}
