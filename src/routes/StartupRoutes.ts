import { Router } from 'express';

const startupRouter = Router();

startupRouter.get('/', async (request, response) => {
  return response.json({ error: 'Startup' });
});

export default startupRouter;
