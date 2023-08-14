// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from 'express';

import CustomResponse from '../utils/response';
import RoleService from '../services/role';

export default class RoleController {
    static async createRole(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const reqBody = { ...req['body'] };
            const result = await RoleService.createRole(reqBody);
            const response = new CustomResponse(res);
            response.setResponse({ result });
        }
        catch (e) {
            next(e);
        }
    }

    static async getRole(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const user = req['decoded'];
            const result = await RoleService.getRolesByOID(user.organizationId);
            const response = new CustomResponse(res);
            response.setResponse({ result });
        }
        catch (e) {
            next(e);
        }
    }
}
