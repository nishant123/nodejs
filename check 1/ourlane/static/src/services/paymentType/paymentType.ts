import PaymentTypeDBService from '../../database/service/paymentType.dbservice';

import { cache } from '../../config/constants';
import RedisCache from '../../utils/cache';

const { paymentType } = cache;
const paymentKey = 'paymentTypeList';

const serviceName = '[PaymentTypeService]';

export default class DriverService {

    static async getPaymentType() {
        const list = await RedisCache.get(`${paymentType}`, paymentKey);
        if (list && list.length) {
            console.log('redis');
            return JSON.parse(list);
        } else {
            console.log('db');
            const result = await PaymentTypeDBService.getPaymentType();
            RedisCache.set(paymentType, paymentKey, result);
            return result;
        }
    }

}