import * as express from 'express';
import notificationController from '../../controller/notification';
import jwt from '../../middlewares/auth';

const router = express.Router();

router.route('/liveFeed').get(jwt.verify, notificationController.liveFeed);

router.route('/').post(notificationController.createLiveFeed);
// router.route('/').post(jwt.verify, notificationController.declineNotification);

router.route('/').put(jwt.verify, notificationController.updateNotificationByUUID);

router.route('/').get(jwt.verify, notificationController.getuserNotification);

router.route('/deleteNotification').put(jwt.verify, notificationController.deleteNotification);

router.route('/updateNotification').put(jwt.verify, notificationController.updateUserNotification);

export default router;