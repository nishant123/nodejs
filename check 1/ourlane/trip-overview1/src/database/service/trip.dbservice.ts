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


const {
  TripModel, UserModel, CustomerSendStatusModel, DriverModel, CarModel, sequelize
} = db;
// CustomerTripService
export default class TripService {
 
  static async getTripList(options: {
    searchByName?: string
    pageNumber: number,
    perPage: number,
    tripStatus: string,
    tripType : string
    driverId ?: string
  }) {
    const {
      searchByName, pageNumber, perPage, tripStatus, tripType , driverId
    } = options;

    const criteria: any[] = [{ }];

    const search = searchByName;
    if (tripStatus && tripStatus.length) {
       if( tripStatus == 'All') {
        const OR = [];
        OR.push({
          status: { [Op.ne]: 'Scheduled' } 
        });
        OR.push({
          status: { [Op.ne]: 'Ongoing' } 
        });
        
        criteria.push({
          [Op.and]: OR
        });
        
      } 
      else {
        const OR = [];
        OR.push({
          status: tripStatus,
        });
        criteria.push({
          [Op.or]: OR
        });
      }
      if (tripType === 'HourlyBooking') {
        const OR = [];
        OR.push({
          tripType: {
            [Op.or]: ['ScheduledHourly', 'RightnowHourly']
          }
        });
        criteria.push(OR);
      } else if (tripType === 'KMBooking') {
        const OR = [];
        OR.push({
          tripType: {
            [Op.or]: ['Rightnow', 'Scheduled']
          }
        });
        criteria.push(OR);
      }      
    }

    if(driverId){
      criteria.push({driverId});
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
          },
          {
            tripId: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('tripId')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          }
        ]
      });
    }
    const attribute = ['uuid', 'tripId', 'tripDate', 'status', 'startLocationName', 'endLocationName', 'driverId','customerId',
    'paymentType', 'paymentAmount', 'totalKms', 'totalTimeInMinute', 'description', 'bookedHours',
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
        attributes: ['fullName','countryCode','mobileNumber', 'profileImage'],
      }, {
        model: UserModel,
        as: 'customer_details',
        attributes: ['fullName','countryCode','mobileNumber', 'profileImage'],
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

  // ADMIN GET TODAY TRIPS DETAILS
  static async totalTrips() {
     
    const startDate = moment()
    .startOf("day")
    .format("YYYY-MM-DDTHH:mm:ss");
  const endDate = moment()
    .endOf("day")
    .format("YYYY-MM-DDTHH:mm:ss");

    console.log("startDate",startDate)
    console.log("endDate",endDate)

    
    const query = `SELECT count(*) as count, status FROM ourlane.trip where tripDate BETWEEN '${startDate}' AND '${endDate}' group by status`;
    const status = await sequelize.query(query);
    return status;
    }

  //  ADMIN GET MOST POPULAR PICK-UP LOCATION
  static async mostPickup() {
    const status = await sequelize.query(`SELECT count(*), startLocationName from trip where (status ='ongoing' || status ='completed')  group by startLocationName order by count(*) desc `);
    return status;
  }

  static async getTripsOverview(options: any) {
    return TripModel.findAndCountAll({
      where: options,
      raw: true,
      nest: true
    });
  }

  static async getTotalDrivers() {
    return DriverModel.findAndCountAll({
      raw: true,
      nest: true
    });
  }

  static async getLeaders() {

    const criteria = [];
    const startDate = moment()
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
      const endDate = moment()
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
    
    criteria.push({'status': applicationStatuses.tripStatus.completed})
    criteria.push({
      tripDate: {
        [Op.between]: [startDate,endDate]
      }
    });

    return TripModel.findAll({
      where: {
        [Op.and]: criteria
      },
      attributes: [
        'driverId',
        [Sequelize.fn('sum', Sequelize.col('paymentAmount')), 'totalAmount'],
      ],
      include: [{
        model: Users,
        attributes: ['fullName','profileImage'],
        as: 'driver_details',
      }],
      group: ['driverId'],
      order: [[Sequelize.literal('totalAmount'), 'DESC']]
    });

  }

  //GET CUSTOMER LIST WITH PAYMENT DETAILS
  static async getCustomerTrips(userDetails: any, options: {
    searchByName?: string
    roles?: any
    pageNumber: number,
    perPage: number,
  }) {
    const {
      searchByName, roles, pageNumber, perPage
    } = options;
    const search = searchByName;
    const criteria = []

    if (roles) {
      criteria.push({
        role: roles
      });
    }

    if (search && search.trim().length) {
      criteria.push({
        [Op.or]: [
          {
            loginId: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('loginId')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          },
          {
            fullName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('fullName')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          },
          {
            mobileNumber: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('mobileNumber')), 'LIKE', `%${search.trim()}%`)
          },

        ]
      });
    }
    let result = await UserModel.findAndCountAll({
      where: {
        [Op.and]: criteria
      },
      attributes: ['id', 'uuid', 'fullName', 'loginId','countryCode', 'mobileNumber', 'profileImage', 'role', 'createdAt', 'updatedAt'],
      include: [
        {
          model: TripModel,
          attributes: ['customerId', 'driverId', 'paymentType', 'status', 'ratingCustomer', 'ratingDriver', 'canceledBy', 'cardType', 'cardNo', 'paymentAmount'],
          as: 'customerData',
        }
      ],
      order: [
        ['updatedAt', 'DESC']
      ],
      nest: true,
      offset: +perPage * (+pageNumber - 1),
      limit: +perPage,
      distinct: true
    });


    return result;

  }

  static async getDriverTrips(userDetails: any, options: {
    searchByName?: string
    roles?: any
  }) {
    const {
      searchByName, roles
    } = options;
    const search = searchByName;
    const criteria = []

    if (roles) {
      criteria.push({
        role: roles
      });
    }

    if (search && search.trim().length) {
      criteria.push({
        [Op.or]: [
          {
            loginId: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('loginId')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          },
          {
            fullName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('fullName')), 'LIKE', `%${search.trim().toLowerCase()}%`)
          },
          {
            mobileNumber: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('mobileNumber')), 'LIKE', `%${search.trim()}%`)
          },

        ]
      });
    }
    let result = await UserModel.findAndCountAll({
      where: {
        [Op.and]: criteria
      },
      attributes: ['id', 'uuid', 'fullName', 'loginId', 'countryCode','mobileNumber', 'profileImage', 'role', 'createdAt', 'updatedAt', 'isDeleted'],
      include: [
        {
          model: TripModel,
          attributes: ['customerId', 'driverId', 'paymentType', 'status', 'ratingCustomer', 'paymentAmount', 'totalKms', 'ratingDriver', 'canceledBy', 'cardType', 'cardNo','tripId'],
          as: 'driverData',
        }
      ],
      order: [
        ['updatedAt', 'DESC']
      ],
      nest: true
    });


    return result;

  }

  static async executeCustomQuery(query) {
    return sequelize.query(query,
      {
        nest: true,
        raw: true,
        type: QueryTypes.SELECT,
      });
  }


  //  ADMIN GET MOST POPULAR DROP-OFF LOCATION
  static async mostDrop() {
    const status = await sequelize.query(`SELECT count(*), endLocationName from trip where (status ='ongoing' || status ='completed')  group by endLocationName order by count(*) desc `);
    return status;
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
 

}



