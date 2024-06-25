import UserData from "../types/UserData";

export async function getUserExists(db: D1Database, userName: string): Promise<boolean> {
  const { results } = await db.prepare(
    "SELECT 1 FROM Users WHERE userName = ? LIMIT 1"
  )
    .bind(userName)
    .all();
  return results.length > 0;
}

export async function createUser(db: D1Database, userName: string): Promise<boolean> {
  const { success } = await db.prepare(
    "INSERT INTO Users (userName) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM Users WHERE userName = ? LIMIT 1)"
  )
    .bind(userName, userName)
    .run();
  return success;
}

export async function getUserData(db: D1Database, userName: string): Promise<UserData | undefined> {
  const { results } = await db.prepare(
    "SELECT * FROM Users WHERE userName = ? LIMIT 1"
  )
    .bind(userName)
    .all();
  if (results.length == 0) {
    return undefined;
  }
  return {
    ...results[0],
  }
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

export async function updateUserData(db: D1Database, userName: string, updates: Partial<UserData>): Promise<boolean> {
  if (!(await getUserExists(db, userName))) {
    return false;
  }
  let setString = "";
  let valuesCount = 0;
  let bindValues: any[] = [];
  if (updates.firstRosaryDate) {
    setString += "firstRosaryDate=? ";
    bindValues.push(updates.firstRosaryDate);
    ++valuesCount;
  }
  if (updates.lastRosaryDate) {
    setString += "lastRosaryDate=? ";
    bindValues.push(updates.lastRosaryDate);
    ++valuesCount;
  }
  if (updates.totalRosaries) {
    setString += "totalRosaries=? ";
    bindValues.push(updates.totalRosaries);
    ++valuesCount;
  }
  if (updates.currentStreak) {
    setString += "currentStreak=? ";
    bindValues.push(updates.currentStreak);
    ++valuesCount;
  }
  if (updates.pausedJoyfulMysteryIndex) {
    setString += "pausedJoyfulMysteryIndex=? ";
    bindValues.push(updates.pausedJoyfulMysteryIndex);
    ++valuesCount;
  }
  if (updates.pausedSorrowfulMysteryIndex) {
    setString += "pausedSorrowfulMysteryIndex=? ";
    bindValues.push(updates.pausedSorrowfulMysteryIndex);
    ++valuesCount;
  }
  if (updates.pausedGloriousMysteryIndex) {
    setString += "pausedGloriousMysteryIndex=? ";
    bindValues.push(updates.pausedGloriousMysteryIndex);
    ++valuesCount;
  }
  if (updates.pausedLuminousMysteryIndex) {
    setString += "pausedLuminousMysteryIndex=? ";
    bindValues.push(updates.pausedLuminousMysteryIndex);
    ++valuesCount;
  }
  if (setString.length == 0) {
    return true;
  }
  const { success } = await db.prepare(
    `UPDATE Users SET ${setString} VALUES(${repeat("?", valuesCount, ", ")})`
  )
    .bind(...bindValues)
    .run();
  return success;
}
