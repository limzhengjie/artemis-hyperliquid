import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from '@/contexts/theme-provider'
import { PostHogProvider } from '@/contexts/posthog-provider'

import { TooltipProvider } from '@/components/ui/tooltip'
import Header from '@/components/(layout)/header'
import Footer from '@/components/(layout)/footer'

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
  title: 'Stablecoin.FYI | Real-time Stablecoin Analytics Dashboard',
  description:
    'Comprehensive stablecoin data analytics, market insights, and deep dives into the stablecoin ecosystem. Track performance, compare metrics, and stay informed with our living dashboard.',
  keywords:
    'stablecoin, crypto analytics, USDC, USDT, DAI, market data, blockchain, cryptocurrency',
  openGraph: {
    title: 'Stablecoin.FYI | Real-time Stablecoin Analytics Dashboard',
    description:
      'Comprehensive stablecoin data analytics, market insights, and deep dives into the stablecoin ecosystem.',
    url: 'https://stablecoin.fyi',
    siteName: 'Stablecoin.FYI',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stablecoin.FYI | Real-time Stablecoin Analytics Dashboard',
    description:
      'Comprehensive stablecoin data analytics, market insights, and deep dives into the stablecoin ecosystem. Track performance, compare metrics, and stay informed with our living dashboard.'
  }
}

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
            </PostHogProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
