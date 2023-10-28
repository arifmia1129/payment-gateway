import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import { PaymentInitService } from './payment.service';

const createPaymentSession = async (req: Request, res: Response, next: NextFunction) => {
  const result = await PaymentInitService.createPaymentSession(req.body);
  try {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const PaymentInitController = {
  createPaymentSession
};
