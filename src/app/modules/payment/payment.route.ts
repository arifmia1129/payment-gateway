import express from 'express';
import { PaymentInitController } from './payment.controller';

const router = express.Router();

router.post('/init', PaymentInitController.createPaymentSession);
router.post('/validate', PaymentInitController.paymentValidate);
router.get('/', PaymentInitController.getAllPayment);

export const PaymentInitRouter = router;
