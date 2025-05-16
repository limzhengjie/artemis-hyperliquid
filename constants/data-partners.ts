import { StaticImageData } from 'next/image'

import AcctualLogo from '@/public/data-partners/acctual.svg'
import BeloLogo from '@/public/data-partners/belo.svg'
import BinanceLogo from '@/public/data-partners/binance.svg'
import BitsoLogo from '@/public/data-partners/bitso.svg'
import BrlaLogo from '@/public/data-partners/brla.svg'
import BVNKLogo from '@/public/data-partners/bvnk.svg'
import ConduitLogo from '@/public/data-partners/conduit.svg'
import FelixLogo from '@/public/data-partners/felix.svg'
import HumaLogo from '@/public/data-partners/huma.svg'
import LemonLogo from '@/public/data-partners/lemon.svg'
import LoopCryptoLogo from '@/public/data-partners/loop-crypto.svg'
import MansaLogo from '@/public/data-partners/mansa.svg'
import MesoLogo from '@/public/data-partners/meso.svg'
import MoneyLogo from '@/public/data-partners/money.svg'
import OrbitalLogo from '@/public/data-partners/orbital.svg'
import ReapLogo from '@/public/data-partners/reap.svg'
import SlingMoneyLogo from '@/public/data-partners/sling-money.svg'
import YellowCardLogo from '@/public/data-partners/yellow-card.svg'

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
    name: 'Lemon',
    image: LemonLogo
  },
  {
    name: 'Huma',
    image: HumaLogo
  },
  {
    name: 'Mansa',
    image: MansaLogo
  },
  {
    name: 'Brla',
    image: BrlaLogo
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
    name: 'Money',
    image: MoneyLogo
  },
  {
    name: 'Belo',
    image: BeloLogo
  },
  {
    name: 'Acctual',
    image: AcctualLogo
  },
  {
    name: 'LoopCrypto',
    image: LoopCryptoLogo
  },
  {
    name: 'SlingMoney',
    image: SlingMoneyLogo
  }
]
