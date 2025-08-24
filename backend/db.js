import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const dbFile = process.env.DATABASE_FILE || './data/app.db';
const dir = path.dirname(dbFile);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

export const db = new Database(dbFile);

// Run migrations if not yet applied
const applied = db.prepare('CREATE TABLE IF NOT EXISTS __migrations (id TEXT PRIMARY KEY, applied_at TEXT)').run();
const migrations = [
  { id: '001_init', sql: fs.readFileSync(new URL('../schema.sql', import.meta.url), 'utf8') }
];

for (const m of migrations) {
  const exists = db.prepare('SELECT 1 FROM __migrations WHERE id = ?').get(m.id);
  if (!exists) {
    db.exec(m.sql);
    db.prepare('INSERT INTO __migrations (id, applied_at) VALUES (?, datetime('now'))').run(m.id);
    console.log('Applied migration', m.id);
  }
}
