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
import { vars } from '../../config/vars';
const { localhost } = vars;


const serviceName = '[CarService]';

export default class CarService {
  // CREATE CAR
  static async createCar(options: {
    carNumber: string;
    carModel: string;
    carCapacity: string;
    driverStatus: string;
    carFactor: string;
    carOdometer: string;
    driverId: string;
    carTypeName:string
    carTypeId:number,
    addDescription: string;
  
  }, userDetails) {
   
    try {
      const { carNumber, carModel, carCapacity, driverStatus, carFactor, carOdometer, driverId, carTypeName,carTypeId,addDescription } = options;
      let driver = { fullName: '', id: 0 }
      if (driverId) {
        driver = await UserDBService.getByUserId({ id: driverId});
      }

      const currentDateTime = moment().utc().format();

      const dataToInsert = { 
        uuid: uuid_v4(),
        carNumber: carNumber,
        carModel: carModel,
        carCapacity: carCapacity,
        carFactor: carFactor,
        carOdometer: carOdometer,
        driverName: driver ? driver.fullName : '',
        driverId: driver ? driver.id : null,
        carTypeName:carTypeName,
        carTypeId:carTypeId,
        updatedBy: userDetails.loginId,
        status: 'Active',
        addDescription: addDescription,
        fromDateTime: currentDateTime,
        toDateTime: currentDateTime
      };
      
      const carObj = await CarDBService.createCar(dataToInsert);

      if(carObj){
        const datainsert = {name:'carAdd', message: ` New car ${carModel} has been added to the platform `, type : liveFeed.NOTIFICATION }
        const notificationObj = await NotificationDBService.createlive(datainsert);
        const adminData =  await UserDBService.getAdmin({"role":roles.ADMIN, isActive:true })
        if(adminData){
           adminData.rows.forEach((data)=>{
              const data1         = { email: data.loginId , type: 'addingCar' };
              const emailVariables = {  CAR_MODEL: carObj.carModel , CAR_NUMBER: carObj.carNumber, LOCALHOST: localhost };
              emailService(data1, emailVariables);
              })
        }
      }
           
      if (driverId && driverStatus) {
        const params = {
          status: driverStatus,
          tripId: ''
        }
        const userObj = {
          id: driverId
        }
        await DriverDBService.updateCarDriver(params, userObj);
      }

      return carObj;
    }
    catch (error) {
      throw error;
    }
  }

  static async upLoadImage(reqFiles) {
    let profileImage;

     if (reqFiles.profileImage) {
 
       const carZipBuffer = fs.readFileSync(reqFiles.profileImage.path)
       if (carZipBuffer) {
         let filepath = `${Date.now()}_file.png`;
         let imageUrl = await FileService.uploadFiles(filepath, carZipBuffer);
    
         profileImage = (imageUrl) ? imageUrl["key"] : '';
       }
     
     } 
     return profileImage
   }
 
   static async getImage(body) {

     return await FileService.getImageByLocation(body.profileImage)
 
   }
 
  


  //DELETE CAR
  static async deleteCar(carInfo: any,user:any) {
    try {
      const cars = await CarDBService.getCarById(carInfo.uuid);
      if (!cars) {
        return {
          msg: "Car not found"
        }
      }
      const memberDeleted = await CarDBService.deleteCar(carInfo.uuid);
      if (memberDeleted) { 
        const object = {
          name : "carRemove",
          message :  `${cars.carModel} car with  the vehicle number  ${cars.carNumber} has been removed from the platform`,
          type : liveFeed.NOTIFICATION
          }
         await NotificationDBService.createNotification(object)
         const adminData =  await UserDBService.getAdmin({"role":roles.ADMIN, isActive:true })
         if(adminData){
            adminData.rows.forEach((data)=>{
               const data1         = { email: data.loginId , type: 'deletingCar' };
               const emailVariables = {  CAR_MODEL: cars.carModel , CAR_NUMBER: cars.carNumber , ADMIN_NAME:user.FullName , LOCALHOST: localhost };
               emailService(data1, emailVariables);
               })
         } 
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

  // UPDATE CAR
  static async updateCar(carInfo) {
    if(!carInfo.uuid){
      return {
        msg: "Please provide uuid for update the car"
      }
    }
    const users = await CarDBService.getCarById(carInfo.uuid);
    if (!users) {
      return {
        msg: "Car not found"
      }
    }
    
    const carUpdate = await CarDBService.updateCar(
      carInfo
    );
    if (carInfo.driverId && carInfo.driverStatus) {
      const params = {
        status: carInfo.driverStatus,
        tripId: ''
      }
      const userObj = {
        id: carInfo.driverId
      }
      await DriverDBService.updateCarDriver(params, userObj);
    }
    if (carUpdate) {
      return {
        msg: "Car updated successfully"
      }
    }

  }

  //GLOBAL SEARCH WITH PAGINATION
  static async getCarList(options) {
    return CarDBService.getCarList(options);
  }

  
  //ADMIN CAN DELETE MULTIPLE CAR AT A TIME
  static async deletemultipleCar(carData) {
    if (carData.length  === 0) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_CARS });
    }
    for (let i = 0; i < carData.length; i++) {
      const result = await CarDBService.getCarById(carData[i]);
      if (!result) {
        throw new CustomError({ serviceName, ...errorManager.CAR_NOT_FOUND });
      }
        await CarDBService.deleteCar( carData[i]);
    }
    return 'Car Deleted Successfully';
  }
}




