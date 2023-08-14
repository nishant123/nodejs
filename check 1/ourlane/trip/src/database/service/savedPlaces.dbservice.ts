import { Op, Sequelize } from 'sequelize';
import db from '..';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import { BaseDbService } from './base.dbservice';
import { uuid } from 'uuidv4';

const { SavedPlacesModel } = db;
const serviceName = '[SavedPlacesDBService]';

export default class SavedPlacesDBService extends BaseDbService {
  // CREATE ADDRESS
  static createAddress(data: {
    uuid: string,
    locationType: string;
    endLocationName: string;
    endLat: number;
    enLong: number;
    customerId:string;
    
  }) {
      return SavedPlacesModel.create(data);
  }

  //CHECKING SAVE ADDRESS 
  static getSaveAddress(options: {
    locationType:string ,
    customerId: string
  }) {
    return SavedPlacesModel.findOne({
      where: options
     
    });
  }

  //CHECKING SAVE LOCTION 
  static getSaveLocation(options: {
    endLocationName:string,
    customerId: string
  }) {
    return SavedPlacesModel.findOne({
      where: options
     
    });
  }
  
  // GET USER LIST
      static getAddress(user) {
        return SavedPlacesModel.findAll({
          where: {
            status: 1,
            customerId: user.uuid

          },
          order: [
            ['id', 'DESC'],
            ],
          raw: true,
          nest: true
        });
      }
   
}