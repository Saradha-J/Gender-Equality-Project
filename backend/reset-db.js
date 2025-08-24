import { db } from '../src/lib/db.js';
import fs from 'fs';
import path from 'path';
import url from 'url';

const sql = fs.readFileSync(new URL('../src/schema.sql', import.meta.url), 'utf8');
db.exec('PRAGMA foreign_keys = OFF;');
// drop all user tables (simple approach for demo)
db.exec("""
  DROP TABLE IF EXISTS report_messages;
  DROP TABLE IF EXISTS reports;
  DROP TABLE IF EXISTS resources;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS audit_logs;
  DROP TABLE IF EXISTS __migrations;
""");
db.exec(sql);
console.log('Database reset complete.');
