import express from 'express';
import { PaymentInitController } from './payment.controller';

const router = express.Router();

router.post('/init', PaymentInitController.paymentInit);

export const PaymentInitRouter = router;
