import { z } from 'zod'
import { Generated, ColumnType } from 'kysely'

const ROAST = ['light', 'medium', 'dark'] as const

export const BREW_METHOD = [
  { label: 'Cupping', value: 'cupping' },
  { label: 'Drip', value: 'drip' },
  { label: 'Espresso', value: 'espresso' },
  { label: 'Aeropress', value: 'aeropress' },
  { label: 'Chemex', value: 'chemex' },
  { label: 'French Press', value: 'french_press' },
  { label: 'v60', value: 'v60' },
  { label: 'Pour over', value: 'pour_over' },
  { label: 'Cold brew', value: 'cold_brew' },
  { label: 'With water', value: 'water' },
]

export const COMMON_ADJECTIVES = [
  { label: 'Sour', value: 'sour' },
  { label: 'Fruity', value: 'fruity' },
  { label: 'Citrusy', value: 'citrusy' },
  { label: 'Floral', value: 'floral' },
  { label: 'Sweet', value: 'sweet' },
  { label: 'Nutty', value: 'nutty' },
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Spicy', value: 'spicy' },
  { label: 'Toasted', value: 'toasted' },
  { label: 'Earthy', value: 'earthy' },
  { label: 'Chemical', value: 'chemical' },
  { label: 'Heavy', value: 'heavy' },
  { label: 'Bitter', value: 'bitter' },
  { label: 'Thin', value: 'thin' },
  { label: 'Smooth', value: 'smooth' },
  { label: 'Buttery', value: 'buttery' },
  { label: 'Delicate', value: 'delicate' },
  { label: 'Light', value: 'light' },
  { label: 'Smoky', value: 'smoky' },
  { label: 'Herbal', value: 'herbal' },
]

export const ACIDITY = [
  { label: 'Sweet', value: 'sweet' },
  { label: 'Crisp', value: 'crisp' },
  { label: 'Tart', value: 'tart' },
  { label: 'Dry', value: 'dry' },
  { label: 'Sharp', value: 'sharp' },
  { label: 'Vibrant', value: 'vibrant' },
  { label: 'Lively', value: 'lively' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Dull', value: 'dull' },
  { label: 'Citrus', value: 'citrus' },
  { label: 'Wine-like', value: 'wine_like' },
  { label: 'Clean', value: 'clean' },
  { label: 'Tangy', value: 'tangy' },
  { label: 'Sour', value: 'sour' },
  { label: 'Zesty', value: 'zesty' },
  { label: 'Refreshing', value: 'refreshing' },
]

export const BODY = [
  { label: 'Full', value: 'full' },
  { label: 'Medium', value: 'medium' },
  { label: 'Light', value: 'light' },
  { label: 'Heavy', value: 'heavy' },
  { label: 'Thick', value: 'thick' },
  { label: 'Thin', value: 'thin' },
  { label: 'Creamy', value: 'creamy' },
  { label: 'Syrupy', value: 'syrupy' },
  { label: 'Rich', value: 'rich' },
  { label: 'Watery', value: 'watery' },
  { label: 'Smooth', value: 'smooth' },
  { label: 'Silky', value: 'silky' },
  { label: 'Velvety', value: 'velvety' },
  { label: 'Buttery', value: 'buttery' },
  { label: 'Dense', value: 'dense' },
  { label: 'Robust', value: 'robust' },
  { label: 'Delicate', value: 'delicate' },
  { label: 'Balanced', value: 'balanced' },
  { label: 'Subtle', value: 'subtle' },
]

export const FINISH = [
  { label: 'Long', value: 'long' },
  { label: 'Short', value: 'short' },
]

export const sipSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  origin: z.optional(z.string()),
  price: z.optional(z.number()),
  roaster: z.optional(z.string()),
  roast_date: z.optional(z.date()),
  rating: z
    .number({
      required_error: 'Rating is required',
    })
    .min(0)
    .max(10),
  roast: z.optional(z.enum(ROAST)),
  brew_method: z.optional(z.array(z.string())),
  aroma: z.optional(z.array(z.string())),
  acidity: z.optional(z.array(z.string())),
  body: z.optional(z.array(z.string())),
  taste: z.optional(z.array(z.string())),
  finish: z.optional(z.array(z.string())),
  notes: z.optional(z.string()),
})

interface SipTable {
  id: `sip_${string}`
  user_id: string
  created_at: ColumnType<Date, string, never>
  updated_at: ColumnType<Date, string | undefined, never>
  name: string
  origin: string | null
  price: number | null
  roaster: string | null
  roast_date: Date | null
  rating: number
  roast: (typeof ROAST)[number] | null
  brew_method: string[] | null
  aroma: string[] | null
  acidity: string[] | null
  body: string[] | null
  taste: string[] | null
  finish: string[] | null
  notes: string | null
}

export interface Database {
  sip: SipTable
}
