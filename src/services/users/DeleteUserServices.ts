import { getRepository } from 'typeorm';

import User from '../../models/User';
import AppError from '../../errors/AppErros';

interface Request {
  id: string;
}

class DeleteUserServices {
  public async execute({ id }: Request): Promise<void> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne(id);

    if (!userExists) {
      throw new AppError('This transaction not exists in the database', 400);
    }

    await userRepository.delete(id);
  }
}

export default DeleteUserServices;
