import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UserModel } from '../models/User';
import { ApiError } from '../utils/ApiError';
import { JwtPayload } from '../utils/auth';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'admin' | 'staff';
    email: string;
  };
}

export const authenticate = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    next(new ApiError(401, 'Authentication token missing'));
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    const user = await UserModel.findById(decoded.userId).select('_id role email');

    if (!user) {
      next(new ApiError(401, 'Invalid authentication token'));
      return;
    }

    req.user = {
      id: user.id,
      role: user.role,
      email: user.email
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new ApiError(401, 'Authentication token expired. Please log in again.'));
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(401, 'Invalid authentication token'));
      return;
    }

    next(error);
  }
};

export const authorize =
  (...roles: Array<'admin' | 'staff'>) =>
  (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new ApiError(403, 'You do not have permission to access this resource'));
      return;
    }

    next();
  };
