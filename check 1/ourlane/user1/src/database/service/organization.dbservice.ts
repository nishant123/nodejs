import db from '..';

const {
  OrganizationModel
} = db;

export default class OrganizationDBService {

  static getOrganization(options: {
    organizationName?: string,
    organizationId?: string
  }) {
    return OrganizationModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }

  static getOrganizationId(options: {
    organizationId?: string
  }) {
    return OrganizationModel.findOne({
      attributes: ['organizationId'],
      where: options,
      raw: true,
      nest: true
    });
  }

  static getOrganizationUuid(options: {
    organizationId?: string
  }) {
    return OrganizationModel.findOne({
      attributes: ['organizationId'],
      where: options,
      raw: true,
      nest: true
    });
  }
}
