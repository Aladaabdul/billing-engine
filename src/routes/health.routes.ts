import { Router } from 'express';
import { prisma } from '../config/prisma.js';

const router = Router();


router.get('/', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      database: 'connected',
    });
  } catch (error: any) {
    console.error("HEALTH ERROR:", error);

    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      message: error.message,
      code: error.code
    });
  }
});

export default router;