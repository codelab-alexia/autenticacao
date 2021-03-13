import { User } from '../model/user';

export type Token = string;

export interface TokenService {
  pack: (user: User) => Promise<Token>;
}
