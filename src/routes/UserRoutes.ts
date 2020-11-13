import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', async (request, response) => {
  return response.json({ error: false });
});

export default userRouter;
