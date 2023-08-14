import { NextFunction, Request, Response } from 'express';
import CustomResponse from '../utils/response';
import DriverService from '../services/driver';

export default class AddressController {
  static async getSmsList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await DriverService.getSmsList();
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (err) {
      next(err);
    }
  }

  static async getCityList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await DriverService.getCityList();
      console.log(result);
      const response = new CustomResponse(res);
      response.setResponse({ result });

    }
    catch (err) {
      next(err);
    }
  }
  static async getLanguageList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await DriverService.getLanguageList();
      console.log(result);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (err) {
      next(err);
    }
  }
}