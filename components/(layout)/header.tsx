'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

import { DatabaseIcon } from 'lucide-react'

const Header = () => {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navigation = [
    {
      label: 'Overview',
      href: '/',
      active: isActive('/')
    },
    {
      label: 'Market Map',
      href: '/market-map',
      active: isActive('/market-map')
    }
  ]

  return (
    <header className="flex items-center justify-between px-6 py-2 border-b border-[var(--color-moongray-25)]">
      <div className="flex items-center gap-10">
        <h1 className="text-xl font-bold">logo</h1>
        <nav>
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
      <div className="flex items-center gap-2">
        <Button variant="outline" className="flex items-center gap-1">
          <DatabaseIcon />
          <span>Need Stablecoin Data?</span>
        </Button>
        <Button variant="cta" asChild>
          <Link href="https://app.artemisanalytics.com/" target="_blank">
            Artemis Terminal
          </Link>
        </Button>
      </div>
    </header>
  )
}

export default Header
