import * as Express from 'express';

import { Context } from '.';
import { Response } from './app/dtos/response';
import { TestController } from './app/controllers/test';

export function setupTestRouter(context: Context): Express.Router {
  const testRouter = Express.Router();
  const testController = new TestController(context);

  testRouter.get('/', (_, res) => {
    const { body, statusCode }: Response = testController.sayHello();

    res.status(statusCode).send({ ...body });
  });

  return testRouter;
}
