import type { Metadata } from 'next'
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
  title: 'Stablecoin Payments from the Ground Up | Artemis',
  description:
    'Comprehensive stablecoin market insights, and deep dives into the stablecoin ecosystem. Track stablecoin geographic activity and payments volume.',
  keywords:
    'stablecoin payments from the ground up, Artemis, stablecoin, stablecoin analytics, USDC, USDT, Tether, market data, blockchain, payments, stablecoin payments, stablecoin b2b, stablecoin p2p',
  openGraph: {
    title: 'Stablecoin Payments from the Ground Up | Artemis',
    description:
      'Comprehensive stablecoin market insights, and deep dives into the stablecoin ecosystem. Track stablecoin geographic activity and payments volume.',
    url: 'https://stablecoin.fyi',
    siteName: 'Stablecoin Payments from the Ground Up | Artemis',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stablecoin Payments from the Ground Up | Artemis',
    description:
      'Comprehensive stablecoin market insights, and deep dives into the stablecoin ecosystem. Track stablecoin geographic activity and payments volume.'
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
              <ScrollToHash />
            </PostHogProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
