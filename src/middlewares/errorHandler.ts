import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      data: error.flatten(),
      message: 'Validation failed'
    });
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      data: null,
      message: error.message
    });
    return;
  }

  res.status(500).json({
    success: false,
    data: null,
    message: error instanceof Error ? error.message : 'Internal server error'
  });
};
