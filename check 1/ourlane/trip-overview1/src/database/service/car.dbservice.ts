import { Op, Sequelize ,QueryTypes} from 'sequelize';
import db from '..';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import { BaseDbService } from './base.dbservice';
import { uuid } from 'uuidv4';
import { vars } from '../../config/vars';
import FileService from '../../utils/file'
import * as fs from 'fs'
import * as path from 'path'
const { CarModel, DriverModel, sequelize } = db;
const serviceName = '[CarDBService]';
import { applicationStatuses } from '../../config/constants';
const { active, inactive } = applicationStatuses.status;


export default class CarDBService extends BaseDbService {

  

//GET DRIVER 
  static async getCarByDriverId(options: {
    status: string,
    driverId: number
  }) {
    return CarModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }
}