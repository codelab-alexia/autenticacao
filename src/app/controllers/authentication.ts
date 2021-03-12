import { Request } from '../dtos/request';
import { Response } from '../dtos/response';
import { LoginUser } from '../../core';

export class AuthenticationController {
  private _login: LoginUser;

  constructor({ userDataservice }: any) {
    this._login = new LoginUser(userDataservice);
  }

  async login({ body }: Request): Promise<Response> {
    const { email, password } = body;

    const successfullyLoggedIn = await this._login.run(email, `--${password}--`);

    return successfullyLoggedIn
      ? new Response({ token: this.generateToken(email) }, Response.STATUS.OK)
      : new Response({ error: `Credentials don't match` }, Response.STATUS.NOT_FOUND);
  }

  private generateToken(payload: string): Promise<string> {
    return new Promise((res) => res(`token-${payload}`));
  }
}
