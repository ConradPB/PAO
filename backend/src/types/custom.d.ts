import { Request } from 'express';
import { IUser } from '../models/User.js';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}
