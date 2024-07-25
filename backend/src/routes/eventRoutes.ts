import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';

const router = express.Router();

router.route('/').post(protect, createEvent).get(protect, getEvents);
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent);

export default router;
