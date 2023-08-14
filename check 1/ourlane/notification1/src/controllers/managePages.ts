import * as express from 'express';
import CustomResponse from '../utils/response';
import ManagePagesService from '../services/managePages/index'
/**
 *
 *
 * @export
 * @class ManagePagesController
 */
export default class ManagePagesController {

  static async getManagePageItem(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction

  ): Promise<void> {
    try {
     
      const title = req.params.title;
      const result = await ManagePagesService.getManagePageItem(title);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }
}
