import prisma from '../../../shared/prisma';
import { SslService } from '../ssl/ssl.service';

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

const paymentValidate = async (valId: string) => {
  const res = await SslService.paymentValidate(valId);
  return res;
};

export const PaymentInitService = {
  createPaymentSession,
  paymentValidate
};
