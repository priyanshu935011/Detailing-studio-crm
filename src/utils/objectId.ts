import { Types } from 'mongoose';
import { ApiError } from './ApiError';

export const ensureObjectId = (value: string, fieldName = 'id'): void => {
  if (!Types.ObjectId.isValid(value)) {
    throw new ApiError(400, `Invalid ${fieldName}`);
  }
};
