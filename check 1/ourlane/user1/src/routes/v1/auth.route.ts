import * as express from 'express';
import * as validate from 'express-validation';

import AuthController from '../../controllers/auth';
import authValidation from '../../validations/auth';
import jwt from '../../middlewares/auth';

const router = express.Router();


router.route('/create')
  .post(validate(authValidation.create), AuthController.create);

router.route('/login')
  .post(validate(authValidation.login), AuthController.login);

router.route('/checkAccount')
  .post(validate(authValidation.checkAccount), AuthController.checkAccount);

router.route('/sendOtp')
  .post(validate(authValidation.sendOtp), AuthController.sendOtp);

router.route('/verifyOtp')
  .post(validate(authValidation.verifyOtp), AuthController.verifyOtp);

router.route('/setPassword')
  .post(validate(authValidation.setPassword), AuthController.setPassword);

router.route('/changePassword')
  .post(validate(authValidation.changePassword), jwt.verify, AuthController.changePassword);

router.route('/verify2fa')
  .post(validate(authValidation.verify2FA), AuthController.verify2FA);

router.route('/forgetPassword')
  .post(validate(authValidation.forgetPassword), AuthController.forgetPassword);

router.route('/refreshAccessToken')
  .get(validate(authValidation.refreshToken), AuthController.verifyRefreshToken);

router.route('/verifyEmail')
  .post(validate(authValidation.verifyEmail), AuthController.verifyEmail);

router.route('/resendVerifyEmail')
  .post(validate(authValidation.reSendVerifyEmail), AuthController.reSendVerifyEmail);

export default router;
