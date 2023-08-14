import { NextFunction, Request, Response } from 'express';
import CustomResponse from '../utils/response';
import CarService from '../services/car';
import CarTypeService from '../services/carType';

export default class CarController {
  // ADMIN CAN CREATE CAR
    static async createCar(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        try {
          const user = req['decoded'];
          const reqBody = { ...req['body'] };
          const result = await CarService.createCar(reqBody,user);
          const response = new CustomResponse(res);
          response.setResponse({ result });
        }
        catch (e) {
          next(e);
        }
    }

    static async createCarType(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        const user = req['decoded'];
        const reqBody = { ...req['body'] };
        const reqFiles = { ...req['files'] };
        const result = await CarTypeService.createCarType(reqBody,reqFiles,user);
        const response = new CustomResponse(res);
        response.setResponse({ result });
      }
      catch (e) {
        next(e);
      }
  }

    static async upLoadImage(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
       
        const reqFiles = { ...req['files'] };
        const result = await CarService.upLoadImage(reqFiles);
        const response = new CustomResponse(res);
        response.setResponse({ result });
      }
      catch (e) {
        next(e);
      }
  }


  static async getImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
     
      const reqBody = { ...req['body'] };
      const result = await CarService.getImage(reqBody);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
}


  // ADMIN CAN DELETE CAR
  static async deleteCar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req['decoded'];
      const carInfo = {...req.body };
      const result = await CarService.deleteCar(carInfo,user);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
}

 // ADMIN CAN DELETE CAR
 static async deleteCartype(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = req['decoded'];
    const carInfo = {...req.body };
    const result = await CarTypeService.deleteCartype(carInfo,user);
    const response = new CustomResponse(res);
    response.setResponse({ result });
  }
  catch (e) {
    next(e);
  }
}



  // ADMIN CAN UPDATE CAR 
  static async updateCar(
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<void> {
    try {
    const carInfo = {...req.body };
    const result = await CarService.updateCar(carInfo);
    const response = new CustomResponse(res);
    return response.setResponse({ result });
    } catch (error) {
    next(error);
    }
    } 

 // ADMIN CAN UPDATE CAR 
 static async updateCartype(
  req: Request,
  res: Response,
  next: NextFunction
  ): Promise<void> {
  try {
  const carInfo = {...req.body };
  const reqFiles = { ...req['files'] };
  const result = await CarTypeService.updateCartype(reqFiles,carInfo);
  const response = new CustomResponse(res);
  return response.setResponse({ result });
  } catch (error) {
  next(error);
  }
  } 


   // ADMIN CAN GLOBAL SERACH 
   static async searchCar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await CarService.getCarList({ ...req.query });
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    } catch (error) {
      next(error);
    }
  }

   // ADMIN CAN GLOBAL SERACH 
   static async getAllCarType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await CarTypeService.getCarTypeList({ ...req.query });
      const response = new CustomResponse(res);
      return response.setResponse({ result });
    } catch (error) {
      next(error);
    }
  }

     // ADMIN CAN GLOBAL SERACH 
     static async searchCartype(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        const result = await CarTypeService.searchCartype({ ...req.query });
        const response = new CustomResponse(res);
        return response.setResponse({ result });
      } catch (error) {
        next(error);
      }
    }


  //ADMIN CAN DELETE MULTIPLE CAR AT A TIME
  static async deletemultipleCar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const carIds = req.body.deleteCar;
      const result = await CarService.deletemultipleCar(carIds);
      const response = new CustomResponse(res);
      response.setResponse({ result });
    }
    catch (e) {
      next(e);
    }
}

static async deletemultipleCartype(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const carIds = req.body.deleteCarType;
    const result = await CarTypeService.deletemultipleCartype(carIds);
    const response = new CustomResponse(res);
    response.setResponse({ result });
  }
  catch (e) {
    next(e);
  }
}




    
}