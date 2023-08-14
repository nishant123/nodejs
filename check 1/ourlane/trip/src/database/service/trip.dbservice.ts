// import { Integer } from 'aws-sdk/clients/apigateway';
import * as moment from 'moment';
// import { String } from 'aws-sdk/clients/cloudsearchdomain';
import { Op, Sequelize, QueryTypes } from 'sequelize';
import db from '..';
import { applicationStatuses } from '../../config/constants';
import Users from '../models/users.model';
import CarDbService from '../service/car.dbservice';
import DriverDbService from '../service/driver.dbservice';
import FileService from '../../utils/file'
import CarTypeDbService from '../service/carType.dbservice';


const {
  TripModel, RideModel, UserModel, CustomerSendStatusModel, DriverModel, CarModel, sequelize
} = db;
// CustomerTripService
export default class TripService {
  static createTrip(data: {
    uuid: string,
    tripId: string,
    tripDate: string,
    locationType: string,
    startLocationName: string,
    endLocationName: string,
    startLat: number,
    startLong: number,
    endLat: number,
    endLong: number,
    customerId: Number,
    paymentType: String,
    cardType: String,
    cardNo: Number,
    paymentAmount: Number,
    status: String,
    otp: String,
    totalKms: Number,
    totalTimeInMinute: Number,
    tripType: string,
    pickUpTime: String,
    bookedHours?: number
  }) {
    return TripModel.create(data);
  }

  static findTrip(options: {
    uuid: string
  }) {
    return TripModel.findOne({
      where: options,
      include: [{
        model: UserModel,
        as: 'driver_details',
        attributes: ['fullName', 'mobileNumber', 'loginId', 'countryCode'],
      }, {
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName', 'mobileNumber', 'loginId', 'countryCode'],
      }],
      raw: true,
      nest: true
    });
  }

  static getRideTypes() {
    return RideModel.findOne({
      include: [ {
        model: RideModel,
        as: 'ridetype_details',
        attributes: ['ride_type', 'ride_type_desc', 'code'],
      }],
      order: [
        ['id', 'DESC']
      ],
      raw: true,
      nest: true
    });
  }
  static getDriverTrip(options: {
    driverId: number,
    status: string
  }) {
    return TripModel.findOne({
      where: options,
      include: [ {
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName', 'mobileNumber', 'profileImage'],
      }],
      order: [
        ['updatedAt', 'DESC']
      ],
      raw: true,
      nest: true
    });
  }


  static async updateTripDetails(data, query) {
    return TripModel.update(
      data,
      {
        where: query
      }
    );
  }

  static async getTripList(options: {
    searchByName?: string
    pageNumber: number,
    perPage: number,
    tripStatus: string
  }) {
    const {
      searchByName, pageNumber, perPage, tripStatus
    } = options;

    const criteria: any[] = [{ }];

    const search = searchByName;
    if (tripStatus && tripStatus.length) {
      if (tripStatus === 'Completed') {
        criteria.push({
          [Op.or]: [{ status: tripStatus }, { status: 'Cancelled' }, { status: 'Rejected' }]
        });
      } else {
        const OR = [];
        OR.push({
          status: tripStatus,
        });
        criteria.push({
          [Op.or]: OR
        });
      }
    }
    if (search && search.trim().length) {
      criteria.push({
        [Op.or]: [
          {
            tripId: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('tripId')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          },
          {
            fullName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('driver_details.fullName')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          },
          ,
          {
            fullName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('customer_details.fullName')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          }
        ]
      });
    }

    const attribute = ['uuid', 'tripId', 'tripDate', 'status', 'startLocationName', 'endLocationName', 'driverId','customerId',
    'paymentType', 'paymentAmount', 'totalKms', 'totalTimeInMinute', 'description',
    'customerFeedback', 'driverFeedback', 'ratingCustomer', 'ratingDriver', 'canceledBy', 'totalKms', 'totalTimeInMinute', 'tripType', 'startLat', 'startLong', 'endLat', 'endLong'
    ];
    
    let tripDetails = await TripModel.findAndCountAll({
      where: {
        [Op.and]: criteria
      },
      attributes: attribute,
      include: [{
        model: UserModel,
        as: 'driver_details',
        attributes: ['fullName', 'mobileNumber', 'profileImage'],
      }, {
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName', 'mobileNumber', 'profileImage'],
      }],
      order: [
        ['updatedAt', 'DESC']
      ],
      raw: true,
      nest: true,
      offset: pageNumber ? (+pageNumber - 1) * perPage : null,
      limit: pageNumber ? +perPage : null,
    });
    
    return tripDetails;
  }

  static createCountObj(queryObj) {
    delete queryObj.limit;
    delete queryObj.offset;
    delete queryObj.order;
    delete queryObj.attributes;
    delete queryObj.group;
    return queryObj;
  }


  static getTripDetails(tripId) {
    return TripModel.findOne({
      where: { tripId: tripId },
      attributes: ['uuid', 'tripId', 'tripDate', 'status',
        'startLocationName', 'endLocationName', 'paymentType',
        'paymentAmount', 'startLat', 'startLong', 'endLat',
        'endLong', 'driverId', 'customerId', 'ratingCustomer',
        'ratingDriver', 'pickUpTime', 'dropTime', 'bookedHours', 'tripType'
      ],
      include: [{
        model: UserModel,
        as: 'driver_details',
        attributes: ['fullName','countryCode','mobileNumber', 'profileImage','uuid'],
      }, {
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName','countryCode','mobileNumber', 'profileImage'],
      }],
      order: [
        ['updatedAt', 'DESC']
      ],
      raw: true,
      nest: true
    });
  }

  static shareCustomerStatus(data: {
    uuid: string,
    tripId: string,
    receiverId: string,
    shareMethod: string,
    message: string
  }) {
    return CustomerSendStatusModel.create(data);
  }


  static async getCompleteTrip(data: {
    uuid: string,
    totalKms: number,
    totalTimeInMinute: number,
    waitingTime: number
  }) {
    let tripDetails = await TripModel.findOne({
      include: [{
        model: UserModel,
        as: 'driver_details',
        attributes: ['fullName', 'mobileNumber', 'loginId'],
      }, {
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName', 'mobileNumber', 'loginId'],
      }],
      where:
      {
        uuid: data.uuid
      },
      raw: true,
      nest: true
    });

    const currentDate = moment().utc().format('YYYY-M-DD HH:mm:ss');
    const start = moment(tripDetails.pickUpTime, 'YYYY-M-DD HH:mm:ss');
    const end = moment(currentDate, 'YYYY-M-DD HH:mm:ss');
    const totalMinute = end.diff(start, 'minutes');
    
    const carDetails = await CarDbService.getCarByDriverId({ status: 'Active', driverId: tripDetails.driverId });
    let totalFare = 0;
    let waitingCharge = 0;
    if (carDetails) {
      const carTypeDetails = await CarTypeDbService.getCarByField({ id: carDetails.carTypeId });
      const param = {
        total_distance: data.totalKms,
        total_time: totalMinute,
        price_kilometer: carTypeDetails.pricePerHourKM,
        price_perminute: carTypeDetails.pricePerMin,
        booking_fee: carTypeDetails.bookingFee,
        price_perHour: carTypeDetails.pricePerHour,
        booked_Hours: tripDetails.bookedHours || 0,
        waitingTime: tripDetails.waitingTime || 0,
        waitingChargePerMin: carTypeDetails.waitingChargePerMin
      };
      ({ totalFare, waitingCharge } = DriverDbService.fareCalculation(param));
    }
    tripDetails.carModel = carDetails.carModel;
    tripDetails.totalFare = totalFare;
    tripDetails.waitingCharge = waitingCharge;

    return tripDetails;
  }

  static async updateTripRequestStatus(options: {
    uuid: string;
    status: string;
  }, userDetails) {
    return TripModel.update({
      status: options.status
    }, {
      where: {
        driverId: userDetails.id,
        uuid: options.uuid
      }
    });
  }

 
  static async getTotalDrivers() {
    return DriverModel.findAndCountAll({
      raw: true,
      nest: true
    });
  }



  static async executeCustomQuery(query) {
    return sequelize.query(query,
      {
        nest: true,
        raw: true,
        type: QueryTypes.SELECT,
      });
  }




  static async getScheduledTrip(now: any, currTo30Minute: any, driverId = null) {
    const criteria = [];
    if (driverId) {
      criteria.push({
        driverId: driverId
      });
    }
    criteria.push({
      pickUpTime: {
        [Op.between]: [now, currTo30Minute]
      }
    });
    return TripModel.findAll({
      where: {
        [Op.and]: criteria,
        status: 'Scheduled',
        tripType: 'Scheduled'
      },
      attributes: ['id', 'uuid', 'tripId', 'tripDate', 'driverId', 'otp', 'pickUpTime', 'customerId', 'totalTimeInMinute'],
      include: [{
        model: UserModel,
        as: 'driver_details',
        attributes: ['fullName', 'mobileNumber'],
      }, {
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName', 'mobileNumber', 'countryCode'],
      }],
      raw: true,
      nest: true
    });
  }

  static async getTrips(userDetails) {
    const criteria: any[] = [{}];
    const OR = [];
    OR.push({
      status: { [Op.ne]: 'Rejected' },
      driverId: userDetails.id
    });
    criteria.push({
      [Op.or]: OR
    });

    let tripDetails = await TripModel.findAndCountAll({
      where: {
        [Op.and]: criteria
      },
      attributes: ['uuid', 'tripId', 'tripDate', 'status', 'startLocationName', 'endLocationName', 'driverId',
        'paymentType', 'paymentAmount', 'totalKms', 'totalTimeInMinute',
        'customerFeedback', 'driverFeedback', 'ratingCustomer', 'ratingDriver', 'canceledBy', 'totalKms', 'totalTimeInMinute', 'tripType', 'startLat', 'startLong', 'endLat', 'endLong'
      ],
      include: [{
        model: UserModel,
        as: 'driver_details',
        attributes: ['fullName', 'mobileNumber', 'profileImage'],
      }, {
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName', 'mobileNumber', 'profileImage'],
      }],
      order: [
        ['updatedAt', 'DESC']
      ],
      raw: true,
      nest: true
    });
    return tripDetails;
  }

  static async getAllTrips(options: {
    customerId : string,
    status : string
  }) {
    const criteria: any[] = [{}];
    const OR = [];
    OR.push({
      status: { [Op.ne]: options.status },
      customerId: options.customerId
    });
    criteria.push({
      [Op.or]: OR
    });

    let tripDetails = await TripModel.findAndCountAll({
      where: {
        [Op.and]: criteria
      },
      attributes: ['uuid', 'tripId', 'tripDate', 'status', 'startLocationName', 'endLocationName', 'driverId',
        'paymentType', 'paymentAmount', 'totalKms', 'totalTimeInMinute',
        'customerFeedback', 'driverFeedback', 'ratingCustomer', 'ratingDriver', 'canceledBy', 'totalKms', 'totalTimeInMinute', 'tripType', 'startLat', 'startLong', 'endLat', 'endLong'
      ],
      include: [{
        model: UserModel,
        as: 'driver_details',
        attributes: ['fullName', 'mobileNumber','profileImage'],
      }, {
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName', 'mobileNumber'],
      },
      {
        model: CarModel,
        as: 'car_details',
        attributes: ['carModel', 'carNumber', 'carTypeId'],
        where: { status: 'Active' }
      }
      ],
      order: [
        ['updatedAt', 'DESC']
      ],
      raw: true,
      nest: true
    });
    return tripDetails;
  }


  static async getAllCustomerTrips(options:any) {
    return  await UserModel.findAndCountAll({
      where: {
        [Op.and]: options
      },
      attributes: ['id', 'uuid', 'fullName', 'loginId', 'mobileNumber', 'profileImage', 'role', 'createdAt', 'updatedAt', 'isDeleted'],
      include: [
        {
          model: TripModel,
          attributes: ['customerId', 'driverId', 'paymentType', 'status', 'ratingCustomer', 'paymentAmount', 'totalKms', 'ratingDriver', 'canceledBy', 'cardType', 'cardNo'],
          as: 'customerData',
        }
      ],
      order: [
        ['updatedAt', 'DESC']
      ],
      nest: true
    });
  }

  static async getAllDriverTrips(options:any) {
    return  await UserModel.findAndCountAll({
      where: {
        [Op.and]: options
      },
      attributes: ['id', 'uuid', 'fullName', 'loginId', 'mobileNumber', 'profileImage', 'role', 'createdAt', 'updatedAt', 'isDeleted'],
      include: [
        {
          model: TripModel,
          attributes: ['customerId', 'driverId', 'paymentType', 'status', 'ratingCustomer', 'paymentAmount', 'totalKms', 'ratingDriver', 'canceledBy', 'cardType', 'cardNo'],
          as: 'driverData',
        }
      ],
      order: [
        ['updatedAt', 'DESC']
      ],
      nest: true
    });
  }

  static async getWeeklyTrips() {
    
    const criteria = [];
    const currentWeekStartDate = moment()
    .startOf("week")
    .format("YYYY-MM-DDTHH:mm:ss");
  const currentWeekEndDate = moment()
    .endOf("week")
    .format("YYYY-MM-DDTHH:mm:ss");
    
    criteria.push({'status': applicationStatuses.tripStatus.completed})
    criteria.push({
      tripDate: {
        [Op.between]: [currentWeekStartDate,currentWeekEndDate]
      }
    });

    return TripModel.findAll({
      where : {
        [Op.and]: criteria
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('paymentAmount')), 'totalTodayAmount'],
        [Sequelize.literal('COUNT(*)'), 'completedTrips'],
        [Sequelize.fn('date_format', Sequelize.col('tripDate'), '%W-%d/%b/%Y'), 'date']
    ],
    group:[Sequelize.fn('date_format', Sequelize.col('tripDate'), '%Y-%m-%d')]
    });

  }

  static async getMonthlyTrips() {
    
    const criteria = [];
    const currentYearStartDate = moment()
        .startOf("year")
        .format("YYYY-MM-DDTHH:mm:ss");
    const currentYearEndDate = moment()
        .endOf("year")
        .format("YYYY-MM-DDTHH:mm:ss");
   
    criteria.push({'status':applicationStatuses.tripStatus.completed})
    criteria.push({
      tripDate: {
        [Op.between]: [currentYearStartDate,currentYearEndDate]
      }
    });

    return TripModel.findAll({
      where : {
        [Op.and]: criteria
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('paymentAmount')), 'totalMonthlyAmount'],
        [Sequelize.literal('COUNT(*)'), 'completedTrips'],
        [Sequelize.fn('date_format', Sequelize.col('tripDate'), '%b-%Y'), 'Month']
    ],
    group:[Sequelize.fn('date_format', Sequelize.col('tripDate'), '%Y-%m')]
    });

  }

  static async getYearlyTrips() {
    
    const criteria = [];
    criteria.push({'status':applicationStatuses.tripStatus.completed})
    return TripModel.findAll({
      where : {
        [Op.and]: criteria
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('paymentAmount')), 'totalYeaelyAmount'],
        [Sequelize.literal('COUNT(*)'), 'completedTrips'],
        [Sequelize.fn('date_format', Sequelize.col('tripDate'), '%Y'), 'year']
    ],
    group:[Sequelize.fn('date_format', Sequelize.col('tripDate'), '%Y')]
    });

  }

  static async getLastTrip(driverId) {
    let tripDetails = TripModel.findOne({
      where: { driverId: driverId, status: 'Completed' },
      attributes: ['id', 'uuid', 'tripId', 'tripDate', 'status',
        'paymentAmount', 'startLat', 'startLong', 'endLat', 'endLong', 'driverId','customerId', 'ratingCustomer'
      ],
      include: [{
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName', 'mobileNumber', 'profileImage', 'createdAt'],
      }],
      order: [
        ['id', 'DESC']
      ],
      limit: 1,
      raw: true,
      nest: true
    });
    return tripDetails;
  }

  static async getLast7DaysTrips(driverId, currentWeekStartDate = null, currentWeekEndDate = null, type = 'All') {
    const criteria = [];
    
    criteria.push({'status': applicationStatuses.tripStatus.completed, 'driverId': driverId})
    if (type !== 'All') {
      criteria.push({
        tripDate: {
          [Op.between]: [currentWeekStartDate,currentWeekEndDate]
        }
      });
    }

    return TripModel.findAll({
      where : {
        [Op.and]: criteria
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('paymentAmount')), 'totalFare'],
        [Sequelize.literal('COUNT(*)'), 'completedTrips'],
        [Sequelize.fn('sum', Sequelize.col('totalKms')), 'totalKms']
      ]
    });
  }

  static async getTotalHoursCompletedTrip(driverId) {
    const criteria = [];
    criteria.push({'status': applicationStatuses.tripStatus.completed, driverId: driverId});

    let totalCompletedTrip = TripModel.findAll({
      where : {
        [Op.and]: criteria
      },
      attributes: ['id', 'uuid', 'pickUpTime', 'dropTime', 'tripId', 'tripDate'],
      raw: true,
      nest: true
    });
    totalCompletedTrip = await totalCompletedTrip;
    let totalHours: any = 0;
    totalCompletedTrip.map(value => {
      const start = moment(value.pickUpTime, 'YYYY-M-DD HH:mm:ss');
      const end = moment(value.dropTime, 'YYYY-M-DD HH:mm:ss');
      const totalMinute = end.diff(start, 'minutes');
      const hours = +totalMinute / 60;
      totalHours = totalHours + hours;
    });
    return totalHours;
  }

  static async getScheduledTripSomeMinuteBefore(now: any, toMinutes: any, userDetails: any) {
    const criteria = [];
    if (userDetails.id && userDetails.role === 'DRIVER') {
      criteria.push({
        driverId: userDetails.id
      });
    } else if (userDetails.id && userDetails.role === 'CUSTOMER') {
      criteria.push({
        customerId: userDetails.id
      });
    }
    criteria.push({
      pickUpTime: {
        [Op.between]: [now, toMinutes]
      }
    });
    return TripModel.findOne({
      where: {
        [Op.and]: criteria,
        status: 'Scheduled',
        tripType: 'Scheduled'
      },
      include: [{
        model: UserModel,
        as: 'driver_details',
        attributes: ['fullName', 'mobileNumber', 'countryCode', 'profileImage'],
      }, {
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName', 'mobileNumber', 'countryCode', 'profileImage'],
      }],
      raw: true,
      nest: true
    });
  }

  static getTripByCustomer(customerId) {
    const criteria: any[] = [{ }];
    criteria.push({
      [Op.or]: [{ status: 'Scheduled' }, { status: 'Ongoing' }],
      customerId: customerId
    });

    return TripModel.findAll({
      where: {
        [Op.and]: criteria
      },
      order: [
        ['updatedAt', 'DESC']
      ],
      raw: true,
      nest: true
    });
  }

  static async totalCustomerTrips(customerId, today) {
    const criteria: any[] = [{ }];
    criteria.push({
      [Op.and]: [{ status: 'Scheduled' }, { status: 'Ongoing' }],
      [Op.or]: [{ tripDate: Sequelize.where(Sequelize.fn('date', Sequelize.col('tripDate')), '=', today) }],
      customerId: customerId,
      tripType: 'Rightnow'
    });
    return TripModel.findAll({
      where: {
        [Op.and]: criteria
      },
      order: [
        ['updatedAt', 'DESC']
      ],
      raw: true,
      nest: true
    });
  }

  static async getScheduledTripMinutesBefore(now: any, toMinutes: any, minutesBefore: any) {
    const criteria = [];
    if (minutesBefore === 'twoMinute') {
      criteria.push({
        twoMinuteBefore: false
      });
    }
    if(minutesBefore === 'thirtyMinute') {
      criteria.push({
        thirtyMinuteBefore: false
      });
    }
    if(minutesBefore === 'tenMinute') {
      criteria.push({
        tenMinuteBefore: false
      });
    }
    if(minutesBefore === 'oneHours') {
      criteria.push({
        oneHoursBefore: false
      });
    }
    criteria.push({
      pickUpTime: {
        [Op.between]: [now, toMinutes]
      },
    });
    return TripModel.findAll({
      where: {
        [Op.and]: criteria,
        status: 'Scheduled',
        tripType: 'Scheduled'
      },
      include: [{
        model: UserModel,
        as: 'driver_details',
        attributes: ['fullName', 'mobileNumber', 'countryCode', 'profileImage'],
      }, {
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName', 'mobileNumber', 'countryCode', 'profileImage'],
      }],
      raw: true,
      nest: true
    });
  }

}



