import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './common/config/config';

import { errorHandler } from './middleware/error.middleware';
import { routeNotFoundHandler } from './middleware/routeNotFound.middleware';

import { reportRouter } from './routes/reports/report.router';

// Init express

if (!process.env.PORT) {
  process.exit(1);
}

const app = express();

// App Configuration

app.use(helmet());
app.use(cors());
app.use(express.json());

// Feature routers

app.use('/api/reports', reportRouter);

// Error middlewares

app.use(errorHandler);
app.use(routeNotFoundHandler);

// Export testing version of app

export const testApp = app;

// Start server if not in test env

const { PORT } = config;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
