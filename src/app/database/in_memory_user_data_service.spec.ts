import { InMemoryUserDataservice } from './in_memory_user_data_service';

describe(InMemoryUserDataservice, () => {
  let ds: InMemoryUserDataservice;

  beforeEach(() => {
    ds = new InMemoryUserDataservice();
  });

  describe('storeOne', () => {
    it('stores properly a user', async () => {
      const newUser = { id: '1', name: 'foo', email: 'foo@mail.com', passwordDigest: '123456' };
      await ds.storeOne(newUser);

      expect(ds.users).toEqual([newUser]);
    });
  });

  describe('findByEmail', () => {
    it('throws when user not found', async () => {
      ds.users.find = jest.fn().mockReturnValueOnce(undefined);

      expect.assertions(1);

      try {
        await ds.findByEmail('foo@mail.com');
      } catch (e) {
        expect(e).toEqual('User not found');
      }
    });

    it('returns the user, when it is found', async () => {
      const user = { id: '1', name: 'foo', email: 'foo@mail.com', passwordDigest: '123456' };

      ds.users = [user];

      const userFound = await ds.findByEmail(user.email);

      expect(userFound).toEqual(user);
    });
  });
});
