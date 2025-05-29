'use client'

import ArtemisLogo from '@/components/(layout)/artemis-logo'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-6 py-2 border-t border-[var(--color-moongray-25)]">
      <ArtemisLogo poweredBy />
      <div className="hidden md:flex items-center gap-2 text-md text-muted-foreground">
        <Link href="mailto:press@artemisanalytics.com">Press Contact</Link>
        <p>•</p>
        <Link href="/methodology">Methodology</Link>
      </div>
    </footer>
  )
}

export default Footer
