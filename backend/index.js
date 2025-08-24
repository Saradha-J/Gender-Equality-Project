import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { db } from './lib/db.js';
import reportsRouter from './routes/reports.js';
import resourcesRouter from './routes/resources.js';
import healthRouter from './routes/health.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

app.use(helmet());
app.use(cors({ origin: ALLOW_ORIGIN, credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

// Ensure DB initialized
db.pragma('journal_mode = WAL');

app.use('/api/health', healthRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/resources', resourcesRouter);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
