'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

import ArtemisStablecoinLogo from '@/public/artemis-stablecoin-logo.svg'

import { DatabaseIcon } from 'lucide-react'

const Header = () => {
  const posthog = usePostHog()

  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  const navigation = [
    {
      label: 'Overview',
      href: '/',
      active: isActive('/')
    },
    {
      label: 'Regions',
      href: '/regions',
      active: isActive('/regions')
    }
  ]

  return (
    <header className="flex items-center justify-between px-6 py-2 border-b border-[var(--color-moongray-25)]">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image
            src={ArtemisStablecoinLogo}
            alt="Artemis Stablecoin Logo"
            width={200}
            height={100}
          />
        </Link>
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-8">
            {navigation.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm font-normal text-muted-foreground',
                    item.active && 'text-primary font-medium'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <Button variant="outline" className="flex items-center gap-1">
          <DatabaseIcon />
          <span>Need Stablecoin Data?</span>
        </Button>
        <Button
          variant="cta"
          asChild
          onClick={() =>
            posthog.capture('clicked_artemis_terminal_button', {
              $set: {
                artemis_terminal_url: 'https://app.artemisanalytics.com/'
              }
            })
          }
        >
          <Link href="https://app.artemisanalytics.com/" target="_blank">
            Artemis Terminal
          </Link>
        </Button>
      </div>
    </header>
  )
}

export default Header
