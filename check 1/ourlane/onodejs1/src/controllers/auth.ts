// eslint-disable-next-line no-unused-vars
import * as express from 'express';
import AuthService from '../services/auth';
import CustomResponse from '../utils/response';

export default class AuthController {

  static async checkAccount(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction

  ): Promise<void> {
    try {
      const { email } = req['body'];
      const result = await AuthService.checkAccount(email);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }


  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req['body'] };
      const result = await AuthService.createUser(reqBody);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }


  static async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      // const { mobileNumber} = req['body'];
      const reqBody = { ...req['body'] };
      const result = await AuthService.login(reqBody);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }

  static async sendOtp(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { mobileNumber, otpType, countryCode } = req['body'];
      const result = await AuthService.sendOtp(mobileNumber, otpType, countryCode);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }

  static async verifyOtp(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req['body'] };
      const result = await AuthService.verifyOtp(reqBody);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }

  static async setPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req['body'] };
      const result = await AuthService.setPassword(reqBody);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }

  static async changePassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { password, oldPassword } = req['body'];
      const userId = req['decoded'].uuid;
      const result = await AuthService.changePassword(userId, { password, oldPassword });
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }

  static async verify2FA(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { requestId, otp } = req['body'];
      const result = await AuthService.verify2FA(requestId, otp);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }

  static async forgetPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { email } = req['body'];
      const result = await AuthService.forgetPass(email);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }

  static async verifyRefreshToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { refreshToken } = req['query'];
      const result = await AuthService.createAccessTokenFromRefreshToken(refreshToken);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }


  static async verifyEmail(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req['body'] };
      const result = await AuthService.verifyEmail(reqBody);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }

  static async reSendVerifyEmail(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req['body'] };
      const result = await AuthService.reSendVerifyEmail(reqBody);
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    }
    catch (error) {
      return next(error);
    }
  }
}
