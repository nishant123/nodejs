import { NextFunction, Request, Response } from 'express';
import CustomResponse from '../utils/response';
import NotificationService from '../services/notification';

export default class NotificationController {
  static async createLiveFeed(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req['body'] };
      const result = await NotificationService.createLiveFeed(reqBody);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (err) {
      next(err);
    }
  }

 // ADMIN GET LIVE FEED DATA
  static async liveFeed(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqQuery = { ...req.query };
      const result = await NotificationService.liveFeed(reqQuery);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
      catch (e) {
      next(e);
    }
  }

  static async declineNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req['body'] };
      const result = await NotificationService.declineNotification(reqBody);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async updateNotificationByUUID(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req['body'] };
      const result = await NotificationService.updateNotificationByUUID(reqBody);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getuserNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      
      const notificationStatus: string = `${req.query.notificationStatus}`;
      let readStatus: any = '';
      if (notificationStatus === 'read') {
        readStatus = 1;
      } else if (notificationStatus === 'unread') {
        readStatus = 0;
      }
      const result = await NotificationService.getuserNotification(user, readStatus);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (err) {
      next(err);
    }
  }

  static async deleteNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req['body'] };
      const result = await NotificationService.deleteNotification(reqBody);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (err) {
      next(err);
    }
  }

  static async updateUserNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await NotificationService.updateUserNotification(user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (err) {
      next(err);
    }
  }
    
}