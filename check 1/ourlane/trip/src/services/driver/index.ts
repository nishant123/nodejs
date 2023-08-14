import DriverDBService from "../../database/service/driver.dbservice";
import CustomError from "../../utils/error";
import { errorManager } from "../../config/errorManager";
import { v4 as uuid_v4 } from "uuid";
import { applicationStatuses, liveFeed } from "../../config/constants";
import FileService from '../../utils/file';
import UserDBService from '../../database/service/user.dbservice';
import emailService from '../../utils/emailService';
import NotificationDBService from '../../database/service/notification.dbservice';
import tripService from '../customerTrip';
import tripDbService from "../../database/service/trip.dbservice";
import { roles } from '../../config/constants';
import * as moment from "moment";
import { Float } from "aws-sdk/clients/ec2";
import { vars } from '../../config/vars';
import { mqttPublishDriverTripId,mqttPublishCustomerResponse }  from '../../utils/mqtt';

const { localhost } = vars;

const serviceName = "[DriverService]";

export default class DriverService {

  // CREATE CAR
  static async createDriver(
    options: {
      locationName: string;
      addressLatitude: string;
      addressLongitude: string;
    },
    userDetails
  ) {
    try {
      const { locationName, addressLatitude, addressLongitude } = options;
      const dataToInsert = {
        uuid: uuid_v4(),
        locationName: locationName,
        addressLatitude: addressLatitude,
        addressLongitude: addressLongitude,
        userId: userDetails.id,
        driverId: userDetails.id,
      };
      const addressObj = await DriverDBService.createDriver(dataToInsert);
      return;
    } catch (error) {
      throw error;
    }
  }

  static async getNearestCab(
    options: {
      latitude: Float;
      longitude: Float;
      totalKms: number;
      totalTimeInMinute: number;
      source: string;
      destination: string;
      dateTime: string;
      carTypeId: string;
      bookedHours?: number;
      endLat?: Float;
      endLong?: Float;
      locationType?: string;
      paymentType ?: string,
      cardType?: string,
      cardNo?: string,
      paymentAmount?: string,

    }, userDetails) {
    try {


      if (typeof options.latitude == 'number' && !isNaN(options.latitude)) {
        if (Number.isInteger(options.latitude)) {
          throw new CustomError({ serviceName, ...errorManager.LAT_FLOAT_TYPE });
        }
      } else {
        throw new CustomError({ serviceName, ...errorManager.LAT_FLOAT_TYPE });
      }

      if (typeof options.longitude == 'number' && !isNaN(options.longitude)) {
        if (Number.isInteger(options.longitude)) {
          throw new CustomError({ serviceName, ...errorManager.LONG_FLOAT_TYPE });
        }
      } else {
        throw new CustomError({ serviceName, ...errorManager.LONG_FLOAT_TYPE });
      }

      if (!options.latitude) {
        throw new CustomError({ serviceName, ...errorManager.REQUIRED_LAT });
      }
      if (!options.longitude) {
        throw new CustomError({ serviceName, ...errorManager.REQUIRED_LONG });
      }
      if (options.latitude < -90 || options.latitude > 90) {
        throw new CustomError({ serviceName, ...errorManager.INVALID_LAT });
      }
      if (options.longitude < -180 || options.longitude > 180) {
        throw new CustomError({ serviceName, ...errorManager.INVALID_LONG });
      }

      if (!options.totalKms && !options.totalTimeInMinute && !options.destination) {
        if (!options.bookedHours) {
          throw new CustomError({ serviceName, ...errorManager.REQUIRED_BOOKED_HOURS });
        }

        if (options.bookedHours <= 0) {
          throw new CustomError({ serviceName, ...errorManager.INVALID_BOOKED_HOURS });
        }
      }

      const currentTime = moment().format("HH:mm");
      const userData = UserDBService.getByUserId({ id: userDetails.id });
      let cabObj = await DriverDBService.getNearestCab(options, applicationStatuses.kilometer.ten);
      if (cabObj.length <= 0) {
        cabObj = await DriverDBService.getNearestCab(options, applicationStatuses.kilometer.twentyFive);
      }

      if (cabObj.length <= 0) {
        const adminData = await UserDBService.getAdmin({ "role": roles.ADMIN, isActive: true })
        if (adminData) {
          adminData.rows.forEach((data) => {
            const mailTo = { email: data.loginId, type: 'noCabFound' };
            const emailVariables = {
              CUSTOMER_NAME: userData.fullName,
              CUSTOMER_EMAIL: userData.loginId,
              CUSTOMER_MOBILE: userData.mobileNumber,
              PICKUP_LOCATION: options.source ? options.source : '',
              DROP_LOCATION: options.destination ? options.destination : '',
              PICKUP_TIME: currentTime
            };
             //emailService(mailTo, emailVariables);
          })
        }
      }
      console.log("..carLenth..",cabObj.length)
      if (cabObj.length <= 0) {
        mqttPublishCustomerResponse({customerId : userDetails.id, msg:"no Cab Found" });   
        return;       
      }
    
      let tripStatus = { tripid:"" }
  
      let carindex = 0;
     
        let stopInterval = await setInterval(async ()=>{
         
          if(tripStatus.tripid){ 
               
                 const tripResponse = await tripDbService.getTripDetails(tripStatus.tripid)
                   if(tripResponse.status == applicationStatuses.tripStatus.rejected || tripResponse.status == applicationStatuses.tripStatus.scheduled ){ 
                      console.log("..tripStatus.rejected..",tripStatus.tripid); 
                      console.log("cabObj.length",cabObj.length)
                      console.log("carindex",carindex)
                      if(tripResponse.status == applicationStatuses.tripStatus.scheduled){  
                      const updateStaus = await tripDbService.updateTripDetails({status:applicationStatuses.tripStatus.rejected},{tripId :tripStatus.tripid})
                      }
                      if(cabObj.length === carindex ){
                        console.log("all drivers rejected")
                        mqttPublishCustomerResponse({customerId : userDetails.id, msg:"select another car type" }); 
                        clearInterval(stopInterval);
                        return;  
                      }
                  }
                   else{
                    console.log("..else stop interval..",tripStatus.tripid);  
                    clearInterval(stopInterval);
                    return;
                  }
                } 

              const tripDetails = {
                "locationType": options.locationType,
                "startLocationName": options.source,
                "endLocationName": options.destination,
                "startLat": options.latitude,
                "startLong": options.longitude,
                "endLat": options.endLat,
                "endLong": options.endLong,
                "paymentType": options.paymentType,
                "cardType": options.cardType,
                "cardNo": options.cardNo,
                "paymentAmount": cabObj[carindex].totalFare,
                "driverId":  cabObj[carindex].driverId,
                "totalKms": options.totalKms,
                "carTypeId": options.carTypeId,
                "totalTimeInMinute": options.totalTimeInMinute,
                "dateTime": options.dateTime,
                "bookedHours": options.bookedHours
              }

            const tripData = await tripService.createTrip(tripDetails, userDetails)
            tripStatus.tripid = tripData.tripId; 
            await mqttPublishDriverTripId({ tripId: tripData.tripId ,driverId:tripData.driverId }) 
            carindex = carindex + 1;          
    },40000)

      return cabObj;
    } catch (err) {
      throw err;
    }
  }

  static async updateDriverStatus(option, userDetails) {
    const driver = await DriverDBService.getDriverById({
      userId: userDetails.id,
    });
    if (!driver) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_DRIVER_ID });
    }
    const param = {
      locationName: option.location_name,
      addressLatitude: option.latitude,
      addressLongitude: option.longitude,
      isOnlineStatus: option.status,
    };
    const drivertatus = await DriverDBService.updateDriverStatus(param, userDetails.id);
    return drivertatus;
  }

  static async getDrivers() {
    return DriverDBService.getDrivers();
  }

  //DELETE DRIVER
  static async deleteDriver(user, driverId: any) {
    try {


      const driverData = await UserDBService.fetchByUserId({ uuid: driverId.uuid });
      if (!driverData) {
        throw new CustomError({ serviceName, ...errorManager.NO_DRIVER_FOUND });
      }
      const adminDetails = await UserDBService.getByUserId({ id: user.id });
      const driverDeleted = await DriverDBService.deleteDriver(driverId.uuid);
      if (driverDeleted) {

        const object = {
          name: 'driverRemove',
          message: `  Driver ${driverData.fullName} has been removed by the admin ${user.FullName}  from the platform `,
          type: liveFeed.NOTIFICATION
        }
        await NotificationDBService.createNotification(object);
        const adminData = await UserDBService.getAdmin({ "role": roles.ADMIN, isActive: true })
        if (adminData) {
          adminData.rows.forEach((data) => {
            const data1 = { email: data.loginId, type: 'driverDeletion' };
            const emailVariables = { DRIVER_NAME: driverData.fullName, ADMIN_NAME: adminDetails.fullName, LOCALHOST: localhost };
            emailService(data1, emailVariables);
          })
        }

        return {
          msg: "Driver deleted successfully",
        };
      }
    } catch (error) {
      return {
        msg: "Somethings went wrong",
      };
    }
  }

  static async getDriverTrips(userDetails) {
    try {


      let obj = {
        id: userDetails.id,
        role: "DRIVER",
      };
      const driverProfile = await DriverDBService.getDriverTrips(obj);
      if (driverProfile.rows.length === 0) {
        throw new CustomError({
          serviceName,
          ...errorManager.INVALID_DRIVER_ID,
        });
      }
      const driverDetails = [];

      driverProfile.rows.forEach((data: any) => {
        const obj = {
          "id": data.id || '',
          "uuid": data.uuid || '',
          "fullName": data.fullName || '',
          "loginId": data.loginId || '',
          "mobileNumber": data.mobileNumber || '',
          "profileImage": data.profileImage || '',
          "dateOfJoining": data.createdAt || '',
          "completedTrips": 0,
          "cancelledTrips": 0,
          "totalTrips": driverProfile.rows[0].driverData.length || 0,
          "totalMinutesOnline": 0,
          "totalKms": 0,
          "avgDriverRating": 0,
          "ratingGivenTotalCustomers": 0,
          "totalRating": 0

        }
        if (driverProfile.rows[0].driverData.length > 0) {
          obj.totalTrips = driverProfile.rows[0].driverData.length;
          driverProfile.rows[0].driverData.forEach((trip, i, inAry) => {
            if (trip.status == "Completed") {

              obj.completedTrips = obj.completedTrips + 1;

              if (trip.ratingDriver) {
                obj.totalRating = obj.totalRating + parseInt(trip.ratingDriver)
                obj.ratingGivenTotalCustomers = obj.ratingGivenTotalCustomers + 1;
              }

              if (trip.totalKms) {
                obj.totalKms = obj.totalKms + parseInt(trip.totalKms)
              }

              if (trip.totalTimeInMinute) {
                obj.totalMinutesOnline = obj.totalMinutesOnline + parseInt(trip.totalTimeInMinute)
              }

            }

            if (trip.status == "Cancelled") {
              obj.cancelledTrips = obj.cancelledTrips + 1;
            }

            //Ratings provide by Customer
            if (i == inAry.length - 1) {
              obj.avgDriverRating = obj.totalRating / obj.ratingGivenTotalCustomers
            }
          })
          driverDetails.push(obj)
        }
      });

      return driverDetails;
    } catch (err) {
      throw err;
    }
  }


  static async updateDriverLocation(option, userId) {
    const driver = await DriverDBService.getDriverById({
      userId: userId
    });
    if (!driver) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_DRIVER_ID });
    }
    const param = {
      locationName: option.locationName,
      addressLatitude: option.addressLatitude,
      addressLongitude: option.addressLongitude
    };
    const drivertatus = await DriverDBService.updateDriverStatus(param, userId);
    return drivertatus;
  }



  static async getUpdatedDriverLocation(userId) {
    const driver = await DriverDBService.getDriverById({
      userId: userId
    });
    if (!driver) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_DRIVER_ID });
    }
    return driver;
  }

  static async getDriverCars(userDetails) {
    try {
      let obj = {
        id: userDetails.id,
        role: roles.DRIVER
      };
      const driverCarsData = await DriverDBService.getDriverCars(obj);

      if (!driverCarsData) {
        throw new CustomError({
          serviceName,
          ...errorManager.INVALID_DRIVER_ID,
        });
      }

      if (driverCarsData.rows.length === 0) {
        throw new CustomError({
          serviceName,
          ...errorManager.NO_DATA_FOUND,
        });
      }

      const driverData = {
        fullName: driverCarsData.rows[0].fullName,
        mobileNumber: driverCarsData.rows[0].mobileNumber,
        role: driverCarsData.rows[0].role,
        isOnlineStatus: "",
        carDetails: []
      }

      if (driverCarsData.rows[0].id) {
        const driver_info = await DriverDBService.getDriverById({ 'userId': driverCarsData.rows[0].id });
        driverData.isOnlineStatus = driver_info.isOnlineStatus ? driver_info.isOnlineStatus : ""
      }


      if (driverCarsData.rows[0].driverCarInfo.length > 0) {

        driverCarsData.rows[0].driverCarInfo.forEach(async (data: any) => {
          const obj = {
            "carModel": data.carModel,
            "carNumber": data.carNumber,
            "carFactor": data.carFactor,
            "carCapacity": data.carCapacity,
            "carOdometer": data.carOdometer,
            "status": data.status,
            "carImage": data.carImage
          }

          driverData.carDetails.push(obj)
        })
      }
      return driverData;

    } catch (err) {
      throw err;
    }
  }

}
