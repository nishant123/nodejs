import { NextFunction, Request, Response } from 'express';
import CustomResponse from '../utils/response';
import DriverService from '../services/driver';

export default class AddressController {

  // ADMIN CAN CREATE CAR
  static async createDriver(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqBody = { ...req['body'] };
      const result = await DriverService.createDriver(reqBody, user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getCab(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userDetails = req['decoded'];
      const reqBody = { ...req.body };
      const result = await DriverService.getNearestCab(reqBody, userDetails);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (err) {
      next(err);
    }
  }

  static async updateDriverStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqBody = { ...req.body };
      const result = await DriverService.updateDriverStatus(reqBody, user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (error) {
      next(error);
    }
  }

  static async getDrivers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await DriverService.getDrivers();
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getDriverTrips(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await DriverService.getDriverTrips(user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (err) {
      next(err);
    }
  }

  static async deleteDriver(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const driverInfo = { ...req.body };
      const result = await DriverService.deleteDriver(user,driverInfo);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async updateDriverLocation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqBody = { ...req.body };
      const result = await DriverService.updateDriverLocation(reqBody, user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (error) {
      next(error);
    }
  }



  static async getUpdatedDriverLocation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const driverId = req.params.driverId;
      const result = await DriverService.getUpdatedDriverLocation(driverId);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (error) {
      next(error);
    }
  }

  static async getDriverCars(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await DriverService.getDriverCars(user);
      const response = new CustomResponse(res);
      response.setResponse({ result });  
    }
    catch (error) {
      next(error);
    }
  }

}