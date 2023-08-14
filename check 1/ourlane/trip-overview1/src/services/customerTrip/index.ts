import * as moment from "moment";
const path = require('path');
import UserDBService from "../../database/service/user.dbservice";
import TripService from "../../database/service/trip.dbservice";
import DriverDBService from "../../database/service/driver.dbservice";
import CustomerDBService from "../../database/service/customer.dbservice";
import emailService from '../../utils/emailService';
import CustomError from "../../utils/error";
import { errorManager } from "../../config/errorManager";
import { vars } from "../../config/vars";
const { localhost, salt } = vars;
import { v4 as uuid_v4 } from "uuid";
import { applicationStatuses,roles, liveFeed, customerPushNotification, driverPushNotification, cache, tripTypeNotification } from "../../config/constants";
import { query } from "express";
import * as randomstring from "randomstring";
import CarDbService from '../../database/service/car.dbservice';
import CarTypeService from '../../database/service/carType.dbservice';
import FileService from '../../utils/file';
import { promises } from "dns";
const fs = require('fs');
const request = require('request');
import redisCache from '../../utils/cache';

const serviceName = "[CustomerTripService]";

export default class UserService {



  static async getTripList(data) {
    const tripDetails = await TripService.getTripList(data);
      for (let data in tripDetails.rows) {
        if (tripDetails.rows[data].driverId) {
          const driver_info = await DriverDBService.getDriverById({ 'userId': tripDetails.rows[data].driverId });
          if (driver_info) {
            const driver_Infos = {
              "locationName": driver_info.locationName || 'null',
              "addressLatitude": driver_info.addressLatitude || 'null',
              "addressLongitude": driver_info.addressLongitude || 'null'
            }
            tripDetails.rows[data]['driver_info'] = driver_Infos
          }
        
        else {
          tripDetails.rows[data]['driver_info'] = {}
        }
      }
    }
    const tripList = await this.getTotalFare(tripDetails);
    const tripListArr = {
      count: tripDetails.count,
      rows: tripList
    };
    return tripListArr;
  }

  static async getTotalFare(tripDetails) {
    const details = tripDetails.rows.map(async trip => {
      const params = {
        status: 'Active',
        driverId: trip.driverId
      };
      const carDetails = await CarDbService.getCarByDriverId(params);
      if (carDetails) {
        const query = { id: carDetails.carTypeId }
        const carTypeDetails = await CarTypeService.getCarByField(query);
        const param = {
          totalDistance: trip.totalKms,
          totalTime: trip.totalTimeInMinute,
          pricePerKM: carTypeDetails.pricePerHourKM,
          pricePerMin: carTypeDetails.pricePerMin,
          bookingFee: carTypeDetails.bookingFee,
          pricePerHour : carTypeDetails.pricePerHour,
          bookedHours: trip.bookedHours ? trip.bookedHours : null
        };
        const totalFare = await DriverDBService.fareCalculation(param);
        trip.totalFare = totalFare;
      }
      return trip;
    });

    return await Promise.all(details);
  }


   static async getCustomerAvgRating(userId:string){
     
    const customerTripsData = await TripService.getAllCustomerTrips({ id : userId });
      if(customerTripsData.rows[0].customerData){
         const obj = {
           totalRatingGivenDrivers :0 ,
           totalRatingCount:0
         }
        customerTripsData.rows[0].customerData.forEach((data:any)=>{
      
          if( data.status == applicationStatuses.tripStatus.completed && data.ratingCustomer )
                {
                  obj.totalRatingCount = obj.totalRatingCount +  data.ratingCustomer;
                  obj.totalRatingGivenDrivers = obj.totalRatingGivenDrivers +  1;
                  
                }
          })
        return  obj.totalRatingCount/obj.totalRatingGivenDrivers;
      }
   }


  // ADMIN GET TODAY TRIPS DETAILS
  static async todayTrips() {
    const total = await TripService.totalTrips();
    let totaldata = { Scheduled: 0, Ongoing: 0, Completed: 0, Cancelled: 0 };
    total[0].forEach((e) => {
      totaldata[e.status] = parseInt(e["count"]);
      if (parseInt(e["count"]) != 0 && e["status"] == "Scheduled") {
        totaldata.Scheduled = parseInt(e["count"]);
      }
      if (parseInt(e["count"]) != 0 && e["status"] == "Ongoing") {
        totaldata.Ongoing = parseInt(e["count"]);
      }
      if (parseInt(e["count"]) != 0 && e["status"] == "Completed") {
        totaldata.Completed = parseInt(e["count"]);
      }
      if (parseInt(e["count"]) != 0 && e["status"] == "Cancelled") {
        totaldata.Cancelled = parseInt(e["count"]);
      }
    });
    return totaldata;
  }

  // ADMIN GET MOST POPULAR PICKUP LOCATION
  static async mostPickup() {
    const total = await TripService.mostPickup();
    let totaldata = {};
    total[0].forEach((e) => {
      totaldata[e.startLocationName] = parseInt(e["count(*)"]);
    });
    return totaldata;
  }

  // ADMIN GET MOST POPULAR DROP-OFF LOCATION
  static async mostDrop() {
    const total = await TripService.mostDrop();
    let totaldata = {};
    total[0].forEach((e) => {
      totaldata[e.endLocationName] = parseInt(e["count(*)"]);
    });
    return totaldata;
  }

  static async getTripsOverview(userDetails) {
    try {
      if (userDetails.role == "ADMIN" || userDetails.role == "SUPER_ADMIN") {
        let obj = {
          uuid: userDetails.uuid,
        };
        const user = await UserDBService.fetchByUserId(obj);
        if (!user) {
          throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
        }
      } else {
        throw new CustomError({
          serviceName,
          ...errorManager.INVALID_USER_ROLE,
        });
      }

      const tripsView = {
        totalAmount: 0,
        completedTrips: 0,
        availableDrivers: 0,
        OccupiedDrivers: 0,
        currentweekTrips: 0,
        lastWeekTrips: 0,
        currentweekRevenue: 0,
        lastWeekRevenue: 0,
        currentMonthTrips:0,
        currentMonthRevenue:0,
        currentYearTrips:0,
        currentYearRevenue:0
      };

      const lastWeekStartDate     =  moment().subtract(1, "weeks").startOf("week").format("YYYY-MM-DD HH:mm:ss");
      const lastWeekEndDate       =  moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD HH:mm:ss");
      const currentMonthStartDate =  moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
      const currentMonthEndDate   =  moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
      const yearStartDate         =  moment().startOf('year').format('YYYY-MM-DD HH:mm:ss');
      const yearEndDate           =  moment().endOf('year').format('YYYY-MM-DD HH:mm:ss');

      const driverList = await TripService.getTotalDrivers();
      driverList.rows.forEach((data) => {
        if (data.isOnlineStatus == "Available") {
          tripsView.availableDrivers = tripsView.availableDrivers + 1;
        }
        if (data.isOnlineStatus == "Driving") {
          tripsView.OccupiedDrivers = tripsView.OccupiedDrivers + 1;
        }
      });

      const tripList = await TripService.getTripsOverview({});
      tripsView.totalAmount = tripList.rows.reduce((totalAmount, data) => {
        if (
          moment(data.tripDate).isSame(new Date(), "week") &&
          data.status == "Completed"
        ) {
          tripsView.currentweekTrips = tripsView.currentweekTrips + 1;
          tripsView.currentweekRevenue =
            tripsView.currentweekRevenue + data.paymentAmount;
        }

        if (
          moment(data.tripDate).isBetween(lastWeekStartDate, lastWeekEndDate) &&
          data.status == "Completed"
        ) {
          tripsView.lastWeekTrips = tripsView.lastWeekTrips + 1;
          tripsView.lastWeekRevenue =
            tripsView.lastWeekRevenue + data.paymentAmount;
        }

        if (
          moment(data.tripDate).isBetween(currentMonthStartDate, currentMonthEndDate) &&
          data.status == "Completed"
        ) {

          tripsView.currentMonthTrips =   tripsView.currentMonthTrips + 1;
          tripsView.currentMonthRevenue = tripsView.currentMonthRevenue + data.paymentAmount;
        }

        if (
          moment(data.tripDate).isBetween(yearStartDate, yearEndDate) &&
          data.status == "Completed"
        ) {
          tripsView.currentYearTrips = tripsView.currentYearTrips + 1;
          tripsView.currentYearRevenue =
            tripsView.currentYearRevenue + data.paymentAmount;
        }

        if (data.status == "Completed") {
          tripsView.completedTrips = tripsView.completedTrips + 1;
          return totalAmount + data.paymentAmount;
        }

        return totalAmount;
      }, 0);

      return tripsView;
    } catch (error) {
      throw error;
    }
  }

  static async getTripsTotalOverview(userDetails){
  try {
    if (userDetails.role == "ADMIN" || userDetails.role == "SUPER_ADMIN") {
      let obj = {
        uuid: userDetails.uuid,
      };
      const user = await UserDBService.fetchByUserId(obj);
      if (!user) {
        throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
      }
    } else {
      throw new CustomError({
        serviceName,
        ...errorManager.INVALID_USER_ROLE,
      });
    }

    const [
      weeklyData,
      monthlyData,
      yearlyData,
    ] = await Promise.all([
      TripService.getWeeklyTrips(),
      TripService.getMonthlyTrips(),
      TripService.getYearlyTrips()
    ]);

    const dataTosend = {
      weeklyData: "",
      monthlyData: "",
      yearlyData: "",
    };
    dataTosend.weeklyData = weeklyData;
    dataTosend.monthlyData = monthlyData;
    dataTosend.yearlyData = yearlyData;

    return dataTosend;
    
  } catch (error) {
    throw error;
  }
}

  static async getLeaders(userDetails) {
    try {
      if (userDetails.role == "ADMIN" || userDetails.role == "SUPER_ADMIN") {
        let obj = {
          uuid: userDetails.uuid,
        };
        const user = await UserDBService.fetchByUserId(obj);
        if (!user) {
          throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
        }
      } else {
        throw new CustomError({
          serviceName,
          ...errorManager.INVALID_USER_ROLE,
        });
      }
      const result =  await TripService.getLeaders();

  return result;

    } catch (error) {
      throw error;
    }
  }

  static async getDriverOverview(userDetails, reqQuery) {
    try {
      if (userDetails.role == "ADMIN" || userDetails.role == "SUPER_ADMIN") {
        let obj = {
          uuid: userDetails.uuid,
        };
        const user = await UserDBService.fetchByUserId(obj);
        if (!user) {
          throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
        }
      } else {
        throw new CustomError({
          serviceName,
          ...errorManager.INVALID_USER_ROLE,
        });
      }

      const driver = await UserDBService.checkDriver({
        id: reqQuery.driverId,
        role: "DRIVER",
      });
      if (!driver) {
        throw new CustomError({ serviceName, ...errorManager.NO_DRIVER_FOUND });
      }

      const options = { status: "Completed", driverId: reqQuery.driverId };
      const startDate = moment()
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
      const endDate = moment()
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
      const currentWeekStartDate = moment()
        .startOf("week")
        .format("YYYY-MM-DD HH:mm:ss");
      const currentWeekEndDate = moment()
        .endOf("week")
        .format("YYYY-MM-DD HH:mm:ss");
      const currentMonthStartDate = moment()
        .startOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const currentMonthEndDate = moment()
        .endOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const currentYearStartDate = moment()
        .startOf("year")
        .format("YYYY-MM-DD HH:mm:ss");
      const currentYearEndDate = moment()
        .endOf("year")
        .format("YYYY-MM-DD HH:mm:ss");
      const lastMonthStartDate = moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const lastMonthEndDate = moment()
        .subtract(1, "months")
        .endOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const lastWeekStartDate = moment()
        .subtract(1, "weeks")
        .startOf("week")
        .format("YYYY-MM-DD HH:mm:ss");
      const lastWeekEndDate = moment()
        .subtract(1, "weeks")
        .endOf("week")
        .format("YYYY-MM-DD HH:mm:ss");

      const weekQuery = `
SELECT
count(*) as totalDayTrips,
sum(paymentAmount) as totalDayAmount,
DATE_FORMAT(tripDate, '%W-%d/%b/%Y') as tripdate
FROM
trip
WHERE
(tripDate BETWEEN '${currentWeekStartDate}' AND '${currentWeekEndDate}')
and
(driverId = '${options.driverId}')
and
(status = '${options.status}')
GROUP BY DATE_FORMAT(tripDate, '%W-%d/%b/%Y')
ORDER BY tripDate desc
`;

      const monthQuery = `
SELECT
count(*) as totalMonthTrips,
sum(paymentAmount) as totalMonthAmount,
DATE_FORMAT(tripDate, '%b-%Y') as month
FROM
trip
WHERE
(tripDate BETWEEN '${currentYearStartDate}' AND '${currentYearEndDate}')
and
(driverId = '${options.driverId}')
and
(status = '${options.status}')
GROUP BY DATE_FORMAT(tripDate, '%b-%Y')
ORDER BY tripDate desc
`;

      const yearQuery = `
SELECT
count(*) as totalYearTrips,
sum(paymentAmount) as totalYearAmount,
DATE_FORMAT(tripDate, '%Y') as year
FROM
trip
WHERE
(driverId = '${options.driverId}')
and
(status = '${options.status}')
GROUP BY DATE_FORMAT(tripDate, '%Y')
ORDER BY tripDate desc
`;

      const totalUserQuery = `
SELECT
q.totalTrips,
q.totalAmount,
q1.todayTrips,
q1.todayAmount,
q2.totalCurrentWeekTrips,
q2.totalCurrentWeekAmount,
q3.totalCurrentMonthTrips,
q3.totalCurrentMonthAmount
FROM
(SELECT
count(*) as totalTrips,
sum(paymentAmount) as totalAmount
FROM
trip
WHERE
(driverId = '${options.driverId}')
and
(status = '${options.status}')) AS q,
(SELECT
count(*) as todayTrips,
sum(paymentAmount) as todayAmount
FROM
trip
WHERE
(tripDate BETWEEN '${startDate}' AND '${endDate}')
and
(driverId = '${options.driverId}')
and
(status = '${options.status}')) AS q1,
(SELECT
count(*) as totalCurrentWeekTrips ,
sum(paymentAmount) as totalCurrentWeekAmount
FROM
trip
WHERE
(tripDate BETWEEN '${currentWeekStartDate}' AND '${currentWeekEndDate}')
and
(driverId = '${options.driverId}')
and
(status = '${options.status}')) AS q2,
(SELECT
count(*) as totalCurrentMonthTrips,
sum(paymentAmount) as totalCurrentMonthAmount
FROM
trip
WHERE
(tripDate BETWEEN '${currentMonthStartDate}' AND '${currentMonthEndDate}')
and
(driverId = '${options.driverId}')
and
(status = '${options.status}')) AS q3

`;

      const [
        weeklyData,
        monthlyData,
        yearlyData,
        totalUserData,
      ] = await Promise.all([
        TripService.executeCustomQuery(weekQuery),
        TripService.executeCustomQuery(monthQuery),
        TripService.executeCustomQuery(yearQuery),
        TripService.executeCustomQuery(totalUserQuery),
      ]);

      const dataTosend = {
        weeklyData: "",
        monthlyData: "",
        yearlyData: "",
        totalUserData: "",
      };
      dataTosend.weeklyData = weeklyData;
      dataTosend.monthlyData = monthlyData;
      dataTosend.yearlyData = yearlyData;
      dataTosend.totalUserData = totalUserData;

      return dataTosend;
    } catch (error) {
      throw error;
    }
  }

  static async driverDayData(userDetails, reqQuery) {
    try {
      if (userDetails.role == "ADMIN" || userDetails.role == "SUPER_ADMIN") {
        let obj = {
          uuid: userDetails.uuid,
        };
        const user = await UserDBService.fetchByUserId(obj);
        if (!user) {
          throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
        }
      } else {
        throw new CustomError({
          serviceName,
          ...errorManager.INVALID_USER_ROLE,
        });
      }

      const driver = await UserDBService.checkDriver({
        id: reqQuery.driverId,
        role: "DRIVER",
      });
      if (!driver) {
        throw new CustomError({ serviceName, ...errorManager.NO_DRIVER_FOUND });
      }

      const options = { status: "Completed", driverId: reqQuery.driverId };
      const startDate = moment(reqQuery.startDate)
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
      const endDate = moment(reqQuery.startDate)
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");

      const dayQuery = `
      SELECT
      count(*) as perDayTrips,
      sum(paymentAmount) as perDayAmount
      FROM
      trip
      WHERE
      (tripDate BETWEEN '${startDate}' AND '${endDate}')
      and
      (driverId = '${options.driverId}')
      and
      (status = '${options.status}')
      `;

      const [
        dayData
      ] = await Promise.all([
        TripService.executeCustomQuery(dayQuery)
      ]);

      const dataTosend = {
        dayData : dayData
      };

      return dataTosend;
    } catch (error) {
      throw error;
    }
  }

  static async getCustomerOverview(userDetails, reqQuery) {
    try {
      if (userDetails.role == "ADMIN" || userDetails.role == "SUPER_ADMIN") {
        let obj = {
          uuid: userDetails.uuid,
        };
        const user = await UserDBService.fetchByUserId(obj);
        if (!user) {
          throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
        }
      } else {
        throw new CustomError({
          serviceName,
          ...errorManager.INVALID_USER_ROLE,
        });
      }

      const customer = await UserDBService.checkDriver({
        id: reqQuery.customerId,
        role: "CUSTOMER",
      });
      if (!customer) {
        throw new CustomError({
          serviceName,
          ...errorManager.NO_CUSTOMER_FOUND,
        });
      }

      const options = { status: "Completed", customerId: reqQuery.customerId };
      const startDate = moment()
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
      const endDate = moment()
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");

      const currentWeekStartDate = moment()
        .startOf("week")
        .format("YYYY-MM-DD HH:mm:ss");
      const currentWeekEndDate = moment()
        .endOf("week")
        .format("YYYY-MM-DD HH:mm:ss");
      const currentMonthStartDate = moment()
        .startOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const currentMonthEndDate = moment()
        .endOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const currentYearStartDate = moment()
        .startOf("year")
        .format("YYYY-MM-DD HH:mm:ss");
      const currentYearEndDate = moment()
        .endOf("year")
        .format("YYYY-MM-DD HH:mm:ss");
      const lastMonthStartDate = moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const lastMonthEndDate = moment()
        .subtract(1, "months")
        .endOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      const lastWeekStartDate = moment()
        .subtract(1, "weeks")
        .startOf("week")
        .format("YYYY-MM-DD HH:mm:ss");
      const lastWeekEndDate = moment()
        .subtract(1, "weeks")
        .endOf("week")
        .format("YYYY-MM-DD HH:mm:ss");

      const weekQuery = `
SELECT
count(*) as totalDayTrips,
sum(paymentAmount) as totalDayAmount,
DATE_FORMAT(tripDate, '%W-%d/%b/%Y') as tripdate
FROM
trip
WHERE
(tripDate BETWEEN '${currentWeekStartDate}' AND '${currentWeekEndDate}')
and
(customerId = '${options.customerId}')
and
(status = '${options.status}')
GROUP BY DATE_FORMAT(tripDate, '%W-%d/%b/%Y')
ORDER BY tripDate
`;

      const monthQuery = `
SELECT
count(*) as totalMonthTrips,
sum(paymentAmount) as totalMonthAmount,
DATE_FORMAT(tripDate, '%b-%Y') as Month
FROM
trip
WHERE
(tripDate BETWEEN '${currentYearStartDate}' AND '${currentYearEndDate}')
and
(customerId = '${options.customerId}')
and
(status = '${options.status}')
GROUP BY DATE_FORMAT(tripDate, '%b-%Y')
ORDER BY tripDate
`;

      const yearQuery = `
SELECT
count(*) as totalYearTrips,
sum(paymentAmount) as totalYearAmount,
DATE_FORMAT(tripDate, '%Y') as Year
FROM
trip
WHERE
(customerId = '${options.customerId}')
and
(status = '${options.status}')
GROUP BY DATE_FORMAT(tripDate, '%Y')
ORDER BY tripDate
`;

      const totalUserQuery = `
SELECT
q.totalTrips,
q.totalAmount,
q1.todayTrips,
q1.todayAmount,
q2.totalCurrentWeekTrips,
q2.totalCurrentWeekAmount,
q3.totalCurrentMonthTrips,
q3.totalCurrentMonthAmount,
q4.totalCashPayment,
q5.totalCardPayment,
q6.totalWalletPayment
FROM
(SELECT
count(*) as totalTrips,
sum(paymentAmount) as totalAmount
FROM
trip
WHERE
(customerId = '${options.customerId}')
and
(status = '${options.status}')) AS q,
(SELECT
count(*) as todayTrips,
sum(paymentAmount) as todayAmount
FROM
trip
WHERE
(tripDate BETWEEN '${startDate}' AND '${endDate}')
and
(customerId = '${options.customerId}')
and
(status = '${options.status}')) AS q1,
(SELECT
count(*) as totalCurrentWeekTrips ,
sum(paymentAmount) as totalCurrentWeekAmount
FROM
trip
WHERE
(tripDate BETWEEN '${currentWeekStartDate}' AND '${currentWeekEndDate}')
and
(customerId = '${options.customerId}')
and
(status = '${options.status}')) AS q2,
(SELECT
count(*) as totalCurrentMonthTrips,
sum(paymentAmount) as totalCurrentMonthAmount
FROM
trip
WHERE
(tripDate BETWEEN '${currentMonthStartDate}' AND '${currentMonthEndDate}')
and
(customerId = '${options.customerId}')
and
(status = '${options.status}')) AS q3,
(SELECT
sum(paymentAmount) as totalCashPayment
FROM
trip
WHERE
( paymentType = 'CASH' )
and
(customerId = '${options.customerId}')
and
(status = '${options.status}')) AS q4,
(SELECT
sum(paymentAmount) as totalCardPayment
FROM
trip
WHERE
( paymentType = 'CARD' )
and
(customerId = '${options.customerId}')
and
(status = '${options.status}')) AS q5,
(SELECT
sum(paymentAmount) as totalWalletPayment
FROM
trip
WHERE
( paymentType = 'WALLET' )
and
(customerId = '${options.customerId}')
and
(status = '${options.status}')) AS q6
`;

      const [
        weeklyData,
        monthlyData,
        yearlyData,
        totalUserData,
      ] = await Promise.all([
        TripService.executeCustomQuery(weekQuery),
        TripService.executeCustomQuery(monthQuery),
        TripService.executeCustomQuery(yearQuery),
        TripService.executeCustomQuery(totalUserQuery),
      ]);

      const dataTosend = {
        weeklyData: "",
        monthlyData: "",
        yearlyData: "",
        totalUserData: "",
      };
      dataTosend.weeklyData = weeklyData;
      dataTosend.monthlyData = monthlyData;
      dataTosend.yearlyData = yearlyData;
      dataTosend.totalUserData = totalUserData;

      return dataTosend;
    } catch (error) {
      throw error;
    }
  }

  static async customerDayData(userDetails, reqQuery) {
    try {
      if (userDetails.role == "ADMIN" || userDetails.role == "SUPER_ADMIN") {
        let obj = {
          uuid: userDetails.uuid,
        };
        const user = await UserDBService.fetchByUserId(obj);
        if (!user) {
          throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
        }
      } else {
        throw new CustomError({
          serviceName,
          ...errorManager.INVALID_USER_ROLE,
        });
      }

      const customer = await UserDBService.checkDriver({
        id: reqQuery.customerId,
        role: "CUSTOMER",
      });
      if (!customer) {
        throw new CustomError({
          serviceName,
          ...errorManager.NO_CUSTOMER_FOUND,
        });
      }

      const options = { status: "Completed", customerId: reqQuery.customerId };
      const startDate = moment(reqQuery.startDate)
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
      const endDate = moment(reqQuery.startDate)
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");

      const dayQuery = `
      SELECT
      count(*) as perDayTrips,
      sum(paymentAmount) as perDayAmount
      FROM
      trip
      WHERE
      (tripDate BETWEEN '${startDate}' AND '${endDate}')
      and
      (customerId = '${options.customerId}')
      and
      (status = '${options.status}')
      `;

      const [
        dayData
      ] = await Promise.all([
        TripService.executeCustomQuery(dayQuery)
      ]);

      const dataTosend = {
        dayData : dayData
      };

      return dataTosend;
    } catch (error) {
      throw error;
    }
  }

  //GET CUSTOMER LIST WITH PAYMENT DETAILS
  static async getCustomerTrips(userDetails: string, body: {
    searchByName?: string
    roles?: any
    pageNumber: number,
    perPage: number,
  }) {

    body['roles'] = 'CUSTOMER'
    const customerProfile = await TripService.getCustomerTrips(userDetails, body);
    const customerDetails = {
      count:'',
      rows:[]
    };
    if(customerProfile.count){
      customerDetails.count = customerProfile.count ;
    }
    customerProfile.rows.forEach((data: any) => {
      const obj = {
        "id": data.id || '',
        "uuid": data.uuid || '',
        "fullName": data.fullName || '',
        "loginId": data.loginId || '',
        "countryCode" : data.countryCode || '',
        "mobileNumber": data.mobileNumber || '',
        "profileImage": data.profileImage || '',
        "dateOfJoining": data.createdAt || '',
        "completedTrips": 0,
        "cancelledTrips": 0,
        "avgCustomerRating": 0,
        "totalRatingGivenDrivers":0,
        "cardNo": [],
        "cash" : 0,

      }
      data.customerData.forEach((trip, i, inAry) => {
        if (trip.status == "Completed") {
          obj.completedTrips = obj.completedTrips + 1;
          if (trip.ratingCustomer) {
            obj.avgCustomerRating = obj.avgCustomerRating + parseInt(trip.ratingCustomer)
            obj.totalRatingGivenDrivers = obj.totalRatingGivenDrivers + 1;
          }
        }
        if (trip.status == "Cancelled") {
          obj.cancelledTrips = obj.cancelledTrips + 1;
        }
        // Get data if payment using DEBIT card
        if (trip.cardType == "Debit") {
          obj.cardNo.push({ 'Debit Card': trip.cardNo });
        }
        // Get data if payment using CREDIT card
        if (trip.cardType == "Credit") {
          obj.cardNo.push({ 'Credit Card': trip.cardNo });
        }
        //Get data if payment through cash
        if (trip.paymentType == "CASH") {
          if(trip.paymentAmount){
             obj.cash = parseInt(trip.paymentAmount)
          } 
        }
        //Ratings provide by Driver
        if (i == inAry.length - 1) {
          obj.avgCustomerRating = obj.avgCustomerRating / obj.totalRatingGivenDrivers
        }
      })
      customerDetails.rows.push(obj)
    });

    return customerDetails;
  }

  

  static async getDriverTrips(userDetails: string, body: {
    searchByName?: string
    roles?: any
  }) {

    body['roles'] = 'DRIVER'
    const driverProfile = await TripService.getDriverTrips(userDetails, body);
    const driverDetails = [];
    const data = driverProfile.rows;
    for (let i = 0; i < data.length; i++) {
      
      const obj = {
        "id": data[i].dataValues.id || '',
        "uuid": data[i].dataValues.uuid || '',
        "fullName": data[i].dataValues.fullName || '',
        "loginId": data[i].dataValues.loginId || '',
        "countryCode": data[i].dataValues.countryCode || '',
        "mobileNumber": data[i].dataValues.mobileNumber || '',
        "profileImage": data[i].dataValues.profileImage || '',
        "dateOfJoining": data[i].dataValues.createdAt || '',
        "completedTrips": 0,
        "cancelledTrips": 0,
        "rejectdTrips": 0,
        "totalEarnings": 0,
        "totalKMsTravelled": 0,
        "avgDriverRating": 0,
        "totalRatings": 0,
        "totalRatingGivenCustomers": 0,
        "status": '',
        "locationLat": 0,
        "locationLang": 0
      }
      if (data[i].dataValues.id && !data[i].dataValues.isDeleted) {        
        const driver_info = await DriverDBService.getDriverById({ 'userId': data[i].dataValues.id });
        obj.status = driver_info?.isOnlineStatus ? driver_info?.isOnlineStatus : 'Unavailable';
        obj.locationLang = driver_info?.addressLongitude;
        obj.locationLat = driver_info?.addressLatitude;
        data[i].driverData.forEach((trip, i, inAry) => {
          if (trip.status == "Completed") {
            obj.completedTrips = obj.completedTrips + 1;
            if (trip.ratingDriver) {
              obj.totalRatingGivenCustomers = obj.totalRatingGivenCustomers + 1;
              obj.totalRatings = obj.totalRatings + parseInt(trip.ratingDriver)
            }
          }

          if (trip.status == "Cancelled") {
            obj.cancelledTrips = obj.cancelledTrips + 1;
          }

          if (trip.status == "Rejected") {
            obj.rejectdTrips = obj.cancelledTrips + 1;
          }

          if (trip.paymentAmount) {
            obj.totalEarnings = obj.totalEarnings + parseInt(trip.paymentAmount)
          }

          if (trip.totalKms) {
            obj.totalKMsTravelled = obj.totalKMsTravelled + parseInt(trip.totalKms)
          }

          if (i == inAry.length - 1) {
            obj.avgDriverRating = obj.totalRatings / obj.totalRatingGivenCustomers
          }
        })
        driverDetails.push(obj); 
      }      
    }
    return driverDetails;
  }


  static async getDriverAvgRating(userDetails) {
    // const driverProfile = await TripService.getDriverTrips(userDetails, body);
    const driverProfile = await TripService.getAllDriverTrips({id: userDetails.id, role: 'DRIVER'});
    const data = driverProfile.rows;
    const obj = {
      "avgDriverRating": 0,
      "totalRatings": 0,
      "totalRatingGivenCustomers": 0
    }
    const driverDetails = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].dataValues.id && !data[i].dataValues.isDeleted) {
          data[i].driverData.forEach((trip, i, inAry) => {
            if (trip.status == "Completed") {
              if (trip.ratingDriver) {
                obj.totalRatingGivenCustomers = obj.totalRatingGivenCustomers + 1;
                obj.totalRatings = obj.totalRatings + parseInt(trip.ratingDriver)
              }
            }
            if (i == inAry.length - 1) {
              const driverRating = obj.totalRatings / obj.totalRatingGivenCustomers;
              obj.avgDriverRating  = driverRating ? driverRating : 0;
            }
          });
          driverDetails.push(obj);
        }
      }
    }
    return driverDetails;
  }

}


