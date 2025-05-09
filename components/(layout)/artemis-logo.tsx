import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

interface Props {
  width?: number
}

const ArtemisLogo = ({ width = 82 }: Props) => {
  const { resolvedTheme } = useTheme()
  const [logoSrc, setLogoSrc] = useState('/artemis-light.svg')

  useEffect(() => {
    setLogoSrc(
      resolvedTheme === 'dark' ? '/artemis-dark.svg' : '/artemis-light.svg'
    )
  }, [resolvedTheme])

  return (
    <Link href="https://app.artemisanalytics.com/" target="_blank">
      <Image src={logoSrc} alt="Artemis Logo" width={width} height={width} />
    </Link>
  )
}

export default ArtemisLogo
