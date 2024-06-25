DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT, 
    userName TEXT NOT NULL,
    firstRosaryDate TEXT,
    lastRosaryDate TEXT,
    totalRosaries INTEGER,
    currentStreak INTEGER,
    pausedJoyfulMysteryIndex INTEGER,
    pausedSorrowfulMysteryIndex INTEGER,
    pausedGloriousMysteryIndex INTEGER,
    pausedLuminousMysteryIndex INTEGER
);
CREATE INDEX IF NOT EXISTS idx_Users_userName ON Users(userName);
