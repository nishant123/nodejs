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
const { CarTypeModel, sequelize } = db;
const serviceName = '[CarTypeDBService]';
import { applicationStatuses } from '../../config/constants';
const { active, inactive } = applicationStatuses.status;

export default class CarDBService extends BaseDbService {
     
      //GET CAR DETILS
      static getCarByField(object) {
        return CarTypeModel.findOne({
          where: object
        });
      }
 
  }