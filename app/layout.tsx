import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from '@/contexts/theme-provider'
import { PostHogProvider } from '@/contexts/posthog-provider'

import { TooltipProvider } from '@/components/ui/tooltip'
import Header from '@/components/(layout)/header'
import Footer from '@/components/(layout)/footer'
import ScrollToHash from '@/components/(layout)/scroll-to-hash'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Hyperliquid For All | Artemis',
  description:
    'We are building the best Hyperliquid dashboard for the community - builders, analysts, traders and institutions.',
  keywords:
    'hyperliquid for all, Artemis, hyperliquid, hyperliquid analytics, hyperliquid market data, hyperliquid blockchain, hyperliquid payments, hyperliquid b2b, hyperliquid p2p',
  openGraph: {
    title: 'Hyperliquid For All | Artemis',
    description:
      'We are building the best Hyperliquid dashboard for the community - builders, analysts, traders and institutions.',
    url: 'https://whyhyperliquid.com',
    siteName: 'Hyperliquid For All | Artemis',
    type: 'website',
    images: [
      {
        url: '/hyperliquid-preview.png',
        width: 1200,
        height: 630,
        alt: 'Hyperliquid For All | Artemis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyperliquid For All | Artemis',
    description:
      'We are building the best Hyperliquid dashboard for the community - builders, analysts, traders and institutions.',
    images: ['/hyperliquid-preview.png']
  },
  other: {
    'og:image': '/hyperliquid-preview.png',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Hyperliquid For All | Artemis'
  }
}

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider>
            <PostHogProvider>
              <div className="flex flex-col min-h-screen cursor-default">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <ScrollToHash />
            </PostHogProvider>
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
