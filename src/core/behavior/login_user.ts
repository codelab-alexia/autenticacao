import { User } from '../model/user';
import { UserDataservice } from '../adapters/user_data_service';

export class LoginUser {
  constructor(private userDataservice: UserDataservice) {}

  async run(email: string, passwordDigest: string): Promise<boolean> {
    try {
      const user = await this.userDataservice.findByEmail(email);

      return passwordDigest === user.passwordDigest;
    } catch (e) {
      return false;
    }
  }
}
