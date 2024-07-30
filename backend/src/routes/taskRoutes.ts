import { Router } from 'express';
import { body } from 'express-validator';
import { 
  getTasks, 
  createTask, 
  getTaskById, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .get(protect as any, getTasks as any)
  .post(
    protect as any,
    [
      body('title', 'Title is required').not().isEmpty(),
      body('description', 'Description is required').not().isEmpty(),
    ],
    createTask as any
  );

router.route('/:id')
  .get(protect as any, getTaskById as any)
  .put(protect as any, updateTask as any)
  .delete(protect as any, deleteTask as any);

export default router;
