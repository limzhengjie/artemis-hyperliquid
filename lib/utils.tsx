import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { round } from 'lodash'

import { VALUE_FORMAT, type ValueFormat } from '@/constants/chart'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatBigNumber = (
  number: number,
  precision?: number,
  decimals?: number
) => {
  const roundPrecision = precision || 2
  const decimalPoints = decimals === undefined ? 1 : decimals

  // Twelve Zeroes for Trillions
  return Math.abs(Number(number)) >= 1.0e12
    ? round(Math.abs(Number(number)) / 1.0e12, roundPrecision).toFixed(
        decimalPoints
      ) + 'T'
    : // Nine Zeroes for Millions
    Math.abs(Number(number)) >= 1.0e9
    ? round(Math.abs(Number(number)) / 1.0e9, roundPrecision).toFixed(
        decimalPoints
      ) + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(number)) >= 1.0e6
    ? round(Math.abs(Number(number)) / 1.0e6, roundPrecision).toFixed(
        decimalPoints
      ) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(number)) >= 1.0e3
    ? round(Math.abs(Number(number)) / 1.0e3, roundPrecision).toFixed(
        decimalPoints
      ) + 'K'
    : Math.abs(Number(number)) > 1
    ? Math.abs(Number(number)).toFixed(decimalPoints)
    : Math.abs((Number(number) * 100) / 100).toFixed(1)
}

export function formatValue(value: number, format: ValueFormat) {
  if (format === VALUE_FORMAT.number) {
    return formatBigNumber(value)
  }
  // if (format === VALUE_FORMAT.currency) {
  //   return Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD'
  //   }).format(value)
  // }
  if (format === VALUE_FORMAT.currency) {
    return `$${formatBigNumber(value)}`
  }
  if (format === VALUE_FORMAT.percentage) {
    return `${value.toFixed(1)}%`
  }
  return value.toString()
}
