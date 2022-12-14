import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import categoriesRoutes from './categories.routes';
import specificationRoutes from './specifications.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', authenticateRoutes);

export default routes;
