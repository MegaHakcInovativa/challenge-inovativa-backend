import { getRepository } from 'typeorm';

import User from '../../models/User';
import Startups from '../../models/Startup';

import AppError from '../../errors/AppErros';

interface Request {
  provider_id: string;
  name: string;
  about: string;
  acting: string;
}

class CreateStartupServices {
  public async execute({
    provider_id,
    name,
    about,
    acting,
  }: Request): Promise<Startups> {
    const StartupRepository = getRepository(Startups);
    const UserRepository = getRepository(User);

    const userExists = await UserRepository.findOne({
      where: { id: provider_id },
    });

    if (!userExists) {
      throw new AppError('Not exists database startup', 400);
    }

    const newStartup = StartupRepository.create({
      provider_id,
      name,
      about,
      acting,
    });

    const startup = await StartupRepository.save(newStartup);

    return startup;
  }
}

export default CreateStartupServices;
