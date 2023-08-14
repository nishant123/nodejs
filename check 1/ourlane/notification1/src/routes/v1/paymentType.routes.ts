import * as express from 'express';
import paymentTypeController from '../../controllers/paymentType';
import jwt from '../../middlewares/auth';
import AccessControl from '../../middlewares/acl';

const router = express.Router();

router.route('/getPaymentType').get(jwt.verify, AccessControl.authorize('PAYMENT_TYPE_LIST'), paymentTypeController.getPaymentType);


export default router;