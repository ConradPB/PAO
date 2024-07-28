// authMiddleware.ts

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User.js';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
      
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }

      req.user = user as IUser;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
