'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { ARTEMIS_TERMINAL_URL } from '@/constants/general'

import { Button } from '@/components/ui/button'

import whyHyperliquidLogo from '@/public/why-hyperliquid-logo.svg'

import { MessageCircleMoreIcon } from 'lucide-react'

// hamburger menu button
const MenuButton = ({
  open,
  onClick
}: {
  open: boolean
  onClick: () => void
}) => {
  const styles = {
    line: {
      height: '2px',
      width: '20px',
      background: 'currentColor',
      transition: 'all 0.2s ease'
    },
    lineTop: {
      transform: open ? 'rotate(45deg)' : 'none',
      transformOrigin: 'top left',
      marginBottom: '5px'
    },
    lineMiddle: {
      opacity: open ? 0 : 1,
      transform: open ? 'translateX(-16px)' : 'none'
    },
    lineBottom: {
      transform: open ? 'translateX(-1px) rotate(-45deg)' : 'none',
      transformOrigin: 'top left',
      marginTop: '5px'
    }
  }

  return (
    <div
      className="lg:hidden flex flex-col items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <div style={{ ...styles.line, ...styles.lineTop }} />
      <div style={{ ...styles.line, ...styles.lineMiddle }} />
      <div style={{ ...styles.line, ...styles.lineBottom }} />
    </div>
  )
}

// Mobile menu
const MobileMenu = ({
  open,
  children
}: {
  open: boolean
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 bg-background z-50 flex flex-col transition-all duration-300 ease-in-out',
        open ? 'opacity-95 visible' : 'opacity-0 invisible'
      )}
    >
      <div className="pt-16 px-6">{children}</div>
    </div>
  )
}

const MenuItem = ({
  children,
  href,
  active,
  onClick,
  open,
  index
}: {
  children: React.ReactNode
  href: string
  active: boolean
  onClick: () => void
  open: boolean
  index: number
}) => {
  const [hover, setHover] = useState(false)

  return (
    <motion.div
      className="w-full py-3"
      initial={{ opacity: 0, x: -20 }}
      animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        delay: open ? index * 0.2 : 0
      }}
    >
      <Link
        href={href}
        className={cn(
          'block text-lg font-normal',
          active ? 'text-primary font-medium' : 'text-muted-foreground',
          hover && 'text-primary'
        )}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {children}
      </Link>
    </motion.div>
  )
}

const Header = () => {
  const posthog = usePostHog()
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const navigation = [
    {
      label: 'Overview',
      href: '/',
      active: isActive('/')
    },
    {
      label: 'Why Public Goods?',
      href: '/why-public-good',
      active: isActive('/why-public-good')
    },
    {
      label: 'Feedback',
      href: '/feedback',
      active: isActive('/feedback')
    },
    
  ]

  return (
    <>
      <header className="flex items-center justify-between px-6 py-2 border-b border-[var(--color-moongray-25)] relative z-[51]">
        <div className="flex items-center gap-6 xl:gap-10">
          <Link href="/">
            <Image
              src={whyHyperliquidLogo}
              alt="Why Hyperliquid Logo"
              className="w-[160px] md:w-[180px]"
            />
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 xl:gap-8">
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

        <div className="flex items-center gap-2 relative z-[51]">
          <MenuButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="cta"
              asChild
              onClick={() =>
                posthog.capture('clicked_artemis_terminal_button', {
                  $set: {
                    artemis_terminal_url: ARTEMIS_TERMINAL_URL
                  }
                })
              }
            >
              <Link href={ARTEMIS_TERMINAL_URL} target="_blank">
                Artemis Terminal
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <MobileMenu open={menuOpen}>
          <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
            {navigation.map((item, index) => (
              <MenuItem
                key={item.href}
                href={item.href}
                active={item.active}
                onClick={() => setMenuOpen(false)}
                open={menuOpen}
                index={index}
              >
                {item.label}
              </MenuItem>
            ))}
            <MenuItem
              key="methodology"
              href="/methodology"
              active={isActive('/methodology')}
              onClick={() => setMenuOpen(false)}
              open={menuOpen}
              index={navigation.length}
            >
              Methodology
            </MenuItem>

            <div className="py-6">
              <Link
                href="https://ry0v9n8oa4l.typeform.com/to/pn9GQfzu"
                target="_blank"
                onClick={() => setMenuOpen(false)}
              >
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-1 mb-4 bg-white"
                >
                  <MessageCircleMoreIcon />
                  <span>Need Stablecoin Data?</span>
                </Button>
              </Link>
              <Button
                variant="cta"
                className="w-full"
                onClick={() => {
                  setMenuOpen(false)
                  posthog.capture('clicked_artemis_terminal_button', {
                    $set: {
                      artemis_terminal_url: ARTEMIS_TERMINAL_URL
                    }
                  })
                }}
                asChild
              >
                <Link href={ARTEMIS_TERMINAL_URL} target="_blank">
                  Artemis Terminal
                </Link>
              </Button>
            </div>
          </div>
        </MobileMenu>
      </div>
    </>
  )
}

export default Header
