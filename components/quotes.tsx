'use client'

import { useState } from 'react'

import { QuoteIcon } from 'lucide-react'

interface Props {
  quotes: { quote: string; author: string }[]
}

const Quotes = ({ quotes }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <QuoteIcon className="w-10 h-10" strokeWidth={1.5} />
      <div className="max-w-4xl flex flex-col justify-center items-center gap-12">
        {quotes
          .filter((_, index) => index === currentIndex)
          .map(quote => (
            <div
              key={quote.quote + quote.author}
              className="flex flex-col justify-center items-center gap-12"
            >
              <div className="text-4xl font-bold text-center">
                {quote.quote}
              </div>
              <div className="text-sm">{quote.author}</div>
            </div>
          ))}
        <div className="flex gap-1">
          {quotes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-lg ${
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
