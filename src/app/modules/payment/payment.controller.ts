import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import { PaymentInitService } from './payment.service';
import ApiError from '../../../errors/apiError';

const createPaymentSession = async (req: Request, res: Response, next: NextFunction) => {
  const result = await PaymentInitService.createPaymentSession(req.body);
  try {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Successfully created payment session',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const paymentValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { valId } = req.params;

  if (!valId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ID is required for validate payment operation');
  }

  const result = await PaymentInitService.paymentValidate(valId as string);
  try {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Successfully validated payment',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const PaymentInitController = {
  createPaymentSession,
  paymentValidate
};
