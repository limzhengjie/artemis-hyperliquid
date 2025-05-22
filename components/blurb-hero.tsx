import Image from 'next/image'

import CIVLogo from '@/public/partners/civ.png'
import DragonflyLogo from '@/public/partners/dragonfly.png'

const BlurbHero = () => {
  return (
    <div className="w-full flex flex-col gap-4 max-w-4xl">
      <h1 className="flex flex-col gap-1 text-foreground font-semibold text-[32px] md:text-[54px] leading-[32px] md:leading-[54px] text-left">
        <span>Stablecoins:</span>
        <span>The Emerging Market Story</span>
      </h1>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-md">In partnership with</p>
        <div className="flex gap-8 items-center">
          <div>
            <Image src={CIVLogo} alt="CIV Logo" width={200} height={200} />
          </div>
          <div>
            <Image
              src={DragonflyLogo}
              alt="Dragonfly Logo"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-md">
        Stablecoins have emerged as a global alternative to traditional payment
        and settlement networks, with total supply growing from under $10
        billion five years ago to approximately $240 billion today. In this
        study, we present a novel dataset compiled from 38 stablecoin-based
        payment firms that process transactions on behalf of end users. This is
        the most comprehensive effort to date and likely captures the majority
        of activity in the emerging stablecoin payments sector.
      </p>
    </div>
  )
}

export default BlurbHero
