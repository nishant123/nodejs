import db from '..';

const {
  OrganizationModel
} = db;

export default class OrganizationDBService {
  static createOrganization(data: {
    organizationName: string,
    organizationInfo: string
  }) {
    return OrganizationModel.create(data);
  }

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
