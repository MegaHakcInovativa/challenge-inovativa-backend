import { getRepository } from 'typeorm';

import AppError from '../errors/AppErros';
import User from '../models/User';

interface Request {
  id: string;

  name?: string;

  email?: string;

  telephone?: string;

  location?: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    telephone,
    location,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    let checkUserExists = await userRepository.findOne({
      where: { id },
    });

    if (!checkUserExists) {
      throw new AppError('You can not update user, because user not exists');
    }

    checkUserExists.id = id;
    checkUserExists.name = name ? name : '';
    checkUserExists.email = email ? email : '';
    checkUserExists.telephone = telephone ? telephone : '';
    checkUserExists.location = location ? location : '';

    const userUpdated = await userRepository.save(checkUserExists);

    return userUpdated;
  }
}

export default UpdateUserService;
