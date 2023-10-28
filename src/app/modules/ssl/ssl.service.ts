import axios from 'axios';
import config from '../../../config';

const createSslSession = async (payload: any) => {
  const data = {
    store_id: config.ssl.storeId,
    store_passwd: config.ssl.storePass,
    currency: 'BDT',
    success_url:
      'https://web.programming-hero.com/level2-batch-1/video/level2-batch-1-58-3_-implementing-payment-system-part-1',
    fail_url: 'http://localhost:3030/fail',
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'N/A',
    product_name: 'Semester Payment',
    product_category: 'N/A',
    product_profile: 'N/A',
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_state: 'N/A',
    cus_postcode: 'N/A',
    cus_country: 'Bangladesh',
    cus_fax: 'N/A',
    ship_name: 'N/A',
    ship_add1: 'N/A',
    ship_add2: 'N/A',
    ship_city: 'N/A',
    ship_state: 'N/A',
    ship_postcode: 'N/A',
    ship_country: 'N/A',
    ...payload
  };

  const { data: res } = await axios.post(config.ssl.sslPaymentUrl, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return res;
};

export const SslService = {
  createSslSession
};
