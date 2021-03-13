import { AuthenticationController } from './authentication';
import { Response } from '../dtos/response';

describe(AuthenticationController, () => {
  let ctrl: AuthenticationController;
  let mockLoginUser: any;

  beforeEach(() => {
    mockLoginUser = { run: jest.fn() };
    ctrl = new AuthenticationController({
      useCases: {
        loginUser: mockLoginUser,
      },
      dataservices: {},
      metricsMngr: undefined,
    });
  });

  describe('/login', () => {
    it('returns response with error when login fails', async () => {
      mockLoginUser.run.mockResolvedValueOnce({ status: false });

      const {
        body: { error },
      }: Response = await ctrl.login({ body: { foo: 'bar' } });

      expect(error).toBeDefined();
    });

    it('returns response with token when login succeeds', async () => {
      mockLoginUser.run.mockResolvedValueOnce({ status: true, token: '12bhb123.123' });

      const {
        body: { token },
      }: Response = await ctrl.login({ body: { foo: 'bar' } });

      expect(token).toBeDefined();
    });
  });
});
