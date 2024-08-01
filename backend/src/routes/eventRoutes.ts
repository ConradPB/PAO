import { Router } from 'express';
import { body } from 'express-validator';
import {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import protect from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .get(protect as any, getEvents as any)
  .post(
    protect as any,
    [
      body('title', 'Title is required').not().isEmpty(),
      body('description', 'Description is required').not().isEmpty(),
      body('date', 'Date is required').isISO8601(),
      body('frequency', 'Frequency must be one of: daily, weekly, monthly, yearly').optional().isIn(['daily', 'weekly', 'monthly', 'yearly']),
      body('recurring', 'Recurring must be a boolean value').optional().isBoolean(),
    ],
    createEvent as any
  );

router.route('/:id')
  .get(protect as any, getEventById as any)
  .put(
    protect as any,
    [
      body('title', 'Title is required').optional().not().isEmpty(),
      body('description', 'Description is required').optional().not().isEmpty(),
      body('date', 'Date is required').optional().isISO8601(),
      body('frequency', 'Frequency must be one of: daily, weekly, monthly, yearly').optional().isIn(['daily', 'weekly', 'monthly', 'yearly']),
      body('recurring', 'Recurring must be a boolean value').optional().isBoolean(),
    ],
    updateEvent as any
  )
  .delete(protect as any, deleteEvent as any);

export default router;
