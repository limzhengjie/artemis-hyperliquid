import Image from 'next/image'
import Marquee from 'react-fast-marquee'

import { MEMBERS_LOGOS } from '@/constants/members'

const LogoMarquee = () => {
  return (
    <Marquee gradient gradientWidth={300}>
      {MEMBERS_LOGOS.map(logo => (
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
