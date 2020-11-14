import { Router } from 'express';
import userRouter from './UserRoutes';
import startupRouter from './StartupRoutes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/startups', startupRouter);

export default routes;
