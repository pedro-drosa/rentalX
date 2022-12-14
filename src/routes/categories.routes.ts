import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '../modules/cars/usecases/createCategory/CreateCategoryController';
import ImportCategoryController from '../modules/cars/usecases/importCategory/ImportCategoryController';
import ListCategoriesController from '../modules/cars/usecases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();
const upload = multer({ dest: 'tmp/' });

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle
);

export default categoriesRoutes;
