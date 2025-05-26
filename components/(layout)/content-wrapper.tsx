'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const ContentWrapper = ({
  children,
  id,
  className
}: {
  children: React.ReactNode
  id?: string
  className?: string
}) => {
  return (
    <motion.div
      className={cn('w-full max-w-6xl px-4 md:px-8', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id={id}
    >
      {children}
    </motion.div>
  )
}

export default ContentWrapper
