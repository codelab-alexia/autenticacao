export class Response {
  static STATUS = {
    OK: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
  };

  constructor(public readonly body: any, public readonly statusCode: number) {}
}
