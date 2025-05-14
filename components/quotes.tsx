'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

import { QuoteIcon } from 'lucide-react'

interface Props {
  quotes: { quote: string; author: string }[]
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
    <div className="flex flex-col justify-center items-center gap-8">
      <QuoteIcon className="w-10 h-10" strokeWidth={1.5} />
      <div className="max-w-4xl flex flex-col justify-center items-center gap-12">
        <div
          className="relative overflow-hidden"
          style={{ height: '200px', width: '100%' }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              className="flex flex-col justify-center items-center gap-12"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="text-4xl font-bold text-center">
                {quotes[currentIndex].quote}
              </div>
              <div className="text-sm text-muted-foreground">
                {quotes[currentIndex].author}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-1">
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
