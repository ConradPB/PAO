import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import { AuthenticatedRequest } from '../types/custom.js';

const router = Router();

router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be 6 or more characters').isLength({
      min: 6,
    }),
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

export default router;
