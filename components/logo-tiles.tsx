import Image from 'next/image'
import { cn } from '@/lib/utils'
import { DataPartner } from '@/constants/data-partners'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  logos: DataPartner[]
  activeLogo: DataPartner
  setActiveLogo: (logo: DataPartner) => void
}

export default function LogoTiles({ logos, activeLogo, setActiveLogo }: Props) {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl px-5">
        <div className="-mx-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:mx-0 relative">
          <AnimatePresence>
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name + index}
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
                    src={logo.image}
                    className={cn(
                      'max-h-4 sm:max-h-6 w-full object-contain transition-all duration-500',
                      logo.name !== activeLogo.name && 'grayscale brightness-75'
                    )}
                  />
                </motion.div>
                {logo.name === activeLogo.name && (
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
