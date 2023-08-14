// eslint-disable-next-line no-unused-vars
import * as express from 'express';
import * as jwt_decode from 'jwt-decode';
import { topics } from '../config/constants';
// eslint-disable-next-line no-unused-vars
import CustomError from '../utils/error';

class LogsQueue {
  static requestReponseLogs(req: express.Request, res: express.Response,
    next: express.NextFunction) {
    const logObj = {
      createdBy: LogsQueue.parseTokenForLoging(req),
      requestEndpoint: req.url,
      requestPayload: req.body,
      clientIp: req.connection.remoteAddress,
      responsePayload: ''
    };
    const requestEnd = res.end;
    res.end = ((chunk) => {
      // chunk is undefined for options call from browser
      chunk = chunk || '';
      try {
        logObj.responsePayload = JSON.parse(chunk.toString());
      }
      catch (error) {
        logObj.responsePayload = chunk ? chunk.toString() : '';
      }
      res.end = requestEnd;
      res.end(chunk);
    });
    next();
  }

  static errorLogs(req: express.Request, res: express.Response, other: CustomError) {
    const logObj = {
      createdBy: LogsQueue.parseTokenForLoging(req),
      errorId: '', // TODO: Generate the dynamic Id
      type: other.type,
      name: other.message,
      code: other.code,
      stackObj: other.stack,
      serviceName: other.serviceName,
      severity: other.severity
    };
  }

  static parseTokenForLoging(req: express.Request) {
    if (req) {
      const token = req['headers']['x-access-token'];
      if (token) {
        try {
          const decoded = jwt_decode(token);
          return decoded.uuid;
        }
        catch (err) {
          return null;
        }
      }
    }
    return null;
  }
}

export default LogsQueue;
