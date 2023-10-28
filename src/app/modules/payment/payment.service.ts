import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';
import { SslService } from '../ssl/ssl.service';
import { PaginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { Payment, Prisma } from '@prisma/client';
import { paymentSearchableFields } from './payment.constant';

const createPaymentSession = async (payload: any): Promise<string | null> => {
  const paymentInfo = {
    total_amount: payload.totalFee,
    tran_id: payload.transId,
    cus_name: payload.studentName,
    cus_email: payload.studentEmail,
    cus_add1: payload.address,
    cus_phone: payload.contactNo
  };

  await prisma.payment.create({
    data: {
      amount: payload.totalFee as number,
      transId: payload.transId,
      studentId: payload.studentId
    }
  });

  const res = await SslService.createSslSession(paymentInfo);

  if (res.redirectGatewayURL) {
    return res.redirectGatewayURL;
  } else {
    return null;
  }
};

const paymentValidate = async (payload: any) => {
  if (!payload || payload.status !== 'VALID') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment validation request');
  }

  const res = await SslService.paymentValidate(payload?.val_id);

  if (res.status === 'VALID') {
    const isPaymentInfoExist = await prisma.payment.findFirst({
      where: {
        transId: payload.trans_id
      }
    });
    if (isPaymentInfoExist) {
      await prisma.payment.update({
        where: {
          id: isPaymentInfoExist.id
        },
        data: {
          status: 'PAID',
          transId: payload?.trans_id
        }
      });
    }
  }

  return res;
};

const getAllPayment = async (filters: any, options: any): Promise<IGenericResponse<Payment[]>> => {
  const { limit, page, skip } = PaginationHelper.getPaginationOptions(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: paymentSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key]
        }
      }))
    });
  }

  const whereConditions: Prisma.PaymentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.payment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc'
          }
  });
  const total = await prisma.payment.count({
    where: whereConditions
  });

  return {
    meta: {
      total,
      page,
      limit
    },
    data: result
  };
};

export const PaymentInitService = {
  createPaymentSession,
  paymentValidate,
  getAllPayment
};
