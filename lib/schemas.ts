import { z } from 'zod'
import { Generated, ColumnType } from 'kysely'

const ROAST = ['light', 'medium', 'dark'] as const

export const BREW_METHOD = [
  'cupping',
  'drip',
  'espresso',
  'aeropress',
  'chemex',
  'french press',
  'v60',
  'pour over',
  'cold brew',
  'with water',
] as const

export const TASTE = [
  'sour',
  'fruity',
  'floral',
  'sweet',
  'nutty',
  'chocolate',
  'spices',
  'toasted',
  'earthy',
  'chemical',
  'heavy',
  'bitter',
  'thin',
  'smooth',
  'buttery',
  'delicate',
  'light',
] as const

export const sipSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  origin: z.optional(z.string()),
  price: z.optional(z.number()),
  roaster: z.optional(z.string()),
  roast_date: z.optional(z.string()),
  rating: z
    .number({
      required_error: 'Rating is required',
    })
    .min(0)
    .max(10),
  roast: z.optional(z.enum(ROAST)),
  brew_method: z.array(z.string()),
  aroma: z.array(z.string()),
  acidity: z.array(z.string()),
  body: z.array(z.string()),
  taste: z.array(z.string()),
  finish: z.array(z.string()),
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
