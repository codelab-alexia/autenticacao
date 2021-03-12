import { Context } from '../../';
import { Response } from '../dtos/response';

export class TestController {
  // eslint-disable-next-line
  constructor(_: Context) {}

  sayHello(): Response {
    return new Response({ message: 'Hello' }, Response.STATUS.OK);
  }
}
