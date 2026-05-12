import { RequestHandler } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

type Schema = AnyZodObject | ZodEffects<AnyZodObject>;

export const validateRequest = (schema: Schema): RequestHandler => (req, _res, next) => {
  schema.parse({
    body: req.body,
    params: req.params,
    query: req.query
  });
  next();
};
