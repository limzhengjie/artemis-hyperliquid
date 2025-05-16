import Image from 'next/image'
import Marquee from 'react-fast-marquee'

import { DATA_PARTNERS_LOGOS } from '@/constants/data-partners'

const LogoMarquee = () => {
  return (
    <Marquee gradient gradientWidth={200}>
      {DATA_PARTNERS_LOGOS.map(logo => (
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
