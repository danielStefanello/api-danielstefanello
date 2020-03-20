import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import ApiController from './app/controllers/ApiController';
import UserController from './app/controllers/UserController';
import ClientController from './app/controllers/ClientController';
import SessionController from './app/controllers/SessionController';
import TechController from './app/controllers/TechController';
import CategoryController from './app/controllers/CategoryController';
import JobController from './app/controllers/JobController';
import ImageController from './app/controllers/ImageController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', ApiController.index);
routes.get('/jobs', JobController.index);
routes.get('/jobs/:job_id', JobController.show);
routes.get('/categories', CategoryController.index);
routes.get('/techs', TechController.index);
routes.get('/clients', ClientController.index);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.post('/clients', ClientController.store);
routes.post('/techs', TechController.store);
routes.post('/categories', CategoryController.store);
routes.post('/jobs', JobController.store);
routes.post(
  '/jobs/:job_id/files',
  upload.single('file'),
  ImageController.store
);

routes.put('/users', UserController.update);
routes.put('/clients/:client_id', ClientController.update);
routes.put('/categories/:category_id', CategoryController.update);
routes.put('/techs/:tech_id', TechController.update);
routes.put('/jobs/:job_id', JobController.update);
routes.put('/images/:image_id', ImageController.update);

export default routes;
