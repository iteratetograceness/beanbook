'use server'

import { nanoid } from 'nanoid'
import { SipSchema } from './schemas'
import { db } from './db'

export async function createSip({
  form,
  userId,
}: {
  form: SipSchema
  userId: string
}) {
  const id = nanoid()
  const hydratedForm = {
    ...form,
    id,
    created_at: new Date(),
    user_id: userId,
  }
  await db.insertInto('sip').values(hydratedForm).execute()
  return id
}
