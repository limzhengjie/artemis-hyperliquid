import { StaticImageData } from 'next/image'

import NicCarterImage from '@/public/partners/nic-carter.svg'
import RobHadickImage from '@/public/partners/rob-hadick.svg'

export type Quote = {
  quote: string
  author: string
  image: StaticImageData | string
}

export const QUOTES: Quote[] = [
  {
    quote:
      'Stablecoins are being used not just for crypto trading, but increasingly feature in the ordinary economic lives of these individuals.',
    author: 'Nic Carter, General Partner at Castle Island Ventures',
    image: NicCarterImage
  },
  {
    quote: 'Some alpha about stablecoins and why they are super duper cool.',
    author: 'Rob Hadick, General Partner at Dragonfly',
    image: RobHadickImage
  }
]
