import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppErros';
import User from '../models/User';
import profileStagesRepository from '../repositories/ProfileStageRepository';

interface Request {
  name: string;

  email: string;

  password: string;

  terms: boolean;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    terms,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('this user already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      terms,
    });

    const newUser = await userRepository.save(user);

    const newProfile = new profileStagesRepository();

    await newProfile.createRelationship({ id: newUser.id });

    return user;
  }
}

export default CreateUserService;
