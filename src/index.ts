import * as Express from 'express';

import { InMemoryUserDataservice } from './app/database/in_memory_user_data_service';

import { setupTestRouter } from './test_router';
import { setupMetricsRouter } from './metrics_router';
import { setupAuthenticationRouter } from './authentication_router';

export interface Context {
  useCases: { [key: string]: any };
  dataservices: { [key: string]: any };
  metricsMngr: any;
}

const metricsMngr = new MetricsManager();

const userDataservice = new InMemoryUserDataservice();
const loginUser = new LoginUser(userDataservice);

const context = {
  useCases: { loginUser },
  dataservices: { userDataservice },
  metricsMngr,
};

const app = Express();

app.use(Express.json());

app.use((req, _, next) => {
  if (req.baseUrl !== '/metrics') metricsMngr.increaseRequestCounter();

  next();
});

app.use('/test', setupTestRouter(context));
app.use('/metrics', setupMetricsRouter(context));
app.use('/authentication', setupAuthenticationRouter(context));

app.listen(Number(process.env.PORT || '3000'), () => console.log('- WebApp running!'));
