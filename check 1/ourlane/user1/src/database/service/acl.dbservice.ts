import db from '../index';

const {
    RolePolicyMapperModel,
    ApiPolicyMapperModel
} = db;

export default class AclDBService {
    static getRolePolicyMapping(roleName?: string) {
        let criteria = null;
        if (roleName) {
            criteria = { roleName };
        }
        return RolePolicyMapperModel.findAll({
            where: criteria,
            raw: true,
            nest: true
        });
    }

    static getApiPolicyMapping(apiId?: string) {
        let criteria = null;
        if (apiId) {
            criteria = { apiId };
        }
        return ApiPolicyMapperModel.findAll({
            where: criteria,
            raw: true,
            nest: true
        });
    }
}
