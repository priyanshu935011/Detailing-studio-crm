import { connectDatabase } from './config/database';
import { env } from './config/env';
import { createApp } from './app';

const bootstrap = async () => {
  await connectDatabase();
  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

void bootstrap();
