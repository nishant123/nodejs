import { Op, Sequelize } from 'sequelize';
import db from '..';
import OrganizationDBService from './organization.dbservice';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import { BaseDbService } from './base.dbservice';
import RoleDBService from './role.dbservice';
const {
  UserModel,
  RoleModel,
  TripModel
} = db;
const serviceName = '[UserDBService]';
export default class UserDBService extends BaseDbService {
  
 
  static getByUserId(options: {
    id: string
  }) {
    return UserModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }
  static checkDriver(options: {
    id: string,
    role:string
  }) {
    return UserModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }
  
  static fetchByUserId(options: {
    uuid: string
  }) {
    return UserModel.findOne({
      attributes: { exclude: ['password'] },
      // include: [{
      //   model: UserDetailsModel,
      //   as: 'userDetails'
      // }],
      where: options,
      raw: true,
      nest: true
    });
  }

 

}
