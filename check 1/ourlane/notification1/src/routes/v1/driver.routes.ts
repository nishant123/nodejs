import * as express from 'express';
import driverController from '../../controllers/driver';
import jwt from '../../middlewares/auth';
import AccessControl from '../../middlewares/acl';

const router = express.Router();

router.route('/cityList').get(jwt.verify, AccessControl.authorize('CITY_LIST'), driverController.getCityList);
router.route('/languageList').get(jwt.verify, AccessControl.authorize('LANGUAGE_LIST'), driverController.getLanguageList);
router.route('/sms').get(jwt.verify, driverController.getSmsList);

export default router;