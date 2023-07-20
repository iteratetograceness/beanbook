import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateLabelAndValue = (input: string) => {
  const word = input.trim()
  const label = word.charAt(0).toUpperCase() + word.slice(1)
  const value = word
    .split(' ')
    .map((chunk) => chunk.toLowerCase())
    .join('_')

  return { label, value }
}