'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import { ARTEMIS_TERMINAL_URL } from '@/constants/general'

interface Props {
  width?: number
  poweredBy?: boolean
}

const ArtemisLogo = ({ width = 82, poweredBy = false }: Props) => {
  const { resolvedTheme } = useTheme()
  const [logoSrc, setLogoSrc] = useState('/artemis-light.svg')

  useEffect(() => {
    setLogoSrc(
      resolvedTheme === 'dark' ? '/artemis-dark.svg' : '/artemis-light.svg'
    )
  }, [resolvedTheme])

  return (
    <div className="flex items-center gap-2">
      {poweredBy && <p className="text-sm">Powered by</p>}
      <Link href={ARTEMIS_TERMINAL_URL} target="_blank">
        <Image src={logoSrc} alt="Artemis Logo" width={width} height={width} />
      </Link>
    </div>
  )
}

export default ArtemisLogo
