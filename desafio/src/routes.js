import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import CourierController from './app/controllers/CourierController';
import OrderController from './app/controllers/OrderController';
import DeliveryController from './app/controllers/DeliveryController';
import ProblemController from './app/controllers/ProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/time', (req, res) => res.json(new Date()));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);

routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.put('/couriers', upload.single('profile'), CourierController.update);
routes.delete('/couriers/:id', CourierController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.options('/orders/:id', OrderController.cancel);
routes.delete('/orders/:id', OrderController.delete);

routes.get('/couriers/:id/deliveries', DeliveryController.index);
routes.get('/couriers/:id/withdrawn', DeliveryController.withdrawn);
routes.get('/couriers/:id/delivered', DeliveryController.delivered);
routes.options(
  '/couriers/:courier_id/deliveries/:order_id/withdraw',
  DeliveryController.withdraw
);
routes.post(
  '/couriers/:courier_id/deliveries/:order_id/deliver',
  upload.single('signature'),
  DeliveryController.deliver
);

routes.get('/problems', ProblemController.deliveriesWithProblems);
routes.get('/delivery/:id/problems', ProblemController.problemsFromDelivery);
routes.post('/delivery/:id/problems', ProblemController.reportProblem);
routes.options(
  '/problems/:id/cancel-delivery',
  ProblemController.cancelDeliveryByProblem
);

export default routes;
