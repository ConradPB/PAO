import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserAvailability,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import { AuthenticatedRequest } from '../types/custom.js';

const router = Router();

router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    body('age', 'Age must be a number').optional().isNumeric(),  
    body('location', 'Location must be a string').optional().isString(),
  ],
  registerUser
);

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  loginUser
);

const handleAuthRequest = (handler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response | void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return handler(req as AuthenticatedRequest, res, next);
  };
};

router.get('/profile', protect, handleAuthRequest(getUserProfile));
router.put('/profile', protect, handleAuthRequest(updateUserProfile));
router.put('/update-availability', protect as any, updateUserAvailability as any);


export default router;
