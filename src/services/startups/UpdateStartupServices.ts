import { getRepository } from 'typeorm';
import Startups from '../../models/Startup';

import AppError from '../../errors/AppErros';

interface Request {
  id: string;
  provider_id: string;
  name: string;
  about: string;
  acting: string;
}

class UpdateStartupServices {
  public async execute({
    id,
    provider_id,
    name,
    about,
    acting,
  }: Request): Promise<Startups> {
    const StartupRepository = getRepository(Startups);

    let startupExists = await StartupRepository.findOne(id);

    if (!startupExists) {
      throw new AppError('Not exists database startup', 400);
    }

    startupExists.provider_id = provider_id;
    startupExists.name = name;
    startupExists.about = about;
    startupExists.acting = acting;

    const startupUpdated = await StartupRepository.save(startupExists);

    return startupUpdated;
  }
}

export default UpdateStartupServices;
