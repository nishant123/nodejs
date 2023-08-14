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
const { CarModel, DriverModel, sequelize } = db;
const serviceName = '[CarDBService]';
import { applicationStatuses } from '../../config/constants';
const { active, inactive } = applicationStatuses.status;


export default class CarDBService extends BaseDbService {
  // CREATE CAR
    static createCar(data: {
      uuid: string,
      carNumber: string;
      carModel: string;
      carCapacity: string;
      carFactor: string;
      carOdometer: string;
      driverName: string;
      driverId:number;
      carTypeName:string,
      carTypeId:number,
      updatedBy:string;
      status: string;
      addDescription: string;
      fromDateTime: string;
      toDateTime: string;
    }) {
        return CarModel.create(data);
    }

    // GET CAR LIST
    static getCar() {
      return CarModel.findAll({
        where: {
          status: active
        },
        order: [
          ['id', 'DESC'],
          ],
        raw: true,
        nest: true
      });
    }

    //GET CAR DETILS
    static getCarById(uuid) {
      return CarModel.findOne({
        where: {
          uuid: uuid
        }
      });
    }
  
  // DELETE CAR
  static deleteCar(uuid) {
    return CarModel.update({
      status: inactive
    }, {
      where: {
        uuid: uuid
      }
    });
  }

  // UPDATE CAR
  static updateCar(carInfo) {
  
      return CarModel.update({
        carNumber : carInfo.carNumber,
        carModel : carInfo.carModel,
        carCapacity : carInfo.carCapacity,
        carFactor : carInfo.carFactor,
        carOdometer : carInfo.carOdometer,
        driverId : carInfo.driverId || 0,
        driverName : carInfo.driverName || '',
        carTypeName:carInfo.carTypeName,
        carTypeId:carInfo.carTypeId,
        addDescription: carInfo.addDescription
      }, {
        where: {
          uuid: carInfo.uuid
        }
      });
    
   
  }

  static updateCarType(carType) {

    return CarModel.update({
      carTypeName:carType.carTypeName
    },{
      where: {
        carTypeId : carType.id
      }
    });
}

//GLOBAL SEARCH
static async getCarList(options) {
  const {
    pageNumber, perPage, keyword
  } = options;
  if (options.pageNumber == 0) {
    throw new CustomError({ serviceName, ...errorManager.INVALID_PAGENUMBER });
  }
  if (options.perPage == 0) {
    throw new CustomError({ serviceName, ...errorManager.INVALID_PERPAGE });
  }
  let searchQuery;
  if (keyword) {
    searchQuery = `select c.uuid, c.carNumber, c.carModel, c.carCapacity, c.carFactor,c.carTypeName,c.carTypeId,c.carOdometer, c.driverId,c.driverName,c.status,c.updatedAt, c.createdAt,c.bookingFees,c.addDescription , d.isOnlineStatus as driverStatus 
FROM car c
left join driver d on d.userId = c.driverId
where (c.status = 'Active')
and c.carNumber LIKE '%`+ keyword + `%'       
order by c.id desc
limit :offsetVal, :limitVal`

    let countSearchQuery = `select c.uuid, c.carNumber , c.carModel, c.carCapacity,c.carTypeName,c.carTypeId, c.carFactor,c.carOdometer, c.driverId,c.driverName,c.status,c.updatedAt, c.createdAt,c.carTypeName,c.carTypeId,c.addDescription, d.isOnlineStatus as driverStatus
FROM car c
left join driver d on d.userId = c.driverId
where c.status = 'Active'
and c.carNumber LIKE '%`+ keyword + `%' 
order by c.id desc`
    let result = await sequelize.query(searchQuery, { replacements: { offsetVal: +perPage * (+pageNumber - 1), limitVal: +perPage }, type: QueryTypes.SELECT });
    let resultTotal = await sequelize.query(countSearchQuery, { type: QueryTypes.SELECT });
    let count = resultTotal.length;
    return { totalCount: count, result }

  } else {
    searchQuery = `select c.uuid, c.carNumber, c.carModel, c.carCapacity,c.carTypeName,c.carTypeId, c.carFactor,c.carOdometer, c.driverId,c.driverName ,c.status,c.updatedAt, c.createdAt,c.addDescription , d.isOnlineStatus as driverStatus
FROM car c
left join driver d on d.userId = c.driverId
where c.status = 'Active'
order by c.id desc
limit :offsetVal, :limitVal`}
  let countQuery = `select c.uuid, c.carNumber, c.carModel, c.carCapacity,c.carTypeName,c.carTypeId, c.carFactor,c.carOdometer, c.driverId ,c.driverName ,c.status,c.updatedAt, c.createdAt ,c.addDescription , d.isOnlineStatus as driverStatus
FROM car c
left join driver d on d.userId = c.driverId
where c.status = 'Active'
order by c.id desc`

  let result = await sequelize.query(searchQuery, { replacements: { offsetVal: +perPage * (+pageNumber - 1), limitVal: +perPage }, type: QueryTypes.SELECT });
  let resultTotal = await sequelize.query(countQuery, { type: QueryTypes.SELECT });
  let count = resultTotal.length;

  return { totalCount: count, result }
}

//GET DRIVER 
  static async getCarByDriverId(options: {
    status: string,
    driverId: number
  }) {
    return CarModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }
}