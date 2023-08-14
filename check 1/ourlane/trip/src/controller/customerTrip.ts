// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from 'express';
import CustomResponse from '../utils/response';
import TripService from '../services/customerTrip';
import { nextTick } from 'process';

export default class TripController {
  static async createTrip(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqBody = { ...req['body'] };
      const result = await TripService.createTrip(reqBody, user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

 

  static async changeTripLocation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqData = Object.assign({}, req.body);
      const result = await TripService.changeLocation(reqData);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }
  static async getDriverTrip(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await TripService.getDriverTrip(user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getRideTypes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await TripService.getRideTypes();
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async updateTripStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqData = Object.assign({}, req.body);
      const result = await TripService.updateTripStatus(reqData, user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async completeTrip(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqData = Object.assign({}, req.body);
      const result = await TripService.completeTrip(reqData);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async updateCustomerReview(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqData = Object.assign({}, req.body);
      const result = await TripService.updateCustomerReview(reqData, user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async updateDriverReview(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqData = Object.assign({}, req.body);
      const result = await TripService.updateDriverReview(reqData);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getTripDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tripId = req.params.tripId;
      const result = await TripService.getTripDetails(tripId);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async shareCustomerStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqData = Object.assign({}, req.body);
      const result = await TripService.shareCustomerStatus(reqData);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async sheduleTripByCron(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userDetails = req['decoded'];
      const result = await TripService.getScheduledTrip(userDetails);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getTrips(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await TripService.getTrips(user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getAllTrips(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await TripService.getAllTrips(user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async sendInvoice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userDetails = req['decoded'];
      const tripId = req.params.tripId;
      const result = await TripService.sendInvoice(userDetails, tripId);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }


  static async avoidOverlappingTrip(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userDetails = req['decoded'];
      const reqBody = Object.assign({}, req.body);
      const result = await TripService.avoidOverlappingTrip(userDetails, reqBody);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async updatePickUpTime(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req['body'] };
      const result = await TripService.updatePickUpTime(reqBody);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (error) {
      next(error);
    }
  }

  static async driverTotalEarning(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userDetails = req['decoded'];
      const result = await TripService.driverTotalEarning(userDetails);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (error) {
      next(error);
    }
  }

  static async twoMinuteAwayNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userDetails = req['decoded'];
      const result = await TripService.getScheduledTripTwoMinuteAway(userDetails);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (error) {
      next(error);
    }
  }

}


