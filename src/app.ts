import cors from 'cors';
import express from 'express';
import path from 'path';
import { env } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFound';
import routes from './routes';

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static(path.join(process.cwd(), '..', 'uploads')));
  app.use('/api', routes);

  app.get('/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok' }, message: 'Server is healthy' });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
