import { Request } from 'express';
import { IUser } from '../models/User.ts';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}
