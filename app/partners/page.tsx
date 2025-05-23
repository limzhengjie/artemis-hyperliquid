'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePostHog } from 'posthog-js/react'

import ContentWrapper from '@/components/(layout)/content-wrapper'
import LogoTiles from '@/components/logo-tiles'
import Blurb from '@/components/blurb'

import { DATA_PARTNERS, DataPartner } from '@/constants/data-partners'

const Partners = () => {
  const posthog = usePostHog()

  const [activePartner, setActivePartner] = useState<DataPartner>(
    DATA_PARTNERS[0]
  )

  return (
    <div className="w-full pt-12 pb-12 flex flex-col items-center gap-12 font-[family-name:var(--font-geist-sans)]">
      <ContentWrapper>
        <Blurb
          title="Artemis Data Partners"
          description={
            <span>
              Thank you to all of the Artemis Data Partners. This was a
              collaborative effort bringing together leading stablecoin
              companies to contribute to a new standard of off-chain data
              transparency. Thank you to our founding partners for helping shape
              the future of digital finance. Interested in joining the
              consortium?{' '}
              <Link
                href="https://ry0v9n8oa4l.typeform.com/to/pibk76PA"
                target="_blank"
                className="font-semibold"
                onClick={() =>
                  posthog.capture('clicked_join_consortium_on_partners_page', {
                    $set: {
                      join_consortium_url:
                        'https://ry0v9n8oa4l.typeform.com/to/pibk76PA'
                    }
                  })
                }
              >
                Click here to get involved.
              </Link>
            </span>
          }
        />
      </ContentWrapper>

      <ContentWrapper>
        <LogoTiles
          logos={DATA_PARTNERS}
          activeLogo={activePartner}
          setActiveLogo={setActivePartner}
        />
      </ContentWrapper>

      <ContentWrapper>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePartner.name}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activePartner.info && React.createElement(activePartner.info)}
          </motion.div>
        </AnimatePresence>
      </ContentWrapper>
    </div>
  )
}

export default Partners
