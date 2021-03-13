import * as Express from 'express';

import { InMemoryUserDataservice } from './app/database/in_memory_user_data_service';
import { JWTService } from './app/token';

import { LoginUser } from './core/behavior/login_user';

import { MetricsManager } from './app/metrics';

import { setupTestRouter } from './test_router';
import { setupMetricsRouter } from './metrics_router';
import { setupAuthenticationRouter } from './authentication_router';

const metricsMngr = new MetricsManager();

const userDataservice = new InMemoryUserDataservice();
const tokenService = new JWTService('foo');
const loginUser = new LoginUser(userDataservice, tokenService);

const context = {
  useCases: { loginUser },
  dataservices: { userDataservice },
  metricsMngr,
};

export function bootstrapHTTPServer(): any {
  const app = Express();

  app.use(Express.json());

  app.use((req, _, next) => {
    if (req.baseUrl !== '/metrics') metricsMngr.increaseRequestCounter();

    next();
  });

  app.use('/test', setupTestRouter(context));
  app.use('/metrics', setupMetricsRouter(context));
  app.use('/authentication', setupAuthenticationRouter(context));
  return app;
}
