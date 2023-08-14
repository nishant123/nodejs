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
const sendSms = require("../../utils/twilio");
import CarDbService from '../../database/service/car.dbservice';
import CarTypeDbService from '../../database/service/carType.dbservice';
import FileService from '../../utils/file';
import { promises } from "dns";
const PDFDocument = require('pdfkit');
const fs = require('fs');
const request = require('request');
import pdfGeneration from '../../utils/pdf';
import NotificationDBService from '../../database/service/notification.dbservice';
import redisCache from '../../utils/cache';
import { mqttPublishTripComplete }  from '../../utils/mqtt';

const serviceName = "[CustomerTripService]";

export default class UserService {

  /* Create Trip here */
  static async createTrip(data, userDetails) {
    try {
      let obj = {
        uuid: userDetails.uuid,
      };
     
      // Validations for all normal priced trips.
      if (!data.bookedHours) {

        if (!data.endLocationName) {
          throw new CustomError({ serviceName, ...errorManager.INVALID_LAT })
        }
       
        if ( !data.endLat) {
          throw new CustomError({ serviceName, ...errorManager.REQUIRED_LAT })
        }
        
        if (!data.endLong) {
          throw new CustomError({ serviceName, ...errorManager.REQUIRED_LONG })
        }
      
        if ( data.bookedHours && !data.totalKms) {
          throw new CustomError({ serviceName, ...errorManager.TOTAL_KMS_REQUIRED })
        }
       
        if (!data.totalTimeInMinute) {
          throw new CustomError({ serviceName, ...errorManager.TOTAL_TIME_REQUIRED })
        }
      }
     
      if (data.bookedHours && data.bookedHours <= 0) {
        throw new CustomError({ serviceName, ...errorManager.INVALID_BOOKED_HOURS });
      }

      let tripDate = moment().utc().format();
      const reqDateTime = moment(data.dateTime).format("YYYY-MM-DD HH:mm:ss");
      const currDateTime = moment(tripDate).add(-5, 'minutes').format("YYYY-MM-DD HH:mm:ss");
     

      if (reqDateTime < currDateTime) {
        throw new CustomError({ serviceName, ...errorManager.PAST_TRIP_DATE });
      }
   

      // if (Object.values(applicationStatuses.paymentType).indexOf(data.paymentType) < 0) {
      //   throw new CustomError({ serviceName, ...errorManager.INVALIDE_PAYMENT_TYPE });
      // }

      const user = await UserDBService.fetchByUserId(obj);
      if (!user) {
        throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
      }

      const driver = await UserDBService.checkDriver({
        id: data.driverId,
        role: "DRIVER",
      });

      if (!driver) {
        throw new CustomError({ serviceName, ...errorManager.NO_DRIVER_FOUND });
      }

      const carDetails = await CarDbService.getCarByDriverId({ status: 'Active', driverId: data.driverId });
      const carTypeDetails  =   await CarTypeDbService.getCarByField({id:carDetails.carTypeId})
      if (carDetails) {
        const param = {
          total_distance: data.totalKms,
          total_time: data.totalTimeInMinute,
          price_kilometer: carTypeDetails.pricePerHourKM,
          price_perminute: carTypeDetails.pricePerMin,
          booking_fee: carTypeDetails.bookingFee,
          price_perHour: carTypeDetails.pricePerHour,
          booked_Hours: data.bookedHours ? data.bookedHours : null
        };
        const {totalFare} = await DriverDBService.fareCalculation(param);
       
        // if (data.paymentAmount > estimatedAmount || data.paymentAmount < estimatedAmount) {
        //   throw new CustomError({ serviceName, ...errorManager.ESTIMATE_AMOUNT_ERR });
        // }
      }
      
    
      const today = moment().utc().format("YYYY-MM-DD");
      const todayTrips = await TripService.totalCustomerTrips(userDetails.id, today);
      if (todayTrips.length > 0) {
        throw new CustomError({ serviceName, ...errorManager.NEXT_TRIP_ERR });
      }
      
      // generate 4 digit random otp
      const randomOtp = randomstring.generate({
        length: 4,
        charset: "numeric",
      });

      
   
      const calculateDate = moment().add(1, 'hours').format("YYYY-MM-DD  HH:mm:ss");
      const dateTimes = moment(data.dateTime).format("YYYY-MM-DD  HH:mm:ss");
      let tripType = '';
      if (dateTimes > calculateDate) {
        tripType = data.bookedHours ? applicationStatuses.tripScheduleStatus.scheduledHourly
          : applicationStatuses.tripScheduleStatus.scheduled;
        tripDate = moment(data.dateTime).utc().format();
      } else {
        tripType = data.bookedHours ? applicationStatuses.tripScheduleStatus.rightNowHourly
        : applicationStatuses.tripScheduleStatus.rightnow;
      }
      const pickUpTime = moment(data.dateTime).utc().format();
      const dataToInsert = {
        uuid: uuid_v4(),
        locationType: data.locationType,
        tripId: "HT" + Math.round(Date.now() / 1000),
        tripDate,
        customerId: userDetails.id,
        driverId: data.driverId,
        status: applicationStatuses.tripStatus.scheduled,
        startLat: data.startLat,
        startLong: data.startLong,
        endLat: data.endLat,
        endLong: data.endLong,
        startLocationName: data.startLocationName,
        endLocationName: data.endLocationName,
        paymentType: data.paymentType,
        cardType: data.cardType ? data.cardType : "",
        cardNo: data.cardNo ? data.cardNo : 0,
        paymentAmount: data.paymentAmount,
        otp: randomOtp,
        totalKms: data.totalKms ? data.totalKms : 0,
        totalTimeInMinute: data.totalTimeInMinute ? data.totalTimeInMinute : 0,
        tripType: tripType,
        pickUpTime,
        bookedHours: data.bookedHours ? data.bookedHours : 0
      };
      const userObj = await TripService.createTrip(dataToInsert);
      if(userObj){
        if (tripType === applicationStatuses.tripScheduleStatus.scheduled || 
          tripType === applicationStatuses.tripScheduleStatus.scheduledHourly) {
          const fromDateTime = moment(data.dateTime).add(-10, 'minutes').utc().format();

          let endDateTime;
          if (tripType === applicationStatuses.tripScheduleStatus.scheduledHourly) {
            endDateTime = moment(data.dateTime).add(data.bookedHours, 'hours').utc().format();
          } else {
            endDateTime = moment(data.dateTime).add(data.totalTimeInMinute, 'minutes').utc().format();
          }

          const params = {
            fromDateTime,
            toDateTime: endDateTime,
            driverId: data.driverId
          }
          await CarDbService.updateCarDetails(params);
        }
      }
      const avgRating = await this.getDriverAvgRating({ id: data.driverId });
      userObj.dataValues.driverAvgRating = 0;
      if (avgRating.length > 0) {
        userObj.dataValues.driverAvgRating = avgRating[0].avgDriverRating;
      }
      if (driver.profileImage) {
        userObj.dataValues.profileImage = driver.profileImage;
      }
      return userObj;
    } catch (error) {
      throw error;
    }
  }

 

  static async getTotalFare(tripDetails) {
    const details = tripDetails.rows.map(async trip => {
      const params = {
        status: 'Active',
        driverId: trip.driverId
      };
      const carDetails = await CarDbService.getCarByDriverId(params);
      const carTypeDetails  =   await CarTypeDbService.getCarByField({id:carDetails.carTypeId})
      if (carDetails) {
        const param = {
          total_distance: trip.totalKms,
          total_time: trip.totalTimeInMinute,
          price_kilometer: carTypeDetails.pricePerHourKM,
          price_perminute: carTypeDetails.pricePerMin,
          booking_fee: carTypeDetails.bookingFees,
          waitingTime: trip.waitingTime,
          waitingChargePerMin: carTypeDetails.waitingChargePerMin
        };
        const {totalFare, waitingCharge} = await DriverDBService.fareCalculation(param);
        trip.totalFare = totalFare;
        trip.waitingCharge = waitingCharge;
      }
      return trip;
    });

    return await Promise.all(details);
  }


  static async changeLocation(data) {
    const trip = await TripService.findTrip({ uuid: data.uuid })
    if (!trip) {
      throw new CustomError({ serviceName, ...errorManager.NO_TRIP_FOUND });
    }
    if (trip.status == applicationStatuses.tripStatus.ongoing) {
      let body = {
        endLat: data.endLat,
        endLong: data.endLong,
        endLocationName: data.endLocationName
      }

      const updateStatus = await TripService.updateTripDetails(body, {
        uuid: data.uuid,
      });
      if (updateStatus) {
        const liveFeedObj = {name: trip.customer_details.fullName + ' ' , message: liveFeed.LOCATION_CHANGE, type: liveFeed.LIVEFEEDS}
        await NotificationDBService.createlive(liveFeedObj);
      }
      return updateStatus
    }
    else {
      throw new CustomError({ serviceName, ...errorManager.ONGOING_TRIPS_ONLY });
    }

  }

  static async getRideTypes() {
    const ridetypes = await TripService.getRideTypes();
    console.log('ridetypes', ridetypes);
    return ridetypes;
  }

  static async getDriverTrip(data) {
    let obj = {
      driverId: data.id,
      status: "Scheduled",
    };
   
    const tripData = await TripService.getDriverTrip(obj);
    
   if(tripData){
      const obj = {
        "id": tripData.id,
        "uuid": tripData.uuid,
        "locationType": tripData.locationType,
        "startLat": tripData.startLat,
        "startLong": tripData.startLong,
        "endLat": tripData.endLat,
        "endLong": tripData.endLong,
        "startLocationName": tripData.startLocationName,
        "endLocationName": tripData.endLocationName,
        "paymentType": tripData.paymentType,
        "cardType": tripData.cardType,
        "cardNo": tripData.cardNo,
        "paymentAmount":tripData.paymentAmount,
        "status": tripData.status,
        "tripId": tripData.tripId,
        "tripDate": tripData.tripDate,
        "otp": tripData.otp,
        "customerFeedback": tripData.customerFeedback,
        "driverFeedback":tripData.driverFeedback,
        "ratingCustomer": tripData.ratingCustomer,
        "ratingDriver": tripData.ratingDriver,
        "pickUpTime": tripData.pickUpTime,
        "dropTime": tripData.dropTime,
        "description": tripData.description,
        "canceledBy": tripData.canceledBy,
        "totalKms": tripData.totalKms,
        "totalTimeInMinute": tripData.totalTimeInMinute,
        "tripType": tripData.tripType,
        "createdAt": tripData.createdAt,
        "updatedAt": tripData.updatedAt,
        "driverId":tripData.driverId,
        "customerId":tripData.customerId,
        "customerName":"",
        "customerAvgRating": 0,
        "customerImage":"",
      }

      if (tripData.customer_details.fullName ) {
          obj.customerName = tripData.customer_details.fullName   
      }
     if(obj.customerId){
       obj.customerAvgRating = await this.getCustomerAvgRating(obj.customerId)
     }
      if (tripData.customer_details.profileImage ) {
          obj.customerImage = tripData.customer_details.profileImage
      }
       return obj
    }
    else{
        throw new CustomError({ serviceName, ...errorManager.NO_TRIP_FOUND });
    }
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

  /* Update Trip Status */
  static async updateTripStatus(data, userDetails) {
    const reqBody = { ...data };
    let body = {};

    if (Object.values(applicationStatuses.tripStatus).indexOf(data.status) < 0) {
      throw new CustomError({ serviceName, ...errorManager.INVALIDE_TRIP_STATUS });
    }

    if (reqBody.status === applicationStatuses.tripStatus.completed
      && !reqBody.bookedHours && !reqBody.totalKms) {

      if (!reqBody.bookedHours) {
        throw new CustomError({ serviceName, ...errorManager.REQUIRED_BOOKED_HOURS });
      }

      if (!reqBody.totalKms) {
        throw new CustomError({ serviceName, ...errorManager.TOTAL_KMS_REQUIRED });
      }
    }

    const tripData = await TripService.findTrip({ uuid: data.uuid });
    const currentDate = moment().utc().format('YYYY-M-DD HH:mm:ss');
    const start = moment(tripData.pickUpTime, 'YYYY-M-DD HH:mm:ss');
    const end = moment(currentDate, 'YYYY-M-DD HH:mm:ss');
    let totalMinute;

    if (reqBody.status === applicationStatuses.tripStatus.completed) {
      totalMinute = end.diff(start, 'minutes');
    } else {
      totalMinute = reqBody.totalTimeInMinute
    }

    if (!tripData) {
      throw new CustomError({ serviceName, ...errorManager.INVALIDE_UUID });
    }

    if (reqBody.status === applicationStatuses.tripStatus.rejected || reqBody.status === applicationStatuses.tripStatus.canceled) {
      body = {
        status: reqBody.status,
        canceledBy: userDetails.id,
        description: reqBody.reason ? reqBody.reason : ''
      };
    } else {
      let dropTime = null;
      let waitingTime = 0;
      if (reqBody.status === applicationStatuses.tripStatus.completed) {
        dropTime = moment().utc().format();
        waitingTime = reqBody.waitingTime || 0;
      }
      body = {
        status: reqBody.status,
        totalKms: data.totalKms ? data.totalKms : 0,
        totalTimeInMinute: totalMinute ? totalMinute : tripData.totalTimeInMinute,
        dropTime: dropTime,
        waitingTime: waitingTime
      };
    }

    const updateStatus = await TripService.updateTripDetails(body, {
      uuid: data.uuid,
    });

    // sending emails after updating trip
    if (reqBody.status == applicationStatuses.tripStatus.rejected) {
      const adminData = await UserDBService.getAdmin({ "role": roles.ADMIN, isActive: true });

      if (adminData) {
        adminData.rows.forEach((data) => {
          const data1 = { email: data.loginId, type: 'tripRejection' };
          const emailVariables = { DRIVER_NAME: tripData.driver_details.fullName, LOCALHOST: localhost };
          emailService(data1, emailVariables);
        })
      }

    } else if (reqBody.status == applicationStatuses.tripStatus.canceled) {
      const adminData = await UserDBService.getAdmin({ "role": roles.ADMIN, isActive: true });

      if (adminData) {
        adminData.rows.forEach((data) => {
          const data1 = { email: data.loginId, type: 'tripCancellationByCustomer' };
          const emailVariables = {
            CUSTOMER_NAME: tripData.customer_details.fullName,
            TRIPID: tripData.tripId,
            REASON: tripData.description,
            LOCALHOST: localhost
          };
          emailService(data1, emailVariables);
        })
      }

      const data1 = { email: tripData.driver_details.loginId, type: 'tripCancellation' };
      const emailVariables = {
        DRIVER_NAME: tripData.driver_details.fullName,
        TRIPID: tripData.tripId,
        TRIPDATE:tripData.tripDate,
        LOCALHOST: localhost
      };
      emailService(data1, emailVariables, tripData.tripId);
    }

    if (updateStatus) {
      // For Ongoing trip change the driver status driving
      if (data.status === applicationStatuses.tripStatus.ongoing) {
        const liveFeedObj = {name: tripData.driver_details.fullName + ' ' , message: liveFeed.TRIP_ACCEPTED, type: liveFeed.LIVEFEEDS, userId: tripData.driverId}
        await NotificationDBService.createlive(liveFeedObj);

        // add notification
        const notificationObj = {name: tripData.customer_details.fullName + ' ' , message: customerPushNotification.TRIP_START, type: null, userId: tripData.customerId, tripType: tripTypeNotification.tripStarted }
        await NotificationDBService.createlive(notificationObj);

        const param = {
          isOnlineStatus: applicationStatuses.isOnlineStatus.driving,
        };

        return this.changeDriverstatus(param, userDetails, reqBody);
      }

      // For completed trip change the driver status is available
      if (data.status === applicationStatuses.tripStatus.completed) {
        const liveFeedObj = {name: tripData.driver_details.fullName + ' ' , message: liveFeed.TRIP_COMPLETED, type: liveFeed.LIVEFEEDS}
        await NotificationDBService.createlive(liveFeedObj);

        const notificationObj = {name: tripData.customer_details.fullName + ' ' , message: customerPushNotification.TRIP_COMPLETED, type: null, userId: tripData.customerId, tripType: tripTypeNotification.completedTrip }
        await NotificationDBService.createlive(notificationObj);

        const param = {
          isOnlineStatus: applicationStatuses.isOnlineStatus.available,
        };
        
        const tripDetails = await this.changeDriverstatus(param, userDetails, reqBody);
        await this.generatePdf(tripData.tripId);
        return tripDetails;
      }

      if (data.status === applicationStatuses.tripStatus.scheduled || data.status === applicationStatuses.tripStatus.rejected) {
        if (data.status === applicationStatuses.tripStatus.scheduled) {
          const liveFeedObj = { name: tripData.customer_details.fullName + ' ', message: liveFeed.BOOKED_TRIP, type: liveFeed.LIVEFEEDS, userId: data.driverId }
          await NotificationDBService.createlive(liveFeedObj);

          const notificationObj = { name: tripData.customer_details.fullName + ' ', message: customerPushNotification.TRIP_BOOKING, type: null, userId: userDetails.id, tripType: tripTypeNotification.createdTrip }
          await NotificationDBService.createlive(notificationObj);

          const replaceVariable = `[NAME]`;
          const messages = driverPushNotification.TRIP_BOOKING.split(replaceVariable).join(tripData.customer_details.fullName);
          const driverObj = { name: tripData.customer_details.fullName + ' ', message: messages, type: null, userId: data.driverId, tripType: tripTypeNotification.createdTrip }
          await NotificationDBService.createlive(driverObj);


          const carDetails = await CarDbService.getCarByDriverId({ status: 'Active', driverId: data.driverId });
          const adminData = await UserDBService.getAdmin({ "role": roles.ADMIN, isActive: true })
          if (adminData) {
            adminData.rows.forEach((data) => {
              const data1 = { email: data.loginId, type: 'tripBooking' };
              const emailVariables = {
                CUSTOMER_NAME: tripData.customer_details.fullName,
                DRIVER_NAME: tripData.driver_details.fullName,
                PICKPTIME:tripData.tripDate,
                TRIPID: tripData.tripId,
                FROM: tripData.startLocationName,
                TO: tripData.endLocationName,
                VEHICLE_NUMBER: carDetails.carNumber,
                OTP: tripData.otp,
                DRIVER_MOBILE_NUMBER: tripData.driver_details.mobileNumber,
                CUSTOMER_MOBILE_NUMBER: tripData.customer_details.mobileNumber,
                LOCALHOST: localhost
              };
              emailService(data1, emailVariables);
            })
          }

          // send message to mobile
          const smsVariables = {
            CUSTOMER_NAME: tripData.customer_details.fullName,
            DRIVER_NAME: tripData.driver_details.fullName,
            TRIPID: tripData.tripId,
            SOURCE: tripData.startLocationName,
            DESTINATION: tripData.endLocationName,
            VEHICLE_NUMBER: carDetails.carNumber,
            OTP: tripData.otp,
            DRIVER_MOBILE: tripData.driver_details.mobileNumber
          };
          let smscontentData = '';
          const smsContent = await this.getSmsContent('tripBooking');
          smscontentData = smsContent.body;
          Object.keys(smsVariables).forEach((variable) => {
            const replaceVariable = `[${variable}]`;
            smscontentData = smscontentData.split(replaceVariable).join(smsVariables[variable]);
          });
          const cleanText = smscontentData.replace(/<\/?[^>]+(>|$)/g, "").replace(/\&nbsp;/g, '');
          const mobile = tripData.customer_details.countryCode + tripData.customer_details.mobileNumber;
          sendSms(cleanText, mobile);

          if (tripData && tripData.tripType === applicationStatuses.tripScheduleStatus.rightnow || 
            tripData.tripType === applicationStatuses.tripScheduleStatus.rightNowHourly) {
            const body = applicationStatuses.otp.TRIP_OTP_MESSAGE + tripData.otp;
            const mobile = tripData.customer_details.countryCode + tripData.customer_details.mobileNumber;
            sendSms(body, mobile);
          }
        }

        if (data.status === applicationStatuses.tripStatus.rejected) {
          // Add livefeed
          const liveFeedObj = {name: tripData.driver_details.fullName + ' ' , message: liveFeed.TRIP_REJECTED, type: liveFeed.LIVEFEEDS}
          await NotificationDBService.createlive(liveFeedObj);

          // Add notification
          const replaceVariable = `[TRIPID]`;
          let messages = '';
          if (tripData.tripType === 'Scheduled') {
            messages = customerPushNotification.TRIP_REJECTED_SCHEDULED.split(replaceVariable).join(tripData.tripId);
          } else {
            messages = customerPushNotification.TRIP_REJECTED.split(replaceVariable).join(tripData.tripId);
          }
          const notificationObj = {name: tripData.customer_details.fullName + ' ' , message: messages, type: null, userId: tripData.customerId, tripType: tripTypeNotification.rejectedTrip }
          await NotificationDBService.createlive(notificationObj);

          // send email to customer
          const customerDetails = { email: tripData.customer_details.loginId , type: 'customerTripRejection' };
          const emailVariables = {
            CUSTOMER_NAME: tripData.customer_details.fullName,
            TRIPID: tripData.tripId
          };
          emailService(customerDetails, emailVariables);
        }
        return TripService.findTrip({ uuid: data.uuid });
      }

      // After trip cancelled and Rejected change driver status available
      if (data.status === applicationStatuses.tripStatus.canceled) {
        const liveFeedObj = {name: tripData.customer_details.fullName + ' ' , message: liveFeed.CANCELLED_TRIP, type: liveFeed.LIVEFEEDS}
        await NotificationDBService.createlive(liveFeedObj);

        // Add notification
        const replaceVariable = `[TRIPID]`;
        const messages = driverPushNotification.TRIP_CANCELLED.split(replaceVariable).join(tripData.tripId);
        const notificationObj = {name: tripData.driver_details.fullName + ' ' , message: messages, type: null, userId: tripData.driverId, tripType: tripTypeNotification.cancelledTrip }
        await NotificationDBService.createlive(notificationObj);

        const param = {
          isOnlineStatus: applicationStatuses.isOnlineStatus.available,
        };
        const trip = await TripService.findTrip({ uuid: data.uuid });
        if (trip && trip.driverId) {
          const driverId = trip.driverId;
          await DriverDBService.updateDriverStatus(param, driverId);
        }
        return trip;
      }

      return updateStatus;
    }
    throw new CustomError({ serviceName, ...errorManager.FAILED_TO_UPDATE_TRIP_STATUS });
  }


  static async completeTrip(data) {
    const reqBody = { ...data };
    let body = {};

    const tripData = await TripService.findTrip({ uuid: data.uuid });
    if (!tripData) {
      throw new CustomError({ serviceName, ...errorManager.INVALIDE_UUID });
    }

    const currentDate = moment().utc().format('YYYY-M-DD HH:mm:ss');
    const start = moment(tripData.pickUpTime, 'YYYY-M-DD HH:mm:ss');
    const end = moment(currentDate, 'YYYY-M-DD HH:mm:ss');
    const totalMinute = end.diff(start, 'minutes');

    body = {
      status: applicationStatuses.tripStatus.completed,
      totalKms: data.totalKms || 0,
      totalTimeInMinute: totalMinute || 0,
      bookedHours: data.bookedHours || 0,
      dropTime: moment().utc().format()
    };

    const updateStatus = await TripService.updateTripDetails(body, {
      uuid: data.uuid,
    });

    if (updateStatus) {
      const liveFeedObj = {name: tripData.driver_details.fullName + ' ' , message: liveFeed.TRIP_COMPLETED, type: liveFeed.LIVEFEEDS}
      await NotificationDBService.createlive(liveFeedObj);
  
      const notificationObj = {name: tripData.customer_details.fullName + ' ' , message: customerPushNotification.TRIP_COMPLETED, type: null, userId: tripData.customerId, tripType: tripTypeNotification.completedTrip }
      await NotificationDBService.createlive(notificationObj);
  
      const param = {
        isOnlineStatus: applicationStatuses.isOnlineStatus.available,
      };
      let driverDetails = {
        id: reqBody.driverId
      }
      let details = await this.changeDriverstatus(param, driverDetails, reqBody);
      await this.generatePdf(tripData.tripId);
      mqttPublishTripComplete(details);
      return details;
    }
    return updateStatus;
  }

  static async updateCustomerReview(data, userDetails) {
    const reqBody = { ...data };
    const userData = await UserDBService.getByUserId({id: userDetails.id });
    
    const customerReviewData = {
      driverFeedback: reqBody.driverFeedback ? reqBody.driverFeedback : '',
      ratingDriver: reqBody.ratingDriver ? reqBody.ratingDriver : 0,
    }
    const updateStatus = await TripService.updateTripDetails(customerReviewData, {
      uuid: reqBody.uuid,
    });

    if (updateStatus) {
      const notificationObj = {name: userData.fullName + ' ' , message: customerPushNotification.RATING_REVIEW, type: null, userId: userDetails.id, tripType: tripTypeNotification.tripRate }
      await NotificationDBService.createlive(notificationObj);

      return updateStatus;
    } else {
      throw new CustomError({
        serviceName,
        ...errorManager.FAILED_TO_UPDATE_TRIP_STATUS,
      });
    }
  }

  static async updateDriverReview(data) {

    const reqBody = { ...data };
    const driverReviewData = {
      customerFeedback: reqBody.customerFeedback ? reqBody.customerFeedback : '',
      ratingCustomer: reqBody.ratingCustomer ? reqBody.ratingCustomer : 0,
    }
    const updateReview = await TripService.updateTripDetails(driverReviewData, {
      uuid: reqBody.uuid,
    });

    if (updateReview) {
      return updateReview;
    } else {
      throw new CustomError({
        serviceName,
        ...errorManager.FAILED_TO_UPDATE_TRIP_STATUS,
      });
    }
  }

  static async changeDriverstatus(param, userDetails, data) {
    await DriverDBService.updateDriverStatus(param, userDetails.id);
    const details = await TripService.getCompleteTrip(data);
    if (details.status === applicationStatuses.tripStatus.completed) {
      let tripDate = moment().format();
      await TripService.updateTripDetails(
        { paymentAmount: details.totalFare, dropTime: tripDate },
        { uuid: data.uuid }
      );

      const tripDetails = await TripService.getCompleteTrip(data);
      const customerInvoice = 'customerTripInvoice.pdf';
      const driverInvoice = 'driverTripInvoice.pdf';

      const customerFilePath = path.join(__dirname, '../../../pdfFile/'+ customerInvoice);
      const driverFilePath = path.join(__dirname, '../../../pdfFile/'+ driverInvoice);
     

      const invoiceMail = { email: details.customer_details.loginId , type: 'customerTripInvoice', filePath: customerFilePath };
      const emailVariables = {
        DRIVER_NAME: details.driver_details.fullName,
        CUSTOMER_NAME: details.customer_details.fullName,
        TRIPID: details.tripId,
        DATE: details.tripDate,
        CARMODEL:tripDetails.carModel,
        SOURCE: details.startLocationName,
        DESTINATION: details.endLocationName ? details.endLocationName : "",
        AMOUNT: tripDetails.totalFare,
        BOOKING_HOURS:details.bookedHours?details.bookedHours:0,
        WAITING_CHARGES:tripDetails.waitingCharge?tripDetails.waitingCharge:0,
        PAYMENTTYPE: tripDetails.paymentType,
        FINAL_AMOUNT: tripDetails.waitingCharge + tripDetails.totalFare,
        LOCALHOST: localhost
      };
      emailService(invoiceMail, emailVariables,details.tripId);

      const data2 = { email: tripDetails.driver_details.loginId , type: 'invoice', filePath: driverFilePath };
      const driverEmailVariables = {  
         DRIVER_NAME: tripDetails.driver_details.fullName ,
         CUSTOMER_NAME: tripDetails.customer_details.fullName,
         TRIPID: details.tripId,
         DATE: details.tripDate,
         CARMODEL:tripDetails.carModel,
         SOURCE: details.startLocationName,
         DESTINATION: details.endLocationName ? details.endLocationName : "",
         AMOUNT: tripDetails.totalFare,
         BOOKING_HOURS:details.bookedHours?details.bookedHours:0,
         WAITING_CHARGES: tripDetails.waitingCharge?tripDetails.waitingCharge:0,
         PAYMENTTYPE: tripDetails.paymentType,
         FINAL_AMOUNT: tripDetails.waitingCharge + tripDetails.totalFare,
         LOCALHOST: localhost
      };
      emailService(data2, driverEmailVariables);

      const adminData =  await UserDBService.getAdmin({"role":roles.ADMIN, isActive:true })
      if(adminData){
          adminData.rows.forEach((data)=>{
            const data1 = { email: data.loginId , type: 'tripCompletion', filePath: customerFilePath };
            const emailVariables = {   DRIVER_NAME: tripDetails.driver_details.fullName , CUSTOMER_NAME: tripDetails.customer_details.fullName, LOCALHOST: localhost };
            emailService(data1, emailVariables);
          })
      }

      return tripDetails;
    } else {
      return details;
    }
  }

  static async getTripDetails(tripId: string) {

    const tripList = await TripService.getTripDetails(tripId);
     if(!tripList){
      throw new CustomError({ serviceName, ...errorManager.NO_TRIP_FOUND });
     }

    const driver_info = await DriverDBService.getDriverById({ 'userId': tripList.driverId });
    
    if(driver_info){
        const driver_Infos = {
          "locationName": driver_info.locationName || 'null',
          "addressLatitude": driver_info.addressLatitude || 'null',
          "addressLongitude": driver_info.addressLongitude || 'null'
        }
      tripList['driver_info'] = driver_Infos
    }else{
        tripList['driver_info'] = {};
    }
   
    const customerinfo = await CustomerDBService.getCustomerById({ 'userId': tripList.customerId });
      if(customerinfo){  
        const customerInfos = {
          "locationName": customerinfo.locationName || 'null',
          "addressLatitude": customerinfo.addressLatitude || 'null',
          "addressLongitude": customerinfo.addressLongitude || 'null'
        }
        tripList['customerinfo'] = customerInfos
      }else{
        tripList['customerinfo'] = {}
      }

    return tripList
  }

  static async shareCustomerStatus(data) {
    const customerStatus = await TripService.shareCustomerStatus(data);
    return customerStatus;
  }



  static async getScheduledTrip(userDetails) {
    const now = moment().utc().format();
    const currTo30Minute = moment().add(30, 'minutes').utc().format();
    const tripData = await TripService.getScheduledTripSomeMinuteBefore(now, currTo30Minute, userDetails);
    
    if(tripData){

      const obj = {
        "id": tripData.id,
        "uuid": tripData.uuid,
        "locationType": tripData.locationType,
        "startLat": tripData.startLat,
        "startLong": tripData.startLong,
        "endLat": tripData.endLat,
        "endLong": tripData.endLong,
        "startLocationName": tripData.startLocationName,
        "endLocationName": tripData.endLocationName,
        "paymentType": tripData.paymentType,
        "cardType": tripData.cardType,
        "cardNo": tripData.cardNo,
        "paymentAmount":tripData.paymentAmount,
        "status": tripData.status,
        "tripId": tripData.tripId,
        "tripDate": tripData.tripDate,
        "otp": tripData.otp,
        "customerFeedback": tripData.customerFeedback,
        "driverFeedback":tripData.driverFeedback,
        "ratingCustomer": tripData.ratingCustomer,
        "ratingDriver": tripData.ratingDriver,
        "pickUpTime": tripData.pickUpTime,
        "dropTime": tripData.dropTime,
        "description": tripData.description,
        "canceledBy": tripData.canceledBy,
        "totalKms": tripData.totalKms,
        "totalTimeInMinute": tripData.totalTimeInMinute,
        "tripType": tripData.tripType,
        "createdAt": tripData.createdAt,
        "updatedAt": tripData.updatedAt,
        "driverId":tripData.driverId,
        "customerId":tripData.customerId,
        "customerName": tripData.customer_details.fullName ? tripData.customer_details.fullName : '',
        "customerMobileNumber": tripData.customer_details.mobileNumber ? tripData.customer_details.mobileNumber : '',
        "driverName": tripData.driver_details.fullName ? tripData.driver_details.fullName : '',
        "driverMobileNumber": tripData.driver_details.mobileNumber ? tripData.driver_details.mobileNumber : '',
        "driverAddressLatitude": "",
        "driverAddressLongitude": "",
        "customerAvgRating": 0,
        "driverAvgRating": 0,
        "customerImage":"",
        "driverImage": "",
        "carImage": "",
        "carNumber": "",
        "carModel": ""
        
      }
      if(obj.customerId){
        obj.customerAvgRating = await this.getCustomerAvgRating(obj.customerId)
      }
      if(obj.driverId){
        obj.driverAvgRating = await this.getCustomerAvgRating(obj.driverId)
        const driverDetails = await DriverDBService.getDriverById({userId: obj.driverId});
        if (driverDetails) {
          obj.driverAddressLatitude = driverDetails.addressLatitude;
          obj.driverAddressLongitude = driverDetails.addressLongitude;
        }
      }
      if (tripData.customer_details.profileImage) {
        obj.customerImage = tripData.customer_details.profileImage
      }
      if (tripData.driver_details.profileImage) {
        obj.driverImage = tripData.customer_details.profileImage
      }

      const carDetails = await CarDbService.getCarByDriverId({status: 'Active',  driverId: tripData.driverId });
      const carTypeDetails  =   await CarTypeDbService.getCarByField({id:carDetails.carTypeId})

      if (carDetails) {
        obj.carImage = carTypeDetails.carImage ? carTypeDetails.carImage : "";
        obj.carNumber = carDetails.carNumber;
        obj.carModel = carDetails.carModel;
      }

      const params = {isOnlineStatus: applicationStatuses.isOnlineStatus.driving};
      DriverDBService.updateDriverStatus(params, tripData.driverId);
      
      return obj;
    } else {
      return '';
    }
  }

  static async getScheduledTripTwoMinuteAway(userDetails) {
    const now = moment().utc().format();
    const currToTwoMinute = moment().add(2, 'minutes').utc().format();
    const tripData = await TripService.getScheduledTripSomeMinuteBefore(now, currToTwoMinute, userDetails);
    if (tripData) {
      const notificationObj = {name: tripData.customer_details.fullName + ' ' , message: customerPushNotification.NEARBY_DRIVER, type: null, userId: tripData.customerId }
      NotificationDBService.createlive(notificationObj);
    }
    if (tripData == null) {
      throw new CustomError({ serviceName, ...errorManager.NO_TRIP_FOUND });
    }
    return "Notification created successully.";
  }

  static async getTrips(userDetails: string) {
    const tripDetails = await TripService.getTrips(userDetails);
    for (let data in tripDetails.rows) {
      tripDetails.rows[data].driver_details['profileImage'] = (tripDetails.rows[data].driver_details.profileImage) ? tripDetails.rows[data].driver_details.profileImage : '' ;
      tripDetails.rows[data].customer_details['profileImage'] = (tripDetails.rows[data].customer_details.profileImage) ? tripDetails.rows[data].customer_details.profileImage : '';
      
      const carDetails      =   await CarDbService.getCarByDriverId({status: 'Active',  driverId: tripDetails.rows[data].driverId });
      const carTypeDetails  =   await CarTypeDbService.getCarByField({id:carDetails.carTypeId})
      if (carDetails) {
        tripDetails.rows[data]['carImage'] = carTypeDetails.carImage ? carTypeDetails.carImage : "";
        tripDetails.rows[data]['carNumber'] = carDetails.carNumber;
        tripDetails.rows[data]['carModel'] = carDetails.carModel;
      }
    }
    const avgRating = await this.getDriverAvgRating(userDetails);
    tripDetails.driverAvgRating = 0;
    if (avgRating.length > 0) {
      tripDetails.driverAvgRating = avgRating[0].avgDriverRating;
    }
    return tripDetails;
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

  static async getAllTrips(userDetails) {

    if (userDetails.role == "CUSTOMER") {
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
    const tripDetails = await TripService.getAllTrips({ customerId: userDetails.id ,   status: 'Rejected' });

    for (let data in tripDetails.rows) {
      const carTypeDetails  =   await CarTypeDbService.getCarByField({id:tripDetails.rows[data].car_details.carTypeId})
      if (carTypeDetails) {
        tripDetails.rows[data]['car_details']['carImage'] = carTypeDetails.carImage ? carTypeDetails.carImage : "";
      }
    }
    return tripDetails;
  }

  static async getUserAllTrips(userId) {

      let obj = {
        id: userId,
      };
  
      const user = await UserDBService.getByUserId(obj);
      if (!user) {
        throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
      }
      let userTripsData ;
      if( user.role == roles.CUSTOMER ){
        userTripsData = await TripService.getAllCustomerTrips({ id : userId });
      }else if(user.role == roles.DRIVER ){
        userTripsData = await TripService.getAllDriverTrips({ id : userId });
      }
    return userTripsData;
  }

  static async sendInvoice(userDetails, tripId) {
    const tripDetails = await TripService.getTripDetails(tripId);
    
    let awsDriverImage = '';
    let awsCustomerImage = '';
    if (tripDetails.driver_details.profileImage) {
      awsDriverImage = await FileService.getImageByLocation(tripDetails.driver_details.profileImage);
    }
    if (tripDetails.customer_details.profileImage) {
      awsCustomerImage = await FileService.getImageByLocation(tripDetails.customer_details.profileImage);
    }
    tripDetails.driver_details.profileImage = awsDriverImage;
    tripDetails.customer_details.profileImage = awsCustomerImage;
 
    const carDetails = await CarDbService.getCarByDriverId({status: 'Active',  driverId: tripDetails.driverId });
    const carTypeDetails  =   await CarTypeDbService.getCarByField({id:carDetails.carTypeId})
    if (carDetails) {
      const awsImage = await FileService.getImageByLocation(carTypeDetails.carImage)
      tripDetails['carImage'] = awsImage;
      tripDetails['carNumber'] = carDetails.carNumber;
      tripDetails['carModel'] = carDetails.carModel;
    }
    const fileName = 'tripInvoice.pdf'
    await pdfGeneration.customerInvoicePdf(tripDetails, fileName);
    const filePath = path.join(__dirname, '../../../../habtoorist-trip/'+ fileName);
    const invoiceMail = { email: userDetails.loginId , type: 'invoice', filePath: filePath };
    const emailVariables = {
      DRIVER_NAME: tripDetails.driver_details.fullName,
      CUSTOMER_NAME: tripDetails.customer_details.fullName
    };
    emailService(invoiceMail, emailVariables, tripId);
    
    return "Invoice sent successfully your email id.";
  }

  static async generatePdf(tripId) {
    const tripDetails = await TripService.getTripDetails(tripId);
    let awsDriverImage = '';
    let awsCustomerImage = '';
    if (tripDetails.driver_details.profileImage) {
      awsDriverImage = await FileService.getImageByLocation(tripDetails.driver_details.profileImage);
    }
    if (tripDetails.customer_details.profileImage) {
      awsCustomerImage = await FileService.getImageByLocation(tripDetails.customer_details.profileImage);
    }
    tripDetails.driver_details.profileImage = awsDriverImage;
    tripDetails.customer_details.profileImage = awsCustomerImage;
 
    const carDetails = await CarDbService.getCarByDriverId({status: 'Active',  driverId: tripDetails.driverId });
    const carTypeDetails  =   await CarTypeDbService.getCarByField({id:carDetails.carTypeId})
    if (carDetails) {
      const awsImage = await FileService.getImageByLocation(carTypeDetails.carImage)
      tripDetails['carImage'] = awsImage;
      tripDetails['carNumber'] = carDetails.carNumber;
      tripDetails['carModel'] = carDetails.carModel;
    }
    const customerInvoice = 'customerTripInvoice.pdf';
    const driverInvoice = 'driverTripInvoice.pdf';
    await pdfGeneration.customerInvoicePdf(tripDetails, customerInvoice);
    await pdfGeneration.driverInvoicePdf(tripDetails, driverInvoice);
  }

  static async avoidOverlappingTrip(userDetails, reqBody) {
    const tripTime = moment(reqBody.dateTime).utc().format();
    const tripTo30Minute = moment(reqBody.dateTime).add(30, 'minutes').utc().format();

    const driver = await UserDBService.checkDriver({
      id: reqBody.driverId,
      role: "DRIVER",
    });

    if (!driver) {
      throw new CustomError({ serviceName, ...errorManager.NO_DRIVER_FOUND });
    }

    const tripData = await TripService.getScheduledTrip(tripTime, tripTo30Minute, reqBody.driverId);
    let dateObj = {};
    if (tripData.length > 0) {
      for (let data in tripData) {
        const carDetails = await CarDbService.getCarByDriverId({status: 'Active',  driverId: tripData[data].driverId });
        if (carDetails) {
          tripData[data]['carNumber'] = carDetails.carNumber;
          tripData[data]['carModel'] = carDetails.carModel;
        }
      }
      const pickupDate = moment(tripData[0].pickUpTime).format('DD-MM-YYYY');
      const pickupTime = moment(tripData[0].pickUpTime).format('HH:mm A');

      const startTime = moment(tripData[0].pickUpTime).add(-30, 'minutes').utc().format();
      const endTime = moment(tripData[0].pickUpTime).add(30, 'minutes').utc().format();
      const totalTimeInMinute = tripData[0].totalTimeInMinute;
      const endDateTime = moment(endTime).add(totalTimeInMinute, 'minutes').utc().format();

      dateObj = {
        startTime: startTime,
        endTime: endDateTime
      }
      const emailData = { email: userDetails.loginId , type: 'alreadyScheduledTrip' };
      const emailVariables = {
        CAR_MODEL: tripData[0].carModel,
        CAR_NUMBER: tripData[0].carNumber,
        DATE: pickupDate,
        TIME: pickupTime
      };
      if (tripData.length > 0) {
        emailService(emailData, emailVariables);
      }
      return dateObj;
    } else {
      return "No Booking";
    }
  }

  static async updatePickUpTime(data) {
    const tripData = await TripService.findTrip({ uuid: data.uuid })
    if (!tripData) {
      throw new CustomError({ serviceName, ...errorManager.NO_TRIP_FOUND });
    }
    const params = { pickUpTime: moment().utc().format()};
    return TripService.updateTripDetails(params, { uuid: data.uuid });
  }

  static async driverTotalEarning(data) {
    const currentWeekStartDate = moment().startOf("week").format("YYYY-MM-DDTHH:mm:ss");
    const currentWeekEndDate = moment().endOf("week").format("YYYY-MM-DDTHH:mm:ss");

    const today = moment().format('YYYY-MM-DD');
    const tomorrow  = moment().add(1,'days').format('YYYY-MM-DD');

    const [
      last7Days,
      previousTrip,
      todayEarning,
      totalEarning,
      hoursAvailable
    ] = await Promise.all([
      TripService.getLast7DaysTrips(data.id, currentWeekStartDate, currentWeekEndDate, 'last7Days'),
      TripService.getLastTrip(data.id),
      TripService.getLast7DaysTrips(data.id, today, tomorrow, 'today'),
      TripService.getLast7DaysTrips(data.id),
      TripService.getTotalHoursCompletedTrip(data.id)
    ]);
    let totalDriverEarning = {
      "previousTrip": "",
      "last7DaysTrip": "",
      "todayEarning": "",
      "totalEarning": "",
      "hoursAvailable": 0,
      "driverAvgRating": 0,
      "customerAvgRating": 0
    }
    const avgRating = await this.getDriverAvgRating(data);
    if (avgRating.length > 0) {
      totalDriverEarning.driverAvgRating = avgRating[0].avgDriverRating.toFixed(2);
    }
    
    if(previousTrip && previousTrip.customerId){
      totalDriverEarning.customerAvgRating = await this.getCustomerAvgRating(previousTrip.customerId)
    }

    totalDriverEarning.previousTrip = previousTrip;
    totalDriverEarning.last7DaysTrip = last7Days;
    totalDriverEarning.todayEarning = todayEarning;
    totalDriverEarning.totalEarning = totalEarning;
    totalDriverEarning.hoursAvailable = hoursAvailable;
    return totalDriverEarning;
  }

  static async getSmsContent(keyName: string) {
    const smsData = await redisCache.get(`${cache.sms}`, keyName);
    const smsContent = JSON.parse(smsData);
    if (smsContent) {
      return smsContent;
    }
  }

}


