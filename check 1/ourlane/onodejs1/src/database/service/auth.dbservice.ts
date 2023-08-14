import db from '..';
const {
  OtpModel,
  UserModel,
  VerificationModel,
  PasswordLogsModel
} = db;

export default class AuthDBService {


  static createUser(data: {
    uuid: string,
    loginId: string,
    fullName?: string,
    mobileNumber?: string,
    password?: string,
    organizationId?: string,
    countryCode?: string,
    deviceType?: string,
    firebaseDeviceId?: string
  }) {
    return UserModel.create(data);
  }
  static getUser(options: {
    loginId: string,
  }) {
    return UserModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }


  static getAdmin(options: {
    role ?: string,
    isActive ?: boolean,
  }) {
    return UserModel.findAndCountAll({
      where: options,
      raw: true,
      nest: true
    });
  }

  static checkMobileNumber(options: {
    mobileNumber: string,
    countryCode?: string
  }) {
    return UserModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }

  static getUserByID(id) {
    return UserModel.findByPk(id, {
      // include: [{
      //   model: OrganizationModel,
      //   as: 'organizations'
      // }],
      raw: true,
      nest: true
    });
  }

  static getUserByIdPassword(options: {
    uuid: string,
    password: string
  }) {
    return UserModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
  }

  static saveOtp(options: {
    otp: string,
    userId: number,
    type: string
  }) {
    return OtpModel.create(options);
  }

  static incorrectPassword(uuid, initialCount) {
    const loginAttempts = initialCount + 1;
    return UserModel.update({
      loginAttempts
    }, {
      where: { uuid }
    });
  }

  static getOtp(options: {
    userId?: number,
    requestId?: string,
    type: string
  }) {
    return OtpModel.findOne({
      where: options,
      order: [['createdAt', 'DESC']],
      raw: true,
      nest: true
    });
  }

 

  static updateOtp(data, query) {
    return OtpModel.update(data, { where: query });
  }

  static updateUserStatus(data, query) {
    return UserModel.update(data, 
      { returning: true, where: query }
      );
  }

  static getVerificationCode(options: {
    userId: number
  }) {
    return VerificationModel.findOne({
      where: options,
      order: [['createdAt', 'DESC']],
      raw: true,
      nest: true
    });
  }

  static saveVerificationCode(options: {
    userId: string,
    verificationCode: string
  }) {
    return VerificationModel.create(options);
  }

  static updateVerificationCode(data, query, transaction) {
    return VerificationModel.update(data, { where: query, transaction });
  }

  static updatePassword(options: {
    uuid: string,
    password: string
  }) {
    return UserModel.update({
      password: options.password
    }, {
      where: {
        uuid: options.uuid
      }
    });
  }

  static updateUser(options: {
    uuid: string;
  }, data: {
    lastLoginTime?: string;
    loginAttempts?: number;
    isEmailVerified?: boolean;
    isActive?: boolean;
  }) {
    return UserModel.update(data, {
      where: options
    });
  }

  static checkPasswordAvailability(userId: string, password: string) {
    return PasswordLogsModel.findAll({
      where: { userId, password },
      order: [['id', 'DESC']],
      limit: 3,
      raw: true,
      nest: true
    });
  }

  static insertPasswordLog(userId: string, password: string) {
    const data = {
      userId, password
    };
    return PasswordLogsModel.create(data);
  }

  static async insertAndUpdatePassword(data) {
    const logs = {
      userId: data.uuid,
      password: data.password
    };
    const transaction = await db.sequelize.transaction();
    try {
      await PasswordLogsModel.create(logs, { transaction });
      await UserModel.update({ password: data.password }, {
        where: { uuid: data.uuid },
        transaction
      });
      await transaction.commit();
      return true;
    }
    catch (e) {
      await transaction.rollback();
      return false;
    }
  }
}
