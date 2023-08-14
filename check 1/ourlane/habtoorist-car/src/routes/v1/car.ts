import * as express from 'express';
import * as validate from 'express-validation';
import carController from '../../controller/car';
import jwt from '../../middlewares/auth';
import car from '../../validations/car';
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart();
const router = express.Router();

router.route('/create').post(jwt.verify, multipartMiddleware,  carController.createCar);

router.route('/carType').post(jwt.verify, multipartMiddleware,  carController.createCarType);

router.route('/getCarType').get(jwt.verify, carController.getAllCarType);

router.route('/searchCarType').get(jwt.verify, carController.searchCartype);

router.route('/upload').post( multipartMiddleware,  carController.upLoadImage);

router.route('/download').post( carController.getImage);

router.route('/deleteCar').post(jwt.verify, carController.deleteCar);

router.route('/deleteCarType').post(jwt.verify, carController.deleteCartype);

router.route('/updateCar').post(jwt.verify, multipartMiddleware,  carController.updateCar);

router.route('/updateCarType').post(jwt.verify, multipartMiddleware,  carController.updateCartype);

router.route('/searchCar').get(jwt.verify, carController.searchCar);

router.route('/deletemultipleCar').post(jwt.verify, carController.deletemultipleCar);

router.route('/deleteMultipleCarType').post(jwt.verify, carController.deletemultipleCartype);


export default router;  