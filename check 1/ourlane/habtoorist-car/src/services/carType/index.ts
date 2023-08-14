import CarTypeDBService from '../../database/service/carType.dbservice';
import CarDBService from '../../database/service/car.dbservice';
import UserDBService from '../../database/service/user.dbservice';
import NotificationDBService from '../../database/service/notification.dbservice';
import emailService from '../../utils/emailService';
import { v4 as uuid_v4 } from "uuid";
import { roles,liveFeed } from '../../config/constants';
import FileService from '../../utils/file'
import * as path from 'path'
import DriverDBService from '../../database/service/driver.dbservice';
import { object } from 'joi';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
const fs = require('fs'); 
import * as moment from "moment";


const serviceName = '[CarService]';

export default class CarService {
 
  static async createCarType(options: {
    carTypeName: string;
    bookingFee: number;
    pricePerHour: number;
    pricePerHourKM: number;
    pricePerMin: number;
    addDescription: string;
    carImage: string;
    car3dImage: string,
    waitingChargePerMin: number
  },reqFiles, userDetails) {
   
    try {
      const { carTypeName, bookingFee, pricePerHour, pricePerHourKM, pricePerMin, addDescription, carImage,car3dImage, waitingChargePerMin } = options;
     
      let imageUrl;
      let carZipUrl;

      const currentDateTime = moment().utc().format();

      if(carTypeName){
       const carTypeName = await CarTypeDBService.getCarByField({"carTypeName": options.carTypeName})
            if(carTypeName){
              throw new CustomError({ serviceName, ...errorManager.CARTYPE_EXIST });
            }
       }    
     
      if (options.carImage) {
        let filepath = `${Date.now()}_img.png`;
        let buffer = Buffer.from(options.carImage.split(',')[1], "base64");
        imageUrl = await FileService.uploadFiles(filepath, buffer);
      } 

      if(reqFiles.car3dImage){
        const carZipBuffer = fs.readFileSync(reqFiles.car3dImage.path)
        if (carZipBuffer) {
         let filepath = reqFiles.car3dImage.originalFilename;
          carZipUrl = await FileService.uploadFiles(filepath, carZipBuffer);
       } 
      }

      const dataToInsert = { 
        uuid: uuid_v4(),
        carTypeName: carTypeName,
        bookingFee: bookingFee,
        pricePerHour: pricePerHour,
        pricePerHourKM: pricePerHourKM,
        pricePerMin: pricePerMin,
        addDescription: addDescription,
        waitingChargePerMin: waitingChargePerMin,
        updatedBy: userDetails.loginId,
        carImage: imageUrl ? imageUrl["key"] : '',
        car3dImage: carZipUrl ? carZipUrl["key"] : '',
        status: 'Active',
      };
      const carObj = await CarTypeDBService.createCarType(dataToInsert);
      return carObj;
    }
    catch (error) {
      throw error;
    }
  }

  static async getCarTypeList(options) {
    
    return await CarTypeDBService.getCarTypeList(options);
  }

    //GLOBAL SEARCH WITH PAGINATION
    static async searchCartype(options) {
      return  await CarTypeDBService.searchCartype(options);
    }

  // UPDATE CAR
 
  static async updateCartype(reqFiles,carInfo) {
    if(!carInfo.uuid){
      return {
        msg: "Please provide uuid for update the cartype"
      }
    }
    const carData = await CarTypeDBService.getCarByField({uuid:carInfo.uuid});
    if (!carData) {
      throw new CustomError({ serviceName, ...errorManager.CARTYPE_NOT_FOUND });
    }

    if (carInfo.carImage) {
      let filepath = `${Date.now()}_img.png`;
      let buffer = Buffer.from(carInfo.carImage.split(',')[1], "base64");
      let imageUrl = await FileService.uploadFiles(filepath, buffer);
      carInfo.imageUrl = imageUrl
    } 

    if(reqFiles.car3dImage){
      const carZipBuffer = fs.readFileSync(reqFiles.car3dImage.path)
      if (carZipBuffer) {
       let filepath = reqFiles.car3dImage.originalFilename;
       let carZipUrl = await FileService.uploadFiles(filepath, carZipBuffer);
       carInfo.car3dImage = carZipUrl
     } 
   }

    const carTypeUpdate = await CarTypeDBService.updateCartype(
      carInfo
    );

    const updateCar = await CarDBService.updateCarType({carTypeName:carInfo.carTypeName,id:carInfo.id })

    if (carTypeUpdate) {
      return {
        msg: "Cartype updated successfully"
      }
    }

  }

  static async deleteCartype(carInfo: any,user:any) {
    try {
      const carData = await CarTypeDBService.getCarByField({uuid:carInfo.uuid});
      if (!carData) {
        throw new CustomError({ serviceName, ...errorManager.CARTYPE_NOT_FOUND });
      }
      const memberDeleted = await CarTypeDBService.deleteCartype({uuid:carInfo.uuid});
      if (memberDeleted) { 
        return {
          msg: "Car deleted successfully"
        }
      }
    }
    catch (error) {
      return {
        msg: "Somthing went wrong"
      }
    }
  }

  static async deletemultipleCartype(carData) {
    if (carData.length  === 0) {
      throw new CustomError({ serviceName, ...errorManager.CARTYPE_NOT_FOUND });
    }
    for (let i = 0; i < carData.length; i++) {
      const result = await CarTypeDBService.getCarByField({uuid:carData[i]});
      if (!result) {
        throw new CustomError({ serviceName, ...errorManager.CAR_NOT_FOUND });
      }
        await CarTypeDBService.deleteCartype({uuid:carData[i]});
    }
    return 'Car Type Deleted Successfully';
  }

 
 
 
 
}




