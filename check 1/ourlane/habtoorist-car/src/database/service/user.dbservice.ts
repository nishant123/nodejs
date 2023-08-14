import { Op, Sequelize } from 'sequelize';
import db from '..';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import { BaseDbService } from './base.dbservice';
const {
  UserModel
} = db;
const serviceName = '[UserDBService]';
export default class UserDBService extends BaseDbService {
  static getUser(options: {
    loginId: string
  }) {
    return UserModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }
  static getEmpId(options: {
    empId: string
  }) {
    return UserModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }
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
  static getUserDetails(queryObj) {
    return UserModel.findOne({
      where: queryObj,
      raw: true,
      nest: true
    });
  }

  static getAdmin(options: {
    role ?: string,
    isActive ?: boolean,
  }) {
    return UserModel.findAndCountAll({
      where: options,
      raw: true,
      nest: true
    });
  }

  static getInAciveCount(options: {
    organizationId: string,
    isActive: boolean,
    isDeleted: boolean
  }) {
    return UserModel.findAndCountAll({
      where: options,
      raw: true,
      nest: true
    });
  }
  static getRequestedCount(options: {
    organizationId: string,
    isActive: boolean,
    isDeleted: boolean
  }) {
    return UserModel.findAndCountAll({
      where: options,
      raw: true,
      nest: true
    });
  }

  static async updateUser(data, query) {
  return UserModel.update(
      data,
      {
        where: query
      }
    );
  }
  static async declineUser(query) {
  return UserModel.destroy(
      {
        where: query
      }
    );
  }
  destroy

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

  static getDriver() {
    return UserModel.findAll({
      where: {
        "isActive": 1,
        role: "DRIVER",

      },
      attributes: ['uuid', 'fullName', 'loginId', 'id'],
      order: [
        ['id', 'DESC'],
      ],
      raw: true,
      nest: true
    });
  }

}
