import { Router } from 'express';

const ProfileStageRoutes = Router();

ProfileStageRoutes.get('/', async (request, response) => {
  return response.json({ error: false });
});

export default ProfileStageRoutes;
