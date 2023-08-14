import * as Excel from 'exceljs';
import * as moment from 'moment';
import SavedPlacesDBService from '../../database/service/savedPlaces.dbservice';
import UserDBService from '../../database/service/user.dbservice';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import * as bcrypt from 'bcryptjs';
import * as randomstring from 'randomstring';
import { v4 as uuid_v4 } from "uuid";
import { Integer } from 'aws-sdk/clients/apigateway';


const serviceName = '[SavedPlacesService]';

export default class SavedPlacesService {

  static  isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}
 
  // CREATE ADDRESS
  static async createAddress(options: {
    locationType: string;
    endLocationName: string;
    endLat: number;
    enLong: number;
    customerId: string;

  }, userDetails) {

    if(!this.isFloat(options.endLat)){
      throw new CustomError({ serviceName, ...errorManager.INVALID_LAT });
    }
    if(!this.isFloat(options.enLong)){
      throw new CustomError({ serviceName, ...errorManager.INVALID_LONG });
    }
    try {
      const addressData = {
        locationType:options.locationType , customerId: userDetails.uuid
      }
      
      const locationData = {
          endLocationName: options.endLocationName, customerId: userDetails.uuid
      }
      const addressGetObj = await SavedPlacesDBService.getSaveAddress(addressData);
      if(addressGetObj){
        throw new CustomError({ serviceName, ...errorManager.ADDRESS_ERROR });
      }
      const locationGetObj = await SavedPlacesDBService.getSaveLocation(locationData);
      if(locationGetObj){
        throw new CustomError({ serviceName, ...errorManager.ADDRESS_LOCATION_ERROR });
      }
      const { locationType, endLocationName,endLat, enLong } = options;
      const dataToInsert = {
        uuid: uuid_v4(),
        locationType: locationType,
        endLocationName: endLocationName,
        endLat: endLat,
        enLong: enLong,
        customerId: userDetails.uuid,
      };
      const addressObj = await SavedPlacesDBService.createAddress(dataToInsert);
      return addressObj;
    }
    catch (error) {
      throw error;
    }
  }

     // USER LIST
     static async getAddress(user) {
      return SavedPlacesDBService.getAddress(user);
    }
    
 
  





  // function close
}