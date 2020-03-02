import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import JobController from './app/controllers/JobController';
import ImageController from './app/controllers/ImageController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/jobs', JobController.index);
routes.get('/jobs/:job_id', JobController.show);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.post('/jobs', JobController.store);
routes.post(
  '/jobs/:job_id/files',
  upload.single('file'),
  ImageController.store
);

routes.put('/users', UserController.update);
routes.put('/jobs/:job_id', JobController.update);
routes.put('/images/:image_id', ImageController.update);

export default routes;
