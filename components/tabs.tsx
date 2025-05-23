'use client'

import { motion } from 'framer-motion'

export type Tab = {
  id: string
  label: string
}

interface Props {
  tabs: Tab[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function AnimatedTabs({ tabs, activeTab, setActiveTab }: Props) {
  return (
    <div className="flex space-x-1">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${
            activeTab === tab.id ? '' : 'hover:text-primary/70'
          } relative rounded-md cursor-pointer px-1.5 py-1.5 text-sm font-medium text-primary outline-primary transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-primary/10 rounded-md"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
