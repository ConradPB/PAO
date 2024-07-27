import { IUser } from '../models/User.ts';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser | null;
  }
}
