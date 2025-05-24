import { FC } from 'react'
import { StaticImageData } from 'next/image'

import AcctualLogo from '@/public/data-partners/acctual.png'
import ArfLogo from '@/public/data-partners/arf.png'
import BeloLogo from '@/public/data-partners/belo.png'
import BinanceLogo from '@/public/data-partners/binance.png'
import BitsoLogo from '@/public/data-partners/bitso.png'
import BVNKLogo from '@/public/data-partners/bvnk.png'
import ConduitLogo from '@/public/data-partners/conduit.png'
import FelixLogo from '@/public/data-partners/felix.png'
import HumaLogo from '@/public/data-partners/huma.png'
import LemonLogo from '@/public/data-partners/lemon.png'
import LoopCryptoLogo from '@/public/data-partners/loop-crypto.png'
import MansaLogo from '@/public/data-partners/mansa.png'
import MesoLogo from '@/public/data-partners/meso.png'
import MoneyLogo from '@/public/data-partners/money.png'
import OrbitalLogo from '@/public/data-partners/orbital.png'
import ReapLogo from '@/public/data-partners/reap.png'
import RioLogo from '@/public/data-partners/rio.png'
import ShieldLogo from '@/public/data-partners/shield.png'
import WalapayLogo from '@/public/data-partners/walapay.png'
import YellowCardLogo from '@/public/data-partners/yellow-card.png'

import AcctualInfo from '@/constants/data-partner-info/acctual'
import ArfInfo from '@/constants/data-partner-info/arf'
import BeloInfo from '@/constants/data-partner-info/belo'
import BinanceInfo from '@/constants/data-partner-info/binance'
import BitsoInfo from '@/constants/data-partner-info/bitso'
import BVNKInfo from '@/constants/data-partner-info/bvnk'
import ConduitInfo from '@/constants/data-partner-info/conduit'
import FelixInfo from '@/constants/data-partner-info/felix'
import HumaInfo from '@/constants/data-partner-info/huma'
import LemonInfo from '@/constants/data-partner-info/lemon'
import LoopCryptoInfo from '@/constants/data-partner-info/loop-crypto'
import MansaInfo from '@/constants/data-partner-info/mansa'
import MesoInfo from '@/constants/data-partner-info/meso'
import MoneyInfo from '@/constants/data-partner-info/money'
import OrbitalInfo from '@/constants/data-partner-info/orbital'
import ReapInfo from '@/constants/data-partner-info/reap'
import RioInfo from '@/constants/data-partner-info/rio'
import ShieldInfo from '@/constants/data-partner-info/shield'
import WalapayInfo from '@/constants/data-partner-info/walapay'
import YellowCardInfo from '@/constants/data-partner-info/yellow-card'

export type DataPartner = {
  name: string
  image: StaticImageData | string
  info?: FC
}

export const DATA_PARTNERS = [
  {
    name: 'Binance',
    image: BinanceLogo,
    info: BinanceInfo
  },
  {
    name: 'BVNK',
    image: BVNKLogo,
    info: BVNKInfo
  },
  {
    name: 'Conduit',
    image: ConduitLogo,
    info: ConduitInfo
  },
  {
    name: 'Reap',
    image: ReapLogo,
    info: ReapInfo
  },
  {
    name: 'Bitso',
    image: BitsoLogo,
    info: BitsoInfo
  },
  {
    name: 'Felix',
    image: FelixLogo,
    info: FelixInfo
  },
  {
    name: 'YellowCard',
    image: YellowCardLogo,
    info: YellowCardInfo
  },
  {
    name: 'Huma',
    image: HumaLogo,
    info: HumaInfo
  },
  {
    name: 'Lemon',
    image: LemonLogo,
    info: LemonInfo
  },
  {
    name: 'Acctual',
    image: AcctualLogo,
    info: AcctualInfo
  },
  {
    name: 'Arf',
    image: ArfLogo,
    info: ArfInfo
  },
  {
    name: 'Belo',
    image: BeloLogo,
    info: BeloInfo
  },
  {
    name: 'LoopCrypto',
    image: LoopCryptoLogo,
    info: LoopCryptoInfo
  },
  {
    name: 'Mansa',
    image: MansaLogo,
    info: MansaInfo
  },
  {
    name: 'Meso',
    image: MesoLogo,
    info: MesoInfo
  },
  {
    name: 'Orbital',
    image: OrbitalLogo,
    info: OrbitalInfo
  },
  {
    name: 'Rio',
    image: RioLogo,
    info: RioInfo
  },
  {
    name: 'Shield',
    image: ShieldLogo,
    info: ShieldInfo
  },
  {
    name: 'Walapay',
    image: WalapayLogo,
    info: WalapayInfo
  },
  {
    name: 'Money',
    image: MoneyLogo,
    info: MoneyInfo
  }
]
