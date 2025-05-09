'use client'

import { Button } from '@/components/ui/button'
import ArtemisLogo from '@/components/(layout)/artemis-logo'

import { MessageCircleMoreIcon } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-6 py-2 border-t border-[var(--color-moongray-25)]">
      <div className="flex items-center gap-2">
        <p className="text-sm">Powered by</p>
        <ArtemisLogo />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="flex items-center gap-1">
          <MessageCircleMoreIcon />
          <span>Give us feedback</span>
        </Button>
      </div>
    </footer>
  )
}

export default Footer
