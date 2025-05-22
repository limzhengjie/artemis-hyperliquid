'use client'

import ArtemisLogo from '@/components/(layout)/artemis-logo'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-6 py-2 border-t border-[var(--color-moongray-25)]">
      <ArtemisLogo poweredBy />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/methodology">Methodology</Link>
      </div>
    </footer>
  )
}

export default Footer
