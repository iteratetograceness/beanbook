import { createKysely } from '@vercel/postgres-kysely'
import { Database } from './schemas'

export const db = createKysely<Database>()