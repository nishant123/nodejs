import * as express from 'express';
import * as validate from 'express-validation';
import savedPlacesController from '../../controller/savedPlaces';
import savePlace from '../../validations/savedPlaces';
import jwt from '../../middlewares/auth';
// import AccessControl from '../../middlewares/acl';

const router = express.Router();


router.route('/createAddress').post(validate(savePlace.createAddress), jwt.verify, savedPlacesController.createAddress);

router.route('/getAddress').get(jwt.verify, savedPlacesController.getAddress);



export default router;