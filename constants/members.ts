import { StaticImageData } from 'next/image'

import AcctualLogo from '@/public/members/acctual.svg'
import BeloLogo from '@/public/members/belo.svg'
import BinanceLogo from '@/public/members/binance.svg'
import BitsoLogo from '@/public/members/bitso.svg'
import BrlaLogo from '@/public/members/brla.svg'
import BVNKLogo from '@/public/members/bvnk.svg'
import ConduitLogo from '@/public/members/conduit.svg'
import FelixLogo from '@/public/members/felix.svg'
import HumaLogo from '@/public/members/huma.svg'
import LemonLogo from '@/public/members/lemon.svg'
import LoopCryptoLogo from '@/public/members/loop-crypto.svg'
import MansaLogo from '@/public/members/mansa.svg'
import MesoLogo from '@/public/members/meso.svg'
import MoneyLogo from '@/public/members/money.svg'
import OrbitalLogo from '@/public/members/orbital.svg'
import ReapLogo from '@/public/members/reap.svg'
import SlingMoneyLogo from '@/public/members/sling-money.svg'
import YellowCardLogo from '@/public/members/yellow-card.svg'

export type Member = {
  name: string
  image: StaticImageData | string
}

export const MEMBERS_LOGOS = [
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
