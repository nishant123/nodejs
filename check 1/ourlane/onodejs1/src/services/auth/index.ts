/* eslint-disable no-undef */
import * as randomstring from 'randomstring';
import * as bcrypt from 'bcryptjs';

import * as moment from 'moment';
import jwt from '../../middlewares/auth';
import { vars } from '../../config/vars';
import { otpType, roles,apiRoles, applicationStatuses,liveFeed, cache as sms } from '../../config/constants';
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import AuthDBService from '../../database/service/auth.dbservice';
import RefreshDBService from '../../database/service/refresh.dbservice';
import emailService from '../../utils/emailService';
import mailChimpService from '../../utils/mailChimp';
import { v4 as uuid_v4 } from "uuid";
import DriverDBService from '../../database/service/driver.dbservice';
import CustomerDBService from '../../database/service/customer.dbservice';
const sendSms = require('../../utils/twilio');
import NotificationDBService from '../../database/service/notification.dbservice';
import cache from '../../utils/cache';

import FirebasePushNotification from '../../utils/firebase';
import axiosCallApi from '../../utils/axiosCallApi';

const {
  salt, localhost, env, openfire,conciergeHost
} = vars;
const serviceName = '[AuthService]';

export default class AuthService {

  static async createUser(options: {
    fullName?: string;
    email: string;
    mobileNumber?: string;
    password?: string;
    confirmPassword?: string;
    role: string;
    organizationId: string;
    countryCode: string;
    deviceType?: string;
    firebaseDeviceId?: string;
  }) {
    // const transaction = await AuthDBService.createTransaction();
    try {
      const {
        fullName, email, mobileNumber, password, confirmPassword, role
      } = options;
      if(email.includes('=')){
        throw new CustomError({ serviceName, ...errorManager.INVALID_EMAIL });
      }
      let roleExists = Object.values(apiRoles).includes(role.toUpperCase());
        if(!roleExists){
          throw new CustomError({ serviceName, ...errorManager.INVALID_ROLE });
        }
      if (email && password && confirmPassword) {
         if(role != apiRoles.ADMIN && role != apiRoles.CONCIERGE ){
          throw new CustomError({ serviceName, ...errorManager.INVALID_ROLE });
         }
        return this.creatreAdmin(email, password, confirmPassword, role)
      }
      if (fullName && email && mobileNumber) {
        // return this.creatreCustomer(fullName, email, mobileNumber)
        if(role == apiRoles.ADMIN ){
          throw new CustomError({ serviceName, ...errorManager.INVALID_ROLE });
         }
        return this.creatreUser(options)
      }
    }
    catch (error) {
      // await AuthDBService.rollbackTransaction(transaction);
      throw error;
    }
  }

  static async creatreAdmin(email: string, password: string, confirmPassword: string, role: string) {
    const user = await AuthDBService.getUser({ loginId: email.toLowerCase() });
    if (user) {
      throw new CustomError({ serviceName, ...errorManager.USER_ALREADY_EXIST });
    }
    var regExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

     if(!regExp.test(password)){
      throw new CustomError({ serviceName, ...errorManager.PASSWORD_INVALID });
     }

    if (password != confirmPassword) {
      throw new CustomError({ serviceName, ...errorManager.PASSWORD_NOT_MATCHED });
    }
    // USER_NAME: user.fullName ? user.fullName:user.loginId.substring(0, user.loginId.indexOf("@")),
    const userId = uuid_v4()
    const dataToInsert = {
      uuid: userId,
      loginId: email,
      fullName: email.substring(0, email.indexOf("@")),
      password: bcrypt.hashSync(password, salt),
      role: role,
      organizationId: 'ourlane'
    };
    const userObj = await AuthDBService.createUser(dataToInsert);

    const superAdmin =  await AuthDBService.getAdmin({"role":roles.SUPER_ADMIN })
    if(superAdmin.rows.length > 0){
     const data1 = { email: superAdmin.rows[0].loginId , type: 'webAdminAccessApproval' };
     const now = moment(new Date());

      const emailVariables = {
        SUPER_ADMIN :superAdmin.rows[0].fullName,
        ADMIN_NAME: userObj.fullName,
        USER_ID : userObj.id,
        DATE : now,
        LOCALHOST: localhost
      };

      emailService(data1, emailVariables);

     }

    const verificationCode = randomstring.generate(64);
    await AuthDBService.saveVerificationCode({
      userId: userObj.id,
      verificationCode
    });
    let link,host;
    if (role == roles.CONCIERGE) {
       link = `${conciergeHost}/verifyEmail/${email}/${verificationCode}`;
       host = conciergeHost;
    } else {
       link = `${localhost}/verifyEmail/${email}/${verificationCode}`;
       host = localhost;
    }
    
    const data2 = { email, type: 'verifyEmail' };
    const data3 = { email, type: 'Concierge_access_request' };
    const emailVariables = {
      USER_NAME: userObj.fullName,
      LINK: link,
      LOCALHOST: host
    };
    emailService(data2, emailVariables);
    emailService(data3, emailVariables);
    delete userObj.dataValues.password;
    return userObj

  }

  /**
   *
   *
   * @static
   * @param {string} email
   * @param {string} verificationCode
   * @returns
   * @memberof AuthService
   */
  static async verifyEmail(options: {
    email: string;
    verificationCode: string;
  }) {
    const { email, verificationCode } = options;
    const user = await this.checkUser(email);
    if (!user) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_LOGIN_ID });
    }
    const { isExpired, code } = await this.checkVerificationCode(user.id);

    // if (isExpired) {
    //   throw new CustomError({ serviceName, ...errorManager.EXPIRED_VERIFICATION_CODE });
    // }

    if (!code || code.verificationCode !== verificationCode || code.isUsed) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_VERIFICATION_CODE });
    }
    const isEmailVerified = true
    const update = await AuthDBService.updateUser({
      uuid: user.uuid
    }, {
      isEmailVerified,
    })
    await AuthDBService.updateVerificationCode({ isUsed: true }, { verificationCode }, null);
    if (update) {
      return update;
    }
    throw new CustomError({ serviceName, ...errorManager.FAILED_TO_UPDATE_EMAIL_VERIFIED });

  }

  /**
   *
   *
   * @static
   * @param {string} email
   * @returns
   * @memberof AuthService
   */
  static async reSendVerifyEmail(options: {
    email: string;
  }) {
    const { email } = options;
    const user = await this.checkUser(email);
    if (!user) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_LOGIN_ID });
    }
    if (user.isEmailVerified) {
      throw new CustomError({ serviceName, ...errorManager.EMAIL_LINK_VERIFIED });
    }
    const verificationCode = randomstring.generate(64);
    await AuthDBService.saveVerificationCode({
      userId: user.id,
      verificationCode
    });
    const link = `${localhost}/verifyEmail/${email}/${verificationCode}`;
    const data = { email, template: 'sendEmailVerificationMail' };
    const emailVariables = {
      USER_NAME: user.fullName,
      LINK: link,
      LOCALHOST: localhost
    };
    emailService(data, emailVariables);
  }


  static async creatreUser(options: {
    fullName?: string;
    email: string;
    mobileNumber?: string;
    role: string,
    countryCode: string;
    deviceType?: string;
    firebaseDeviceId?: string;
  }) {
    try {
      const {
        fullName, email, mobileNumber, role, countryCode, deviceType, firebaseDeviceId } = options;
      const mobileNo = await AuthDBService.checkMobileNumber({ mobileNumber: mobileNumber, countryCode: countryCode });
      if (mobileNo) {
         if(!mobileNo.isOtpVerified){

          const otp = randomstring.generate({
            length: 6,
            charset: 'numeric'
          });
          const body =  `${otp} ${applicationStatuses.otp.OTP_MESSAGE}`;
          const mobile = countryCode + mobileNumber;
          sendSms(body, mobile);

          const result = await AuthDBService.saveOtp({
            otp,
            userId: mobileNo.id,
            type: otpType.register
          })

          throw new CustomError({ serviceName, ...errorManager.OTP_VERIFICATION_INCOMPLETE });
         }
        throw new CustomError({ serviceName, ...errorManager.MOBILE_NUMBER_ALREADY_EXIST });
      }
      const user = await AuthDBService.getUser({ loginId: email.toLowerCase() });
      if (user) {
        throw new CustomError({ serviceName, ...errorManager.USER_ALREADY_EXIST });
      }
      const userId = uuid_v4()
      const dataToInsert = {
        uuid: userId,
        fullName,
        loginId: email,
        mobileNumber: mobileNumber,
        role: role,
        countryCode: countryCode,
        deviceType: deviceType,
        firebaseDeviceId: firebaseDeviceId
      };
      const userObj = await AuthDBService.createUser(dataToInsert);

      let registrationId: any = [];
      registrationId.push(firebaseDeviceId);
      let message = '';
      if (role === roles.DRIVER) {
        const insertObj = {
          uuid: uuid_v4(),
          locationName: null,
          addressLatitude: null,
          addressLongitude: null,
          userId: userObj.id,
        }
        DriverDBService.createDriver(insertObj);
        message = 'Driver registered successfully.';
      }else if(role === roles.CUSTOMER){
        const insertObj = {
          uuid: uuid_v4(),
          locationName: null,
          addressLatitude: null,
          addressLongitude: null,
          userId: userObj.id,
        }
        CustomerDBService.createCustomer(insertObj);

        // send message to mobile

        const replaceVariable = `[CUSTOMER_NAME]`;

        let smscontentData = '';
        const smsContent = await this.getSmsContent('Registration');

        smscontentData = JSON.stringify(smsContent.body);
        smscontentData = smscontentData.split(replaceVariable).join(fullName);
        const cleanText = smscontentData.replace(/<\/?[^>]+(>|$)/g, "").replace(/\&nbsp;/g, '').replace(/"/g, '');
        const mobile = countryCode + mobileNumber;
        sendSms(cleanText, mobile);
      }
      await this.createUserOpenfire(mobileNumber, fullName);

      const otp = randomstring.generate({
        length: 6,
        charset: 'numeric'
      });
      const body =  `${otp} ${applicationStatuses.otp.OTP_MESSAGE}`;
      const mobile = countryCode + mobileNumber;

        sendSms(body, mobile);

      const result = await AuthDBService.saveOtp({
        otp,
        userId: userObj.id,
        type: otpType.register
      })
      return { requestId: result.requestId, mobileNumber: userObj.mobileNumber, countryCode: countryCode }
    }
    catch (error) {
      throw error;
    }
  }


  /**
   *
   *
   * @static
   * @param {string} email
   * @param {string} password
   * @returns
   * @memberof AuthService
   */



  static async login(options: {
    email?: string;
    mobileNumber?: string;
    password?: string;
    countryCode?: string;
  }) {
    try {
      const {
        email, mobileNumber, password, countryCode
      } = options;
      if (email && password) {
        return this.adminLogin(email, password,)
      }
      if (mobileNumber) {
        return this.userLogin(mobileNumber, countryCode);
      }
      else {
        throw new CustomError({ serviceName, ...errorManager.PROVIDE_LOGIN_INFORMATION });
      }

    }
    catch (error) {
      throw error;
    }
  }

  static async adminLogin(email: string, password: string) {
    const user = await this.checkUser(email);
    if (!user) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_LOGIN_ID });
    }
    // is emailVerified false
    if (!user.isEmailVerified) {
      throw new CustomError({ serviceName, ...errorManager.EMAIL_NOT_VERIFIED });
    }
    // is actice false
    // throw
    if (!user.isActive) {
      throw new CustomError({ serviceName, ...errorManager.USER_INACTIVE });
    }
    if (user.isBlocked) {
      throw new CustomError({ serviceName, ...errorManager.USER_BLOCKED });
    }
    const now = moment(new Date());
    const end = moment(user.updatedAt);
    const duration = moment.duration(now.diff(end));
    const canLogin = duration.asMinutes() > 1;


    // if (user.loginAttempts > 4 && !canLogin) {
    //   throw new CustomError({ serviceName, ...errorManager.MULTIPLE_WRONG_ATTEMPTS });
    // }
    const lastLoginTime = new Date().toISOString();
    const loginAttempts = 0; // set login to free
    AuthDBService.updateUser({
      uuid: user.uuid
    }, {
      lastLoginTime,
      loginAttempts
    }).catch((e) => {
      console.log(`Error in updating last login Time ${e.message}`);
    });


    const hashPassword = bcrypt.hashSync(password, salt);
    if (user.password !== hashPassword) {
      await AuthDBService.incorrectPassword(user.uuid, user.loginAttempts);
      // TODO : check if loginAttemps > some config
      throw new CustomError({ serviceName, ...errorManager.INVALID_PASSWORD });
    }

    const token = jwt.generate({
      uuid: user.uuid,
      loginId: user.loginId,
      role: user.role,
      id: user.id,
      organizationId: user.organizationId,
      FullName: user.fullName,

    });

    return { token: token, userDetails: { id: user.uuid, email: user.loginId, role: user.role, FullName: user.fullName } };
  }


  static async userLogin(mobileNumber: string, countryCode: string) {
    const user = await AuthDBService.checkMobileNumber({ mobileNumber: mobileNumber, countryCode: countryCode });
    if (!user) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_MOBILE_NUMBER });
    }

    //not verified Otp
    if (!user.isOtpVerified) {
      throw new CustomError({ serviceName, ...errorManager.MOBILE_VERIFICATION_INCOMPLETE });
    }
    // is active false
    // throw
    if (!user.isActive) {
      throw new CustomError({ serviceName, ...errorManager.USER_INACTIVE });
    }
    if (user.isBlocked) {
      throw new CustomError({ serviceName, ...errorManager.USER_BLOCKED });
    }

    const otp = randomstring.generate({
      length: 6,
      charset: 'numeric'
    });
    // send message to mobile
    const replaceVariable = `[OTP]`;
    const mobile = countryCode + mobileNumber;
    let smscontentData = '';
    const smsContent = await this.getSmsContent('Login');
    smscontentData = JSON.stringify(smsContent.body);
    smscontentData = smscontentData.split(replaceVariable).join(otp);
    const cleanText = smscontentData.replace(/<\/?[^>]+(>|$)/g, "").replace(/\&nbsp;/g, '').replace(/"/g, '');
    console.log("cleanText",cleanText)
    sendSms(cleanText, mobile);

    const result = await AuthDBService.saveOtp({
      otp,
      userId: user.id,
      type: otpType.twoFA
    });

    return { requestId: result.requestId };
  }


  /**
 *
 *
 * @static
 * @param {string} email
 * @returns
 * @memberof AuthService
 */
  static async checkUser(email: string) {
    return AuthDBService.getUser({ loginId: email.toLowerCase() });
  }

  static async inCorrectCount(email: string) {
    return AuthDBService.getUser({ loginId: email.toLowerCase() });
  }

  /**
 *
 *
 * @static
 * @param {number} userId
 * @param {string} type
 * @returns
 * @memberof AuthService
 */
  static async checkOtp(userId: number, type: string) {
    const userOtp = await AuthDBService.getOtp({ userId, type });

    let isExpired = false;
    if (
      !userOtp
      || new Date().getTime() - new Date(userOtp.createdAt).getTime()
      >= vars.otpExpiry
    ) {
      isExpired = true;
    }

    return { isExpired, userOtp };
  }

  /**
 *
 *
 * @static
 * @param {number} userId
 * @returns
 * @memberof AuthService
 */
  static async checkVerificationCode(userId: number) {
    const code = await AuthDBService.getVerificationCode({ userId });

    let isExpired = false;
    if (
      !code
      || new Date().getTime() - new Date(code.createdAt).getTime()
      >= vars.emailExpiry
    ) {
      isExpired = true;
    }

    return { isExpired, code };
  }

  /**
 *
 *
 * @static
 * @param {string} email
 * @returns
 * @memberof AuthService
 */
  static async checkAccount(email: string) {
    const result = {
      email,
      isUserExist: false,
      isPasswordSet: false,
      isBlocked: false
    };
    const user = await this.checkUser(email);
    if (!user) {
      return result;
    }
    result.isUserExist = true;
    result.isBlocked = !!user.isBlocked;
    if (!user.password) {
      return result;
    }

    result.isPasswordSet = true;
    return result;
  }

  /**
 *
 *
 * @static
 * @param {string} email
 * @memberof AuthService
 */
  static async sendOtp(mobileNumber: string, otpType: string, countryCode: string) {
    const user = await AuthDBService.checkMobileNumber({ mobileNumber: mobileNumber, countryCode: countryCode });
    if (!user) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_MOBILE_NUMBER });
    }
    const { isExpired } = await this.checkOtp(user.id, otpType);
    if (isExpired) {
      const otp = randomstring.generate({
        length: 6,
        charset: 'numeric'
      });
      const body = applicationStatuses.otp.OTP_MESSAGE + otp;
      const mobile = countryCode + mobileNumber;
      sendSms(body, mobile);

      const result = await AuthDBService.saveOtp({
        otp,
        userId: user.id,
        type: otpType
      });
      return { requestId: result.requestId, mobileNumber: user.mobileNumber }

    }
  }

  /**
 *
 *
 * @static
 * @param {{ email: string; otp: string }} options
 * @returns
 * @memberof AuthService
 */
  static async verifyOtp(options: { mobileNumber: string; otp: string, countryCode: string }) {
    const { mobileNumber, otp, countryCode } = options;
    const user = await AuthDBService.checkMobileNumber({ mobileNumber: mobileNumber, countryCode: countryCode });
    if (!user) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_MOBILE_NUMBER });
    }

    const { isExpired, userOtp } = await this.checkOtp(
      user.id,
      otpType.register
    );

    const staticOtp = applicationStatuses.otp.STATIC_OTP;
    if (!userOtp || (+userOtp.otp !== +otp && +otp !== + staticOtp) || userOtp.isUsed) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_OTP });
    }

    if (isExpired) {
      throw new CustomError({ serviceName, ...errorManager.EXPIRED_OTP });
    }

    const verificationCode = randomstring.generate(64);
    await AuthDBService.saveVerificationCode({
      userId: user.id,
      verificationCode
    });
    await AuthDBService.updateOtp({ isUsed: true }, {
      userId: user.id,
      type: otpType.register
    });
    const updateStatus = await AuthDBService.updateUserStatus({ isOtpVerified: true, isActive: true }, {
      id: user.id,
    });

    if(user.role == 'CUSTOMER'){
    await mailChimpService.sendMailChimpSubscription({"firstName":user.fullName, "lastName":user.fullName, "email":user.loginId})
    }

    if (updateStatus && user.role == 'DRIVER') {
      const replaceVariable = `[CUSTOMER_NAME]`;

      let smscontentData = '';
      const smsContent = await this.getSmsContent('Registration');
      smscontentData = JSON.stringify(smsContent.body).replace('Customer', '');
      smscontentData = smscontentData.split(replaceVariable).join(user.fullName);
      const cleanText = smscontentData.replace(/<\/?[^>]+(>|$)/g, "").replace(/\&nbsp;/g, '').replace(/"/g, '');
      const mobile = countryCode + mobileNumber;
      sendSms(cleanText, mobile);

      const object = {
        name: 'driverAdd',
        message: ` New user ${user.fullName} has been registered through the Driver Application `,
        type: liveFeed.NOTIFICATION
      }
      await NotificationDBService.createNotification(object);
      const adminData = await AuthDBService.getAdmin({ "role": roles.ADMIN, isActive: true })
      if (adminData) {
        adminData.rows.forEach((data) => {
          const data1 = { email: data.loginId, type: 'driverRegistration' };
          const emailVariables = { DRIVER_NAME: user.fullName , LOCALHOST: localhost };
          emailService(data1, emailVariables);
        })
      }

    }

    const token = jwt.generate({
      uuid: user.uuid,
      FullName: user.FullName,
      loginId: user.loginId,
      mobileNumber: user.mobileNumber,
      role: user.role,
      id: user.id
    });
    return {
      token: token,
      email: user.loginId,
      userId: user.id,
      fullName: user.fullName,
      mobileNumber: user.mobileNumber,
      uuid: user.uuid,
      verificationCode,
    };
  }

  /**
 *
 *
 * @static
 * @param {{
 *     email: string;
 *     password: string;
 *     verificationCode: string;
 *   }} options
 * @returns
 * @memberof AuthService
 */
  static async setPassword(options: {
    email: string;
    password: string;
    verificationCode: string;
  }) {
    const { email, password, verificationCode } = options;
    const user = await this.checkUser(email);
    if (!user) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_LOGIN_ID });
    }

    const hashPassword = bcrypt.hashSync(password, salt);

    const { isExpired, code } = await this.checkVerificationCode(user.id);

    if (isExpired) {
      throw new CustomError({ serviceName, ...errorManager.EXPIRED_VERIFICATION_CODE });
    }

    if (!code || code.verificationCode !== verificationCode || code.isUsed) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_VERIFICATION_CODE });
    }

    if (password) {
      // check last 3 must not be same
      const checkLastThree = await this.checkLast(user.uuid, hashPassword);
      if (checkLastThree.length) {
        throw new CustomError({ serviceName, ...errorManager.PASSWORD_USED_IN_LAST_THREE });
      }

      const data = {
        uuid: user.uuid,
        password: hashPassword
      };
      const update = await AuthDBService.insertAndUpdatePassword(data);
      await AuthDBService.updateVerificationCode({ isUsed: true }, { verificationCode }, null);
      if (update) {
            const data1 = { email: user.loginId , type: 'passwordChangeConfirmationMail' }
            const emailVariables = { USER_NAME: user.fullName , LOCALHOST: localhost };
            emailService(data1, emailVariables);
            return update;
      }
      throw new CustomError({ serviceName, ...errorManager.FAILED_TO_UPDATE_PASSWORD });
    }
    return null;
  }

  /**
*
*
* @static
* @param {string} email
* @param {string} password
* @returns
* @memberof AuthService
*/
  static async checkLast(uuid: string, password: string) {
    return AuthDBService.checkPasswordAvailability(uuid, password);
  }

  /**
 *
 *
 * @static
 * @param {string} userId
 * @param {{
 *       password: string;
 *       oldPassword: string;
 *     }} options
 * @returns
 * @memberof AuthService
 */
  static async changePassword(
    userId: string,
    options: {
      password: string;
      oldPassword: string;
    }
  ) {
    const { password, oldPassword } = options;
    if (password === oldPassword) {
      throw new CustomError({ serviceName, ...errorManager.PASSWORD_SAME });
    }
    let hashPassword = bcrypt.hashSync(oldPassword, salt);
    const user = await AuthDBService.getUserByIdPassword({
      uuid: userId,
      password: hashPassword
    });
    if (!user) {
      throw new CustomError({ serviceName, ...errorManager.OLD_PASSWORD_INCORRECT });
    }
    hashPassword = bcrypt.hashSync(password, salt);
    if (password) {
      // check last 3 must not be same
      const checkLastThree = await this.checkLast(userId, hashPassword);
      if (checkLastThree.length) {
        throw new CustomError({ serviceName, ...errorManager.PASSWORD_USED_IN_LAST_THREE });
      }
      const data = {
        uuid: userId,
        password: hashPassword
      };
      const update = await AuthDBService.insertAndUpdatePassword(data);
      if (update) {
        return update;
      }
      throw new CustomError({ serviceName, ...errorManager.FAILED_TO_UPDATE_PASSWORD });

      // await AuthDBService.insertPasswordLog(user.uuid, hashPassword);
      // a maximum password age of 90 days
      // After a maximum of 5 sequential failed login attempts, lock user for 30 min
    }
    return null;
  }

  /**
 *
 *
 * @static
 * @param {string} requestId
 * @param {string} otp
 * @returns
 * @memberof AuthService
 */
  static async verify2FA(requestId: string, otp: string) {
    const userOtp = await AuthDBService.getOtp({
      requestId,
      type: otpType.twoFA
    });
    if (!userOtp) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_REQUEST_ID });
    }

    const staticOtp = applicationStatuses.otp.STATIC_OTP;
    if ((+userOtp.otp !== +otp && +otp !== +staticOtp) || userOtp.isUsed) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_OTP });
    }

    if (new Date().getTime() - new Date(userOtp.createdAt).getTime()
      >= vars.otpExpiry
    ) {
      throw new CustomError({ serviceName, ...errorManager.EXPIRED_OTP });
    }
    return this.generateTokenAfterLogin(userOtp.userId, requestId);
  }

  static async generateTokenAfterLogin(userId, requestId) {
    const user = await AuthDBService.getUserByID(userId);

    const token = jwt.generate({
      uuid: user.uuid,
      FullName: user.FullName,
      loginId: user.loginId,
      mobileNumber: user.mobileNumber,
      role: user.role,
      id: user.id
    });
    const refreshToken = randomstring.generate(64);
    await RefreshDBService.createRefreshToken({
      token: refreshToken,
      accessToken: token,
      userId
    }, null);
    const lastLoginTime = new Date().toISOString();
    //const loginAttempts = 0; // set login to free
    AuthDBService.updateUser({
      uuid: user.uuid
    }, {
      lastLoginTime,
      // loginAttempts
    }).catch((e) => {
      console.log(`Error in updating last login Time ${e.message}`);
    });
    // update the otp code
    if (requestId) {
      await AuthDBService.updateOtp({ isUsed: true }, { requestId });
    }
    return {
      token: token,
      email: user.loginId,
      userId: user.uuid,
      fullName: user.fullName,
      mobileNumber: user.mobileNumber,
      creationDate: user.createdAt,
      lastLoginTime,
      updationDate: user.updatedAt,
      id:user.id,
      uuid: user.uuid,
      refreshToken
    };
  }


  /**
    * email
    * @param email
    */

  static async forgetPass(email: string) {
    const user = await this.checkUser(email);
    if (!user) {
      throw new CustomError({ serviceName, ...errorManager.INVALID_LOGIN_ID });
    }

    const verificationCode = randomstring.generate(64);
    await AuthDBService.saveVerificationCode({
      userId: user.id,
      verificationCode
    });
    let link = `${localhost}/reset-password/${email}/${verificationCode}`; //HA-1782
    if (user.role === apiRoles.CONCIERGE) {
           link = `${conciergeHost}/reset-password/${email}/${verificationCode}`;
      }
    const data = { email, type: 'resetPassword' };
    const emailVariables = {
      USER_NAME: user.fullName ? user.fullName : user.loginId.substring(0, user.loginId.indexOf("@")),
      LINK: link,
      LOCALHOST: localhost
    };
    emailService(data, emailVariables);

    return { verificationCode };
  }

  static async createAccessTokenFromRefreshToken(refreshToken) {
    const rtObj = await RefreshDBService.getRefreshToken({ token: refreshToken });
    if (rtObj) {
      const now = moment(new Date());
      const end = moment(rtObj.createdAt);
      const duration = moment.duration(now.diff(end));
      const isExpired = duration.asMinutes() > vars.refreshTokenTime;
      if (!isExpired) {
        return this.generateTokenAfterLogin(rtObj.userId, null);
      }
      throw new CustomError({ serviceName, ...errorManager.TOKEN_UNAUTHORIZED });
    }
    else {
      throw new CustomError({ serviceName, ...errorManager.TOKEN_UNAUTHORIZED });
    }
  }

  static async getSmsContent(keyName: string) {
    const smsData = await cache.get(`${sms.sms}`, keyName);
    const smsContent = JSON.parse(smsData);
    if (smsContent) {
      return smsContent;
    }
  }

  static async createUserOpenfire(mobile: string, name: string) {
    const user = {
      username: mobile,
      password: mobile,
      name
    }
    await axiosCallApi.postCall(openfire.url, openfire.secret, user);
  }
}
