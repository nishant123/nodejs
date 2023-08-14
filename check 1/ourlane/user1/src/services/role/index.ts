import RoleDBService from '../../database/service/role.dbservice';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import OrganizationDBService from '../../database/service/organization.dbservice';

const serviceName = '[RoleService]';

export default class RoleService {
    static async createRole(options: {
        roleName: string,
        roleDesc: string,
        organizationId: string
    }) {
        const { roleName, roleDesc, organizationId } = options;

        const organization = await OrganizationDBService.getOrganization({ organizationId });
        if (!organization) {
            throw new CustomError({ serviceName, ...errorManager.INVALID_ORGANIZATION });
        }
        // eslint-disable-next-line max-len
        const role = await RoleDBService.getRole({ roleName, organizationId: organization.organizationId });
        if (role) {
            throw new CustomError({ serviceName, ...errorManager.ROLE_ALREADY_EXIST });
        }
        // eslint-disable-next-line max-len
        return RoleDBService.createRole({ roleName, roleDesc, organizationId: organization.organizationId });
    }

    static async getRolesByOID(organizationId) {
        const organization = await OrganizationDBService.getOrganizationId({ organizationId });
        if (!organization) {
            throw new CustomError({ serviceName, ...errorManager.INVALID_ORGANIZATION });
        }
        return RoleDBService.getRoleByOID(organization);
    }
}
