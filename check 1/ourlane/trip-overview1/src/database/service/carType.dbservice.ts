import { Op, Sequelize } from 'sequelize';
import db from '..';
import { BaseDbService } from './base.dbservice';
const { CarTypeModel, sequelize } = db;

export default class CarTypeService extends BaseDbService {

  //GET CAR DETILS
  static getCarByField(object) {
    return CarTypeModel.findOne({
      where: object
    });
  }
}