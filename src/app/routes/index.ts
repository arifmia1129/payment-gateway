import express from 'express';
import { PaymentInitRouter } from '../modules/payment/payment.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/payment',
    routes: PaymentInitRouter
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
