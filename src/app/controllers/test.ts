import { Response } from '../dtos/response';

export class TestController {
  sayHello(): Response {
    return new Response({ message: 'Hello' }, Response.STATUS.OK);
  }
}
