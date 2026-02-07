import { eq } from "drizzle-orm";
import db from "./db";
import * as schema from "./schema";
import { customAlphabet } from "nanoid";

const genUserId = customAlphabet("1234567890", 16);
const genFriendshipId = customAlphabet("ABCDEFGabcdefg", 16);

export async function registerUser(
  username: string,
  email: string,
  bcrypted_password: string,
) {
  const id = genUserId();
  return await db
    .insert(schema.usersTable)
    .values({ id, username, email, bcrypted_password })
    .returning();
}

export async function getUserByUsername(username: string) {
  const [user] = await db
    .select()
    .from(schema.usersTable)
    .where(eq(schema.usersTable.username, username.trim()));

  return user;
}

export async function createFriendship(user1Id: string, user2Id: string) {
  if (user1Id === user2Id) return undefined;
  const id = genFriendshipId();
  return await db
    .insert(schema.friendshipTable)
    .values({ id, user_1: user1Id, user_2: user2Id, status: "pending" })
    .returning();
}
