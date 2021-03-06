import { User } from '../model/user';

export interface UserDataservice {
  storeOne: (user: User) => Promise<any>;
  findByEmail: (email: string) => Promise<User>;
}
