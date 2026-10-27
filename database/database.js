const startingCategories = [
  'Dairy',
  'Meat',
  'Vegetables',
  'Fruits',
  'Bakery',
];

export async function setupDatabase(db) {
  // Hena bnsh8al el foreign keys w bn3mel el tables law msh mawgoda.
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS Category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL COLLATE NOCASE UNIQUE
    );

    CREATE TABLE IF NOT EXISTS Item (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      categoryId INTEGER NOT NULL,
      quantity REAL NOT NULL,
      unit TEXT NOT NULL,
      expiryDate TEXT NOT NULL,
      barcode TEXT,
      status TEXT NOT NULL DEFAULT 'Active',
      createdAt TEXT NOT NULL,
      FOREIGN KEY (categoryId) REFERENCES Category(id)
    );

    CREATE TABLE IF NOT EXISTS Notification (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      itemId INTEGER NOT NULL UNIQUE,
      notifyDate TEXT NOT NULL,
      isSent INTEGER NOT NULL DEFAULT 0,
      isRead INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (itemId) REFERENCES Item(id) ON DELETE CASCADE
    );
  `);

  const notificationColumns = await db.getAllAsync('PRAGMA table_info(Notification)');
  const hasIsRead = notificationColumns.some((column) => column.name === 'isRead');

  // Hena bnzawed isRead lel database el adeema mn 8eer ma nmsa7 el data.
  if (!hasIsRead) {
    await db.execAsync(
      'ALTER TABLE Notification ADD COLUMN isRead INTEGER NOT NULL DEFAULT 0'
    );
  }

  // INSERT OR IGNORE bymna3 en el categories tetkrar kol mara el app yefta7.
  for (const categoryName of startingCategories) {
    await db.runAsync(
      'INSERT OR IGNORE INTO Category (name) VALUES (?)',
      categoryName
    );
  }
}

export async function createExpiryNotifications(db) {
  // Hena bn3mel alert wa7ed lel item elli expired aw hayexpire 5elal 7 ayam.
  await db.runAsync(`
    INSERT OR IGNORE INTO Notification (itemId, notifyDate, isSent, isRead)
    SELECT id, date('now', 'localtime'), 1, 0
    FROM Item
    WHERE status = 'Active'
      AND julianday(expiryDate) - julianday(date('now', 'localtime')) <= 7
  `);
}
