import { Router } from 'express';
import { z } from 'zod';
import { db } from '../lib/db.js';
import crypto from 'crypto';

const router = Router();

const ReportInput = z.object({
  is_anonymous: z.boolean().optional().default(true),
  category: z.string().min(3),
  description: z.string().min(10)
});

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM reports ORDER BY created_at DESC').all();
  res.json(rows);
});

router.post('/', (req, res) => {
  const parsed = ReportInput.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { is_anonymous, category, description } = parsed.data;
  const ref_code = crypto.randomBytes(4).toString('hex');
  const stmt = db.prepare(`
    INSERT INTO reports (ref_code, is_anonymous, category, description)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(ref_code, is_anonymous ? 1 : 0, category, description);
  const created = db.prepare('SELECT * FROM reports WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM reports WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

router.patch('/:id', (req, res) => {
  const { status } = req.body;
  const allowed = ['submitted','in_review','resolved','archived'];
  if (status && !allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const stmt = db.prepare('UPDATE reports SET status = COALESCE(?, status), updated_at = datetime('now') WHERE id = ?');
  const r = stmt.run(status ?? null, req.params.id);
  if (r.changes === 0) return res.status(404).json({ error: 'Not found' });
  const row = db.prepare('SELECT * FROM reports WHERE id = ?').get(req.params.id);
  res.json(row);
});

// Simple thread messages (counselor-user conversation)
router.get('/:id/messages', (req, res) => {
  const rows = db.prepare('SELECT * FROM report_messages WHERE report_id = ? ORDER BY created_at ASC').all(req.params.id);
  res.json(rows);
});

router.post('/:id/messages', (req, res) => {
  const { sender_role = 'anonymous', message } = req.body || {};
  if (!message || String(message).trim().length === 0) return res.status(400).json({ error: 'Message required' });
  const exists = db.prepare('SELECT 1 FROM reports WHERE id = ?').get(req.params.id);
  if (!exists) return res.status(404).json({ error: 'Report not found' });
  const r = db.prepare('INSERT INTO report_messages (report_id, sender_role, message) VALUES (?, ?, ?)').run(req.params.id, sender_role, message);
  const row = db.prepare('SELECT * FROM report_messages WHERE id = ?').get(r.lastInsertRowid);
  res.status(201).json(row);
});

export default router;
