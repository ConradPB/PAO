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
    ],
    createEvent as any
  );

router.route('/:id')
  .get(protect as any, getEventById as any)
  .put(protect as any, updateEvent as any)
  .delete(protect as any, deleteEvent as any);

export default router;
