import * as Express from 'express';
import * as proxy from 'express-http-proxy';
import { AuthenticationController } from './app/controllers/authentication';
import { Request } from './app/dtos/request';
import { Response } from './app/dtos/response';
import { InMemoryUserDataservice } from './app/database/in_memory_user_data_service';

import { MetricsManager } from './metrics';

const app = Express();

const metricsMngr = new MetricsManager();

app.use((req, _, next) => {
  if (req.baseUrl !== '/metrics') metricsMngr.increaseRequestCounter();

  next();
});

app.use(Express.json());

app.get('/metrics', async (_, res) => {
  res.type(metricsMngr.contentType);
  res.send(await metricsMngr.getMetrics());
});

const userDataservice = new InMemoryUserDataservice();
const authController = new AuthenticationController({ userDataservice });

app.post('/login', async (req, res) => {
  const { body, statusCode }: Response = await authController.login(new Request(req.body));

  res.status(statusCode).send({ ...body });
});

app.listen(Number(process.env.PORT || '3000'), () => console.log('- WebApp running!'));
