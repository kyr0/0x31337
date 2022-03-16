import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'

declare global {
  var db: Database
}

(async () => {

    // open a file storage backed db
    const db: Database = await open({
      filename: './bouncycastle.db',
      driver: sqlite3.Database
    })

    // migrate on start
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT, 
            password TEXT
        );
    `);

    globalThis.db = db

})()