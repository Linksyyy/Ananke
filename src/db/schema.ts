import { char, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["pending", "accepted"]);

export const usersTable = pgTable("users", {
  id: char({ length: 16 }).primaryKey(),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull(),
  bcrypted_password: varchar({ length: 255 }).notNull(),
});

export const friendshipTable = pgTable("friendship", {
  id: char({ length: 16 }).primaryKey(),
  user_1: char({ length: 16 })
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  user_2: char({ length: 16 })
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  created_at: timestamp().defaultNow().notNull(),
  status: statusEnum().notNull(),
});
