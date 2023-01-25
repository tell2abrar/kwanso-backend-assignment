import { User } from './db/entities';

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
