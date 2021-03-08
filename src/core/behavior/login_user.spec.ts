import { LoginUser } from './login_user';

describe(LoginUser, () => {
  let login;
  let mockService;

  beforeEach(() => {
    mockService = { findByEmail: jest.fn() };
    login = new LoginUser(mockService);
  });

  it('returns false when user not found', async () => {
    mockService.findByEmail.mockRejectedValueOnce('User not found');

    expect(await login.run('email@mail.com', 'password')).toBeFalsy();
  });

  it('returns false when password mismatch', async () => {
    const email = 'email@example.com';

    mockService.findByEmail.mockResolvedValueOnce({
      id: '1',
      name: 'Example',
      email,
      passwordDigest: '123456',
    });

    expect(await login.run(email, 'abcdef')).toBeFalsy();
  });

  it('retuns true when email and password matches', async () => {
    const email = 'email@example.com';
    const passwordDigest = '123456';

    mockService.findByEmail.mockResolvedValueOnce({
      id: '1',
      name: 'Example',
      email,
      passwordDigest,
    });

    expect(await login.run(email, passwordDigest)).toBeTruthy();
  });
});
