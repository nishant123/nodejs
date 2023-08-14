import * as express from 'express';
import AclService from '../services/acl';
import CustomResponse from '../utils/response';
/**
 *
 *
 * @export
 * @class AclController
 */
export default class AclController {
    static async loadAcl(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction

    ): Promise<void> {
        try {
            const result = await AclService.loadRolePolicyResourceMapping();
            const response = new CustomResponse(res);
            return response.setResponse({ result });
        }
        catch (error) {
            return next(error);
        }
    }

    static async verifyACL(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction

    ): Promise<void> {
        try {
            const result = await AclService.verifyACL(req);
            const response = new CustomResponse(res);
            return response.setResponse({ result });
        }
        catch (error) {
            return next(error);
        }
    }
}
