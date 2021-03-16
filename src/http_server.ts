import * as Express from 'express';

import { Context } from '.';

import { setupTestRouter } from './test_router';
import { setupMetricsRouter } from './metrics_router';
import { setupAuthenticationRouter } from './authentication_router';

export function bootstrapHTTPServer(context: Context): any {
  const app = Express();

  app.use(Express.json());

  app.use((req, _, next) => {
    if (req.baseUrl !== '/metrics') context.metricsMngr.increaseRequestCounter();

    next();
  });

  app.use('/test', setupTestRouter(context));
  app.use('/metrics', setupMetricsRouter(context));
  app.use('/authentication', setupAuthenticationRouter(context));
  return app;
}
