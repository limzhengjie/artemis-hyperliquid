import Image from 'next/image'

import Chart from '@/components/chart'

export default function Overview() {
  return (
    <div className="w-full max-w-screen-xl mx-auto p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Chart title="Payment Usage by Type" />
    </div>
  )
}
