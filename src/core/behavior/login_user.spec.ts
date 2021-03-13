import { LoginUser } from './login_user';

describe(LoginUser, () => {
  let login;
  let mockUserDataservice;
  let mockTokenService;

  beforeEach(() => {
    mockUserDataservice = { findByEmail: jest.fn() };
    mockTokenService = { pack: jest.fn() };
    login = new LoginUser(mockUserDataservice, mockTokenService);
  });

  it('returns false when user not found', async () => {
    mockUserDataservice.findByEmail.mockRejectedValueOnce('User not found');

    const { status } = await login.run('email@mail.com', 'password');

    expect(status).toBeDefined();
    expect(status).toBeFalsy();
  });

  it('returns false when password mismatch', async () => {
    const email = 'email@example.com';

    mockUserDataservice.findByEmail.mockResolvedValueOnce({
      id: '1',
      name: 'Example',
      email,
      passwordDigest: '123456',
    });

    const { status } = await login.run(email, 'abcdef');

    expect(status).toBeDefined();
    expect(status).toBeFalsy();
  });

  it('retuns true when email and password matches', async () => {
    const email = 'email@example.com';
    const passwordDigest = '123456';

    mockUserDataservice.findByEmail.mockResolvedValueOnce({
      id: '1',
      name: 'Example',
      email,
      passwordDigest,
    });

    mockTokenService.pack.mockResolvedValueOnce('asb.deuh12-12asd.a');

    const { status, token } = await login.run(email, passwordDigest);

    expect(status).toBeDefined();
    expect(status).toBeTruthy();
    expect(token).toBeDefined();
  });
});
