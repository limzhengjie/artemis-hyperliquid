'use client'

import ArtemisLogo from '@/components/(layout)/artemis-logo'

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-6 py-2 border-t border-[var(--color-moongray-25)]">
      <ArtemisLogo poweredBy />
    </footer>
  )
}

export default Footer
