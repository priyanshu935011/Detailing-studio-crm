import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface JwtPayload {
  userId: string;
  role: 'admin' | 'staff';
}

export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, 10);

export const comparePassword = async (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);

export const signToken = (payload: JwtPayload): string =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
