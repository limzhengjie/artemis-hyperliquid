import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

import ArtemisLogo from '@/components/(layout)/artemis-logo'

interface Props {
  title: string
}

const Chart = ({ title }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-4">
        <div className="h-[300px] bg-slate-200">chart</div>
        <div className="ml-auto">
          <ArtemisLogo poweredBy />
        </div>
      </CardContent>
    </Card>
  )
}

export default Chart
