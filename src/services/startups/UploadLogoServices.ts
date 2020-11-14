import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../../config/upload';
import Startup from '../../models/Startup';
import AppError from '../../errors/AppErros';

interface Request {
  table: string;

  id: string;

  avatarFileName: string;
}

class UploadLogoServices {
  public async execute({ id, avatarFileName }: Request): Promise<void> {
    const updateLogoRepository = getRepository(Startup);

    const startup = await updateLogoRepository.findOne(id);

    console.log(startup);

    if (!startup) {
      throw new AppError(
        'you can not update the startup, because it is not exists',
        401,
      );
    }

    if (startup.logo) {
      const startupAvatarFilePath = path.join(
        uploadConfig.directory,
        startup.logo,
      );
      const startupAvatarFileExists = await fs.promises.stat(
        startupAvatarFilePath,
      );

      if (startupAvatarFileExists) {
        await fs.promises.unlink(startupAvatarFilePath);
      }
    }

    startup.logo = avatarFileName;

    await updateLogoRepository.save(startup);
  }
}

export default UploadLogoServices;
