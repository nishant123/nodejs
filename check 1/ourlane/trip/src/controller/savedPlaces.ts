import { NextFunction, Request, Response } from 'express';
import CustomResponse from '../utils/response';
import SavedPlacesService from '../services/savedPlaces';

export default class AddressController {
  // USER CAN SAVE ADDRESS
    static async createAddress(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        try {
          const user = req['decoded'];
          const reqBody = { ...req['body'] };
          const result = await SavedPlacesService.createAddress(reqBody, user);
          const response = new CustomResponse(res);
          response.setResponse({ result });
        }
        catch (e) {
          next(e);
        }
    }

       // USER LIST
       static async getAddress(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        try {
          const user = req['decoded'];
          const result = await SavedPlacesService.getAddress(user);
         
          const response = new CustomResponse(res);
          response.setResponse({ result });
        }
        catch (e) {
          next(e);
        }
    }
    
}