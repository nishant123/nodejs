import { Op, Sequelize, QueryTypes } from 'sequelize';
import db from '..';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import { BaseDbService } from './base.dbservice';
import { v4 as uuid_v4 } from "uuid";
import { applicationStatuses } from '../../config/constants';
import FileService from '../../utils/file';
import { count } from 'console';
import { Float } from 'aws-sdk/clients/ec2';
import Users from '../models/users.model';

const {  CustomerModel, sequelize } = db;
const serviceName = '[DriverDBService]';

export default class DriverDBService extends BaseDbService {


  static async getCustomerById(options: {
    userId: number,
  }) {
    return CustomerModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }

  
  static async updateDriverStatus(options, userId) {
    return CustomerModel.update(options, {
      where: {
        userId: userId
      }
    });
  }
}