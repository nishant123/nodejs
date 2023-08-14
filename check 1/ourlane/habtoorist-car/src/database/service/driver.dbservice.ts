import { Op, Sequelize, QueryTypes } from 'sequelize';
import db from '..';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import { BaseDbService } from './base.dbservice';
import { v4 as uuid_v4 } from "uuid";
import Driver from '../models/driver.model';
import CarDBService from '../../database/service/car.dbservice';
import { applicationStatuses } from '../../config/constants';
import FileService from '../../utils/file';
import { count } from 'console';
import { Float } from 'aws-sdk/clients/ec2';
import Users from '../models/users.model';

const { DriverModel, UserModel, CarModel, sequelize } = db;
const serviceName = '[DriverDBService]';

export default class DriverDBService extends BaseDbService {
  // CREATE ADDRESS
  static createDriver(data: {
    uuid: string,
    locationName: string;
    addressLatitude: string;
    addressLongitude: string;
    userId: number;
  }) {
    return DriverModel.create(data);
  }

  static async getNearestCab(options: {
    latitude: Float;
    longitude: Float;
    totalKms: number;
    totalTimeInMinute: number;
  }, kilometer: number) {
    const { latitude, longitude } = options;
    const result = await sequelize.query(`SELECT u.fullName as driverName,
      u.mobileNumber as driverMobileNumber, d.userId as driverId,
      d.locationName, d.addressLatitude,
      d.addressLongitude, c.id as carId,
      c.pricePerKilometer, c.pricePerminute,
      c.carNumber,c.carModel,d.isOnlineStatus as driverStatus,
      c.carCapacity, c.carImage, c.bookingFees, c.addDescription,
      p.distance_unit
               * DEGREES(ACOS(COS(RADIANS(p.latpoint))
               * COS(RADIANS(d.addressLatitude))
               * COS(RADIANS(p.longpoint) - RADIANS(d.addressLongitude))
               + SIN(RADIANS(p.latpoint))
               * SIN(RADIANS(d.addressLatitude)))) AS distanceInKm
      FROM driver AS d
      JOIN (
        SELECT :inputLat AS latpoint, :inputLng AS longpoint,
               50.0 AS radius, 111.045 AS distance_unit
        ) AS p ON 1=1
       inner join users u on u.id=d.userId
       inner join car c on c.driverId=d.userId
       WHERE d.isOnlineStatus = 'Available' and c.status='Active'
              AND p.distance_unit
               * DEGREES(ACOS(COS(RADIANS(p.latpoint))
               * COS(RADIANS(d.addressLatitude))
               * COS(RADIANS(p.longpoint) - RADIANS(d.addressLongitude))
               + SIN(RADIANS(p.latpoint))
               * SIN(RADIANS(d.addressLatitude))))  < :kilometer and
               d.addressLatitude
      BETWEEN p.latpoint  - (p.radius / p.distance_unit)
              AND p.latpoint  + (p.radius / p.distance_unit)
              AND d.addressLongitude BETWEEN p.longpoint - (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint))))
              AND p.longpoint + (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint))))
      ORDER BY distanceInKm`, { replacements: { inputLat: latitude, inputLng: longitude, kilometer: kilometer }, type: QueryTypes.SELECT });

    await result.forEach(async e => {
      const param = {
        total_distance: options.totalKms, // e.distanceInKm,
        total_time: options.totalTimeInMinute,
        price_kilometer: e.pricePerKilometer,
        price_perminute: e.pricePerminute,
        booking_fee: e.bookingFees
      };
      const totalFare = this.fareCalculation(param);
      e.totalFare = totalFare;
    });
    return result;
  }

  static fareCalculation(options: {
    total_distance: Float;
    total_time: Float;
    price_kilometer: Float;
    price_perminute: Float;
    booking_fee: Float;
  }) {
    // Formula : Booking Fees + ETA min * Price per min + ETA km * Price per km
    const timeAmount = (options.total_time * options.price_perminute);
    const kilometerAmount = (options.total_distance * options.price_kilometer);
    const amount = (options.booking_fee + timeAmount + kilometerAmount);
    return amount;
  }


  static async getDriverById(options: {
    userId: number,
  }) {
    return DriverModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }

  static deleteDriver(uuid) {
    return UserModel.update({
      isDeleted: 1
    }, {
      where: {
        uuid: uuid
      }
    });
  }
  static async getDrivers() {
    let drivers = await sequelize.query(`SELECT a.id, a.userId,a.uuid, b.fullName, b.mobileNumber, b.loginId, a.isOnlineStatus, a.createdAt FROM .driver as a, .users as b where a.userId=b.id and role='DRIVER' and a.status='Active' order by createdAt desc;`,
      { type: QueryTypes.SELECT });
    let arr = [];
    for (let i = 0; i < drivers.length; i++) {
      let obj = {
        id: drivers[i].id,
        driverId: drivers[i].userId,
        userId: drivers[i].userId,
        uuid: drivers[i].uuid,
        fullName: drivers[i].fullName,
        mobileNumber: drivers[i].mobileNumber,
        loginId: drivers[i].loginId,
        status: drivers[i].isOnlineStatus,
        createdAt: drivers[i].createdAt,
        completedTrips: 0,
        rejectedTrips: 0,
        cancelledTrips: 0,
        rating: 0,
        kmTravelled: 0,
        totalEarnings: 0
      }
      const status = await sequelize.query(`SELECT status, count(*) as count FROM .trip where driverId=${drivers[i].userId} group by status;`, { type: QueryTypes.SELECT });
      status.filter(f => {
        if (f.status === 'COMPLETED') {
          obj.completedTrips = f.count
        }
        if (f.status === 'REJECTED') {
          obj.rejectedTrips = f.count
        }
        if (f.status === 'CANCELED') {
          obj.cancelledTrips = f.count
        }
      })
      const ratingAndKm = await sequelize.query(`SELECT ratingDriver, startLat,startLong,endLat,endLong FROM .trip WHERE driverId=${drivers[i].userId} and status='COMPLETED'`, { type: QueryTypes.SELECT });
      let ratingSum = 0;
      let numOfRating = 0;
      let kmSum = 0;
      ratingAndKm.forEach(rate => {
        if (!isNaN(rate.rating_driver)) {
          ratingSum += parseFloat(rate.rating_driver);
          numOfRating++;
        }
        const R = 6371;
        let dLat = (rate.end_lat - rate.start_lat) * (Math.PI / 180);
        let dLon = (rate.end_long - rate.start_long) * (Math.PI / 180);
        let a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((rate.start_lat) * (Math.PI / 180)) * Math.cos((rate.end_lat) * (Math.PI / 180)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
          ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        kmSum += d;
      });
      obj.rating = numOfRating > 0 ? (ratingSum / numOfRating) : 0;
      obj.kmTravelled = kmSum;
      arr.push(obj);
    }
    return arr;
  }

  static async updateCarDriver(options: {
    status: string;
  }, userDetails) {
    return DriverModel.update({
      isOnlineStatus: options.status
    }, {
      where: {
        userId: userDetails.id
      }
    });
  }
  static async updateDriverStatus(options, userId) {
    return DriverModel.update(options, {
      where: {
        userId: userId
      }
    });
  }

  static async getDriverCars(options: {
    id: string,
    role:string
  }) {
    return UserModel.findAndCountAll({
      where: options,
      attributes:['fullName','mobileNumber','role'],
      include: [{
        model: CarModel,
        attributes : ['carModel','carNumber','carFactor','carCapacity','carOdometer','status','carImage' ],
        as: 'driverCarInfo',
      }]
    });

  }
}