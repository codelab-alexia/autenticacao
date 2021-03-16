import { Request } from '../dtos/request';
import { Response } from '../dtos/response';
import { LoginUser } from '../../core';

import { Context } from '../../';

export class AuthenticationController {
  private _login: LoginUser;

  constructor({ useCases: { loginUser } }: Context) {
    this._login = loginUser;
  }

  async login({ body }: Request): Promise<Response> {
    const { email, password } = body;

    const { status, token } = await this._login.run(email, password);

    return status
      ? new Response({ token }, Response.STATUS.OK)
      : new Response({ error: `Credentials don't match` }, Response.STATUS.NOT_FOUND);
  }
}
