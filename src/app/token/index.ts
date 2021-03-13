import { sign } from 'jsonwebtoken';

import { TokenService, Token } from '../../core';
import { User } from '../../core';

export class JWTService implements TokenService {
  constructor(private key: string) {}

  pack(user: User): Promise<Token> {
    return new Promise((res, rej) => {
      sign(user.email, this.key, (err, token) => {
        if (err) rej(err);
        res(token);
      });
    });
  }
}
