import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../../config/upload';
import User from '../../models/User';
import AppError from '../../errors/AppErros';

interface Request {
  table: string;

  user_id: string;

  avatarFileName: string;
}

class UploadAvatarServices {
  public async execute({ user_id, avatarFileName }: Request): Promise<void> {
    const updateAvatarRepository = getRepository(User);

    const user = await updateAvatarRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await updateAvatarRepository.save(user);
  }
}

export default UploadAvatarServices;
