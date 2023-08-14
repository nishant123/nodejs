// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import aclService from '../services/acl';
import CustomError from '../utils/error';
import { errorManager } from '../config/errorManager';

const serviceName = '[ACL Middleware]';
export default class AccessControl {
    static authorize(apiId: string) {
        return async (req: Request, _res: Response, next: NextFunction) => {
            const role = req['decoded'].role;
            const rolePolicyMapping = await aclService.getRolePolicyMapping(role);
            const apiPolicyMapping = await aclService.getApiPolicyMapping(apiId);
            const commonPolicy = _.intersection(rolePolicyMapping, apiPolicyMapping);
            if (commonPolicy && commonPolicy.length) {
                return next();
            }
            return next(new CustomError(errorManager.ACCESS_DENIED));
            // return next();
        };

    }
}