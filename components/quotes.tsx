'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'

import { Quote } from '@/constants/quotes'

import { QuoteIcon } from 'lucide-react'

interface Props {
  quotes: Quote[]
}

const Quotes = ({ quotes }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // 1 for right-to-left, -1 for left-to-right
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const AUTO_PLAY_INTERVAL = 5000

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setTimeout(() => {
      setDirection(1)
      setCurrentIndex(prevIndex => (prevIndex + 1) % quotes.length)
    }, AUTO_PLAY_INTERVAL)

    return () => clearTimeout(timer)
  }, [currentIndex, quotes.length, isAutoPlaying, AUTO_PLAY_INTERVAL])

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setIsAutoPlaying(false) // disable auto-play when user manually navigates
  }

  const slideVariants: Variants = {
    enter: (direction: number) => {
      return {
        opacity: 0,
        x: direction > 0 ? 100 : -100
      }
    },
    center: {
      opacity: 1,
      x: 0
    },
    exit: (direction: number) => {
      return {
        opacity: 0,
        x: direction > 0 ? -100 : 100
      }
    }
  }

  return (
    <div className="relative flex flex-col justify-center items-center gap-6 px-4">
      <Image
        src="/pixels-left.svg"
        alt="pixels"
        width={30}
        height={20}
        className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-20"
      />
      <div
        className="absolute left-0 top-1/2 -translate-x-1/2"
        style={{
          width: '530px',
          height: '2px',
          background:
            'linear-gradient(180deg, #5E4EB5 0%, rgba(255, 255, 255, 0) 100%)',
          transform: 'rotate(90deg)',
          opacity: 0.1
        }}
      />
      <div
        className="absolute right-0 top-1/2 translate-x-1/2"
        style={{
          width: '530px',
          height: '2px',
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #5E4EB5 100%)',
          transform: 'rotate(90deg)',
          opacity: 0.1
        }}
      />
      <Image
        src="/pixels-right.svg"
        alt="pixels"
        width={30}
        height={20}
        className="absolute right-0 top-0 translate-x-1/2 -translate-y-25"
      />

      <div className="max-w-4xl flex flex-col justify-center items-center gap-6">
        <QuoteIcon className="w-10 h-10" />
        <div className="relative overflow-hidden h-[300px]">
          <AnimatePresence initial={true} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              className="flex flex-col justify-center items-center gap-6"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="text-lg md:text-3xl font-bold text-center">
                {quotes[currentIndex].quote}
              </div>
              <Link href={quotes[currentIndex].website} target="_blank">
                <div className="flex items-center gap-4">
                  <Image
                    src={quotes[currentIndex].image}
                    alt={quotes[currentIndex].author}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <p className="text-md text-muted-foreground">
                    {quotes[currentIndex].author}
                  </p>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          {quotes.map((quote, index) => (
            <div
              key={`${quote.quote}-${index}`}
              className={`w-2 h-2 rounded-lg cursor-pointer ${
                currentIndex === index ? 'bg-[#313535]' : 'bg-[#A8B0B0]'
              }`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Quotes
