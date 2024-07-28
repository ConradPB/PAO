import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { AuthenticatedRequest } from '../types/custom.js';

const router = express.Router();

router.route('/')
  .post(protect, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => createEvent(req, res, next))
  .get(protect, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => getEvents(req, res, next));

router.route('/:id')
  .get(protect, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => getEventById(req, res, next))
  .put(protect, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => updateEvent(req, res, next))
  .delete(protect, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => deleteEvent(req, res, next));

export default router;
