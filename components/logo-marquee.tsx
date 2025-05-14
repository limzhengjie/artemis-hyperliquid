import Image from 'next/image'
import Marquee from 'react-fast-marquee'

import { PARTNERS_LOGOS } from '@/constants/partners'

const LogoMarquee = () => {
  return (
    <Marquee gradient>
      {PARTNERS_LOGOS.map(logo => (
        <Image
          key={logo.name}
          src={logo.image}
          alt={logo.name}
          style={{ marginRight: '70px' }}
        />
      ))}
    </Marquee>
  )
}

export default LogoMarquee
