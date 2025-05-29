import Image from 'next/image'

import CIVLogo from '@/public/partners/civ.png'
import DragonflyLogo from '@/public/partners/dragonfly.png'

const BlurbHero = () => {
  return (
    <div className="w-full flex flex-col gap-4 max-w-4xl">
      <h1 className="text-foreground font-semibold text-[32px] md:text-[48px] leading-[32px] md:leading-[48px] text-left">
        Stablecoin Payments from the Ground Up
      </h1>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-md">In partnership with</p>
        <div className="flex gap-8 items-center">
          <div>
            <Image src={CIVLogo} alt="CIV Logo" width={180} height={200} />
          </div>
          <div>
            <Image
              src={DragonflyLogo}
              alt="Dragonfly Logo"
              width={180}
              height={200}
            />
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-md">
        Stablecoins have quickly become a credible alternative to traditional
        payment and settlement networks. In just five years, their supply has
        grown from under $10 billion to over $240 billion. To better understand
        how stablecoins are actually used, we spoke with 20 companies across a
        range of use cases and collected estimates from 11 more. This report
        offers a rare, bottoms-up look at how stablecoins are being used in the
        real world.
      </p>
    </div>
  )
}

export default BlurbHero
