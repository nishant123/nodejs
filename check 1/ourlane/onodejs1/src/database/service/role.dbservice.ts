import db from '..';

const {
  RoleModel
} = db;

export default class RoleDBService {
  static createRole(data: {
    roleName: string,
    roleDesc: string,
    organizationId: number
  }) {
    return RoleModel.create(data);
  }

  static getRole(options: {
    roleName: string,
    organizationId?: string
  }) {
    return RoleModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }

  static getRoleByOID(organizationId) {
    return RoleModel.findAll({
      where: organizationId,
      raw: true,
      nest: true
    });
  }
}
