import * as Express from 'express';

import { Context } from '.';
import { Request } from './app/dtos/request';
import { Response } from './app/dtos/response';
import { AuthenticationController } from './app/controllers/authentication';

export function setupAuthenticationRouter(context: Context): Express.Router {
  const authRouter = Express.Router();
  const authController = new AuthenticationController(context);

  authRouter.post('/login', async (req, res) => {
    const { body, statusCode }: Response = await authController.login(new Request(req.body));

    res.status(statusCode).send({ ...body });
  });

  return authRouter;
}
