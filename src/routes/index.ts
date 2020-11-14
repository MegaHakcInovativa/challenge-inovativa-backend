import { Router } from 'express';
import userRouter from './UserRoutes';
import startupRouter from './StartupRoutes';
import ProfileStageRoutes from './ProfileStageRoutes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/stage', ProfileStageRoutes);
routes.use('/startups', startupRouter);

export default routes;
