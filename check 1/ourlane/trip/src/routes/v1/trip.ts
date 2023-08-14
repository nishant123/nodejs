import * as express from 'express';
import * as validate from 'express-validation';
import AccessControl from '../../middlewares/acl';
import jwt from '../../middlewares/auth';
import tripValidations from '../../validations/customerTrip';

import TripController from '../../controller/customerTrip';

const { createTrip,getDriverOverview,getCustomerOverview,changeLocation,getCustomerTrips,driverDayData,customerDayData } = tripValidations;

const router = express.Router();

router.route('/')
// Create Trip by customer
.post(validate(tripValidations.createTrip),jwt.verify, TripController.createTrip)

// Get Trip by driver
.get(jwt.verify, TripController.getTrips)

.put(validate(tripValidations.updatePickUpTime), jwt.verify, TripController.updatePickUpTime);


router.route('/changeLocation').post(validate(changeLocation),jwt.verify,TripController.changeTripLocation);

router.route('/getDriverTrip').get(jwt.verify,TripController.getDriverTrip);

router.route('/updateTripStatus').post(validate(tripValidations.updateTripStatus),jwt.verify,TripController.updateTripStatus);

router.route('/completeTrip').post(validate(tripValidations.completeTrip),jwt.verify,TripController.completeTrip);

router.route('/customerReview').post(validate(tripValidations.customerReview),jwt.verify, TripController.updateCustomerReview);

router.route('/driverReview').post(validate(tripValidations.driverReview),jwt.verify, TripController.updateDriverReview);

router.route('/getTripDetails/:tripId').get(jwt.verify, TripController.getTripDetails);

router.route('/shareCustomerStatus').post(validate(tripValidations.shareCustomerStatus),jwt.verify, TripController.shareCustomerStatus);

router.route('/sheduleTripByCron').get(jwt.verify, TripController.sheduleTripByCron);

router.route('/getallTrips').get(jwt.verify, TripController.getAllTrips);

router.route('/sendInvoice/:tripId').get(jwt.verify, TripController.sendInvoice);

router.route('/avoidOverlappingTrip').post(validate(tripValidations.avoidOverlapping), jwt.verify, TripController.avoidOverlappingTrip);

router.route('/driverTotalEarning').get(jwt.verify, TripController.driverTotalEarning);

router.route('/twoMinuteAwayNotification').get(jwt.verify, TripController.twoMinuteAwayNotification);

router.route('/getRideTypes').get(jwt.verify,TripController.getRideTypes);

export default router;