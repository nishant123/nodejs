import {
  Model, DataTypes
} from 'sequelize';
import { toDefaultValue } from 'sequelize/types/lib/utils';
import sequelize from '../connection';

class Users extends Model {
  public id: number;
}

Users.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  fullName: {
    type: DataTypes.STRING(50)
  },
  countryCode: {
    type: DataTypes.STRING(20)
  },
  mobileNumber: {
    type: DataTypes.STRING(20),
    unique: true
  },
  loginId: {
    type: DataTypes.STRING(50),
    unique: true
  },
  lastLoginTime: {
    type: DataTypes.DATE
  },
  password: {
    type: DataTypes.STRING(100)
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isOtpVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  profileImage: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING(50),
  },
  language: {
    type: DataTypes.STRING(50),
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  loginAttempts: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  }
}, {
  modelName: 'users',
  tableName: 'users',
  sequelize,
  timestamps: true
});

export default Users;
