import { Router } from 'express';
import { matchUsersForMeal } from '../controllers/matchController.js';
import protect from '../middleware/authMiddleware.js';

const router = Router();

router.post('/match-for-meal', protect as any, matchUsersForMeal as any);

export default router;