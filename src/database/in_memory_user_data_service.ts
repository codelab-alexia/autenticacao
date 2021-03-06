import { User, UserDataservice } from '../core';

export class InMemoryUserDataservice implements UserDataservice {
  private users: User[] = [];

  storeOne(user: User): Promise<any> {
    this.users.push(user);
  }
}
