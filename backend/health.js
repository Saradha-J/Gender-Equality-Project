import { Router } from 'express';
import { db } from '../lib/db.js';
const router = Router();

router.get('/', (req, res) => {
  const r = db.prepare('SELECT 1 as ok').get();
  res.json({ ok: !!r, status: 'healthy' });
});

export default router;
