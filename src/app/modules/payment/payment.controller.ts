import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import { PaymentInitService } from './payment.service';
import pick from '../../../shared/pick';
import { paymentFilterableFields } from './payment.constant';

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
  const result = await PaymentInitService.paymentValidate(req.query);
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

const getAllPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, paymentFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await PaymentInitService.getAllPayment(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully retrieved all payment',
      meta: result.meta,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

export const PaymentInitController = {
  createPaymentSession,
  paymentValidate,
  getAllPayment
};
