'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import ContentWrapper from '@/components/(layout)/content-wrapper'
import LogoTiles from '@/components/logo-tiles'
import Blurb from '@/components/blurb'

import { CUTOUTS, Cutout } from '@/constants/cutouts'

const Partners = () => {
  const [activeCutout, setActiveCutout] = useState<Cutout>(CUTOUTS[0])

  return (
    <div className="w-full pt-12 pb-12 flex flex-col items-center gap-12 font-[family-name:var(--font-geist-sans)]">
      <ContentWrapper>
        <Blurb title="Artemis Data Partners" description="xxxxx" />
      </ContentWrapper>

      <ContentWrapper>
        <LogoTiles
          logos={CUTOUTS}
          activeLogo={activeCutout}
          setActiveLogo={setActiveCutout}
        />
      </ContentWrapper>

      <ContentWrapper>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCutout.value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {React.createElement(activeCutout.cutout)}
          </motion.div>
        </AnimatePresence>
      </ContentWrapper>
    </div>
  )
}

export default Partners
