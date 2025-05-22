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

export type DataPartner = {
  name: string
  image: StaticImageData | string
}

export const DATA_PARTNERS_LOGOS = [
  {
    name: 'Binance',
    image: BinanceLogo
  },
  {
    name: 'BVNK',
    image: BVNKLogo
  },
  {
    name: 'Conduit',
    image: ConduitLogo
  },
  {
    name: 'Reap',
    image: ReapLogo
  },
  {
    name: 'Bitso',
    image: BitsoLogo
  },
  {
    name: 'Felix',
    image: FelixLogo
  },
  {
    name: 'YellowCard',
    image: YellowCardLogo
  },
  {
    name: 'Huma',
    image: HumaLogo
  },
  {
    name: 'Lemon',
    image: LemonLogo
  },
  {
    name: 'Acctual',
    image: AcctualLogo
  },
  {
    name: 'Arf',
    image: ArfLogo
  },
  {
    name: 'Belo',
    image: BeloLogo
  },
  {
    name: 'LoopCrypto',
    image: LoopCryptoLogo
  },
  {
    name: 'Mansa',
    image: MansaLogo
  },
  {
    name: 'Meso',
    image: MesoLogo
  },
  {
    name: 'Orbital',
    image: OrbitalLogo
  },
  {
    name: 'Rio',
    image: RioLogo
  },
  {
    name: 'Shield',
    image: ShieldLogo
  },
  {
    name: 'Walapay',
    image: WalapayLogo
  },
  {
    name: 'Money',
    image: MoneyLogo
  }
]
