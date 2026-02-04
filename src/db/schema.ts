import { char, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: char({ length: 16 }).primaryKey(),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull(),
  bcrypted_password: varchar({ length: 255 }).notNull(),
});
