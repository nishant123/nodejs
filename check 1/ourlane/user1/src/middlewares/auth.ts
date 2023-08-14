import * as jwt from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from 'express';
import { vars } from '../config/vars';
import CustomError from '../utils/error';
import { errorManager } from '../config/errorManager';

const {
  TOKEN_EXPIRED,
  TOKEN_UNAUTHORIZED,
  NO_TOKEN,
  ACCESS_DENIED
} = errorManager;


const { jwtSecret, jwtExpiryTime } = vars;
const serviceName = '[TokenHandler]';

export default class TokenHandler {
  static verify(req: Request, res: Response, next: NextFunction) {
    try {
    // check and verify validity of the token
      const token = req.headers['x-access-token'] || req.query.token || req.body.token;
      if (token && token != null) {
        return jwt.verify(token, jwtSecret, async (err: Error, decoded: any) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              return next(new CustomError({ serviceName, ...TOKEN_EXPIRED }));
            } if (err.name === 'JsonWebTokenError') {
              return next(new CustomError({ serviceName, ...TOKEN_UNAUTHORIZED }));
            }
            return next(new CustomError({ serviceName, ...TOKEN_UNAUTHORIZED }));
          }
          if (decoded) {
            req['decoded'] = decoded;
            if (decoded.role == null || decoded.role === undefined) {
              return next(new CustomError({ serviceName, ...ACCESS_DENIED }));
            }
            return next();
          }
          return next(new CustomError({ serviceName, ...TOKEN_EXPIRED }));
        });
      }

      return next(new CustomError({ serviceName, ...NO_TOKEN }));
    }
    catch (err) {
      return next(new CustomError({ serviceName, ...TOKEN_UNAUTHORIZED }));
    }
  }

  static generate(user: {
    uuid: string,
    FullName?: string,
    loginId: string,
    mobileNumber?:string
    role:string,
    id:number,
    organizationId?:string
  }) {
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * jwtExpiryTime),
      ...user
    }, jwtSecret);
  }
}
