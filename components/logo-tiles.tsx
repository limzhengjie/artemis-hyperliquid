import Image from 'next/image'
import { Cutout } from '@/constants/cutouts'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  logos: Cutout[]
  activeLogo: Cutout
  setActiveLogo: (logo: Cutout) => void
}

export default function LogoTiles({ logos, activeLogo, setActiveLogo }: Props) {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl px-5">
        <div className="-mx-6 grid grid-cols-3 sm:grid-cols-4 gap-1 overflow-hidden sm:mx-0 md:grid-cols-4 relative">
          <AnimatePresence>
            {logos.map((logo, index) => (
              <motion.div
                key={logo.value + index}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-2 sm:p-4 relative cursor-pointer rounded-md"
                onClick={() => setActiveLogo(logo)}
              >
                <motion.div layout>
                  <Image
                    alt="Transistor"
                    src={logo.logo}
                    className="max-h-4 sm:max-h-6 w-full object-contain"
                  />
                </motion.div>
                {logo.value === activeLogo.value && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-[var(--color-moongray-50)]/20 rounded-md border border-moongray-100 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
