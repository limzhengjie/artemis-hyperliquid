import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { VALUE_FORMAT, CHART_TYPES } from '@/constants/chart'

import { QUOTES } from '@/constants/quotes'
import { DATA_PARTNERS } from '@/constants/data-partners'

import { getCurrentDate, getStartDate } from '@/lib/dates'
import { fetchHyperliquidPerpVolume, fetchHyperliquidPerpVolumeBySymbol } from '@/lib/fetchStablecoinsData'
import type { ChartConfig } from '@/components/ui/chart'

import Chart from '@/components/chart'
import Blurb from '@/components/blurb'
import ContentWrapper from '@/components/(layout)/content-wrapper'
import Quotes from '@/components/quotes'
import LogoMarquee from '@/components/logo-marquee'
import LogoGrid from '@/components/logo-grid'
import DownloadReportForm from '@/components/download-report'
import ArtemisLogo from '@/components/(layout)/artemis-logo'

import {
  STABLECOIN_VOLUME_BY_CHAIN_DATA,
  STABLECOIN_VOLUME_BY_CHAIN_CONFIG,
  STABLECOIN_VOLUME_BY_CURRENCY_DATA,
  STABLECOIN_VOLUME_BY_CURRENCY_CONFIG,
  STABLECOIN_FLOWS_BY_COUNTRY_DATA,
  STABLECOIN_FLOWS_BY_COUNTRY_CONFIG
} from '@/constants/data/overview'

import ReportImage from '@/public/report.png'

export default async function Overview() {
  const endDate = getCurrentDate()

  const stablecoinSupply5YearData = await fetchHyperliquidPerpVolume(
    getStartDate(365 * 5) as string,
    endDate as string,
    'weekly'
  )

  const stablecoinSupply4YearData = await fetchHyperliquidPerpVolume(
    getStartDate(365 * 4 + 10) as string, // 10 days to buffer extra days to ensure we have data for the last 365 days
    endDate as string,
    'daily'
  )

  const latestStablecoinSupply =
    stablecoinSupply4YearData?.[stablecoinSupply4YearData.length - 1]?.value || 0

  const latestStablecoinSupplyChange =
    (stablecoinSupply4YearData?.[stablecoinSupply4YearData.length - 1]?.value || 0) -
    (stablecoinSupply4YearData?.[stablecoinSupply4YearData.length - 2]?.value || 0)

  // Fetch symbol breakdown for stacked-percent chart in hero
  const perpBreakdownData = await fetchHyperliquidPerpVolumeBySymbol(
    getStartDate(365) as string,
    endDate as string
  )

  const PERP_VOLUME_BY_SYMBOL_CONFIG: ChartConfig = {
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
    vrtx: { label: 'Vertex', color: '#FFB74D', type: CHART_TYPES.stacked100, stackId: 'perps' },
    lighter: { label: 'Lighter', color: '#26A69A', type: CHART_TYPES.stacked100, stackId: 'perps' }
  }

  // TVL (Daily) - Raw source we currently have in-page
  const TVL_DATA = [
    {
      "DATE": "2024-12-01",
      "TVL_CHAIN_APPS": 158295217,
      "TVL_HLP": 158295217,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-02",
      "TVL_CHAIN_APPS": 158514283,
      "TVL_HLP": 158514283,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-03",
      "TVL_CHAIN_APPS": 164132183,
      "TVL_HLP": 164132183,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-04",
      "TVL_CHAIN_APPS": 168195793,
      "TVL_HLP": 168195793,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-05",
      "TVL_CHAIN_APPS": 180650762,
      "TVL_HLP": 180650762,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-06",
      "TVL_CHAIN_APPS": 188388255,
      "TVL_HLP": 188388254,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2024-12-07",
      "TVL_CHAIN_APPS": 192953481,
      "TVL_HLP": 192953481,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-08",
      "TVL_CHAIN_APPS": 207653743,
      "TVL_HLP": 207653742,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2024-12-09",
      "TVL_CHAIN_APPS": 210547130,
      "TVL_HLP": 210547130,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-10",
      "TVL_CHAIN_APPS": 218604558,
      "TVL_HLP": 218604558,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-11",
      "TVL_CHAIN_APPS": 247786314,
      "TVL_HLP": 247786313,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2024-12-12",
      "TVL_CHAIN_APPS": 263823557,
      "TVL_HLP": 263823557,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-13",
      "TVL_CHAIN_APPS": 278383390,
      "TVL_HLP": 278383390,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-14",
      "TVL_CHAIN_APPS": 288584680,
      "TVL_HLP": 288584680,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-15",
      "TVL_CHAIN_APPS": 307549410,
      "TVL_HLP": 307549409,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2024-12-16",
      "TVL_CHAIN_APPS": 321653348,
      "TVL_HLP": 321653347,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2024-12-17",
      "TVL_CHAIN_APPS": 327256527,
      "TVL_HLP": 327256527,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-18",
      "TVL_CHAIN_APPS": 340515973,
      "TVL_HLP": 340515972,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2024-12-19",
      "TVL_CHAIN_APPS": 354822945,
      "TVL_HLP": 354822945,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-20",
      "TVL_CHAIN_APPS": 392807285,
      "TVL_HLP": 392807285,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-21",
      "TVL_CHAIN_APPS": 420018967,
      "TVL_HLP": 420018967,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-22",
      "TVL_CHAIN_APPS": 440993836,
      "TVL_HLP": 440993835,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2024-12-23",
      "TVL_CHAIN_APPS": 460122085,
      "TVL_HLP": 460122085,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-24",
      "TVL_CHAIN_APPS": 428177641,
      "TVL_HLP": 428177641,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-25",
      "TVL_CHAIN_APPS": 406468759,
      "TVL_HLP": 406468758,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2024-12-26",
      "TVL_CHAIN_APPS": 400802271,
      "TVL_HLP": 400802270,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2024-12-27",
      "TVL_CHAIN_APPS": 391800341,
      "TVL_HLP": 391800341,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-28",
      "TVL_CHAIN_APPS": 390287252,
      "TVL_HLP": 390287252,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-29",
      "TVL_CHAIN_APPS": 402540281,
      "TVL_HLP": 402540281,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2024-12-30",
      "TVL_CHAIN_APPS": 398218491,
      "TVL_HLP": 398218490,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2024-12-31",
      "TVL_CHAIN_APPS": 398649759,
      "TVL_HLP": 398649759,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-01",
      "TVL_CHAIN_APPS": 403383323,
      "TVL_HLP": 403383322,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-02",
      "TVL_CHAIN_APPS": 405745736,
      "TVL_HLP": 405745736,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-03",
      "TVL_CHAIN_APPS": 392519880,
      "TVL_HLP": 392519879,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-04",
      "TVL_CHAIN_APPS": 377940094,
      "TVL_HLP": 377940093,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-05",
      "TVL_CHAIN_APPS": 359930028,
      "TVL_HLP": 359930028,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-06",
      "TVL_CHAIN_APPS": 352621512,
      "TVL_HLP": 352621512,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-07",
      "TVL_CHAIN_APPS": 339369901,
      "TVL_HLP": 339369901,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-08",
      "TVL_CHAIN_APPS": 338680224,
      "TVL_HLP": 338680223,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-09",
      "TVL_CHAIN_APPS": 341774241,
      "TVL_HLP": 341774240,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-10",
      "TVL_CHAIN_APPS": 337316903,
      "TVL_HLP": 337316902,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-11",
      "TVL_CHAIN_APPS": 332055924,
      "TVL_HLP": 332055924,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-12",
      "TVL_CHAIN_APPS": 331091636,
      "TVL_HLP": 331091636,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-13",
      "TVL_CHAIN_APPS": 328929362,
      "TVL_HLP": 328929361,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-14",
      "TVL_CHAIN_APPS": 324799760,
      "TVL_HLP": 324799760,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-15",
      "TVL_CHAIN_APPS": 315742382,
      "TVL_HLP": 315742381,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-16",
      "TVL_CHAIN_APPS": 309416198,
      "TVL_HLP": 309416197,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-17",
      "TVL_CHAIN_APPS": 303581244,
      "TVL_HLP": 303581243,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-18",
      "TVL_CHAIN_APPS": 284944553,
      "TVL_HLP": 284944552,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-19",
      "TVL_CHAIN_APPS": 275171288,
      "TVL_HLP": 275171288,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-20",
      "TVL_CHAIN_APPS": 267970630,
      "TVL_HLP": 267970629,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-21",
      "TVL_CHAIN_APPS": 285373767,
      "TVL_HLP": 285373767,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-22",
      "TVL_CHAIN_APPS": 296386469,
      "TVL_HLP": 296386469,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-23",
      "TVL_CHAIN_APPS": 319825277,
      "TVL_HLP": 319825277,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-24",
      "TVL_CHAIN_APPS": 339285981,
      "TVL_HLP": 339285980,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-25",
      "TVL_CHAIN_APPS": 347043837,
      "TVL_HLP": 347043836,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-26",
      "TVL_CHAIN_APPS": 353548405,
      "TVL_HLP": 353548404,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-27",
      "TVL_CHAIN_APPS": 363419276,
      "TVL_HLP": 363419275,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-01-28",
      "TVL_CHAIN_APPS": 370112165,
      "TVL_HLP": 370112165,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-29",
      "TVL_CHAIN_APPS": 385116040,
      "TVL_HLP": 385116040,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-30",
      "TVL_CHAIN_APPS": 388845888,
      "TVL_HLP": 388845888,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-01-31",
      "TVL_CHAIN_APPS": 401610837,
      "TVL_HLP": 401610836,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-01",
      "TVL_CHAIN_APPS": 405242826,
      "TVL_HLP": 405242826,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-02-02",
      "TVL_CHAIN_APPS": 413424400,
      "TVL_HLP": 413424400,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-02-03",
      "TVL_CHAIN_APPS": 414872954,
      "TVL_HLP": 414872954,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-02-04",
      "TVL_CHAIN_APPS": 419768805,
      "TVL_HLP": 419768804,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-05",
      "TVL_CHAIN_APPS": 461262657,
      "TVL_HLP": 461262656,
      "TVL_SPOT": 0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-06",
      "TVL_CHAIN_APPS": 500281457,
      "TVL_HLP": 500281457,
      "TVL_SPOT": 0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-02-07",
      "TVL_CHAIN_APPS": 651848105,
      "TVL_HLP": 511929585,
      "TVL_SPOT": 139918519.0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-08",
      "TVL_CHAIN_APPS": 665753579,
      "TVL_HLP": 523639816,
      "TVL_SPOT": 142113762.0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-09",
      "TVL_CHAIN_APPS": 685878695,
      "TVL_HLP": 536602895,
      "TVL_SPOT": 149275798.0,
      "TVL_APPS": 2
    },
    {
      "DATE": "2025-02-10",
      "TVL_CHAIN_APPS": 690213031,
      "TVL_HLP": 540815239,
      "TVL_SPOT": 149397790.0,
      "TVL_APPS": 2
    },
    {
      "DATE": "2025-02-11",
      "TVL_CHAIN_APPS": 668465998,
      "TVL_HLP": 524149111,
      "TVL_SPOT": 144316885.0,
      "TVL_APPS": 2
    },
    {
      "DATE": "2025-02-12",
      "TVL_CHAIN_APPS": 657837511,
      "TVL_HLP": 520745774,
      "TVL_SPOT": 137091736.0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-13",
      "TVL_CHAIN_APPS": 649761978,
      "TVL_HLP": 507294123,
      "TVL_SPOT": 142467854.0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-14",
      "TVL_CHAIN_APPS": 653041791,
      "TVL_HLP": 511766763,
      "TVL_SPOT": 141275027.0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-15",
      "TVL_CHAIN_APPS": 664091533,
      "TVL_HLP": 513971263,
      "TVL_SPOT": 150120269.0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-16",
      "TVL_CHAIN_APPS": 675748853,
      "TVL_HLP": 521292131,
      "TVL_SPOT": 154456722.0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-02-17",
      "TVL_CHAIN_APPS": 679034147,
      "TVL_HLP": 521064041,
      "TVL_SPOT": 157970105.0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-18",
      "TVL_CHAIN_APPS": 677394214,
      "TVL_HLP": 519933785,
      "TVL_SPOT": 157460429.0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-02-19",
      "TVL_CHAIN_APPS": 664580204,
      "TVL_HLP": 512465364,
      "TVL_SPOT": 152114838.0,
      "TVL_APPS": 2
    },
    {
      "DATE": "2025-02-20",
      "TVL_CHAIN_APPS": 659700688,
      "TVL_HLP": 505337344,
      "TVL_SPOT": 154363343.0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-21",
      "TVL_CHAIN_APPS": 649389823,
      "TVL_HLP": 494276816,
      "TVL_SPOT": 155113007.0,
      "TVL_APPS": 0
    },
    {
      "DATE": "2025-02-22",
      "TVL_CHAIN_APPS": 649166083,
      "TVL_HLP": 501661476,
      "TVL_SPOT": 147504606.0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-23",
      "TVL_CHAIN_APPS": 652583685,
      "TVL_HLP": 506446898,
      "TVL_SPOT": 146136786.0,
      "TVL_APPS": 1
    },
    {
      "DATE": "2025-02-24",
      "TVL_CHAIN_APPS": 628042050,
      "TVL_HLP": 491793016,
      "TVL_SPOT": 133389779.0,
      "TVL_APPS": 2859255
    },
    {
      "DATE": "2025-02-25",
      "TVL_CHAIN_APPS": 599190654,
      "TVL_HLP": 494538548,
      "TVL_SPOT": 101452377.0,
      "TVL_APPS": 3199729
    },
    {
      "DATE": "2025-02-26",
      "TVL_CHAIN_APPS": 622086195,
      "TVL_HLP": 499286428,
      "TVL_SPOT": 118733733.0,
      "TVL_APPS": 4066034
    },
    {
      "DATE": "2025-02-27",
      "TVL_CHAIN_APPS": 634620188,
      "TVL_HLP": 503500538,
      "TVL_SPOT": 126819573.0,
      "TVL_APPS": 4300077
    },
    {
      "DATE": "2025-02-28",
      "TVL_CHAIN_APPS": 643905348,
      "TVL_HLP": 508694716,
      "TVL_SPOT": 130510973.0,
      "TVL_APPS": 4699659
    },
    {
      "DATE": "2025-03-01",
      "TVL_CHAIN_APPS": 658494112,
      "TVL_HLP": 523684559,
      "TVL_SPOT": 130399534.0,
      "TVL_APPS": 4410019
    },
    {
      "DATE": "2025-03-02",
      "TVL_CHAIN_APPS": 657610337,
      "TVL_HLP": 526116970,
      "TVL_SPOT": 126639505.0,
      "TVL_APPS": 4853862
    },
    {
      "DATE": "2025-03-03",
      "TVL_CHAIN_APPS": 643510764,
      "TVL_HLP": 518550294,
      "TVL_SPOT": 119731499.0,
      "TVL_APPS": 5228971
    },
    {
      "DATE": "2025-03-04",
      "TVL_CHAIN_APPS": 645312719,
      "TVL_HLP": 530263793,
      "TVL_SPOT": 109743609.0,
      "TVL_APPS": 5305317
    },
    {
      "DATE": "2025-03-05",
      "TVL_CHAIN_APPS": 644875366,
      "TVL_HLP": 511705102,
      "TVL_SPOT": 120073090.0,
      "TVL_APPS": 13097174
    },
    {
      "DATE": "2025-03-06",
      "TVL_CHAIN_APPS": 644748238,
      "TVL_HLP": 509923363,
      "TVL_SPOT": 121822605.0,
      "TVL_APPS": 13002270
    },
    {
      "DATE": "2025-03-07",
      "TVL_CHAIN_APPS": 645252756,
      "TVL_HLP": 511298923,
      "TVL_SPOT": 121383977.0,
      "TVL_APPS": 12569856
    },
    {
      "DATE": "2025-03-08",
      "TVL_CHAIN_APPS": 654360239,
      "TVL_HLP": 514204031,
      "TVL_SPOT": 125526627.0,
      "TVL_APPS": 14629581
    },
    {
      "DATE": "2025-03-09",
      "TVL_CHAIN_APPS": 653595921,
      "TVL_HLP": 513843587,
      "TVL_SPOT": 122165014.0,
      "TVL_APPS": 17587320
    },
    {
      "DATE": "2025-03-10",
      "TVL_CHAIN_APPS": 639195109,
      "TVL_HLP": 509270641,
      "TVL_SPOT": 111509434.0,
      "TVL_APPS": 18415034
    },
    {
      "DATE": "2025-03-11",
      "TVL_CHAIN_APPS": 607302590,
      "TVL_HLP": 500467421,
      "TVL_SPOT": 89521344.0,
      "TVL_APPS": 17313825
    },
    {
      "DATE": "2025-03-12",
      "TVL_CHAIN_APPS": 604924378,
      "TVL_HLP": 487145121,
      "TVL_SPOT": 99616810.0,
      "TVL_APPS": 18162447
    },
    {
      "DATE": "2025-03-13",
      "TVL_CHAIN_APPS": 464178818,
      "TVL_HLP": 354205597,
      "TVL_SPOT": 91701733.0,
      "TVL_APPS": 18271488
    },
    {
      "DATE": "2025-03-14",
      "TVL_CHAIN_APPS": 444509739,
      "TVL_HLP": 336805494,
      "TVL_SPOT": 89470004.0,
      "TVL_APPS": 18234241
    },
    {
      "DATE": "2025-03-15",
      "TVL_CHAIN_APPS": 455334636,
      "TVL_HLP": 342355571,
      "TVL_SPOT": 92971779.0,
      "TVL_APPS": 20007286
    },
    {
      "DATE": "2025-03-16",
      "TVL_CHAIN_APPS": 457779471,
      "TVL_HLP": 336633899,
      "TVL_SPOT": 99385207.0,
      "TVL_APPS": 21760365
    },
    {
      "DATE": "2025-03-17",
      "TVL_CHAIN_APPS": 433710957,
      "TVL_HLP": 324687966,
      "TVL_SPOT": 87762750.0,
      "TVL_APPS": 21260241
    },
    {
      "DATE": "2025-03-18",
      "TVL_CHAIN_APPS": 429020545,
      "TVL_HLP": 314663813,
      "TVL_SPOT": 92708728.0,
      "TVL_APPS": 21648004
    },
    {
      "DATE": "2025-03-19",
      "TVL_CHAIN_APPS": 408829935,
      "TVL_HLP": 289600189,
      "TVL_SPOT": 96535527.0,
      "TVL_APPS": 22694219
    },
    {
      "DATE": "2025-03-20",
      "TVL_CHAIN_APPS": 409459812,
      "TVL_HLP": 288403848,
      "TVL_SPOT": 97018915.0,
      "TVL_APPS": 24037049
    },
    {
      "DATE": "2025-03-21",
      "TVL_CHAIN_APPS": 412781062,
      "TVL_HLP": 299718636,
      "TVL_SPOT": 89796484.0,
      "TVL_APPS": 23265942
    },
    {
      "DATE": "2025-03-22",
      "TVL_CHAIN_APPS": 421749425,
      "TVL_HLP": 299963179,
      "TVL_SPOT": 94543287.0,
      "TVL_APPS": 27242959
    },
    {
      "DATE": "2025-03-23",
      "TVL_CHAIN_APPS": 421690574,
      "TVL_HLP": 298886285,
      "TVL_SPOT": 93510731.0,
      "TVL_APPS": 29293558
    },
    {
      "DATE": "2025-03-24",
      "TVL_CHAIN_APPS": 434800007,
      "TVL_HLP": 299722764,
      "TVL_SPOT": 100573577.0,
      "TVL_APPS": 34503666
    },
    {
      "DATE": "2025-03-25",
      "TVL_CHAIN_APPS": 446205768,
      "TVL_HLP": 296913516,
      "TVL_SPOT": 101365791.0,
      "TVL_APPS": 47926461
    },
    {
      "DATE": "2025-03-26",
      "TVL_CHAIN_APPS": 438407781,
      "TVL_HLP": 287847815,
      "TVL_SPOT": 94979219.0,
      "TVL_APPS": 55580747
    },
    {
      "DATE": "2025-03-27",
      "TVL_CHAIN_APPS": 327594096,
      "TVL_HLP": 195182947,
      "TVL_SPOT": 78786316.0,
      "TVL_APPS": 53624833
    },
    {
      "DATE": "2025-03-28",
      "TVL_CHAIN_APPS": 332200162,
      "TVL_HLP": 185466744,
      "TVL_SPOT": 86421460.0,
      "TVL_APPS": 60311958
    },
    {
      "DATE": "2025-03-29",
      "TVL_CHAIN_APPS": 323501234,
      "TVL_HLP": 179884562,
      "TVL_SPOT": 80541609.0,
      "TVL_APPS": 63075063
    },
    {
      "DATE": "2025-03-30",
      "TVL_CHAIN_APPS": 327142689,
      "TVL_HLP": 178121635,
      "TVL_SPOT": 85501187.0,
      "TVL_APPS": 63519867
    },
    {
      "DATE": "2025-03-31",
      "TVL_CHAIN_APPS": 329878746,
      "TVL_HLP": 177361475,
      "TVL_SPOT": 87181045.0,
      "TVL_APPS": 65336226
    },
    {
      "DATE": "2025-04-01",
      "TVL_CHAIN_APPS": 352499612,
      "TVL_HLP": 178603154,
      "TVL_SPOT": 90292838.0,
      "TVL_APPS": 83603620
    },
    {
      "DATE": "2025-04-02",
      "TVL_CHAIN_APPS": 362678885,
      "TVL_HLP": 181294571,
      "TVL_SPOT": 90808270.0,
      "TVL_APPS": 90576044
    },
    {
      "DATE": "2025-04-03",
      "TVL_CHAIN_APPS": 346772151,
      "TVL_HLP": 172757510,
      "TVL_SPOT": 86417056.0,
      "TVL_APPS": 87597585
    },
    {
      "DATE": "2025-04-04",
      "TVL_CHAIN_APPS": 345119391,
      "TVL_HLP": 166216072,
      "TVL_SPOT": 91755709.0,
      "TVL_APPS": 87147610
    },
    {
      "DATE": "2025-04-05",
      "TVL_CHAIN_APPS": 347356291,
      "TVL_HLP": 163717193,
      "TVL_SPOT": 92765369.0,
      "TVL_APPS": 90873729
    },
    {
      "DATE": "2025-04-06",
      "TVL_CHAIN_APPS": 346251034,
      "TVL_HLP": 159574412,
      "TVL_SPOT": 93563238.0,
      "TVL_APPS": 93113384
    },
    {
      "DATE": "2025-04-07",
      "TVL_CHAIN_APPS": 311554323,
      "TVL_HLP": 156847259,
      "TVL_SPOT": 73631531.0,
      "TVL_APPS": 81075533
    },
    {
      "DATE": "2025-04-08",
      "TVL_CHAIN_APPS": 354339735,
      "TVL_HLP": 149981387,
      "TVL_SPOT": 89456635.0,
      "TVL_APPS": 114901713
    },
    {
      "DATE": "2025-04-09",
      "TVL_CHAIN_APPS": 351002546,
      "TVL_HLP": 148230209,
      "TVL_SPOT": 88670233.0,
      "TVL_APPS": 114102104
    },
    {
      "DATE": "2025-04-10",
      "TVL_CHAIN_APPS": 397199885,
      "TVL_HLP": 149800788,
      "TVL_SPOT": 93785421.0,
      "TVL_APPS": 153613676
    },
    {
      "DATE": "2025-04-11",
      "TVL_CHAIN_APPS": 433474760,
      "TVL_HLP": 149592961,
      "TVL_SPOT": 107854374.0,
      "TVL_APPS": 176027425
    },
    {
      "DATE": "2025-04-12",
      "TVL_CHAIN_APPS": 489823924,
      "TVL_HLP": 155915723,
      "TVL_SPOT": 113089706.0,
      "TVL_APPS": 220818495
    },
    {
      "DATE": "2025-04-13",
      "TVL_CHAIN_APPS": 497291759,
      "TVL_HLP": 157655859,
      "TVL_SPOT": 103632757.0,
      "TVL_APPS": 236003143
    },
    {
      "DATE": "2025-04-14",
      "TVL_CHAIN_APPS": 499061462,
      "TVL_HLP": 159893758,
      "TVL_SPOT": 102104705.0,
      "TVL_APPS": 237062999
    },
    {
      "DATE": "2025-04-15",
      "TVL_CHAIN_APPS": 523101284,
      "TVL_HLP": 160307770,
      "TVL_SPOT": 103091921.0,
      "TVL_APPS": 259701593
    },
    {
      "DATE": "2025-04-16",
      "TVL_CHAIN_APPS": 516672319,
      "TVL_HLP": 161228974,
      "TVL_SPOT": 101960450.0,
      "TVL_APPS": 253482895
    },
    {
      "DATE": "2025-04-17",
      "TVL_CHAIN_APPS": 545968810,
      "TVL_HLP": 164510444,
      "TVL_SPOT": 111298160.0,
      "TVL_APPS": 270160206
    },
    {
      "DATE": "2025-04-18",
      "TVL_CHAIN_APPS": 581302127,
      "TVL_HLP": 169254642,
      "TVL_SPOT": 110564162.0,
      "TVL_APPS": 301483323
    },
    {
      "DATE": "2025-04-19",
      "TVL_CHAIN_APPS": 607206716,
      "TVL_HLP": 182047111,
      "TVL_SPOT": 113058317.0,
      "TVL_APPS": 312101288
    },
    {
      "DATE": "2025-04-20",
      "TVL_CHAIN_APPS": 642491742,
      "TVL_HLP": 190015077,
      "TVL_SPOT": 106184545.0,
      "TVL_APPS": 346292120
    },
    {
      "DATE": "2025-04-21",
      "TVL_CHAIN_APPS": 639011902,
      "TVL_HLP": 190617433,
      "TVL_SPOT": 112832753.0,
      "TVL_APPS": 335561716
    },
    {
      "DATE": "2025-04-22",
      "TVL_CHAIN_APPS": 647731292,
      "TVL_HLP": 189265155,
      "TVL_SPOT": 114111423.0,
      "TVL_APPS": 344354714
    },
    {
      "DATE": "2025-04-23",
      "TVL_CHAIN_APPS": 672109802,
      "TVL_HLP": 191545691,
      "TVL_SPOT": 109076323.0,
      "TVL_APPS": 371487788
    },
    {
      "DATE": "2025-04-24",
      "TVL_CHAIN_APPS": 673640524,
      "TVL_HLP": 196620185,
      "TVL_SPOT": 101812809.0,
      "TVL_APPS": 375207530
    },
    {
      "DATE": "2025-04-25",
      "TVL_CHAIN_APPS": 700091709,
      "TVL_HLP": 198802328,
      "TVL_SPOT": 105520024.0,
      "TVL_APPS": 395769357
    },
    {
      "DATE": "2025-04-26",
      "TVL_CHAIN_APPS": 705841356,
      "TVL_HLP": 198280830,
      "TVL_SPOT": 107655784.0,
      "TVL_APPS": 399904742
    },
    {
      "DATE": "2025-04-27",
      "TVL_CHAIN_APPS": 705871104,
      "TVL_HLP": 199573604,
      "TVL_SPOT": 95575111.0,
      "TVL_APPS": 410722389
    },
    {
      "DATE": "2025-04-28",
      "TVL_CHAIN_APPS": 700972760,
      "TVL_HLP": 200659723,
      "TVL_SPOT": 96672000.0,
      "TVL_APPS": 403641037
    },
    {
      "DATE": "2025-04-29",
      "TVL_CHAIN_APPS": 733232486,
      "TVL_HLP": 198672304,
      "TVL_SPOT": 98416316.0,
      "TVL_APPS": 436143866
    },
    {
      "DATE": "2025-04-30",
      "TVL_CHAIN_APPS": 751540425,
      "TVL_HLP": 199841164,
      "TVL_SPOT": 98505369.0,
      "TVL_APPS": 453193892
    },
    {
      "DATE": "2025-05-01",
      "TVL_CHAIN_APPS": 795071398,
      "TVL_HLP": 200994891,
      "TVL_SPOT": 88467572.0,
      "TVL_APPS": 505608935
    },
    {
      "DATE": "2025-05-02",
      "TVL_CHAIN_APPS": 800733426,
      "TVL_HLP": 206399329,
      "TVL_SPOT": 96604828.0,
      "TVL_APPS": 497729269
    },
    {
      "DATE": "2025-05-03",
      "TVL_CHAIN_APPS": 833581255,
      "TVL_HLP": 207577877,
      "TVL_SPOT": 102143994.0,
      "TVL_APPS": 523859384
    },
    {
      "DATE": "2025-05-04",
      "TVL_CHAIN_APPS": 850623387,
      "TVL_HLP": 209195676,
      "TVL_SPOT": 101239378.0,
      "TVL_APPS": 540188333
    },
    {
      "DATE": "2025-05-05",
      "TVL_CHAIN_APPS": 824403605,
      "TVL_HLP": 213845200,
      "TVL_SPOT": 97870417.0,
      "TVL_APPS": 512687988
    },
    {
      "DATE": "2025-05-06",
      "TVL_CHAIN_APPS": 846121741,
      "TVL_HLP": 217944029,
      "TVL_SPOT": 101208245.0,
      "TVL_APPS": 526969467
    },
    {
      "DATE": "2025-05-07",
      "TVL_CHAIN_APPS": 862129314,
      "TVL_HLP": 218716313,
      "TVL_SPOT": 105671548.0,
      "TVL_APPS": 537741453
    },
    {
      "DATE": "2025-05-08",
      "TVL_CHAIN_APPS": 863662740,
      "TVL_HLP": 218205411,
      "TVL_SPOT": 102242726.0,
      "TVL_APPS": 543214603
    },
    {
      "DATE": "2025-05-09",
      "TVL_CHAIN_APPS": 916783287,
      "TVL_HLP": 225061771,
      "TVL_SPOT": 94632519.0,
      "TVL_APPS": 597088997
    },
    {
      "DATE": "2025-05-10",
      "TVL_CHAIN_APPS": 973471604,
      "TVL_HLP": 237377555,
      "TVL_SPOT": 106935413.0,
      "TVL_APPS": 629158636
    },
    {
      "DATE": "2025-05-11",
      "TVL_CHAIN_APPS": 996004535,
      "TVL_HLP": 251847658,
      "TVL_SPOT": 103808755.0,
      "TVL_APPS": 640348122
    },
    {
      "DATE": "2025-05-12",
      "TVL_CHAIN_APPS": 985809491,
      "TVL_HLP": 260969008,
      "TVL_SPOT": 107166915.0,
      "TVL_APPS": 617673568
    },
    {
      "DATE": "2025-05-13",
      "TVL_CHAIN_APPS": 996193680,
      "TVL_HLP": 270859073,
      "TVL_SPOT": 103541237.0,
      "TVL_APPS": 621793370
    },
    {
      "DATE": "2025-05-14",
      "TVL_CHAIN_APPS": 1038119158,
      "TVL_HLP": 275492898,
      "TVL_SPOT": 113170610.0,
      "TVL_APPS": 649455650
    },
    {
      "DATE": "2025-05-15",
      "TVL_CHAIN_APPS": 1031620669,
      "TVL_HLP": 277655555,
      "TVL_SPOT": 115565284.0,
      "TVL_APPS": 638399830
    },
    {
      "DATE": "2025-05-16",
      "TVL_CHAIN_APPS": 1072972231,
      "TVL_HLP": 288801486,
      "TVL_SPOT": 116846219.0,
      "TVL_APPS": 667324526
    },
    {
      "DATE": "2025-05-17",
      "TVL_CHAIN_APPS": 1095281748,
      "TVL_HLP": 295628673,
      "TVL_SPOT": 116129155.0,
      "TVL_APPS": 683523920
    },
    {
      "DATE": "2025-05-18",
      "TVL_CHAIN_APPS": 1078342889,
      "TVL_HLP": 306240841,
      "TVL_SPOT": 117803834.0,
      "TVL_APPS": 654298214
    },
    {
      "DATE": "2025-05-19",
      "TVL_CHAIN_APPS": 1100704204,
      "TVL_HLP": 312276553,
      "TVL_SPOT": 111580348.0,
      "TVL_APPS": 676847303
    },
    {
      "DATE": "2025-05-20",
      "TVL_CHAIN_APPS": 1108018075,
      "TVL_HLP": 325159007,
      "TVL_SPOT": 112722817.0,
      "TVL_APPS": 670136251
    },
    {
      "DATE": "2025-05-21",
      "TVL_CHAIN_APPS": 1123875936,
      "TVL_HLP": 331839163,
      "TVL_SPOT": 117585899.0,
      "TVL_APPS": 674450874
    },
    {
      "DATE": "2025-05-22",
      "TVL_CHAIN_APPS": 1177736500,
      "TVL_HLP": 332345600,
      "TVL_SPOT": 107000359.0,
      "TVL_APPS": 738390541
    },
    {
      "DATE": "2025-05-23",
      "TVL_CHAIN_APPS": 1288838878,
      "TVL_HLP": 333784118,
      "TVL_SPOT": 115605821.0,
      "TVL_APPS": 839448939
    },
    {
      "DATE": "2025-05-24",
      "TVL_CHAIN_APPS": 1289258769,
      "TVL_HLP": 334632304,
      "TVL_SPOT": 118143063.0,
      "TVL_APPS": 836483402
    },
    {
      "DATE": "2025-05-25",
      "TVL_CHAIN_APPS": 1329913416,
      "TVL_HLP": 333655119,
      "TVL_SPOT": 118959531.0,
      "TVL_APPS": 877298766
    },
    {
      "DATE": "2025-05-26",
      "TVL_CHAIN_APPS": 1464149610,
      "TVL_HLP": 337914571,
      "TVL_SPOT": 156041281.0,
      "TVL_APPS": 970193758
    },
    {
      "DATE": "2025-05-27",
      "TVL_CHAIN_APPS": 1449331487,
      "TVL_HLP": 350200026,
      "TVL_SPOT": 136393040.0,
      "TVL_APPS": 962738421
    },
    {
      "DATE": "2025-05-28",
      "TVL_CHAIN_APPS": 1450139059,
      "TVL_HLP": 357937207,
      "TVL_SPOT": 142370643.0,
      "TVL_APPS": 949831209
    },
    {
      "DATE": "2025-05-29",
      "TVL_CHAIN_APPS": 1415801987,
      "TVL_HLP": 364094323,
      "TVL_SPOT": 149212499.0,
      "TVL_APPS": 902495165
    },
    {
      "DATE": "2025-05-30",
      "TVL_CHAIN_APPS": 1368613855,
      "TVL_HLP": 372293441,
      "TVL_SPOT": 131242959.0,
      "TVL_APPS": 865077455
    },
    {
      "DATE": "2025-05-31",
      "TVL_CHAIN_APPS": 1415535093,
      "TVL_HLP": 378102154,
      "TVL_SPOT": 134890512.0,
      "TVL_APPS": 902542427
    },
    {
      "DATE": "2025-06-01",
      "TVL_CHAIN_APPS": 1415904960,
      "TVL_HLP": 382332038,
      "TVL_SPOT": 133716755.0,
      "TVL_APPS": 899856167
    },
    {
      "DATE": "2025-06-02",
      "TVL_CHAIN_APPS": 1457439404,
      "TVL_HLP": 390415749,
      "TVL_SPOT": 135165137.0,
      "TVL_APPS": 931858518
    },
    {
      "DATE": "2025-06-03",
      "TVL_CHAIN_APPS": 1546359726,
      "TVL_HLP": 397231050,
      "TVL_SPOT": 136492316.0,
      "TVL_APPS": 1012636360
    },
    {
      "DATE": "2025-06-04",
      "TVL_CHAIN_APPS": 1575875536,
      "TVL_HLP": 412447236,
      "TVL_SPOT": 143377102.0,
      "TVL_APPS": 1020051198
    },
    {
      "DATE": "2025-06-05",
      "TVL_CHAIN_APPS": 1556675448,
      "TVL_HLP": 415986502,
      "TVL_SPOT": 142676726.0,
      "TVL_APPS": 998012220
    },
    {
      "DATE": "2025-06-06",
      "TVL_CHAIN_APPS": 1532442825,
      "TVL_HLP": 418966983,
      "TVL_SPOT": 146647605.0,
      "TVL_APPS": 966828237
    },
    {
      "DATE": "2025-06-07",
      "TVL_CHAIN_APPS": 1533725482,
      "TVL_HLP": 419841717,
      "TVL_SPOT": 145082088.0,
      "TVL_APPS": 968801677
    },
    {
      "DATE": "2025-06-08",
      "TVL_CHAIN_APPS": 1581289387,
      "TVL_HLP": 427817085,
      "TVL_SPOT": 146200385.0,
      "TVL_APPS": 1007271917
    },
    {
      "DATE": "2025-06-09",
      "TVL_CHAIN_APPS": 1594601484,
      "TVL_HLP": 430276279,
      "TVL_SPOT": 148462569.0,
      "TVL_APPS": 1015862636
    },
    {
      "DATE": "2025-06-10",
      "TVL_CHAIN_APPS": 1665226440,
      "TVL_HLP": 414595802,
      "TVL_SPOT": 143451073.0,
      "TVL_APPS": 1107179565
    },
    {
      "DATE": "2025-06-11",
      "TVL_CHAIN_APPS": 1750624520,
      "TVL_HLP": 405481281,
      "TVL_SPOT": 146552830.0,
      "TVL_APPS": 1198590409
    },
    {
      "DATE": "2025-06-12",
      "TVL_CHAIN_APPS": 1734955185,
      "TVL_HLP": 409809888,
      "TVL_SPOT": 140622491.0,
      "TVL_APPS": 1184522806
    },
    {
      "DATE": "2025-06-13",
      "TVL_CHAIN_APPS": 1724000849,
      "TVL_HLP": 407006921,
      "TVL_SPOT": 134150878.0,
      "TVL_APPS": 1182843050
    },
    {
      "DATE": "2025-06-14",
      "TVL_CHAIN_APPS": 1825609305,
      "TVL_HLP": 401722999,
      "TVL_SPOT": 138078717.0,
      "TVL_APPS": 1285807589
    },
    {
      "DATE": "2025-06-15",
      "TVL_CHAIN_APPS": 1766636185,
      "TVL_HLP": 402859581,
      "TVL_SPOT": 131520372.0,
      "TVL_APPS": 1232256232
    },
    {
      "DATE": "2025-06-16",
      "TVL_CHAIN_APPS": 1800382348,
      "TVL_HLP": 404145618,
      "TVL_SPOT": 133097305.0,
      "TVL_APPS": 1263139425
    },
    {
      "DATE": "2025-06-17",
      "TVL_CHAIN_APPS": 1823684446,
      "TVL_HLP": 404249426,
      "TVL_SPOT": 128906820.0,
      "TVL_APPS": 1290528200
    },
    {
      "DATE": "2025-06-18",
      "TVL_CHAIN_APPS": 1780643628,
      "TVL_HLP": 407246338,
      "TVL_SPOT": 135944115.0,
      "TVL_APPS": 1237453175
    },
    {
      "DATE": "2025-06-19",
      "TVL_CHAIN_APPS": 1786098645,
      "TVL_HLP": 408454016,
      "TVL_SPOT": 134153376.0,
      "TVL_APPS": 1243491253
    },
    {
      "DATE": "2025-06-20",
      "TVL_CHAIN_APPS": 1728852233,
      "TVL_HLP": 411580160,
      "TVL_SPOT": 138339676.0,
      "TVL_APPS": 1178932397
    },
    {
      "DATE": "2025-06-21",
      "TVL_CHAIN_APPS": 1620097481,
      "TVL_HLP": 411420093,
      "TVL_SPOT": 127891271.0,
      "TVL_APPS": 1080786117
    },
    {
      "DATE": "2025-06-22",
      "TVL_CHAIN_APPS": 1593078935,
      "TVL_HLP": 401013788,
      "TVL_SPOT": 129014048.0,
      "TVL_APPS": 1063051099
    },
    {
      "DATE": "2025-06-23",
      "TVL_CHAIN_APPS": 1657263393,
      "TVL_HLP": 392530456,
      "TVL_SPOT": 143183581.0,
      "TVL_APPS": 1121549356
    },
    {
      "DATE": "2025-06-24",
      "TVL_CHAIN_APPS": 1745935293,
      "TVL_HLP": 393879166,
      "TVL_SPOT": 147393190.0,
      "TVL_APPS": 1204662937
    },
    {
      "DATE": "2025-06-25",
      "TVL_CHAIN_APPS": 1750205229,
      "TVL_HLP": 396159311,
      "TVL_SPOT": 147633287.0,
      "TVL_APPS": 1206412631
    },
    {
      "DATE": "2025-06-26",
      "TVL_CHAIN_APPS": 1760490851,
      "TVL_HLP": 399998788,
      "TVL_SPOT": 151480638.0,
      "TVL_APPS": 1209011425
    },
    {
      "DATE": "2025-06-27",
      "TVL_CHAIN_APPS": 1743662796,
      "TVL_HLP": 387511208,
      "TVL_SPOT": 146120768.0,
      "TVL_APPS": 1210030820
    },
    {
      "DATE": "2025-06-28",
      "TVL_CHAIN_APPS": 1734382306,
      "TVL_HLP": 388523756,
      "TVL_SPOT": 144313372.0,
      "TVL_APPS": 1201545178
    },
    {
      "DATE": "2025-06-29",
      "TVL_CHAIN_APPS": 1781122781,
      "TVL_HLP": 385661571,
      "TVL_SPOT": 147366417.0,
      "TVL_APPS": 1248094793
    },
    {
      "DATE": "2025-06-30",
      "TVL_CHAIN_APPS": 1818803492,
      "TVL_HLP": 385121169,
      "TVL_SPOT": 149231546.0,
      "TVL_APPS": 1284450777
    },
    {
      "DATE": "2025-07-01",
      "TVL_CHAIN_APPS": 1842586037,
      "TVL_HLP": 380276923,
      "TVL_SPOT": 134241295.0,
      "TVL_APPS": 1328067819
    },
    {
      "DATE": "2025-07-02",
      "TVL_CHAIN_APPS": 1761769399,
      "TVL_HLP": 377786230,
      "TVL_SPOT": 127413710.0,
      "TVL_APPS": 1256569459
    },
    {
      "DATE": "2025-07-03",
      "TVL_CHAIN_APPS": 1817634442,
      "TVL_HLP": 375221110,
      "TVL_SPOT": 138842568.0,
      "TVL_APPS": 1303570764
    },
    {
      "DATE": "2025-07-04",
      "TVL_CHAIN_APPS": 1883211032,
      "TVL_HLP": 374071340,
      "TVL_SPOT": 135896343.0,
      "TVL_APPS": 1373243349
    },
    {
      "DATE": "2025-07-05",
      "TVL_CHAIN_APPS": 1844182555,
      "TVL_HLP": 372867982,
      "TVL_SPOT": 130096018.0,
      "TVL_APPS": 1341218555
    },
    {
      "DATE": "2025-07-06",
      "TVL_CHAIN_APPS": 1854689553,
      "TVL_HLP": 370997529,
      "TVL_SPOT": 133287606.0,
      "TVL_APPS": 1350404418
    },
    {
      "DATE": "2025-07-07",
      "TVL_CHAIN_APPS": 1874169466,
      "TVL_HLP": 368973697,
      "TVL_SPOT": 138406077.0,
      "TVL_APPS": 1366789692
    },
    {
      "DATE": "2025-07-08",
      "TVL_CHAIN_APPS": 1840169948,
      "TVL_HLP": 368725532,
      "TVL_SPOT": 136226281.0,
      "TVL_APPS": 1335218135
    },
    {
      "DATE": "2025-07-09",
      "TVL_CHAIN_APPS": 1816550294,
      "TVL_HLP": 366738206,
      "TVL_SPOT": 136914964.0,
      "TVL_APPS": 1312897124
    },
    {
      "DATE": "2025-07-10",
      "TVL_CHAIN_APPS": 1868796828,
      "TVL_HLP": 364004232,
      "TVL_SPOT": 137673741.0,
      "TVL_APPS": 1367118855
    },
    {
      "DATE": "2025-07-11",
      "TVL_CHAIN_APPS": 1908326634,
      "TVL_HLP": 355672758,
      "TVL_SPOT": 117916299.0,
      "TVL_APPS": 1434737577
    },
    {
      "DATE": "2025-07-12",
      "TVL_CHAIN_APPS": 1979549591,
      "TVL_HLP": 344647789,
      "TVL_SPOT": 121729683.0,
      "TVL_APPS": 1513172119
    },
    {
      "DATE": "2025-07-13",
      "TVL_CHAIN_APPS": 1963617379,
      "TVL_HLP": 335102431,
      "TVL_SPOT": 123159317.0,
      "TVL_APPS": 1505355631
    },
    {
      "DATE": "2025-07-14",
      "TVL_CHAIN_APPS": 1981766316,
      "TVL_HLP": 334085657,
      "TVL_SPOT": 125362487.0,
      "TVL_APPS": 1522318172
    },
    {
      "DATE": "2025-07-15",
      "TVL_CHAIN_APPS": 1953724911,
      "TVL_HLP": 336553728,
      "TVL_SPOT": 134329459.0,
      "TVL_APPS": 1482841724
    },
    {
      "DATE": "2025-07-16",
      "TVL_CHAIN_APPS": 1913484998,
      "TVL_HLP": 337635533,
      "TVL_SPOT": 140322916.0,
      "TVL_APPS": 1435526549
    },
    {
      "DATE": "2025-07-17",
      "TVL_CHAIN_APPS": 1966325680,
      "TVL_HLP": 336486358,
      "TVL_SPOT": 144501773.0,
      "TVL_APPS": 1485337549
    },
    {
      "DATE": "2025-07-18",
      "TVL_CHAIN_APPS": 1929214658,
      "TVL_HLP": 344757222,
      "TVL_SPOT": 131664664.0,
      "TVL_APPS": 1452792772
    },
    {
      "DATE": "2025-07-19",
      "TVL_CHAIN_APPS": 1934380855,
      "TVL_HLP": 349088487,
      "TVL_SPOT": 136709058.0,
      "TVL_APPS": 1448583310
    },
    {
      "DATE": "2025-07-20",
      "TVL_CHAIN_APPS": 1947085984,
      "TVL_HLP": 355402834,
      "TVL_SPOT": 135478931.0,
      "TVL_APPS": 1456204219
    },
    {
      "DATE": "2025-07-21",
      "TVL_CHAIN_APPS": 2030572766,
      "TVL_HLP": 360808302,
      "TVL_SPOT": 153466072.0,
      "TVL_APPS": 1516298392
    },
    {
      "DATE": "2025-07-22",
      "TVL_CHAIN_APPS": 2001608746,
      "TVL_HLP": 359530004,
      "TVL_SPOT": 157895390.0,
      "TVL_APPS": 1484183352
    },
    {
      "DATE": "2025-07-23",
      "TVL_CHAIN_APPS": 2105267766,
      "TVL_HLP": 362582899,
      "TVL_SPOT": 178414799.0,
      "TVL_APPS": 1564270068
    },
    {
      "DATE": "2025-07-24",
      "TVL_CHAIN_APPS": 2049629168,
      "TVL_HLP": 364586244,
      "TVL_SPOT": 164957107.0,
      "TVL_APPS": 1520085817
    },
    {
      "DATE": "2025-07-25",
      "TVL_CHAIN_APPS": 1996880781,
      "TVL_HLP": 371947089,
      "TVL_SPOT": 153211314.0,
      "TVL_APPS": 1471722378
    },
    {
      "DATE": "2025-07-26",
      "TVL_CHAIN_APPS": 2091020991,
      "TVL_HLP": 376780129,
      "TVL_SPOT": 157471279.0,
      "TVL_APPS": 1556769583
    },
    {
      "DATE": "2025-07-27",
      "TVL_CHAIN_APPS": 2082693475,
      "TVL_HLP": 378519306,
      "TVL_SPOT": 164636986.0,
      "TVL_APPS": 1539537183
    },
    {
      "DATE": "2025-07-28",
      "TVL_CHAIN_APPS": 2103343958,
      "TVL_HLP": 376884564,
      "TVL_SPOT": 161615572.0,
      "TVL_APPS": 1564843822
    },
    {
      "DATE": "2025-07-29",
      "TVL_CHAIN_APPS": 2132753708,
      "TVL_HLP": 373236582,
      "TVL_SPOT": 165015217.0,
      "TVL_APPS": 1594501909
    },
    {
      "DATE": "2025-07-30",
      "TVL_CHAIN_APPS": 2139720932,
      "TVL_HLP": 377002724,
      "TVL_SPOT": 168500327.0,
      "TVL_APPS": 1594217881
    },
    {
      "DATE": "2025-07-31",
      "TVL_CHAIN_APPS": 2111431987,
      "TVL_HLP": 382650517,
      "TVL_SPOT": 166825157.0,
      "TVL_APPS": 1561956313
    },
    {
      "DATE": "2025-08-01",
      "TVL_CHAIN_APPS": 2054725914,
      "TVL_HLP": 394138304,
      "TVL_SPOT": 154361269.0,
      "TVL_APPS": 1506226341
    },
    {
      "DATE": "2025-08-02",
      "TVL_CHAIN_APPS": 1974530793,
      "TVL_HLP": 404528768,
      "TVL_SPOT": 153669165.0,
      "TVL_APPS": 1416332860
    },
    {
      "DATE": "2025-08-03",
      "TVL_CHAIN_APPS": 1961946002,
      "TVL_HLP": 410051088,
      "TVL_SPOT": 154068442.0,
      "TVL_APPS": 1397826472
    },
    {
      "DATE": "2025-08-04",
      "TVL_CHAIN_APPS": 2055801009,
      "TVL_HLP": 416118566,
      "TVL_SPOT": 171922291.0,
      "TVL_APPS": 1467760152
    },
    {
      "DATE": "2025-08-05",
      "TVL_CHAIN_APPS": 2090782301,
      "TVL_HLP": 427566517,
      "TVL_SPOT": 169820702.0,
      "TVL_APPS": 1493395082
    },
    {
      "DATE": "2025-08-06",
      "TVL_CHAIN_APPS": 2075596917,
      "TVL_HLP": 431630967,
      "TVL_SPOT": 170049907.0,
      "TVL_APPS": 1473916043
    },
    {
      "DATE": "2025-08-07",
      "TVL_CHAIN_APPS": 2081496442,
      "TVL_HLP": 431041823,
      "TVL_SPOT": 177494777.0,
      "TVL_APPS": 1472959842
    },
    {
      "DATE": "2025-08-08",
      "TVL_CHAIN_APPS": 2153514544,
      "TVL_HLP": 435358516,
      "TVL_SPOT": 173062080.0,
      "TVL_APPS": 1545093948
    },
    {
      "DATE": "2025-08-09",
      "TVL_CHAIN_APPS": 2132813549,
      "TVL_HLP": 442603726,
      "TVL_SPOT": 176846454.0,
      "TVL_APPS": 1513363369
    },
    {
      "DATE": "2025-08-10",
      "TVL_CHAIN_APPS": 2203345192,
      "TVL_HLP": 440988634,
      "TVL_SPOT": 177236741.0,
      "TVL_APPS": 1585119817
    },
    {
      "DATE": "2025-08-11",
      "TVL_CHAIN_APPS": 2242588067,
      "TVL_HLP": 429145553,
      "TVL_SPOT": 177365605.0,
      "TVL_APPS": 1636076909
    },
    {
      "DATE": "2025-08-12",
      "TVL_CHAIN_APPS": 2149641035,
      "TVL_HLP": 433680607,
      "TVL_SPOT": 164085026.0,
      "TVL_APPS": 1551875402
    },
    {
      "DATE": "2025-08-13",
      "TVL_CHAIN_APPS": 2171339166,
      "TVL_HLP": 427878492,
      "TVL_SPOT": 171372338.0,
      "TVL_APPS": 1572088336
    },
    {
      "DATE": "2025-08-14",
      "TVL_CHAIN_APPS": 2229968917,
      "TVL_HLP": 429991968,
      "TVL_SPOT": 167092103.0,
      "TVL_APPS": 1632884846
    },
    {
      "DATE": "2025-08-15",
      "TVL_CHAIN_APPS": 2169023788,
      "TVL_HLP": 444168962,
      "TVL_SPOT": 165855008.0,
      "TVL_APPS": 1558999818
    },
    {
      "DATE": "2025-08-16",
      "TVL_CHAIN_APPS": 2236822462,
      "TVL_HLP": 466198561,
      "TVL_SPOT": 153701720.0,
      "TVL_APPS": 1616922181
    },
    {
      "DATE": "2025-08-17",
      "TVL_CHAIN_APPS": 2228556957,
      "TVL_HLP": 476891673,
      "TVL_SPOT": 160633789.0,
      "TVL_APPS": 1591031495
    },
    {
      "DATE": "2025-08-18",
      "TVL_CHAIN_APPS": 2218682657,
      "TVL_HLP": 485681375,
      "TVL_SPOT": 151399452.0,
      "TVL_APPS": 1581601830
    },
    {
      "DATE": "2025-08-19",
      "TVL_CHAIN_APPS": 2213332647,
      "TVL_HLP": 493776932,
      "TVL_SPOT": 142165202.0,
      "TVL_APPS": 1577390513
    },
    {
      "DATE": "2025-08-20",
      "TVL_CHAIN_APPS": 2168441399,
      "TVL_HLP": 521128715,
      "TVL_SPOT": 136178933.0,
      "TVL_APPS": 1511133751
    },
    {
      "DATE": "2025-08-21",
      "TVL_CHAIN_APPS": 2250788743,
      "TVL_HLP": 512991640,
      "TVL_SPOT": 138322655.0,
      "TVL_APPS": 1599474448
    },
    {
      "DATE": "2025-08-22",
      "TVL_CHAIN_APPS": 2222291229,
      "TVL_HLP": 521433785,
      "TVL_SPOT": 141706262.0,
      "TVL_APPS": 1559151182
    },
    {
      "DATE": "2025-08-23",
      "TVL_CHAIN_APPS": 2384080687,
      "TVL_HLP": 531054691,
      "TVL_SPOT": 152641660.0,
      "TVL_APPS": 1700384336
    },
    {
      "DATE": "2025-08-24",
      "TVL_CHAIN_APPS": 2419251378,
      "TVL_HLP": 531471792,
      "TVL_SPOT": 152947081.0,
      "TVL_APPS": 1734832505
    },
    {
      "DATE": "2025-08-25",
      "TVL_CHAIN_APPS": 2438927435,
      "TVL_HLP": 529900627,
      "TVL_SPOT": 155868423.0,
      "TVL_APPS": 1753158385
    },
    {
      "DATE": "2025-08-26",
      "TVL_CHAIN_APPS": 2365575928,
      "TVL_HLP": 538316637,
      "TVL_SPOT": 147467629.0,
      "TVL_APPS": 1679791662
    },
    {
      "DATE": "2025-08-27",
      "TVL_CHAIN_APPS": 2565509409,
      "TVL_HLP": 554229561,
      "TVL_SPOT": 166889865.0,
      "TVL_APPS": 1844389983
    },
    {
      "DATE": "2025-08-28",
      "TVL_CHAIN_APPS": 2551667957,
      "TVL_HLP": 593499271,
      "TVL_SPOT": 153914407.0,
      "TVL_APPS": 1804254279
    },
    {
      "DATE": "2025-08-29",
      "TVL_CHAIN_APPS": 2492829444,
      "TVL_HLP": 598271898,
      "TVL_SPOT": 150614807.0,
      "TVL_APPS": 1743942739
    },
    {
      "DATE": "2025-08-30",
      "TVL_CHAIN_APPS": 2415049035,
      "TVL_HLP": 595954553,
      "TVL_SPOT": 165960136.0,
      "TVL_APPS": 1653134346
    },
    {
      "DATE": "2025-08-31",
      "TVL_CHAIN_APPS": 2398055687,
      "TVL_HLP": 609402337,
      "TVL_SPOT": 157950220.0,
      "TVL_APPS": 1630703130
    },
    {
      "DATE": "2025-09-01",
      "TVL_CHAIN_APPS": 2426849170,
      "TVL_HLP": 607610047,
      "TVL_SPOT": 161003992.0,
      "TVL_APPS": 1658235131
    },
    {
      "DATE": "2025-09-02",
      "TVL_CHAIN_APPS": 2376769176,
      "TVL_HLP": 604107646,
      "TVL_SPOT": 158459107.0,
      "TVL_APPS": 1614202423
    },
    {
      "DATE": "2025-09-03",
      "TVL_CHAIN_APPS": 2417815845,
      "TVL_HLP": 604746487,
      "TVL_SPOT": 158372861.0,
      "TVL_APPS": 1654696497
    },
    {
      "DATE": "2025-09-04",
      "TVL_CHAIN_APPS": 2472779964,
      "TVL_HLP": 603813451,
      "TVL_SPOT": 160302402.0,
      "TVL_APPS": 1708664111
    },
    {
      "DATE": "2025-09-05",
      "TVL_CHAIN_APPS": 2461408714,
      "TVL_HLP": 594639938,
      "TVL_SPOT": 162674228.0,
      "TVL_APPS": 1704094548
    },
    {
      "DATE": "2025-09-06",
      "TVL_CHAIN_APPS": 2517054726,
      "TVL_HLP": 590905141,
      "TVL_SPOT": 170209269.0,
      "TVL_APPS": 1755940316
    },
    {
      "DATE": "2025-09-07",
      "TVL_CHAIN_APPS": 2446200010,
      "TVL_HLP": 571159829,
      "TVL_SPOT": 169195576.0,
      "TVL_APPS": 1705844605
    },
    {
      "DATE": "2025-09-08",
      "TVL_CHAIN_APPS": 2461551634,
      "TVL_HLP": 560996932,
      "TVL_SPOT": 175794379.0,
      "TVL_APPS": 1724760323
    },
    {
      "DATE": "2025-09-09",
      "TVL_CHAIN_APPS": 2527898567,
      "TVL_HLP": 545314356,
      "TVL_SPOT": 166139134.0,
      "TVL_APPS": 1816445077
    },
    {
      "DATE": "2025-09-10",
      "TVL_CHAIN_APPS": 2599927432,
      "TVL_HLP": 548212910,
      "TVL_SPOT": 165047379.0,
      "TVL_APPS": 1886667143
    },
    {
      "DATE": "2025-09-11",
      "TVL_CHAIN_APPS": 2712035342,
      "TVL_HLP": 550423278,
      "TVL_SPOT": 169016011.0,
      "TVL_APPS": 1992596053
    },
    {
      "DATE": "2025-09-12",
      "TVL_CHAIN_APPS": 2780075868,
      "TVL_HLP": 555442990,
      "TVL_SPOT": 166806494.0,
      "TVL_APPS": 2057826384
    },
    {
      "DATE": "2025-09-13",
      "TVL_CHAIN_APPS": 2773379306,
      "TVL_HLP": 555363414,
      "TVL_SPOT": 175013806.0,
      "TVL_APPS": 2043002086
    },
    {
      "DATE": "2025-09-14",
      "TVL_CHAIN_APPS": 2749870176,
      "TVL_HLP": 538131909,
      "TVL_SPOT": 191617123.0,
      "TVL_APPS": 2020121144
    },
    {
      "DATE": "2025-09-15",
      "TVL_CHAIN_APPS": 2661009866,
      "TVL_HLP": 518502426,
      "TVL_SPOT": 163360714.0,
      "TVL_APPS": 1979146726
    },
    {
      "DATE": "2025-09-16",
      "TVL_CHAIN_APPS": 2689213149,
      "TVL_HLP": 516060586,
      "TVL_SPOT": 167625980.0,
      "TVL_APPS": 2005526583
    },
    {
      "DATE": "2025-09-17",
      "TVL_CHAIN_APPS": 2668413858,
      "TVL_HLP": 506677137,
      "TVL_SPOT": 164488547.0,
      "TVL_APPS": 1997248174
    },
    {
      "DATE": "2025-09-18",
      "TVL_CHAIN_APPS": 2725618141,
      "TVL_HLP": 501574871,
      "TVL_SPOT": 163424016.0,
      "TVL_APPS": 2060619254
    },
    {
      "DATE": "2025-09-19",
      "TVL_CHAIN_APPS": 2792368693,
      "TVL_HLP": 503028546,
      "TVL_SPOT": 172924522.0,
      "TVL_APPS": 2116415625
    },
    {
      "DATE": "2025-09-20",
      "TVL_CHAIN_APPS": 2621670554,
      "TVL_HLP": 499151891,
      "TVL_SPOT": 185935056.0,
      "TVL_APPS": 1936583607
    },
    {
      "DATE": "2025-09-21",
      "TVL_CHAIN_APPS": 2612705664,
      "TVL_HLP": 490085704,
      "TVL_SPOT": 179991494.0,
      "TVL_APPS": 1942628466
    }
  ]

  // Build stacked-only series for the chart (HLP, SPOT, APPS only)
  const TVL_STACKED = (TVL_DATA as any[]).map(d => ({
    date: d.DATE,
    TVL_HLP: Number.isFinite(d.TVL_HLP) ? d.TVL_HLP : 0,
    TVL_SPOT: Number.isFinite(d.TVL_SPOT) ? d.TVL_SPOT : 0,
    TVL_APPS: Number.isFinite(d.TVL_APPS) ? d.TVL_APPS : 0
  }))

  const TVL_STACKED_CONFIG: ChartConfig = {
    TVL_HLP: { label: 'TVL_HLP', color: '#EF5350', type: CHART_TYPES.bar, stackId: 'tvl' },
    TVL_SPOT: { label: 'TVL_SPOT', color: '#F7BD5F', type: CHART_TYPES.bar, stackId: 'tvl' },
    TVL_APPS: { label: 'TVL_APPS', color: '#5E9EFD', type: CHART_TYPES.bar, stackId: 'tvl' }
  }

  const SPOT_VOLUME_BINANCE_HYPERLIQUID_CONFIG: ChartConfig = {
    Binance: { label: 'Binance', color: '#5E9EFD', type: CHART_TYPES.bar, stackId: 'spot' },
    Hyperliquid: { label: 'Hyperliquid', color: '#EF5350', type: CHART_TYPES.bar, stackId: 'spot' }
  }

  return (
    <div className="w-full pb-12 flex flex-col items-center gap-18 font-[family-name:var(--font-geist-sans)]">
      <div
        className="w-full flex items-center justify-center gap-12 pt-12 pb-12"
        style={{ background: 'var(--gradient-background)' }}
      >
        <ContentWrapper className="max-w-none px-4 md:px-8">
          <div className="w-full flex flex-col items-center gap-6 mb-4">
            <Blurb
              title="Perp Volume Share by Venue"
              description="Daily percentage share of perp volume across supported venues."
              textAlignment="center"
            />
          </div>
          {perpBreakdownData && perpBreakdownData.length > 0 ? (
            <Chart
              title="Perp Volume Share by Venue"
              data={perpBreakdownData}
              dataConfig={PERP_VOLUME_BY_SYMBOL_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
              bare
              chartHeight={480}
              hidePoweredBy
            />
          ) : (
            <div className="w-full h-[480px] flex items-center justify-center text-muted-foreground">
              Unable to load data right now.
            </div>
          )}
        </ContentWrapper>
      </div>

      <ContentWrapper>
        <div className="w-full flex items-center justify-center gap-3 py-2">
          <ArtemisLogo poweredBy />
        </div>
      </ContentWrapper>
      {/* <div className="w-full -mt-4 mb-4">
        <LogoMarquee />
      </div> */}

      <div id="stablecoin-payments-by-type" />
      <ContentWrapper>
        <div className="flex flex-col gap-8 items-center">
          <Blurb
            title="Hyperliquid TVL (Daily)"
            description="Daily TVL for Hyperliquid (and total chain apps) showing growth from late 2024 into 2025."
            textAlignment="center"
          />
          <div className="w-full max-w-[1000px]">
            <Chart
              title="TVL Breakdown (Stacked)"
              data={TVL_STACKED}
              dataConfig={TVL_STACKED_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              chartHeight={375}
            />
          </div>
        </div>
      </ContentWrapper>

      <div
        className="w-full flex items-center justify-center gap-12 pt-18 pb-18"
        style={{ background: 'var(--gradient-background)' }}
      >
        <ContentWrapper>
          <Quotes quotes={QUOTES} />
        </ContentWrapper>
      </div>

      <div id="stablecoin-volume-by-blockchain" />
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="Top Blockchains Used for Stablecoin Transactions in 2024"
              description="The most popular blockchains employed to settle customer flows, as a share of value sent, were Tron, followed by Ethereum, Polygon (Ethereum L2), and Binance Smart Chain. This mirrors survey findings from our 2024 report which found that users preferentially used those same five blockchains, albeit with Ethereum being the most popular network."
            />
          </div>
          <div className="col-span-2 md:order-1">
            <Chart
              title="Stablecoin Volume by Blockchain"
              data={STABLECOIN_VOLUME_BY_CHAIN_DATA}
              dataConfig={STABLECOIN_VOLUME_BY_CHAIN_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
            />
          </div>
        </div>
      </ContentWrapper>

      <div id="stablecoin-payments-by-token" />
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <Blurb
            title="The Most Used Stablecoins for Global Transactions"
            description="Tether's USDT was by far the most popular stablecoin used to settle flows for firms in the study. We explore the breakdown of USDT versus Circle's USDC on a country-by-country basis later in the report."
          />
          <div className="col-span-2">
            <Chart
              title="Stablecoin Payments by Token"
              data={STABLECOIN_VOLUME_BY_CURRENCY_DATA}
              dataConfig={STABLECOIN_VOLUME_BY_CURRENCY_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              isTimeSeries
            />
          </div>
        </div>
      </ContentWrapper>

      <div id="percent-of-stablecoin-flows-by-country" />
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-2">
            <Blurb
              title="Which Countries Send the Most Stablecoins?"
              description="Based on the geographic data provided by firms for the study, combined with additional geographic attribution estimates obtained by looking at IP addresses and timezones of on-chain entities as their transactions reach blockchain nodes, we were able to identify countries originating the bulk of stablecoin transactions. The USA, Singapore, Hong Kong, Japan, and the UK were the top stablecoin sending countries."
            />
          </div>
          <div className="col-span-2 md:order-1">
            <Chart
              title="Percent of Stablecoin Flows by Country"
              data={STABLECOIN_FLOWS_BY_COUNTRY_DATA}
              dataConfig={STABLECOIN_FLOWS_BY_COUNTRY_CONFIG}
              valueFormat={VALUE_FORMAT.percentage}
              hideLegend
            />
          </div>
        </div>
      </ContentWrapper>

      <div
        className="w-full flex items-center justify-center pt-24 pb-24"
        style={{ background: 'var(--gradient-background-download)' }}
      >
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center gap-8 relative">
            <div
              className="absolute left-0 top-1/2 -translate-x-1/2"
              style={{
                width: '508px',
                height: '2px',
                background:
                  'linear-gradient(180deg, #5E4EB5 0%, rgba(255, 255, 255, 0) 100%)',
                transform: 'rotate(90deg)',
                opacity: 0.1
              }}
            />
            <div
              className="absolute right-0 top-1/2 translate-x-1/2"
              style={{
                width: '508px',
                height: '2px',
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #5E4EB5 100%)',
                transform: 'rotate(90deg)',
                opacity: 0.1
              }}
            />
            <Image
              src={ReportImage}
              alt="Report Download"
              width={555}
              height={100}
            />
            <div className="flex flex-col gap-8">
              <p className="text-[var(--color-pluto-purple-500)] text-sm font-medium font-[family-name:var(--font-geist-mono)]">
                2025 REPORT
              </p>
              <Blurb
                title="Get a Copy of Our Report Here"
                description="Discover the latest stablecoin trends, data, and insights shaping 2025. Download your copy today."
                textAlignment="left"
              />
              <DownloadReportForm disableForm />
            </div>
          </div>
        </ContentWrapper>
      </div>

      <ContentWrapper>
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="text-4xl font-bold">Artemis Data Partners</p>
          <p className="text-muted-foreground">
            Join us to define the stablecoin data standard of the future
          </p>
          <LogoGrid dataPartners={DATA_PARTNERS} />
          <Link
            href="https://ry0v9n8oa4l.typeform.com/to/pibk76PA"
            target="_blank"
          >
            <Button variant="cta" className="mt-3">
              Join Us
            </Button>
          </Link>
        </div>
      </ContentWrapper>
    </div>
  )
}
