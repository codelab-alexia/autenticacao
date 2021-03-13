import { UserDataservice } from '../adapters/user_data_service';
import { TokenService } from '../adapters/token_service';

export class LoginUser {
  constructor(private userDataservice: UserDataservice, private tokenService: TokenService) {}

  async run(email: string, passwordDigest: string): Promise<any> {
    try {
      const user = await this.userDataservice.findByEmail(email);

      if (passwordDigest !== user.passwordDigest) return { status: false };

      return {
        status: true,
        token: await this.tokenService.pack(user),
      };
    } catch (e) {
      return { status: false };
    }
  }
}
