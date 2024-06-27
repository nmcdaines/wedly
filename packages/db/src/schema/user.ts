import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const user = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('firstName'),
  lastName: text('lastName'),
  email: text('email').notNull(),
})
