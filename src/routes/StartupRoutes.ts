import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import UploadConfig from '../config/upload';

import Startup from '../models/Startup';
import CreateStartupServices from '../services/startups/CreateStartupServices';
import UpdateStartupServices from '../services/startups/UpdateStartupServices';
import UploadLogoServices from '../services/startups/UploadLogoServices';

const startupRouter = Router();
const upload = multer(UploadConfig);

startupRouter.get('/', async (request, response) => {
  const startupRepository = getRepository(Startup);
  const startups = await startupRepository.find();

  return response.json(startups);
});

startupRouter.post('/', upload.single('logo'), async (request, response) => {
  const { user_id, name, about, acting } = request.body;

  const startupRepository = new CreateStartupServices();

  const updateProfile = await startupRepository.execute({
    provider_id: user_id,
    name,
    about,
    acting,
  });

  if (request.file.filename) {
    const UpdatedAvatar = new UploadLogoServices();

    await UpdatedAvatar.execute({
      table: 'Startups',
      id: updateProfile.id,
      avatarFileName: request.file.filename,
    });
  }

  return response.json(updateProfile);
});

startupRouter.put('/', upload.single('logo'), async (request, response) => {
  const { id, user_id, name, about, acting } = request.body;

  if (request.file.filename) {
    const UpdatedAvatar = new UploadLogoServices();

    await UpdatedAvatar.execute({
      table: 'Startups',
      id,
      avatarFileName: request.file.filename,
    });
  }

  const startupRepository = new UpdateStartupServices();

  const updateProfile = await startupRepository.execute({
    id,
    provider_id: user_id,
    name,
    about,
    acting,
  });

  return response.json(updateProfile);
});

export default startupRouter;
