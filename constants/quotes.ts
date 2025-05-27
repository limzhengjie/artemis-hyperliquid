import { StaticImageData } from 'next/image'

import NicCarterImage from '@/public/partners/nic-carter.svg'
import RobHadickImage from '@/public/partners/rob-hadick.svg'

export type Quote = {
  quote: string
  author: string
  image: StaticImageData | string
  website: string
}

export const QUOTES: Quote[] = [
  {
    quote:
      'Stablecoins are being used not just for crypto trading, but increasingly feature in the ordinary economic lives of millions of individuals around the world.',
    author: 'Nic Carter, General Partner at Castle Island Ventures',
    image: NicCarterImage,
    website: 'https://x.com/nic__carter'
  },
  {
    quote:
      'Stablecoins fulfill the vision that a generation worth of fintech entrepreneurs having been building towards - collapsing the gap between antiquated financial rails and our digitally native lives through the use of fully programmable internet money.',
    author: 'Rob Hadick, General Partner at Dragonfly',
    image: RobHadickImage,
    website: 'https://x.com/HadickM'
  }
]
