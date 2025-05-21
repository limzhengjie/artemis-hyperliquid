'use client'

import { motion } from 'framer-motion'

const ContentWrapper = ({
  children,
  id
}: {
  children: React.ReactNode
  id?: string
}) => {
  return (
    <motion.div
      className="w-full max-w-6xl px-4 md:px-8"
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
