"use server";

import type UserData from "../types/UserData";
import { hashPassword, verifyPassword } from "../utils/hashing";

/**
 * @param db The D1 database
 * @param userName The username
 * @returns True if there is a user with that name, false otherwise
 */
export async function getUserExists(
  db: D1Database,
  userName: string,
): Promise<boolean> {
  const { results } = await db
    .prepare("SELECT 1 FROM Users WHERE userName = ? LIMIT 1")
    .bind(userName)
    .all();
  return results.length > 0;
}

/**
 * @param db The D1 database
 * @param userName The username
 * @param passwordAttempt The plaintext password - it will be salted and hashed in this method
 * @return True if the operation succeeded, false otherwise.
 */
export async function login(
  db: D1Database,
  userName: string,
  passwordAttempt: string,
): Promise<boolean> {
  if (!passwordAttempt?.length) {
    return false;
  }
  const { results } = await db
    .prepare("SELECT passwordHash FROM Users WHERE username = ? LIMIT 1")
    .bind(userName)
    .all();
  const storedHash: string = results[0].passwordHash as string;
  return await verifyPassword(storedHash, passwordAttempt);
}

/**
 * @param db The D1 database
 * @param userName The username
 * @param password The plaintext password - it will be salted and hashed in this method
 * @returns True if the operation succeeded, false otherwise
 */
export async function createUser(
  db: D1Database,
  userName: string,
  password: string,
): Promise<boolean> {
  if (!password?.length) {
    return false;
  }
  const passwordHash = await hashPassword(password);
  const { success } = await db
    .prepare(
      "INSERT INTO Users (userName, passwordHash) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM Users WHERE userName = ? LIMIT 1)",
    )
    .bind(userName, passwordHash, userName)
    .run();
  return success;
}

/**
 * @param db The D1 database
 * @param userName The username
 * @returns The existing user data for the user, or undefined if there is none
 */
export async function getUserData(
  db: D1Database,
  userName: string,
): Promise<UserData | undefined> {
  const { results } = await db
    .prepare("SELECT * FROM Users WHERE userName = ? LIMIT 1")
    .bind(userName)
    .all();
  if (results.length == 0) {
    return undefined;
  }
  return {
    ...results[0],
  };
}

function repeat(s: string, n: number, delimiter: string = "") {
  if (s.length == 0 || n == 0) {
    return "";
  }
  let result = s;
  for (let i = 1; i < n; ++i) {
    result += delimiter + s;
  }
  return result;
}

/**
 *
 * @param db The D1 database
 * @param userName The username
 * @param updates The user data fields that need to be updated with their new values
 * @returns True if the operation succeeded, false otherwise
 */
export async function updateUserData(
  db: D1Database,
  userName: string,
  updates: Partial<UserData>,
): Promise<boolean> {
  if (!(await getUserExists(db, userName))) {
    return false;
  }
  let setStrings = [];
  let valuesCount = 0;
  let bindValues: any[] = [];
  if (updates.firstRosaryDate) {
    setStrings.push("firstRosaryDate=? ");
    bindValues.push(updates.firstRosaryDate);
    ++valuesCount;
  }
  if (updates.lastRosaryDate) {
    setStrings.push("lastRosaryDate=? ");
    bindValues.push(updates.lastRosaryDate);
    ++valuesCount;
  }
  if (updates.totalRosaries) {
    setStrings.push("totalRosaries=? ");
    bindValues.push(updates.totalRosaries);
    ++valuesCount;
  }
  if (updates.currentStreak) {
    setStrings.push("currentStreak=? ");
    bindValues.push(updates.currentStreak);
    ++valuesCount;
  }
  if (updates.pausedJoyfulMysteryIndex) {
    setStrings.push("pausedJoyfulMysteryIndex=? ");
    bindValues.push(updates.pausedJoyfulMysteryIndex);
    ++valuesCount;
  }
  if (updates.pausedSorrowfulMysteryIndex) {
    setStrings.push("pausedSorrowfulMysteryIndex=? ");
    bindValues.push(updates.pausedSorrowfulMysteryIndex);
    ++valuesCount;
  }
  if (updates.pausedGloriousMysteryIndex) {
    setStrings.push("pausedGloriousMysteryIndex=? ");
    bindValues.push(updates.pausedGloriousMysteryIndex);
    ++valuesCount;
  }
  if (updates.pausedLuminousMysteryIndex) {
    setStrings.push("pausedLuminousMysteryIndex=? ");
    bindValues.push(updates.pausedLuminousMysteryIndex);
    ++valuesCount;
  }
  if (setStrings.length == 0) {
    return true;
  }
  const updateString = `UPDATE Users SET ${setStrings.join(", ")} WHERE userName=?;`;
  const { success } = await db
    .prepare(updateString)
    .bind(...bindValues, userName)
    .run();
  return success;
}
