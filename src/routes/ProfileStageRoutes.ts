import { Router } from 'express';
import { getRepository } from 'typeorm';

import ProfileStages from '../models/ProfileStages';

import UpdateProfileStageServices from '../services/profileStage/UpdateProfileStageServices';

const ProfileStageRoutes = Router();

ProfileStageRoutes.get('/', async (request, response) => {
  const profileStageRepository = getRepository(ProfileStages);

  const profileStages = await profileStageRepository.find();

  return response.json(profileStages);
});

ProfileStageRoutes.put('/', async (request, response) => {
  const { user_id, target, skills, initial, stage } = request.body;
  console.log(request.body);
  const profileRepository = new UpdateProfileStageServices();

  const updateProfile = await profileRepository.execute({
    provider_id: user_id,
    target,
    skills,
    initial,
    stage,
  });

  return response.json(updateProfile);
});

export default ProfileStageRoutes;
