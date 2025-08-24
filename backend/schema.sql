-- Database Schema for Gender Equality Platform (SQLite)
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT UNIQUE, -- optional public reference (hash/uuid)
  role TEXT NOT NULL DEFAULT 'anonymous', -- 'anonymous','student','counselor','admin'
  email TEXT, -- optional if not anonymous
  display_name TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref_code TEXT UNIQUE,          -- shareable code for tracking
  is_anonymous INTEGER NOT NULL DEFAULT 1,
  category TEXT NOT NULL,        -- e.g., harassment, discrimination, other
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted', -- submitted, in_review, resolved, archived
  created_by INTEGER,            -- nullable if anonymous
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS report_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  report_id INTEGER NOT NULL,
  sender_role TEXT NOT NULL,     -- 'anonymous','student','counselor','admin'
  message TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  kind TEXT NOT NULL,            -- 'article','video','policy','helpline'
  url TEXT,
  content TEXT,                  -- optional inline content/markdown
  tags TEXT,                     -- comma-separated
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL,
  actor TEXT,                    -- role or user id
  payload TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Basic indices
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_resources_kind ON resources(kind);
