import { User, UserDataservice } from '../core';

export class InMemoryUserDataservice implements UserDataservice {
  private users: User[] = [];

  storeOne(user: User): Promise<any> {
    return new Promise((res) => {
      res(this.users.push(user));
    })
  }

  findByEmail(givenEmail: string): Promise<User> {
    return new Promise((res, rej) => {
      const user = this.users.find(({ email }: User): boolean => email === givenEmail)

      if (user) res(user);
      else rej("User not found");
    })
  }
}
