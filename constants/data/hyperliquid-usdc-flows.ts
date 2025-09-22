import { CHART_TYPES } from '../chart'
import type { ChartConfig } from '@/components/ui/chart'

// Sample of recent USDC net flows data - in production, this would be loaded from the full CSV
export const HYPERLIQUID_USDC_FLOWS_DATA = [
  { date: '2025-09-18', usdc_net_inflow_usd: 15270389.119969368 },
  { date: '2025-09-17', usdc_net_inflow_usd: 30398920.37220955 },
  { date: '2025-09-16', usdc_net_inflow_usd: -33768136.82619572 },
  { date: '2025-09-15', usdc_net_inflow_usd: -30961468.41123295 },
  { date: '2025-09-14', usdc_net_inflow_usd: 6818445.734294891 },
  { date: '2025-09-13', usdc_net_inflow_usd: 108153391.71803951 },
  { date: '2025-09-12', usdc_net_inflow_usd: 150879155.45304775 },
  { date: '2025-09-11', usdc_net_inflow_usd: 62764279.394301414 },
  { date: '2025-09-10', usdc_net_inflow_usd: 109344106.65125561 },
  { date: '2025-09-09', usdc_net_inflow_usd: 60269341.38852024 },
  { date: '2025-09-08', usdc_net_inflow_usd: 62035382.52251148 },
  { date: '2025-09-07', usdc_net_inflow_usd: -28237627.669592857 },
  { date: '2025-09-06', usdc_net_inflow_usd: 6777438.2265377045 },
  { date: '2025-09-05', usdc_net_inflow_usd: 44445809.998737335 },
  { date: '2025-09-04', usdc_net_inflow_usd: -62194556.74194145 },
  { date: '2025-09-03', usdc_net_inflow_usd: 1586415.3115882874 },
  { date: '2025-09-02', usdc_net_inflow_usd: -141292094.70035267 },
  { date: '2025-09-01', usdc_net_inflow_usd: 6938001.133605003 },
  { date: '2025-08-31', usdc_net_inflow_usd: -19430798.871842384 },
  { date: '2025-08-30', usdc_net_inflow_usd: 83820476.29367828 },
  { date: '2025-08-29', usdc_net_inflow_usd: 16381479.221463203 },
  { date: '2025-08-28', usdc_net_inflow_usd: 19876734.183236122 },
  { date: '2025-08-27', usdc_net_inflow_usd: 192629770.58405495 },
  { date: '2025-08-26', usdc_net_inflow_usd: 74094154.63363075 },
  { date: '2025-08-25', usdc_net_inflow_usd: -297548605.96959686 },
  { date: '2025-08-24', usdc_net_inflow_usd: 96848275.4391861 },
  { date: '2025-08-23', usdc_net_inflow_usd: 29680979.77815628 },
  { date: '2025-08-22', usdc_net_inflow_usd: 461667367.26083183 },
  { date: '2025-08-21', usdc_net_inflow_usd: 13873928.217069626 },
  { date: '2025-08-20', usdc_net_inflow_usd: 57931858.51030922 },
  { date: '2025-08-19', usdc_net_inflow_usd: -112428886.21403027 },
  { date: '2025-08-18', usdc_net_inflow_usd: -121318067.15814972 },
  { date: '2025-08-17', usdc_net_inflow_usd: -9474283.826883316 },
  { date: '2025-08-16', usdc_net_inflow_usd: -4278480.206730843 },
  { date: '2025-08-15', usdc_net_inflow_usd: -87628908.58990097 },
  { date: '2025-08-14', usdc_net_inflow_usd: -79739343.44278717 },
  { date: '2025-08-13', usdc_net_inflow_usd: 303652220.6701107 },
  { date: '2025-08-12', usdc_net_inflow_usd: 174734254.82253742 },
  { date: '2025-08-11', usdc_net_inflow_usd: 80279771.97387505 },
  { date: '2025-08-10', usdc_net_inflow_usd: 31167088.99394989 },
  { date: '2025-08-09', usdc_net_inflow_usd: 123898501.76232147 },
  { date: '2025-08-08', usdc_net_inflow_usd: 74366086.85516357 },
  { date: '2025-08-07', usdc_net_inflow_usd: 128837942.99333477 },
  { date: '2025-08-06', usdc_net_inflow_usd: -38012136.83141327 },
  { date: '2025-08-05', usdc_net_inflow_usd: -48081571.38060856 },
  { date: '2025-08-04', usdc_net_inflow_usd: -12333132.785215378 },
  { date: '2025-08-03', usdc_net_inflow_usd: -1314798.3026752472 },
  { date: '2025-08-02', usdc_net_inflow_usd: -124552478.85560322 },
  { date: '2025-08-01', usdc_net_inflow_usd: -164190067.90304947 }
]

export const HYPERLIQUID_USDC_FLOWS_CONFIG: ChartConfig = {
  usdc_net_inflow_usd: {
    label: 'USDC Net Inflows',
    color: '#00D4AA',
    type: CHART_TYPES.bar
  }
}
