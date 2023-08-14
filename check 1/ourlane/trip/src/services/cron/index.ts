import * as moment from "moment";
import TripService from "../../database/service/trip.dbservice";
import NotificationDBService from '../../database/service/notification.dbservice';
import { applicationStatuses, liveFeed, customerPushNotification } from "../../config/constants";
import DriverDBService from "../../database/service/driver.dbservice";
const sendSms = require("../../utils/twilio");
const now = moment().utc().format();

export default class CronService {
    static async getScheduledTripTwoMinuteAway() {
        const currToTwoMinute = moment().add(2, 'minutes').utc().format();
        const tripData = await TripService.getScheduledTripMinutesBefore(now, currToTwoMinute, 'twoMinute');
        if (tripData.length > 0) {
            tripData.map(trip => {
                const params = { twoMinuteBefore: 1 };
                TripService.updateTripDetails(params, { uuid: trip.uuid});
                const notificationObj = {name: trip.customer_details.fullName + ' ' , message: customerPushNotification.NEARBY_DRIVER, type: liveFeed.LIVEFEEDS, userId: trip.customerId }
                NotificationDBService.createlive(notificationObj);
                const notificationObjs = {name: trip.customer_details.fullName + ' ' , message: customerPushNotification.NEARBY_DRIVER, type: null, userId: trip.customerId }
                NotificationDBService.createlive(notificationObjs);
            });
        }
    }

    static async getScheduledTripOneHoursBefore() {
        const currToOneHours = moment().add(1, 'hours').utc().format();
        const tripData = await TripService.getScheduledTripMinutesBefore(now, currToOneHours, 'oneHours');
        if (tripData) {
            tripData.map(trip => {
                const params = { oneHoursBefore: 1 };
                TripService.updateTripDetails(params, { uuid: trip.uuid});
                const replaceVariable = `[TIME]`;
                const pickupTime = moment(trip.pickUpTime).format('HH:mm A');
                const messages = customerPushNotification.ONE_HOURS_BEFORE.split(replaceVariable).join(pickupTime);
                
                const notificationObj = {name: trip.customer_details.fullName + ' ' , message: messages, type: null, userId: trip.customerId }
                NotificationDBService.createlive(notificationObj);

                const body = customerPushNotification.ONE_HOUR_BEFORE_MESSAGE;
                const mobile = trip.customer_details.countryCode + trip.customer_details.mobileNumber;
                sendSms(body, mobile);
            });
        }
    }

    static async getScheduledTrip30MinuteBefore() {
        const currTo30Minute = moment().add(30, 'minutes').utc().format();
        const tripData = await TripService.getScheduledTripMinutesBefore(now, currTo30Minute, 'thirtyMinute');
        if (tripData.length > 0) {
            tripData.map(trip => {
                const tripParams = { thirtyMinuteBefore: 1 };
                TripService.updateTripDetails(tripParams, { uuid: trip.uuid});
                const params = {isOnlineStatus: applicationStatuses.isOnlineStatus.driving};
                DriverDBService.updateDriverStatus(params, tripData.driverId);
            });
        }
    }

    static async getScheduledTripTenMinuteBefore() {
        const currToTenMinute = moment().add(10, 'minutes').utc().format();
        const tripData = await TripService.getScheduledTripMinutesBefore(now, currToTenMinute, 'tenMinute');
        if (tripData.length > 0) {
            tripData.map(trip => {
                const params = {
                    status: applicationStatuses.tripStatus.ongoing,
                    tenMinuteBefore: 1
                };
                TripService.updateTripDetails(params, { uuid: trip.uuid });

                const body = applicationStatuses.otp.TRIP_OTP_MESSAGE + trip.otp;
                const mobile = applicationStatuses.otp.COUNRTY_CODE + trip.customer_details.mobileNumber;
                sendSms(body, mobile);
            });
        }
    }
}