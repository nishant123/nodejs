// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from 'express';
import * as Excel from 'exceljs';
import CustomResponse from '../utils/response';
import UserService from '../services/user';
import FileService from '../utils/file'

export default class UserController {
  static async getUserList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await UserService.getUserList(user, req.body);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqBody = { ...req['body'] };
      const file = req['files']
      const result = await UserService.updateUser(user, reqBody, file);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async downloadUserList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const workbook: Excel.Workbook = await UserService.downloadUserList(user, req.body);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `${'attachment; filename="ola-details-'}${new Date()}.xlsx"`);
      await workbook.xlsx.write(res);
      return res.end();
    }
    catch (e) {
      next(e);
    }
  }


  static async userById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const result = await UserService.fetchByUserId(user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqBody = { ...req['body'] };
      const result = await UserService.deleteUser(user, reqBody);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

//ADMIN CAN DELETE MULTIPLE USER AT A TIME
  static async deletemultipleUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userIds = req.body.deleteUser;
      const result = await UserService.deletemultipleUser(userIds);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async approveUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const reqBody = { ...req['body'] };
      const result = await UserService.approveUser(user, reqBody);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }
  static async declineUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqBody = { ...req['body'] };
      const result = await UserService.declineUser(reqBody);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }
  // GET DRIVER LIST
  static async getDriver(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await UserService.getDriver();
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

  static async getImageByLocation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const fileName = req.query.fileName
      const result = await FileService.getImageByLocation(fileName);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
  }

    // GET ALL ADMIN
    static async getAdmin(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        const result = await UserService.getAdmin();
        const response = new CustomResponse(res);
        response.setResponse({ result });
      }
      catch (e) {
        next(e);
      }
    }
}
