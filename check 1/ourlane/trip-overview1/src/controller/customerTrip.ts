// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from 'express';
import CustomResponse from '../utils/response';
import TripService from '../services/customerTrip';
import { nextTick } from 'process';

export default class TripController {


  static async tripList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqData = Object.assign({}, req.body);
      const result = await TripService.getTripList(reqData);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }


  // ADMIN GET TODAY TRIPS DETAILS 
  static async todayTrips(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await TripService.todayTrips();
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  // ADMIN GET MOST POPULAR PICKUP LOCATION
  static async mostPickup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await TripService.mostPickup();
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  // ADMIN GET MOST POPULAR DROP-OFF LOCATION
  static async mostDrop(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await TripService.mostDrop();
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
      catch (e) {
      next(e);
    }
  }

  // ADMIN GET MOST POPULAR DROP-OFF LOCATION
  static async getTripsOverview(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await TripService.getTripsOverview(user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getTripsTotalOverview(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await TripService.getTripsTotalOverview(user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getDriverOverview(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqQuery = { ...req.query };
      const result = await TripService.getDriverOverview(user,reqQuery);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async driverDayData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqQuery = { ...req.query };
      const result = await TripService.driverDayData(user,reqQuery);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getCustomerOverview(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqQuery = { ...req.query };
      const result = await TripService.getCustomerOverview(user,reqQuery);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async customerDayData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqQuery = { ...req.query };
      const result = await TripService.customerDayData(user,reqQuery);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getLeaders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await TripService.getLeaders(user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  //GET CUSTOMER LIST WITH PAYMENT DETAILS
  static async getCustomerTrips(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await TripService.getCustomerTrips(user, req.body);
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
      const result = await TripService.getDriverTrips(user, req.body);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

}


