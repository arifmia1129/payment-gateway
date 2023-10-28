import express from 'express';
import { PaymentInitController } from './payment.controller';

const router = express.Router();

router.post('/init', PaymentInitController.createPaymentSession);
router.post('/validate', PaymentInitController.paymentValidate);
router.get('/', PaymentInitController.getAllPayment);
router.get('/:id', PaymentInitController.getPaymentById);

export const PaymentInitRouter = router;
