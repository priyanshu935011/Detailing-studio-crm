import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { UserModel } from '../models/User';
import { AuthService } from '../services/authService';
import { createResponse } from '../utils/apiResponse';

const authService = new AuthService();

export const register = async (req: Request, res: Response): Promise<void> => {
  const result = await authService.register(req.body);
  res.status(201).json(createResponse(result, 'User registered successfully'));
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const result = await authService.login(req.body.email, req.body.password);
  res.json(createResponse(result, 'Login successful'));
};

export const profile = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await UserModel.findById(req.user?.id).select('-password');
  res.json(createResponse(user, 'Profile fetched successfully'));
};
