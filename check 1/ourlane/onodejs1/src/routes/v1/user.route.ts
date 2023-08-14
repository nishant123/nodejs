import * as express from 'express';
import * as validate from 'express-validation';

import jwt from '../../middlewares/auth';
import validations from '../../validations/user';
import UserController from '../../controllers/user';
import AccessControl from '../../middlewares/acl';
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart();

const { userList, updateUser, deleteUser, approveUser, declineUser } = validations;

const router = express.Router();

router.route('/list').post(validate(userList), jwt.verify,  AccessControl.authorize('LIST_USER'),  UserController.getUserList);

router.route('/updateUser')
  .post(jwt.verify, validate(updateUser), AccessControl.authorize('UPDATE_USER'), multipartMiddleware, UserController.updateUser);

router.route('/downloadList')
  .post(jwt.verify, AccessControl.authorize('DOWNLOAD_USER'), UserController.downloadUserList);

router.route('/details').get(jwt.verify, AccessControl.authorize('VIEW_DETAILS'), UserController.userById);

router.route('/getDriver').get(jwt.verify, AccessControl.authorize('VIEW_DRIVER_DETAILS'), UserController.getDriver);

router.route('/deleteUser').post(validate(deleteUser), jwt.verify, UserController.deleteUser);

router.route('/approveUser').post(validate(approveUser), jwt.verify, UserController.approveUser);

router.route('/declineUser').post(validate(declineUser), jwt.verify, UserController.declineUser);

router.route('/getImageByLocation').get(jwt.verify, UserController.getImageByLocation);

router.route('/getAdmin').get(jwt.verify, UserController.getAdmin);

router.route('/deletemultipleUser').post(jwt.verify, UserController.deletemultipleUser);

export default router;
