import { Op, Sequelize } from 'sequelize';
import db from '..';
import OrganizationDBService from './organization.dbservice';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import { BaseDbService } from './base.dbservice';
import RoleDBService from './role.dbservice';
import user from '../../validations/user';
const {
  UserModel,
  RoleModel,
  TripModel
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

  static async getUserList(userDetails: any, options: {
    searchByName?: string
    roles?: any
    accountStatus?: any,
    lastUpdated?: any,
    accountCreated?: any,
    pageNumber: number,
    perPage: number,
    forWatchers: boolean,
    condition: object

  }) {
    const {
      searchByName, roles, accountStatus, lastUpdated, accountCreated, pageNumber, perPage, forWatchers, condition
    } = options;
    const search = searchByName;
    const organization = await OrganizationDBService.getOrganizationId({
      organizationId: userDetails.organizationId
    });
    if (!organization) {
      throw new CustomError({ serviceName, ...errorManager.ORG_NOT_EXISTS });
    }

    // TODO : fix this if organization is null
    const criteria = []
    // const criteria: any[] = [{
    //   organizationId: organization.organizationId
    // }];
    if (condition) {
      criteria.push(condition)
    }
    // if(organizationId){
    //   criteria.push({
    //     organizationId
    //   })
    // }
    if (accountStatus && accountStatus.length) {
      const OR = [];
      if (accountStatus.indexOf('Active') >= 0) {
        OR.push({
          isActive: true,
        });
      }
      if (accountStatus.indexOf('Blocked') >= 0) {
        OR.push({
          isBlocked: true
        });
      }
      if (accountStatus.indexOf('Deleted') >= 0) {
        OR.push({
          isDeleted: true,
          isActive: false
        });
      }
      if (accountStatus.indexOf('isRequstedUser') >= 0) {
        OR.push({
          isActive: false,
          isDeleted: false
        });
      }
      criteria.push({
        [Op.or]: OR
      });
    }
    if (roles) {
      criteria.push({
        role: roles
      });
    }
    if (forWatchers) {
      criteria.push({
        uuid: {
          [Op.ne]: userDetails.uuid
        }
      });
    }
    if (lastUpdated) {
      const updatedFromDate = new Date(lastUpdated.begin.split('T')[0]);
      updatedFromDate.setHours(0, 0, 0, 0);
      const updatedToDate = new Date(lastUpdated.end.split('T')[0]);
      updatedToDate.setHours(23, 59, 59, 999);
      criteria.push({
        updatedAt: {
          [Op.between]: [updatedFromDate, updatedToDate]
        }
      });
    }
    if (accountCreated) {
      const createdFromDate = new Date(accountCreated.begin.split('T')[0]);
      createdFromDate.setHours(0, 0, 0, 0);
      const createdToDate = new Date(accountCreated.end.split('T')[0]);
      createdToDate.setHours(23, 59, 59, 999);
      criteria.push({
        createdAt: {
          [Op.between]: [createdFromDate, createdToDate]
        }
      });
    }

    if (search && search.trim().length) {
      criteria.push({
        [Op.or]: [
          {
            loginId: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('loginId')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          },
          {
            fullName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('fullName')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          },
          {
            mobileNumber: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('mobileNumber')), 'LIKE', `%${search.trim()}%`)
          },

        ]
      });
    }
    const result = UserModel.findAndCountAll({
      where: {
        [Op.and]: criteria
      },
      attributes: ['id','uuid', 'fullName', 'loginId', 'mobileNumber', 'profileImage', 'role', 'isDeleted', 'isActive', 'isBlocked', 'updatedAt', 'createdAt', 'updatedBy'],
      include: [{
        model: RoleModel,
        as: 'application_roles',
        attributes: ['roleName']
        // model: UserDetailsModel,
        // as: 'userDetails'
      }
    ],
      order: [
        ['updatedAt', 'DESC']
      ],
      raw: true,
      nest: true,
      offset: +perPage * (+pageNumber - 1),
      limit: +perPage
    });

    return result;

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

  static async downloadUserList(userDetails: any, options: {
    searchByName?: string
    roles?: any
    accountStatus?: any,
    lastUpdated?: any,
    accountCreated?: any,
  }) {
    const {
      searchByName, roles, accountStatus, lastUpdated, accountCreated
    } = options;
    const search = searchByName;
    const organization = await OrganizationDBService.getOrganizationId({
      organizationId: userDetails.organizationId
    });
    if (!organization) {
      throw new CustomError({ serviceName, ...errorManager.ORG_NOT_EXISTS });
    }

    // TODO : fix this if organization is null
    const criteria: any[] = [{
      organizationId: organization.organizationId
    }];

    if (accountStatus && accountStatus.length) {
      const OR = [];
      if (accountStatus.indexOf('Active') >= 0) {
        OR.push({
          isActive: true
        });
      }
      if (accountStatus.indexOf('Blocked') >= 0) {
        OR.push({
          isBlocked: true
        });
      }
      if (accountStatus.indexOf('Deleted') >= 0) {
        OR.push({
          isDeleted: true
        });
      }
      criteria.push({
        [Op.or]: OR
      });
    }
    if (roles) {
      criteria.push({
        role: roles
      });
    }
    if (lastUpdated) {
      criteria.push({
        updatedAt: {
          [Op.between]: [new Date(lastUpdated.begin), new Date(lastUpdated.end)]
        }
      });
    }
    if (accountCreated) {
      criteria.push({
        createdAt: {
          [Op.between]: [new Date(accountCreated.begin), new Date(accountCreated.end)]
        }
      });
    }


    if (search && search.trim().length) {
      criteria.push({
        [Op.or]: [
          {
            loginId: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('loginId')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          },
          {
            firstName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('firstName')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          },
          {
            lastName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('lastName')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          }
        ]
      });
    }
    return UserModel.findAll({
      where: {
        [Op.and]: criteria
      },
      raw: true,
      nest: true
    });
  }

  // static async updateUser(user, data) {
  //   const queryObj = {};
  //   queryObj['isBlocked'] = data['isBlocked'] ? 1 : 0;
  //   const role = await RoleDBService
  //     .getRole({ organizationId: user.organizationId, roleName: data.role });
  //   if (!role) {
  //     throw new CustomError(errorManager.INVALID_ROLE);
  //   }
  //   queryObj['role'] = data.role;
  //   queryObj['updatedBy'] = user.loginId;
  //   const { uuid } = data;
  //   return UserModel.update(
  //     queryObj,
  //     {
  //       where: { uuid }
  //     }
  //   );
  // }
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
