import * as Express from 'express';

import { Context } from '.';

export function setupMetricsRouter({ metricsMngr }: Context): Express.Router {
  const metricsRouter = Express.Router();

  metricsRouter.get('/', async (_, res) => {
    res.type(metricsMngr.contentType);
    res.send(await metricsMngr.getMetrics());
  });

  return metricsRouter;
}
