'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import { FormattedCategoryWithProtocolsType } from '@/lib/supabase'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

import { ArrowRight, Star } from 'lucide-react'

interface Props {
  category: FormattedCategoryWithProtocolsType
}

export default function CategoryCard({ category }: Props) {
  const [activeProtocolDrawer, setActiveProtocolDrawer] = useState<
    string | null
  >(null)

  function createTooltipRow(label: string, value: string) {
    return (
      <div className="w-100 flex flex-wrap">
        <p className="w-[60px] font-bold">{label}</p>
        <p className="flex-1">{value}</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>
          <div className="flex flex-wrap items-center justify-between">
            <p className="text-sm">{category.label}</p>
            <Badge variant="count">{category.protocols.length}</Badge>
          </div>
        </CardTitle>
      </CardHeader>

      {/* desktop view */}
      <CardContent className="hidden md:flex flex-wrap gap-1.5 justify-center">
        {category.protocols
          ?.sort((a, b) => {
            if (a.type === 'primary' && b.type !== 'primary') return -1
            if (a.type !== 'primary' && b.type === 'primary') return 1
            return a.name.localeCompare(b.name)
          })
          .map(protocol => (
            <HoverCard openDelay={0} closeDelay={0} key={protocol.protocol}>
              <HoverCardTrigger asChild>
                <Link
                  href={(protocol.artemisProjectPage as string) || ''}
                  target="_blank"
                  className={cn(
                    'flex items-center gap-1 bg-[var(--accent)] px-1.5 py-0.5 rounded-sm transition-colors',
                    protocol.type === 'primary'
                      ? 'bg-[#FCE9A8] border-[#FFD700] border-1 shadow-md hover:bg-[#F9DD85]'
                      : '',
                    protocol.artemisProjectPage
                      ? 'cursor-pointer hover:bg-[var(--border)]'
                      : 'cursor-default active:pointer-events-none hover:shadow-md'
                  )}
                >
                  {protocol.logo && (
                    <Image
                      src={protocol.logo}
                      alt={protocol.name}
                      width={16}
                      height={16}
                      className="rounded-sm"
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius)'
                      }}
                    />
                  )}
                  <span className="text-sm">{protocol.name}</span>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col gap-3">
                {protocol.type === 'primary' && (
                  <Badge
                    variant="highlight"
                    className="flex items-center gap-1"
                  >
                    <Star
                      className="w-4 h-4"
                      strokeWidth={2.5}
                      fill="currentColor"
                    />
                    Artemis Data Partner
                  </Badge>
                )}
                <div className="flex items-center gap-1">
                  {protocol.logo && (
                    <Image
                      src={protocol.logo}
                      alt={protocol.name}
                      width={20}
                      height={20}
                      className="rounded-sm"
                    />
                  )}
                  <p className="font-semibold text-sm">{protocol.name}</p>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  {protocol.description && <p>{protocol.description}</p>}
                  {protocol.website && (
                    <Link href={protocol.website as string} target="_blank">
                      {createTooltipRow('Website:', protocol.website as string)}
                    </Link>
                  )}
                  {protocol.twitter && (
                    <Link href={protocol.twitter as string} target="_blank">
                      {createTooltipRow('Twitter:', protocol.twitter as string)}
                    </Link>
                  )}
                  {protocol.artemisProjectPage && (
                    <Link
                      href={protocol.artemisProjectPage as string}
                      target="_blank"
                      className="mt-3 flex gap-1 items-center p-2 rounded-md bg-[#AFAAFE] border-2 border-[#EFEDED] text-black shadow-md w-fit"
                    >
                      <Image
                        src="/artemis-icon.svg"
                        alt="Artemis Icon"
                        width={16}
                        height={0}
                        style={{ height: '100%' }}
                      />
                      <span className="font-bold">
                        Click to view on Artemis
                      </span>
                      <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                    </Link>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
      </CardContent>

      {/* mobile view */}
      <CardContent className="flex flex-wrap gap-1.5 justify-center md:hidden">
        {category.protocols
          ?.sort((a, b) => {
            if (a.type === 'primary' && b.type !== 'primary') return -1
            if (a.type !== 'primary' && b.type === 'primary') return 1
            return a.name.localeCompare(b.name)
          })
          .map(protocol => (
            <Drawer
              key={protocol.protocol}
              open={activeProtocolDrawer === protocol.protocol}
              onOpenChange={open =>
                setActiveProtocolDrawer(open ? String(protocol.protocol) : null)
              }
            >
              <DrawerTrigger asChild>
                <div
                  className={cn(
                    'flex items-center gap-1 bg-[var(--accent)] px-1.5 py-0.5 rounded-sm transition-colors cursor-pointer hover:bg-[var(--border)]',
                    protocol.type === 'primary'
                      ? 'bg-[#FCE9A8] border-[#FFD700] border-1 shadow-md hover:bg-[#F9DD85]'
                      : ''
                  )}
                >
                  {protocol.logo && (
                    <Image
                      src={protocol.logo}
                      alt={protocol.name}
                      width={16}
                      height={16}
                      className="rounded-sm"
                    />
                  )}
                  <span className="text-sm">{protocol.name}</span>
                </div>
              </DrawerTrigger>
              <DrawerContent className="bg-inherit p-7">
                <DrawerHeader>
                  <DrawerTitle className="flex flex-col gap-4">
                    {protocol.type === 'primary' && (
                      <Badge
                        variant="highlight"
                        className="flex items-center gap-1"
                      >
                        <Star
                          className="w-4 h-4"
                          strokeWidth={2.5}
                          fill="currentColor"
                        />
                        Artemis Data Partner
                      </Badge>
                    )}
                    <div className="flex items-center gap-1">
                      {protocol.logo && (
                        <Image
                          src={protocol.logo}
                          alt={protocol.name}
                          width={20}
                          height={20}
                          className="rounded-sm"
                        />
                      )}
                      <p className="font-semibold text-sm">{protocol.name}</p>
                    </div>
                  </DrawerTitle>
                </DrawerHeader>

                <div className="flex flex-col gap-2 text-sm">
                  {protocol.description && <p>{protocol.description}</p>}
                  {protocol.website && (
                    <Link href={protocol.website as string} target="_blank">
                      {createTooltipRow('Website:', protocol.website as string)}
                    </Link>
                  )}
                  {protocol.twitter && (
                    <Link href={protocol.twitter as string} target="_blank">
                      {createTooltipRow('Twitter:', protocol.twitter as string)}
                    </Link>
                  )}
                  {protocol.artemisProjectPage && (
                    <Link
                      href={protocol.artemisProjectPage as string}
                      target="_blank"
                      className="mt-3 flex gap-1 items-center p-2 rounded-md bg-[#AFAAFE] border-2 border-[#EFEDED] text-black shadow-md w-fit"
                    >
                      <Image
                        src="/artemis-icon.svg"
                        alt="Artemis Icon"
                        width={16}
                        height={0}
                        style={{ height: '100%', borderRadius: '4px' }}
                      />
                      <span className="font-bold">View on Artemis</span>
                      <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                    </Link>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          ))}
      </CardContent>
    </Card>
  )
}
