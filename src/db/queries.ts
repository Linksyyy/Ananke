import { eq } from "drizzle-orm";
import db from "./db";
import * as schema from "./schema";
import { customAlphabet } from "nanoid";

const genId = customAlphabet("1234567890", 16);

export async function registerUser(
  username: string,
  email: string,
  bcrypted_password: string,
) {
  const id = genId();
  return db
    .insert(schema.usersTable)
    .values({ id, username, email, bcrypted_password })
    .returning();
}

export async function getUserByUsername(username: string) {
  const [user] = await db
    .select()
    .from(schema.usersTable)
    .where(eq(schema.usersTable.username, username));
  return user;
}
