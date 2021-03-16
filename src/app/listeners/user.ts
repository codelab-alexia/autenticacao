import { Message } from '../dtos/message';

import { CreateNewUser } from '../../core/behavior/create_new_user';

import { Context } from '../../';

export class UserListener {
  private _create: CreateNewUser;

  constructor({ useCases: { createNewUser } }: Context) {
    this._create = createNewUser;
  }

  async createUser({ payload }: Message): Promise<void> {
    const { id, name, email, passwordDigest } = JSON.parse(payload);
    await this._create.run(id, name, email, passwordDigest);
  }
}
