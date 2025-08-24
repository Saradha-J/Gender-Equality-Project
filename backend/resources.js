import { Router } from 'express';
import { z } from 'zod';
import { db } from '../lib/db.js';

const router = Router();

const ResourceInput = z.object({
  title: z.string().min(3),
  kind: z.enum(['article','video','policy','helpline']),
  url: z.string().url().optional(),
  content: z.string().optional(),
  tags: z.string().optional()
});

router.get('/', (req, res) => {
  const { kind } = req.query;
  let rows;
  if (kind) {
    rows = db.prepare('SELECT * FROM resources WHERE kind = ? ORDER BY created_at DESC').all(kind);
  } else {
    rows = db.prepare('SELECT * FROM resources ORDER BY created_at DESC').all();
  }
  res.json(rows);
});

router.post('/', (req, res) => {
  const parsed = ResourceInput.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { title, kind, url=null, content=null, tags=null } = parsed.data;
  const r = db.prepare('INSERT INTO resources (title, kind, url, content, tags) VALUES (?,?,?,?,?)').run(title, kind, url, content, tags);
  const row = db.prepare('SELECT * FROM resources WHERE id = ?').get(r.lastInsertRowid);
  res.status(201).json(row);
});

export default router;
