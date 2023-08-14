import db from '..';
import { BaseDbService } from './base.dbservice';

const { PaymentTypeModel, sequelize } = db;
const serviceName = '[PaymentTypeDBService]';

export default class DriverDBService extends BaseDbService {


    static async getPaymentType() {
        return PaymentTypeModel.findAll({
            raw: true,
            nest: true,
        });
    }

}