import db from '../index';

const {
  RefreshModel
} = db;

export default class AclDBService {
  static updateRefreshToken(data, query) {
    return RefreshModel.update(data, {
      where: query
    });
  }

  static createRefreshToken(data, transaction) {
    return RefreshModel.create(data, { transaction });
  }

  static getRefreshToken(query) {
    return RefreshModel.findOne({
      where: query,
      raw: true,
      nest: true
    });
  }
}
