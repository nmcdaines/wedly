import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

import * as user from './schema/user'

export const schema = {
  ...user,
}

const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle(client, { schema, logger: false })
