import { Op, Sequelize ,QueryTypes} from 'sequelize';
import db from '..';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import { BaseDbService } from './base.dbservice';
import { uuid } from 'uuidv4';
import { vars } from '../../config/vars';
import FileService from '../../utils/file'
import * as fs from 'fs'
import * as path from 'path'
const { CarTypeModel, sequelize } = db;
const serviceName = '[CarTypeDBService]';
import { applicationStatuses } from '../../config/constants';
const { active, inactive } = applicationStatuses.status;

export default class CarDBService extends BaseDbService {
   
  
      static createCarType(data: {
      uuid: string,  
      carTypeName: string,
      bookingFee: number,
      pricePerHour: number,
      pricePerHourKM: number,
      pricePerMin: number,
      addDescription: string,
      carImage: string,
      car3dImage:string,
      waitingChargePerMin: number,
      }) {
          return CarTypeModel.create(data);
      }
  
      //GET CAR DETILS
      static getCarByField(object) {
        return CarTypeModel.findOne({
          where: object
        });
      }
  
  //GLOBAL SEARCH
  static async getCarTypeList(options) {

    return CarTypeModel.findAll({
      where: {
        status: "Active"
      },
      order: [
        ['id', 'DESC'],
        ],
      raw: true,
      nest: true
    });
    
  }


    // DELETE CAR
    static deleteCartype(object) {
      return CarTypeModel.update({
        status: inactive
      }, {
        where: object
      });
    }

  static updateCartype(carInfo) {
    if(carInfo.imageUrl && carInfo.car3dImage ){
      return CarTypeModel.update({
        carTypeName: carInfo.carTypeName,
        bookingFee : carInfo.bookingFee,
        pricePerHour : carInfo.pricePerHour,
        pricePerHourKM : carInfo.pricePerHourKM,
        pricePerMin : carInfo.pricePerMin,
        carImage:  carInfo.imageUrl["key"],
        car3dImage :carInfo.car3dImage["key"],
        addDescription: carInfo.addDescription,
        waitingChargePerMin: carInfo.waitingChargePerMin
      }, {
        where: {
          uuid: carInfo.uuid
        }
      });
    } else if( carInfo.car3dImage ){
      return CarTypeModel.update({
        carTypeName: carInfo.carTypeName,
        bookingFee : carInfo.bookingFee,
        pricePerHour : carInfo.pricePerHour,
        pricePerHourKM : carInfo.pricePerHourKM,
        pricePerMin : carInfo.pricePerMin,
        car3dImage :carInfo.car3dImage["key"],
        addDescription: carInfo.addDescription,
        waitingChargePerMin: carInfo.waitingChargePerMin
      }, {
        where: {
          uuid: carInfo.uuid
        }
      });
    } else if( carInfo.carImage ){
      return CarTypeModel.update({
        carTypeName: carInfo.carTypeName,
        bookingFee : carInfo.bookingFee,
        pricePerHour : carInfo.pricePerHour,
        pricePerHourKM : carInfo.pricePerHourKM,
        pricePerMin : carInfo.pricePerMin,
        carImage:  carInfo.imageUrl["key"],
        addDescription: carInfo.addDescription,
        waitingChargePerMin: carInfo.waitingChargePerMin
      }, {
        where: {
          uuid: carInfo.uuid
        }
      });
    }
    else{
      return CarTypeModel.update({
        carTypeName: carInfo.carTypeName,
        bookingFee : carInfo.bookingFee,
        pricePerHour : carInfo.pricePerHour,
        pricePerHourKM : carInfo.pricePerHourKM,
        pricePerMin : carInfo.pricePerMin,
        addDescription: carInfo.addDescription,
        waitingChargePerMin: carInfo.waitingChargePerMin
      }, {
        where: {
          uuid: carInfo.uuid
        }
      });
    }
   
  }

  static async searchCartype( options: {
    searchByName?: string
    pageNumber: number,
    perPage: number,
  }) {
    const {
      searchByName, pageNumber, perPage
    } = options;
    const search = searchByName;
    const criteria = []
    
    criteria.push({
      status: 'Active'
    });

    if (search && search.trim().length) {
      criteria.push({
        [Op.or]: [
          {
            carTypeName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('carTypeName')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          }
        ]
      });
    }
    const result = CarTypeModel.findAndCountAll({
      where: {
        [Op.and]: criteria
      },
      order: [
        ['updatedAt', 'DESC']
      ],
      raw: true,
      nest: true,
      offset: +perPage * (+pageNumber - 1),
      limit: +perPage
    });

    return result;

  }
  
 
  }