import { User } from '../model/user';
import { UserDataservice } from '../adapters/user_data_service';

export class CreateNewUser {
  constructor(private userDataservice: UserDataservice) {}

  run(id: string, name: string, email: string, passwordDigest: string) {
    const newUser = new User(id, name, email, passwordDigest);
    this.userDataservice.storeOne(newUser);
  }
}
