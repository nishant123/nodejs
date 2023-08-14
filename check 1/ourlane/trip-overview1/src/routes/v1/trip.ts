import * as express from 'express';
import * as validate from 'express-validation';
import AccessControl from '../../middlewares/acl';
import jwt from '../../middlewares/auth';
import tripValidations from '../../validations/customerTrip';

import TripController from '../../controller/customerTrip';

const { createTrip,getDriverOverview,getCustomerOverview,changeLocation,getCustomerTrips,driverDayData,customerDayData } = tripValidations;

const router = express.Router();

router.route('/tripList').post(validate(tripValidations.tripList),jwt.verify,TripController.tripList);

router.route('/tripsOverview').get(jwt.verify,  TripController.getTripsOverview);

router.route('/tripsTotalOverview').get(jwt.verify,  TripController.getTripsTotalOverview);

router.route('/driverOverview').get(validate(getDriverOverview),jwt.verify,  TripController.getDriverOverview);

router.route('/driverDayData').get(validate(driverDayData),jwt.verify,  TripController.driverDayData);

router.route('/customerOverview').get(validate(getCustomerOverview),jwt.verify,  TripController.getCustomerOverview);

router.route('/customerDayData').get(validate(customerDayData),jwt.verify,  TripController.customerDayData);

router.route('/leaders').get(jwt.verify, TripController.getLeaders);

router.route('/customerTrips').post( jwt.verify, AccessControl.authorize('CUSTOMER_TRIP'),  TripController.getCustomerTrips);

router.route('/todayTrips').get(jwt.verify, AccessControl.authorize('TODAY_TRIP'), TripController.todayTrips);

router.route('/mostPickup').get(jwt.verify, AccessControl.authorize('MOST_PICKUP'), TripController.mostPickup);

router.route('/mostDrop').get(jwt.verify, AccessControl.authorize('MOST_DROP'), TripController.mostDrop);

router.route('/driverTrips').get( jwt.verify, TripController.getDriverTrips);


export default router;