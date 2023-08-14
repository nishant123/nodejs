// eslint-disable-next-line no-unused-vars
import * as express from 'express';
import * as expressValidation from 'express-validation';
import CustomResponse from '../utils/response';
import logger from '../utils/logger';
import CustomError from '../utils/error';
import { errorManager } from '../config/errorManager';
import LogsQueue from './logsQueue';

const { VALIDATION_ERROR } = errorManager;


export default class ErrorHandler {
  static notFound(req: any, res: any) {
    const errorName = 'API_NOT_FOUND';
    const response = new CustomResponse(res);
    if (req.originalUrl === '/') {
      return response.setResponse({
        status: true
      });
    }
    logger.error(`[${errorName}] : ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    return response.setResponse({
      status: false,
      message: 'NOT_FOUND'
    });
  }


  static handle(
    err: any,
    req?: express.Request,
    res?: express.Response,
    // eslint-disable-next-line no-unused-vars
    next?: express.NextFunction
  ): any {
    function extractErrorMsg(error: any) {
      const errormsg = error.map((er: { messages: any; }) => er.messages);
      return errormsg.toString().replace(/['"]+/g, '');
    }

    if (err instanceof expressValidation.ValidationError) {
      err = new CustomError({
        ...VALIDATION_ERROR,
        message: extractErrorMsg(err.errors)
      });
    }
    else if (!(err instanceof CustomError)) {
      if (err instanceof Error) {
        // convert it to CustomError
        err = new CustomError({
          message: err.message
        });
      }
    }

    // TODO  :confirm if we need stacktrace
    // logger.error(`[${err.type}] [${err.message}] ${err.stack}`);
    logger.error(`[${err.type}] [${err.message}]`);

    // Send to Queue logging
    LogsQueue.errorLogs(req, res, err);

    const response = new CustomResponse(res);
    return response.setResponse({
      status: false,
      message: err.type,
      messageText: err.message
    });
  }
}
