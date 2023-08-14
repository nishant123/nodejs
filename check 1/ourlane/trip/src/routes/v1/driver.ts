import * as express from 'express';
import * as validate from 'express-validation';
import DriverController from '../../controller/driver'
import jwt from '../../middlewares/auth';
import driverValidation from '../../validations/driver';

const router = express.Router();

router.route('/create').post(DriverController.createDriver);

router.route('/nearestCab').post(validate(driverValidation.nearestCab), jwt.verify, DriverController.getCab);

router.route('/updatedriverStatus').post(validate(driverValidation.updateStatus), jwt.verify, DriverController.updateDriverStatus);

router.route('/driverTrips').get(jwt.verify, DriverController.getDriverTrips);

router.route('/getDrivers').get(jwt.verify, DriverController.getDrivers);

router.route('/deleteDriver').put(jwt.verify, DriverController.deleteDriver);

router.route('/updateLocation').post(jwt.verify, DriverController.updateDriverLocation);

router.route('/getupdatedLocation/:driverId').get(jwt.verify, DriverController.getUpdatedDriverLocation);

router.route('/getDriverCars').get(jwt.verify, DriverController.getDriverCars);

export default router;
