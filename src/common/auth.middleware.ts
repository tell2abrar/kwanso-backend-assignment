import AuthService from '../modules/auth/service';
import { extractAuthToken } from '../utils';
import { NextFunction, Request, Response } from 'express';

class AuthMiddleware {
  async authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers['authorization'] || '';
      const accessToken = extractAuthToken(authorization);
      if (!accessToken) throw new Error('Access token not found');

      let user = null;
      user = await AuthService.verifyAccessToken(accessToken);

      if (!user) throw new Error('User not authorized');
      req.user = user;

      next();
    } catch (err) {
      return res.status(401).send({
        message: 'User not authorized',
      });
    }
  }
}

export default new AuthMiddleware();
