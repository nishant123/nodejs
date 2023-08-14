import * as express from 'express';
import CustomResponse from '../utils/response';
import EmailServices from '../services/email/index'
/**
 *
 *
 * @export
 * @class EmailController
 */
export default class EmailController {

  static async loadEmailTemplate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction

  ): Promise<void> {
    try {
      const result = await EmailServices.loadEmailTemplateToRedis();
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }

}
