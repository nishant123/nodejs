import { Op, Sequelize, QueryTypes } from 'sequelize';
import db from '..';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import { BaseDbService } from './base.dbservice';
import { v4 as uuid_v4 } from "uuid";
import Driver from '../models/driver.model';
import CarDBService from '../../database/service/car.dbservice';
import { applicationStatuses } from '../../config/constants';
import TripService from '../../database/service/trip.dbservice';
import FileService from '../../utils/file';
import { count } from 'console';
import { Float } from 'aws-sdk/clients/ec2';
import Users from '../models/users.model';

const { DriverModel, UserModel, TripModel, CarModel, sequelize } = db;
const serviceName = '[DriverDBService]';

export default class DriverDBService extends BaseDbService {
  // CREATE ADDRESS

  static fareCalculation(options: {
    totalDistance: Float;
    totalTime: Float;
    pricePerKM: Float;
    pricePerMin: Float;
    bookingFee: Float;
    pricePerHour: Float;
    bookedHours: number;
  }) {
    if (options.bookedHours) {
      // Formula : Booking Fees + booked hours * price per hour
      const amount = options.bookingFee + (options.bookedHours * options.pricePerHour);
      return amount;
    } else {
      // Formula : Booking Fees + ETA min * Price per min + ETA km * Price per km
      const timeAmount = (options.totalTime * options.pricePerMin);
      const kilometerAmount = (options.totalDistance * options.pricePerKM);
      const amount = (options.bookingFee + timeAmount + kilometerAmount);
      return amount;
    }
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
  
}