import { FC } from 'react'
import BinanceLogo from '@/public/data-partners/cutouts/binance.png'
import BinanceCutout from '@/constants/cutouts/binance'

import BitsoLogo from '@/public/data-partners/cutouts/bitso.png'
import BitsoCutout from '@/constants/cutouts/bitso'

import BVNKLogo from '@/public/data-partners/cutouts/bvnk.png'
import BVNKCutout from '@/constants/cutouts/bvnk'

import ConduitLogo from '@/public/data-partners/cutouts/conduit.png'
import ConduitCutout from '@/constants/cutouts/conduit'

import HumaLogo from '@/public/data-partners/cutouts/huma.png'
import HumaCutout from '@/constants/cutouts/huma'

import ReapLogo from '@/public/data-partners/cutouts/reap.svg'
import ReapCutout from '@/constants/cutouts/reap'

import YellowCardLogo from '@/public/data-partners/cutouts/yellow-card.png'
import YellowCardCutout from '@/constants/cutouts/yellow-card'
import { StaticImageData } from 'next/image'

export type Cutout = {
  value: string
  logo: StaticImageData
  cutout: FC
}

export const CUTOUTS: Cutout[] = [
  {
    value: 'binance',
    logo: BinanceLogo,
    cutout: BinanceCutout
  },
  {
    value: 'bitso',
    logo: BitsoLogo,
    cutout: BitsoCutout
  },
  {
    value: 'bvnk',
    logo: BVNKLogo,
    cutout: BVNKCutout
  },
  {
    value: 'conduit',
    logo: ConduitLogo,
    cutout: ConduitCutout
  },
  {
    value: 'huma',
    logo: HumaLogo,
    cutout: HumaCutout
  },
  {
    value: 'reap',
    logo: ReapLogo,
    cutout: ReapCutout
  },
  {
    value: 'yellow-card',
    logo: YellowCardLogo,
    cutout: YellowCardCutout
  }
]
