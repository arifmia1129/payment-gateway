import { SslService } from '../ssl/ssl.service';

const createPaymentSession = async (payload: any) => {
  const paymentInfo = {
    total_amount: payload.totalFee,
    tran_id: payload.transId,
    cus_name: payload.studentName,
    cus_email: payload.studentEmail,
    cus_add1: payload.address,
    cus_phone: payload.contactNo
  };

  const res = await SslService.createSslSession(paymentInfo);

  return res;
};

export const PaymentInitService = {
  createPaymentSession
};
