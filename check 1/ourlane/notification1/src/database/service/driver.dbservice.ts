import db from '..';
import { BaseDbService } from './base.dbservice';

const { CityModel, LanguageModel, SmsModel, sequelize } = db;
const serviceName = '[DriverDBService]';

export default class DriverDBService extends BaseDbService {


  static async getCityList() {
    return CityModel.findAll({
      attributes: ['id', 'uuid', 'name'],
      raw: true,
      nest: true,
    });
  }
  static async getLanguageList() {
    return LanguageModel.findAll({
      attributes: ['id', 'uuid', 'language'],
      raw: true,
      nest: true,
    });
  }
  static async getSmsList() {
    return SmsModel.findAll({
      attributes: ['id', 'uuid', 'type', 'body'],
      raw: true,
      nest: true,
    });
  }
}